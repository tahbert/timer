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
                    <div class="eng-details-view__branch row items-center q-gutter-x-xs">
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
                        <div>{{ item.node.definition }}</div>
                        <eng-example :item="item.node" />
                    </div>
                </template>

                <template v-slot:header-collocation="item">
                    <div class="row items-center">
                        <div class="text-weight-bold text-blue-7">{{ item.node.name }}</div>
                        <eng-example :item="item.node" />
                    </div>
                </template>
            </q-tree>
        </div>
        <q-inner-loading
            :showing="data.loading"
            color="dark"
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

// load
// -----------------------------------------------------------------------------
const fetchData = async (url: string) => {
    data.loading = true
    try {
        const response = await fetch(url)
        const jsonData: Array<EngContentModel> = await response.json()
        services.content.list = buildContent(jsonData)

        // try expand
        const root = services.content.list.find((el) => el.isRoot)
        if (root) {
            data.expandedKeys.push(root.id)
            data.expandedKeys.push(root.children?.[0].id)
        }
    } catch (error) {
        console.log(error)
    } finally {
        data.loading = false
    }
}

const buildContent = (items: Array<EngContentModel>): Array<EngContentModel> => {
    return items.map((item) => {
        const newItem = {
            ...item,
            id: uuidv4(),
        }

        if (newItem.children && newItem.children.length > 0) {
            newItem.children = buildContent(newItem.children)
        }

        return EngContentModel.fromJson(newItem)
    })
}

watch(
    () => route.params.id,
    (id) => {
        if (id) {
            fetchData(`/assets/content/${route.params.id}.json`)
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
    // root node
    .q-tree > .q-tree__node--parent > .q-tree__node-header
        background: rgba(0, 0, 0, 0.048)

    .q-tree__node-header
        padding: 0 4px

.eng-details-view__branch
    .q-btn .q-icon
        font-size: 16px
</style>
