<template>
    <q-page>
        <div
            class="eng-details-view col-row q-pa-lg"
            v-if="!data.loading"
        >
            <q-tree
                ref="treeRef"
                :nodes="services.content.list"
                node-key="id"
                node-label="name"
                icon="chevron_right"
                :default-expand-all="data.isAllExpanded"
                v-model:expanded="data.expandedKeys"
                v-model:selected="data.selectedKey"
                @update:selected="onSelectedUpdate"
            >
                <template v-slot:header-root="item">
                    <div class="row items-center q-gutter-x-sm">
                        <img
                            class="q-pa-xs"
                            src="@/assets/icons/study.svg"
                            style="width: 36px; height: 36px; user-select: none"
                        />
                        <div class="text-h6 text-grey-8">
                            {{ item.node.name }}
                        </div>
                        <q-btn
                            :icon="
                                data.isAllExpanded
                                    ? 'fal fa-angle-double-up'
                                    : 'fal fa-angle-double-down'
                            "
                            flat
                            padding="xs"
                            size="xs"
                            @click.stop="toggleExpandAll"
                        >
                            <q-tooltip class="text-white bg-dark">
                                {{ data.isAllExpanded ? "Collapse All" : "Expand All" }}
                            </q-tooltip>
                        </q-btn>
                    </div>
                </template>

                <template v-slot:header-group="item">
                    <div class="text-weight-bold text-subtitle1 text-primary">
                        {{ item.node.name }}
                    </div>
                </template>

                <template v-slot:header-branch="item">
                    <div
                        class="eng-details-view__branch row items-center q-gutter-x-xs"
                        style="width: 100%"
                    >
                        <div class="text-weight-bold text-blue-9">
                            {{ item.node.name }}
                        </div>
                        <q-chip
                            :label="item.node.frequency"
                            :color="item.node.frequencyColor"
                            size="sm"
                            dense
                            square
                        />
                        <q-btn
                            icon="fal fa-volume-up"
                            padding="xs"
                            color="grey-8"
                            size="xs"
                            flat
                            @click.stop
                        />
                        <div class="text-grey-8">
                            {{ item.node.partOfSpeech }}
                        </div>
                        <div class="row items-start no-wrap">
                            <div class="text-dark">
                                {{ item.node.definition }}
                            </div>
                            <eng-example :item="item.node" />
                        </div>
                    </div>
                </template>

                <template v-slot:header-collocation="item">
                    <div class="row items-center q-gutter-x-xs">
                        <div class="text-weight-bold text-blue-7">{{ item.node.name }}</div>
                        <q-chip
                            v-if="item.node.frequency"
                            :label="item.node.frequency"
                            :color="item.node.frequencyColor"
                            size="sm"
                            dense
                            square
                        />
                        <div
                            class="text-grey-8"
                            v-if="item.node.partOfSpeech"
                        >
                            {{ item.node.partOfSpeech }}
                        </div>
                        <div
                            class="text-dark"
                            v-if="item.node.definition"
                        >
                            {{ item.node.definition }}
                        </div>
                        <eng-example :item="item.node" />
                    </div>
                </template>
            </q-tree>
        </div>
        <q-inner-loading
            :showing="data.loading"
            color="primary"
        />
    </q-page>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, watch } from "vue"
import { useRoute } from "vue-router"
import { v4 as uuidv4 } from "uuid"
import type { QTree } from "quasar"

import { engExample } from "@/lib"
import { EngContentModel, EngContentService } from "@/lib-utils"

const route = useRoute()

const treeRef = ref<InstanceType<typeof QTree>>()

const data = reactive({
    loading: false,
    isAllExpanded: false,
    selectedKey: "",
    tempSelectedKey: "",
    expandedKeys: [] as Array<string>,
})

const services = reactive({
    content: EngContentService.getInstance(),
})

// events
// -----------------------------------------------------------------------------
const toggleExpandAll = () => {
    if (data.isAllExpanded) {
        const rootNode = services.content.list.find((el) => el.isRoot)
        if (rootNode) {
            data.expandedKeys = [rootNode.id]
        }
        data.isAllExpanded = !data.isAllExpanded
    } else {
        treeRef.value?.expandAll()
        data.isAllExpanded = !data.isAllExpanded
    }
}

const onSelectedUpdate = (value: string) => {
    // no-selection-unset alternative
    if (value) {
        data.tempSelectedKey = value
    } else {
        data.selectedKey = data.tempSelectedKey
    }

    if (treeRef.value?.isExpanded(data.selectedKey)) {
        data.expandedKeys = data.expandedKeys.filter((el) => el !== data.selectedKey)
    } else {
        treeRef.value?.setExpanded(data.selectedKey, true)
    }
}

// load
// -----------------------------------------------------------------------------
const fetchData = async (url: string) => {
    data.loading = true
    try {
        const response = await fetch(url)
        const json: Array<EngContentModel> = await response.json()
        services.content.list = buildContent(json)
        initTree()
    } catch (error) {
        console.log(error)
    } finally {
        data.loading = false
    }
}

const initTree = () => {
    const contentPath = services.content.searchItem.contentPath
    data.isAllExpanded = false
    const levels = contentPath.split("\\")
    data.expandedKeys = [] // reset

    const root = services.content.list.find((el) => el.isRoot)
    if (root) {
        data.expandedKeys.push(root.id)

        const group = root.children.find((group) => group.name === levels[1])
        if (group) {
            data.expandedKeys.push(group.id)

            const branch = group.children.find((branch) => branch.name === levels[2])
            if (branch) {
                data.expandedKeys.push(branch.id)
                data.selectedKey = branch.id

                const col = branch.children.find((col) => col.name === levels[3])

                if (col) {
                    data.expandedKeys.push(col.id)
                    data.selectedKey = col.id
                }
            }
        }
    }
}

const buildContent = (items: Array<EngContentModel>): Array<EngContentModel> => {
    const results = items.map((item) => {
        const newItem = {
            ...item,
            id: uuidv4(),
        }

        if (newItem.children && newItem.children.length > 0) {
            newItem.children = buildContent(newItem.children)
        }

        return EngContentModel.fromJson(newItem)
    })

    results.sort((a, b) => {
        const frequencyComparison = a.frequency.localeCompare(b.frequency)
        // if (frequencyComparison === 0) {
        //     return a.name.length - b.name.length
        // }

        return frequencyComparison
    })

    return results
}

watch(
    () => route.params.id,
    (id) => {
        if (id) {
            fetchData(`/assets/content/${route.params.id}.json`)
        }
    }
)

watch(
    () => services.content.searchItem.contentPath,
    (contentPath) => {
        if (contentPath) {
            initTree()
        }
    }
)

onMounted(() => {
    fetchData(`/assets/content/${route.params.id}.json`)
})
</script>

<style lang="sass">
.eng-details-view
    height: calc(100vh - 50px)
    overflow: auto

    .q-tree > .q-tree__node--parent > .q-tree__node-header // root node
        background: rgba(0, 0, 0, 0.048)

    .q-tree__node-header.q-tree__node--selected // selected node
        background: var(--red-background)

    .q-tree__node-header
        padding: 0 4px

.eng-details-view__branch
    .q-btn .q-icon
        font-size: 16px
</style>
