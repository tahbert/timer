<template>
    <q-layout
        view="hHh lpR fFf"
        class="eng-layout"
    >
        <q-header
            class="eng-layout__header bg-grey-2 text-dark"
            bordered
        >
            <q-toolbar class="row items-center q-gutter-x-xs">
                <div
                    class="row items-center cursor-pointer"
                    style="margin-right: auto"
                    @click="router.push({ name: appRouteDefinitions.home.name })"
                >
                    <q-avatar
                        class="q-mr-xs"
                        rounded
                        size="sm"
                    >
                        <img src="/favicon.svg" />
                    </q-avatar>
                    <span class="text-h6">Engmindmap</span>
                </div>

                <div
                    class="eng-layout__search"
                    ref="search"
                    @click="onSearchOutsideClick"
                >
                    <q-input
                        class="eng-layout__search-box"
                        placeholder="Search words, phrases, collocations, sentences"
                        v-model="data.filterText"
                        dense
                        filled
                        debounce="500"
                        clearable
                        @update:model-value="onSearchUpdate"
                        @focus="onSearchFocus"
                        @clear="data.filterText = ''"
                    >
                        <template v-slot:prepend>
                            <q-icon
                                name="fal fa-search"
                                size="xs"
                            />
                        </template>
                        <template
                            v-slot:append
                            v-if="filters.length !== 0 && filters.length <= data.filterMax"
                        >
                            <q-chip
                                :label="filters.length"
                                color="orange-4"
                                size="sm"
                                square
                            />
                        </template>
                    </q-input>
                    <q-card
                        class="eng-layout__search-card bg-grey-10 text-grey-5"
                        v-if="data.filterState"
                        fit
                    >
                        <q-list v-if="filters.length > 0 && filters.length < data.filterMax">
                            <q-item
                                v-for="(item, index) in filters"
                                :key="index"
                                dense
                                clickable
                                @click="onSearchAction(item)"
                            >
                                <q-item-section>{{ item.name }}</q-item-section>
                                <q-item-section side>{{ item.topic }}</q-item-section>
                                <q-item-section side>
                                    <q-chip
                                        :label="item.frequency"
                                        :color="item.frequencyColor"
                                        size="sm"
                                        dense
                                        square
                                /></q-item-section>
                            </q-item>
                        </q-list>
                        <q-list v-if="filters.length === data.filterMax">
                            <q-item
                                dense
                                clickable
                            >
                                <q-item-section
                                    >Too many items, please search more specific</q-item-section
                                >
                            </q-item>
                        </q-list>
                        <q-list v-else>
                            <q-item
                                dense
                                clickable
                            >
                                <q-item-section>No item found!</q-item-section>
                            </q-item>
                        </q-list>
                    </q-card>
                </div>

                <div class="q-mr-sm row q-gutter-x-xs">
                    <q-btn
                        label="ALL"
                        color="grey-5"
                        text-color="dark"
                        size="sm"
                        :flat="!isAllFrequency"
                        :unelevated="isAllFrequency"
                        style="padding: 4px 8px"
                        @click="toggleAllFrequency"
                    />
                    <q-btn
                        v-for="item in data.frequency"
                        :key="item.name"
                        :label="item.name"
                        :color="item.color"
                        text-color="dark"
                        size="sm"
                        :flat="!item.isActive"
                        :unelevated="item.isActive"
                        style="padding: 4px 8px"
                        @click="onFrequencyUpdate(item)"
                    />
                </div>

                <q-btn
                    icon="fal fa-cog"
                    size="sm"
                    flat
                    padding="sm"
                    @click.stop
                />
            </q-toolbar>
        </q-header>

        <q-drawer
            class="eng-layout__drawer"
            show-if-above
            v-model="data.isDrawerOpen"
            side="left"
            :width="data.dragIndicator[0]"
        >
            <q-tree
                ref="treeRef"
                :nodes="data.topics"
                node-key="id"
                label-key="displayName"
                accordion
                icon="chevron_right"
                :duration="100"
                color="primary"
                v-model:selected="data.selectedKey"
                v-model:expanded="data.expandedKeys"
                @update:selected="onSelectedUpdate"
            />
        </q-drawer>

        <q-page-container>
            <router-view />
        </q-page-container>

        <div
            class="eng-layout__drag-indicator"
            v-touch-pan.prevent.mouse="dragDrawer"
            :style="{ left: `${data.dragIndicator[0]}px` }"
            @click="toggleDrawer"
        >
            <q-btn
                icon="fal fa-grip-lines-vertical"
                dense
                flat
                :disable="data.isDrawerDraging"
                v-touch-pan.prevent.mouse="dragDrawer"
            />
        </div>
    </q-layout>
</template>

<script setup lang="ts">
import { reactive, onMounted, onBeforeUnmount, computed, ref } from "vue"
import { useRouter } from "vue-router"
import { v4 as uuidv4 } from "uuid"
import type { QTree } from "quasar"

import {
    EngTopicModel,
    EngFrequencyModel,
    appRouteDefinitions,
    EngSearchModel,
    EngContentService,
} from "@/lib-utils"
import topics from "@/assets/json/topics.json"
import frequency from "@/assets/json/frequency.json"

const router = useRouter()
const treeRef = ref<InstanceType<typeof QTree>>()
const search = ref<HTMLElement | null>(null)

const data = reactive({
    isDrawerOpen: false,
    isDrawerDraging: false,
    dragIndicator: [500, 0],

    filterText: "",
    filterState: false,
    filterMax: 1000,

    topics: [] as Array<EngTopicModel>,
    tempSelectedKey: "",
    selectedKey: "",
    expandedKeys: [] as Array<string>,

    frequency: [] as Array<EngFrequencyModel>,
})

const services = reactive({
    content: EngContentService.getInstance(),
})

// filter
// -----------------------------------------------------------------------------
const onSearchFocus = () => {
    onSearchUpdate(data.filterText)
}

const onSearchAction = (item: EngSearchModel) => {
    data.filterState = false
    services.content.searchItem = item

    // tree expandation
    data.selectedKey = item.id
    data.expandedKeys = item.keys

    // router
    router.push({
        name: appRouteDefinitions.details.name,
        params: { id: item.path },
    })
}

const onSearchUpdate = (value: string | number | null) => {
    if (value) {
        data.filterState = true
    } else {
        data.filterState = false
    }
}

const onSearchOutsideClick = (event: Event) => {
    if (search.value && !search.value.contains(event.target as Node)) {
        data.filterState = false
    }
}

const filters = computed(() => {
    let results = [] as Array<EngSearchModel>
    let resultsCount = 0

    const findFiles = (nodes: Array<EngTopicModel>, parentKeys: Array<string> = []) => {
        nodes.forEach((node) => {
            const currentKeys = [...parentKeys, node.id]

            if (node.type === "folder") {
                findFiles(node.children, currentKeys)
            } else {
                const matchingSearchItems = node.search?.filter((el) =>
                    el.name.toLowerCase().includes(data.filterText)
                )

                if (matchingSearchItems && matchingSearchItems.length > 0) {
                    matchingSearchItems.forEach((search) => {
                        if (resultsCount < data.filterMax) {
                            results.push(
                                EngSearchModel.fromJson({
                                    id: node.id,
                                    name: search.name,
                                    topic: search.contentPath.split("\\", 2).join(" → "),
                                    path: node.path,
                                    contentPath: search.contentPath,
                                    frequency: search.frequency,
                                    keys: currentKeys,
                                })
                            )
                            resultsCount++
                        } else {
                            return
                        }
                    })
                }
            }
        })
    }

    if (data.filterText.length > 0) {
        findFiles(data.topics)
    }

    results.sort((a, b) => {
        const frequencyComparison = a.frequency.localeCompare(b.frequency)
        if (frequencyComparison === 0) {
            return a.name.length - b.name.length
        }

        return frequencyComparison
    })

    return results
})

// drawer
// -----------------------------------------------------------------------------
const toggleDrawer = () => {
    data.isDrawerOpen = !data.isDrawerOpen

    if (!data.isDrawerOpen) {
        data.dragIndicator[0] = 0
    } else {
        data.dragIndicator[0] = 500
    }
}

const dragDrawer = (ev: any) => {
    data.isDrawerOpen = true
    data.isDrawerDraging = ev.isFirst !== true && ev.isFinal !== true
    data.dragIndicator = [data.dragIndicator[0] + ev.delta.x, 0]

    // prevent moving beyond the screen edges
    if (data.dragIndicator[0] < 0) {
        data.dragIndicator[0] = 0
    }
}

// tree
// -----------------------------------------------------------------------------
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

    // route
    const findCurrentFile = (
        nodes: EngTopicModel[],
        id: string
    ): { node: EngTopicModel | undefined } => {
        let result: EngTopicModel | undefined

        const search = (currentNodes: EngTopicModel[]) => {
            currentNodes.forEach((node) => {
                if (node.type === "folder" && !result) {
                    search(node.children || [])
                } else if (node.id === id) {
                    result = node
                }
            })
        }

        search(nodes)

        return { node: result }
    }

    const { node: currentFile } = findCurrentFile(data.topics, data.selectedKey)

    if (currentFile?.type === "file") {
        router.push({
            name: appRouteDefinitions.details.name,
            params: { id: currentFile.path },
        })
    } else {
        router.push({ name: appRouteDefinitions.home.name })
    }
}

// frequency
// -----------------------------------------------------------------------------
const isAllFrequency = computed(() => data.frequency.every((el) => el.isActive === true))

const onFrequencyUpdate = (item: EngFrequencyModel) => {
    data.frequency.forEach((el) => {
        if (el.name === item.name) {
            el.isActive = !el.isActive
        }
    })
}

const toggleAllFrequency = () => {
    if (!isAllFrequency.value) {
        data.frequency.forEach((el) => {
            el.isActive = true
        })
    }
}

// load
// -----------------------------------------------------------------------------
const buildTopics = (
    items: Array<EngTopicModel>,
    parentId: string | null = null
): Array<EngTopicModel> => {
    return items.map((item) => {
        const newItem = {
            ...item,
            id: uuidv4(),
            displayName: item.name.replace(/\[.*?\]/g, "").replace(/_/g, " "),
            parentId: parentId,
        }

        if (newItem.children && newItem.children.length > 0) {
            newItem.children = buildTopics(newItem.children, newItem.id)
        }

        return EngTopicModel.fromJson(newItem)
    })
}

onMounted(() => {
    data.topics = buildTopics(topics)
    data.frequency = frequency
    document.addEventListener("click", onSearchOutsideClick)
})

onBeforeUnmount(() => {
    document.removeEventListener("click", onSearchOutsideClick)
})
</script>

<style lang="sass">
.eng-layout
    .q-drawer
        background: transparent !important

.eng-layout__drawer
    .q-tree__node-header
        margin-top: 0 !important

    .q-tree__node-header.q-tree__node--selected
        background: rgba(0, 0, 0, 0.048)

    .q-tree__node
        padding-bottom: 0px

    .q-tree__node.q-tree__node--child
        padding: 0 0 0 22px

    .q-tree__node-header-content.text-primary
        font-weight: 500

.eng-layout__search
    position: absolute
    top: 5px // later
    left: 50%
    transform: translateX(-50%)
    width: 50%

    .q-field__control
        background: rgba(0, 0, 0, 0.08)

.eng-layout__search-card.q-card
    width: 100%
    top: 0
    left: 0
    max-height: 70vh
    overflow: auto
    box-shadow: unset
    border-radius: 0 0 4px 4px

    &::-webkit-scrollbar
        width: 8px
    &::-webkit-scrollbar-track
        background: black
    &::-webkit-scrollbar-thumb
        background: rgba(255, 255, 255, 0.2)
        border-radius: 4px
    &::-webkit-scrollbar-thumb:hover
        background: rgba(255, 255, 255, 0.5)

    .q-item.q-router-link--active, .q-item--active
        color: $green-5

.eng-layout__drag-indicator
    position: fixed
    top: 0
    height: 100%
    width: 4px
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    background: $grey-3

    &:hover
        background: $grey-4
        cursor: grab
</style>
