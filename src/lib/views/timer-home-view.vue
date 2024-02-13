<template>
    <div
        class="timer-home-view q-pa-lg"
        v-if="!data.loading"
    >
        <q-tree
            :nodes="data.tasks"
            node-key="id"
            node-label="name"
            icon="chevron_right"
            default-expand-all
        >
            <template v-slot:default-header="item">
                <div
                    class="row items-center q-gutter-x-sm"
                    style="width: 100%"
                >
                    <div style="margin-right: auto">
                        {{ item.node.item.name }}
                    </div>
                    <div>{{ item.node.item.time }}</div>

                    <q-icon
                        class="timer-home-view__play-btn cursor-pointer"
                        :name="data.isPlaying ? 'fal fa-stop' : 'fal fa-play'"
                        size="xs"
                        @click.stop="onPlay"
                    />
                </div>
            </template>
        </q-tree>
    </div>
    <q-inner-loading
        :showing="data.loading"
        color="primary"
    />
</template>

<script setup lang="ts">
import { reactive, onMounted } from "vue"
import { collection, getDocs } from "firebase/firestore"
import db from "@/firebase"

import { TimerTaskModel, TreeDataBuilder, TreeDataBuilderModel, TreeTableModel } from "@/lib-utils"

const data = reactive({
    loading: false,
    isPlaying: false,
    tasks: [] as Array<TreeTableModel<TimerTaskModel>>,
})

const services = reactive({
    treeDataBuilder: TreeDataBuilder.getInstance(),
})

const onPlay = () => {
    data.isPlaying = !data.isPlaying
}

const fetchData = async () => {
    data.loading = true

    const querySnapshot = await getDocs(collection(db, "tasks"))

    const tasks = [] as Array<TimerTaskModel>
    querySnapshot.forEach((doc) => {
        tasks.push(
            TimerTaskModel.fromJson({
                id: doc.id,
                parentId: doc.data().parentId,
                name: doc.data().name,
                time: doc.data().time,
                header: doc.data().header,
            })
        )
    })

    const nodes = tasks.map((doc) =>
        TreeDataBuilderModel.createInstance<TimerTaskModel>({
            id: doc.id,
            parentId: doc.parentId,
            label: doc.name,
            node: doc,
        })
    )

    data.tasks = services.treeDataBuilder.build(nodes)

    data.loading = false
}

onMounted(() => {
    fetchData()
})
</script>

<style lang="sass">
.timer-home-view
    max-width: 600px
    margin: auto

.timer-home-view__play-btn
    font-size: 6px
    color: white
    background: $red-6
    padding: 4px
    border-radius: 4px
</style>
