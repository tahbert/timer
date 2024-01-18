<template>
    <div class="eng-home-view q-pa-lg q-gutter-sm">
        <q-tree
            :nodes="data.treeData"
            node-key="label"
            default-expand-all
            icon="chevron_right"
        >
            <template v-slot:header-root="item">
                <div class="row items-center">
                    <img
                        class="q-mr-sm"
                        src="@/assets/icons/studying-and-learning.svg"
                        style="width: 36px; height: 36px; user-select: none"
                    />
                    <div class="text-h6 text-grey-8">{{ item.node.label }}</div>
                </div>
            </template>

            <template v-slot:header-group="item">
                <div class="text-weight-bold text-subtitle1 text-primary">
                    {{ item.node.label }}
                </div>
            </template>

            <template v-slot:header-branch="item">
                <div class="row items-center">
                    <div class="text-weight-bold text-subtitle1 text-primary">
                        {{ item.node.label }}
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
                    <div class="text-weight-bold text-primary">{{ item.node.label }}</div>
                </div>
            </template>

            <template v-slot:body-branch="item">
                <div
                    class="text-dark q-mb-sm"
                    v-if="item.node.definition"
                >
                    {{ item.node.definition }}
                </div>
                <ul
                    class="eng-home-view__examples"
                    v-if="item.node.example.length > 0"
                >
                    <li
                        class="text-dark text-italic"
                        v-for="i in item.node.example"
                    >
                        {{ i }}
                    </li>
                </ul>
            </template>
        </q-tree>
    </div>
</template>

<script setup lang="ts">
import { reactive } from "vue"

const data = reactive({
    treeData: [
        {
            label: "Studying and Learning",
            header: "root",
            children: [
                {
                    label: "To study sth at school, university etc",
                    icon: "verified",
                    header: "group",
                    children: [
                        {
                            label: "study",
                            header: "branch",
                            body: "branch",
                            frequency: "A1",
                            definition:
                                "[I or T] to learn about a subject by reading books, going to classes etc",
                            example: ["It’s difficult to study when the weather’s so hot."],
                            children: [
                                {
                                    label: "study English/Biology/Music etc",
                                    header: "collocation",
                                    body: "branch",
                                    frequency: "A1",
                                    example: [
                                        "She’s studying Music at Berkeley College in Boston.",
                                        "Less than 10% of girls choose to study Science at school.",
                                        "My parents first met when dad was studying in England.",
                                    ],
                                },
                                {
                                    label: "study to be a doctor/lawyer/accountant etc",
                                    header: "collocation",
                                    body: "branch",
                                    frequency: "A1",
                                    example: ["What classes are you taking next semester?"],
                                },
                            ],
                        },
                        {
                            label: "take",
                            header: "branch",
                            body: "branch",
                            frequency: "A1",
                            definition:
                                "[T] to study a subject - use this to talk about subjects that you choose to study at school, college, university etc:",
                            example: ["What classes are you taking next semester?"],
                        },
                        {
                            label: "have a place",
                            header: "branch",
                            body: "branch",
                            frequency: "B1",
                            definition:
                                "[T] to study a subject - use this to talk about subjects that you choose to study at school, college, university etc:",
                            example: ["Jenny has a place to study law at Exeter this year."],
                        },
                    ],
                },
            ],
        },
    ],
})

// events
// -----------------------------------------------------------------------------
const onPronunciation = () => {}
</script>

<style lang="sass">
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
