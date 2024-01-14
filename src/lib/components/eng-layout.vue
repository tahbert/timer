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
            class="eng-layout__left-drawer"
            show-if-above
            v-model="data.isDrawerOpen"
            side="left"
            bordered
            :width="data.fabPos[0]"
        >
            <li
                v-for="index in 100"
                :key="index"
            >
                Item {{ index }}
            </li>
        </q-drawer>

        <q-page-container>
            <router-view />
        </q-page-container>

        <div
            class="resize"
            v-touch-pan.prevent.mouse="dragDrawer"
            :style="{ left: `${data.fabPos[0]}px` }"
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
import { reactive } from "vue"

const data = reactive({
    isDrawerOpen: false,
    isDrawerDraging: false,
    searchText: "",
    fabPos: [300, 0],
})

const toggleDrawer = () => {
    data.isDrawerOpen = !data.isDrawerOpen

    if (!data.isDrawerOpen) {
        data.fabPos[0] = 0
    } else {
        data.fabPos[0] = 300
    }
}

const dragDrawer = (ev: any) => {
    data.isDrawerOpen = true
    data.isDrawerDraging = ev.isFirst !== true && ev.isFinal !== true
    data.fabPos = [data.fabPos[0] + ev.delta.x, 0]

    // prevent moving beyond the screen edges
    if (data.fabPos[0] < 0) {
        data.fabPos[0] = 0
    }
}
</script>

<style lang="sass">
.eng-layout__search
    position: absolute
    left: 50%
    transform: translateX(-50%)
    width: 30%

    .q-icon
        font-size: 20px

.resize
    position: fixed
    top: 0
    height: 100vh
    display: flex
    align-items: center
    margin-left: -10px
</style>
