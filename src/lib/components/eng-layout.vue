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
                <span class="text-h6">Engmindmap</span>

                <q-input
                    class="eng-layout__search"
                    placeholder="Search words, phrases, collocations, sentences"
                    v-model="data.searchText"
                    dense
                    outlined
                    color="dark"
                >
                    <template v-slot:prepend>
                        <q-icon name="search" />
                    </template>
                </q-input>
            </q-toolbar>
        </q-header>

        <q-drawer
            class="eng-layout__drawer"
            show-if-above
            v-model="data.isDrawerOpen"
            side="left"
            bordered
            :width="data.dragIndicator[0]"
        >
            <q-tree
                ref="treeRef"
                :nodes="data.topics"
                node-key="id"
                label-key="name"
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
        >
            <q-btn
                icon="drag_indicator"
                dense
                flat
                :disable="data.isDrawerDraging"
                v-touch-pan.prevent.mouse="dragDrawer"
                @click="toggleDrawer"
            />
        </div>
    </q-layout>
</template>

<script setup lang="ts">
import { reactive, onMounted, ref } from "vue"
import { v4 as uuidv4 } from "uuid"
import type { QTree } from "quasar"

import { EngTopicModel } from "@/lib-utils"
import topics from "@/assets/json/topics.json"

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
}

// load
// -----------------------------------------------------------------------------
const generateIds = (items: Array<EngTopicModel>): Array<EngTopicModel> => {
    return items.map((item) => {
        const newItem = {
            ...item,
            id: uuidv4(),
        }

        if (newItem.children && newItem.children.length > 0) {
            newItem.children = generateIds(newItem.children)
        }

        return EngTopicModel.fromJson(newItem)
    })
}

onMounted(() => {
    data.topics = generateIds(topics)
})
</script>

<style lang="sass">
.eng-layout
    .q-drawer
        background: transparent !important

.eng-layout__drawer
    .q-icon.q-tree__arrow
        height: 1.2em
        width: 1.2em
        font-size: 20px
        background: rgba(0, 0, 0, 0.03)
        border-radius: 4px

        &:hover
            background: rgba(0, 0, 0, 0.1)

    .q-tree__node-header
        margin-top: 0 !important

    .q-tree__node-header.q-tree__node--selected
        background: rgba(0, 0, 0, 0.04)

    .q-tree__node-header:before
        width: 39px
        left: -43px

    .q-tree__node
        padding-bottom: 0px

    .q-tree__node.q-tree__node--child
        padding: 0 0 0 30px

    .q-tree__node-header-content.text-primary
        font-weight: 500

.eng-layout__search
    position: absolute
    left: 50%
    transform: translateX(-50%)
    width: 30%

    .q-field__inner
        background: rgba(0, 0, 0, 0.024)

    .q-icon
        font-size: 20px

.eng-layout__drag-indicator
    position: fixed
    top: 0
    height: 100vh
    display: flex
    align-items: center
    margin-left: -10px
</style>
