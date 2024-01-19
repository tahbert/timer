<template>
    <q-btn
        label="e.g."
        size="xs"
        padding="xs"
        square
        flat
        @click.stop
    >
        <q-menu
            class="text-dark text-body2 bg-grey-3 q-pa-sm"
            style="white-space: nowrap"
        >
            <div class="q-mb-xs">Examples:</div>
            <ul
                class="eng-home-view__examples text-italic"
                v-if="item.hasExamples"
                style="white-space: nowrap"
            >
                <li v-for="i in item.examples">
                    {{ i }}
                </li>
            </ul>
            <div
                class="text-italic"
                v-else
            >
                <q-icon
                    name="fal fa-exclamation-circle"
                    color="primary"
                    size="xs"
                />
                We are working with orther dictionaries...<br />
                For now, please refer to the
                <q-btn
                    label="Cambridge"
                    size="sm"
                    color="blue-2"
                    text-color="dark"
                    square
                    unelevated
                    padding="xs"
                    style="padding: 0"
                    @click.stop="onDic('cambridge')"
                />
                or
                <q-btn
                    label="Longman"
                    size="sm"
                    color="orange-2"
                    text-color="dark"
                    square
                    unelevated
                    padding="xs"
                    style="padding: 0"
                    @click.stop="onDic('longman')"
                />
                dictionary
            </div>
        </q-menu>
    </q-btn>
</template>

<script setup lang="ts">
import { reactive } from "vue"

import { EngContentModel, EngContentService } from "@/lib-utils"

const props = defineProps({
    item: {
        type: Object as () => EngContentModel,
        required: true,
    },
})

const data = reactive({
    longman: "https://www.ldoceonline.com/dictionary",
    cambridge: "https://dictionary.cambridge.org/us/dictionary/english",
})

const services = reactive({
    content: EngContentService.getInstance(),
})

const onDic = (dic: string) => {
    const baseUrl = dic === "longman" ? data.longman : data.cambridge

    if (props.item.isBranch) {
        window.open(`${baseUrl}/${props.item.name}`, "_blank")
        return
    } else {
        services.content.list[0].children?.forEach((group) => {
            group.children?.forEach((branch) => {
                const col = branch.children?.find((col) => col.id === props.item.id)
                if (col) {
                    window.open(`${baseUrl}/${branch.name}`, "_blank")
                    return
                }
            })
        })
    }
}
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
