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

                <q-input
                    class="eng-layout__search"
                    placeholder="Search words, phrases, collocations, sentences"
                    v-model="data.searchText"
                    dense
                    outlined
                    color="dark"
                >
                    <template v-slot:prepend>
                        <q-icon
                            name="fal fa-search"
                            size="xs"
                        />
                    </template>
                </q-input>

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
import { reactive, onMounted, computed, ref } from "vue"
import { useRouter } from "vue-router"
import { v4 as uuidv4 } from "uuid"
import type { QTree } from "quasar"

import { EngTopicModel, EngFrequencyModel, appRouteDefinitions } from "@/lib-utils"
import topics from "@/assets/json/topics.json"
import frequency from "@/assets/json/frequency.json"

const router = useRouter()
const treeRef = ref<InstanceType<typeof QTree>>()

const data = reactive({
    isDrawerOpen: false,
    isDrawerDraging: false,
    dragIndicator: [500, 0],

    searchText: "",

    topics: [] as Array<EngTopicModel>,
    tempSelectedKey: "",
    selectedKey: "",
    expandedKeys: [] as Array<string>,

    frequency: [] as Array<EngFrequencyModel>,
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
    ): { node: EngTopicModel | undefined; names: string[] } => {
        let result: EngTopicModel | undefined
        const names: string[] = []

        const search = (currentNodes: EngTopicModel[], currentNames: string[]) => {
            currentNodes.forEach((node) => {
                const updatedNames = [...currentNames, node.name]

                if (node.type === "folder" && !result) {
                    search(node.children || [], updatedNames)
                } else if (node.id === id) {
                    result = node
                    names.push(...updatedNames)
                }
            })
        }

        search(nodes, [])

        return { node: result, names }
    }

    const { node: currentFile, names } = findCurrentFile(data.topics, data.selectedKey)

    if (currentFile?.type === "file") {
        router.push({
            name: appRouteDefinitions.details.name,
            params: { id: names.join("/").replace(".json", "") },
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
const generateIds = (
    items: Array<EngTopicModel>,
    parentId: string | null = null
): Array<EngTopicModel> => {
    return items.map((item) => {
        const newItem = {
            ...item,
            id: uuidv4(),
            displayName: item.name
                .replace(/\[.*?\]/g, "")
                .replace(".json", "")
                .replace(/_/g, " "),
            parentId: parentId,
        }

        if (newItem.children && newItem.children.length > 0) {
            newItem.children = generateIds(newItem.children, newItem.id)
        }

        return EngTopicModel.fromJson(newItem)
    })
}

onMounted(() => {
    data.topics = generateIds(topics)
    data.frequency = frequency
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
    left: 50%
    transform: translateX(-50%)
    width: 50%

    .q-field__inner
        background: rgba(0, 0, 0, 0.05)

    .q-icon
        font-size: 20px

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
    z-index: 9999
    background: $grey-3

    .q-btn
        cursor: grab

    &:hover
        background: $grey-4
        cursor: grab
</style>
