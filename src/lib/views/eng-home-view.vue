<template>
    <q-page>
        <div
            class="eng-home-view col-row q-pa-lg"
            v-if="!data.loading"
        >
            <q-tree
                ref="treeRef"
                :nodes="data.content"
                node-key="id"
                node-label="name"
                icon="chevron_right"
                :default-expand-all="data.isAllExpanded"
                v-model:expanded="data.expandedKeys"
            >
                <template v-slot:header-root="item">
                    <div class="row items-center q-gutter-x-sm">
                        <img
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
                            <q-tooltip
                                anchor="top middle"
                                self="bottom middle"
                            >
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
                    <div class="row items-center">
                        <div class="text-weight-bold text-subtitle1 text-primary">
                            {{ item.node.name }}
                        </div>
                        <q-chip
                            :label="item.node.frequency"
                            color="green-5"
                            size="sm"
                            square
                        />
                        <q-btn
                            icon="volume_up"
                            flat
                            padding="xs"
                            color="grey-8"
                            size="xs"
                            @click.stop="onPronunciation"
                        />
                    </div>
                </template>

                <template v-slot:header-collocation="item">
                    <div class="row items-center">
                        <div class="text-weight-bold text-primary">{{ item.node.name }}</div>
                    </div>
                </template>

                <template v-slot:body-branch="item">
                    <div class="eng-home-view__body">
                        <div
                            class="text-dark q-mb-sm"
                            v-if="item.node.definition"
                        >
                            {{ item.node.definition }}
                        </div>
                        <ul
                            class="eng-home-view__examples"
                            v-if="item.node.examples.length > 0"
                        >
                            <li
                                class="text-dark text-italic"
                                v-for="i in item.node.examples"
                            >
                                {{ i }}
                            </li>
                        </ul>
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
import { reactive, ref, onMounted } from "vue"
import { v4 as uuidv4 } from "uuid"
import type { QTree } from "quasar"

import { EngContentModel } from "@/lib-utils"
import contentData from "@/assets/json/content.json"

const treeRef = ref<InstanceType<typeof QTree>>()

const data = reactive({
    loading: false,
    isAllExpanded: true,
    expandedKeys: [] as Array<string>,
    content: [] as Array<EngContentModel>,
})

// events
// -----------------------------------------------------------------------------
const onPronunciation = () => {}

const toggleExpandAll = () => {
    if (data.isAllExpanded) {
        const rootNode = data.content.find((el) => el.isRoot)
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
const generateIds = (items: Array<EngContentModel>): Array<EngContentModel> => {
    return items.map((item) => {
        const newItem = {
            ...item,
            id: uuidv4(),
        }

        if (newItem.children && newItem.children.length > 0) {
            newItem.children = generateIds(newItem.children)
        }

        return EngContentModel.fromJson(newItem)
    })
}

onMounted(() => {
    data.loading = true

    setTimeout(() => {
        data.content = generateIds(contentData as Array<EngContentModel>)

        data.loading = false
    }, 500)
})
</script>

<style lang="sass">
.eng-home-view
    height: calc(100vh - 50px)
    overflow: auto
    // root node
    .q-tree > .q-tree__node--parent > .q-tree__node-header
        background: rgba(0, 0, 0, 0.048)

.eng-home-view__body
    padding: 4px
    border-radius: 4px
    background: rgba(0, 0, 0, 0.024)

.eng-home-view__examples
    li
        position: relative
        padding-left: 12px

    li::before
        content: ""
        position: absolute
        left: 0px
        top: 50%
        transform: translateY(-50%)
        width: 4px
        height: 4px
        border-radius: 50%
        background: $grey-8
</style>
