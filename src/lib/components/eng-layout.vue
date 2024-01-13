<template>
    <q-layout
        view="hHh lpR fFf"
        class="eng-layout"
    >
        <div
            class="resize"
            v-touch-pan.prevent.mouse="moveFab"
            :style="{ left: `${data.fabPos[0]}px` }"
        >
            <q-btn
                icon="drag_indicator"
                dense
                flat
                :disable="data.draggingFab"
                v-touch-pan.prevent.mouse="moveFab"
            />
        </div>

        <q-header
            class="eng-layout__header bg-grey-2 text-dark"
            bordered
        >
            <q-toolbar>
                <q-btn
                    dense
                    flat
                    round
                    icon="menu"
                    @click="toggleLeftDrawer"
                />
                <q-toolbar-title>
                    <q-avatar rounded>
                        <img src="/favicon.svg" />
                    </q-avatar>
                    Engmindmap
                </q-toolbar-title>
                <q-input
                    class="eng-layout__search"
                    placeholder="Search words, phrases, collocations, sentences"
                    v-model="data.searchText"
                    dense
                    outlined
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
            v-model="data.leftDrawer"
            side="left"
            bordered
            :width="data.leftDrawerWidth"
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
    </q-layout>
</template>

<script setup lang="ts">
import { reactive } from "vue"

const data = reactive({
    leftDrawer: false,
    leftDrawerWidth: 300,
    searchText: "",
    draggingFab: false,
    fabPos: [300, 0],
})

const toggleLeftDrawer = () => {
    data.leftDrawer = !data.leftDrawer
}

const moveFab = (ev: any) => {
    data.draggingFab = ev.isFirst !== true && ev.isFinal !== true
    data.fabPos = [data.fabPos[0] + ev.delta.x, 0]
    data.leftDrawerWidth = data.fabPos[0]
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
    // cursor: e-resize
</style>
