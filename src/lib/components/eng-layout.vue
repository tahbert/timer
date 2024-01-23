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
                <q-avatar
                    rounded
                    size="sm"
                >
                    <img src="/favicon.svg" />
                </q-avatar>
                <span
                    class="text-h6"
                    style="margin-right: auto"
                    >Engmindmap</span
                >

                <div
                    class="eng-layout__search"
                    ref="search"
                    @click="handleClickOutside"
                >
                    <q-input
                        class="eng-layout__search-box"
                        placeholder="Search words, phrases, collocations, sentences"
                        v-model="data.filterText"
                        dense
                        filled
                        color="black"
                        debounce="300"
                        clearable
                        @update:model-value="onSearchUpdate"
                        @focus="onSearchFocus"
                        @blur="onSearchBlur"
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
                            v-if="filters.length !== 0 && filters.length < 1000"
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
                        class="eng-layout__search-card bg-black text-grey-5"
                        v-if="data.filterState"
                        fit
                    >
                        <q-list v-if="filters.length > 0">
                            <q-item
                                v-for="(item, index) in filters"
                                :key="index"
                                dense
                                clickable
                                :to="{
                                    name: appRouteDefinitions.details.name,
                                    params: { id: item.path },
                                }"
                                @click="data.filterState = false"
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

                <q-avatar
                    rounded
                    size="sm"
                >
                    <img src="@/assets/images/cambridge-thumb.png" />
                </q-avatar>
                <q-avatar
                    rounded
                    size="sm"
                >
                    <img src="@/assets/images/longman-thumb.png" />
                </q-avatar>

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

import { EngTopicModel, EngFrequencyModel, appRouteDefinitions, EngSearchModel } from "@/lib-utils"
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

    topics: [] as Array<EngTopicModel>,
    tempSelectedKey: "",
    selectedKey: "",
    expandedKeys: [] as Array<string>,

    frequency: [] as Array<EngFrequencyModel>,
})

// filter
// -----------------------------------------------------------------------------
const onSearchFocus = () => {
    onSearchUpdate(data.filterText)
}

const onSearchBlur = () => {
    // setTimeout(() => {
    //     data.filterState = false
    // }, 100)
}

const onSearchUpdate = (value: string | number | null) => {
    if (value) {
        data.filterState = true
    } else {
        data.filterState = false
    }
}

const handleClickOutside = (event: Event) => {
    if (search.value && !search.value.contains(event.target as Node)) {
        data.filterState = false
    }
}

const filters = computed(() => {
    const results = [] as Array<EngSearchModel>

    const findFiles = (nodes: Array<EngTopicModel>) => {
        nodes.map((node) => {
            if (node.type === "folder") {
                findFiles(node.children)
            } else {
                const search = node.search?.find((el) =>
                    el.name.toLowerCase().includes(data.filterText)
                )
                if (search) {
                    results.push(
                        EngSearchModel.fromJson({
                            name: search.name,
                            topic: node.name.replace(/\[.*?\]/g, "").replace(/_/g, " "),
                            path: node.path,
                            frequency: search.frequency,
                        })
                    )
                }
            }
        })
    }

    findFiles(data.topics)

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

// load
// -----------------------------------------------------------------------------
// const fetchData = async (url: string) => {
//     try {
//         const response = await fetch(url)
//         const data: Array<Array<EngContentModel>> = await response.json()
//         console.log(data)
//     } catch (error) {
//         console.log(error)
//     }
// }

onMounted(() => {
    data.topics = buildTopics(topics)
    data.frequency = frequency
    document.addEventListener("click", handleClickOutside)
    // fetchData(`/assets/content/json-merger.json`)
})

onBeforeUnmount(() => {
    document.removeEventListener("click", handleClickOutside)
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
    top: 51px
    height: 100%
    width: 4px
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    margin-left: -2px
    z-index: 999
    background: $grey-3

    .q-btn
        cursor: grab

    &:hover
        background: $grey-4
        cursor: grab
</style>
