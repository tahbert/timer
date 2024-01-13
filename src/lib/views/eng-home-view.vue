<template>
    <div class="q-pa-md q-gutter-sm">
        <q-tree
            :nodes="data.treeData"
            node-key="label"
        />
    </div>
</template>

<script setup lang="ts">
import { reactive } from "vue"

const data = reactive({
    input: "",
    treeData: [
        {
            label: "Satisfied customers (with avatar)",
            avatar: "https://cdn.quasar.dev/img/boy-avatar.png",
            children: [
                {
                    label: "Good food (with icon)",
                    icon: "restaurant_menu",
                    children: [{ label: "Quality ingredients" }, { label: "Good recipe" }],
                },
                {
                    label: "Good service (disabled node with icon)",
                    icon: "room_service",
                    disabled: true,
                    children: [{ label: "Prompt attention" }, { label: "Professional waiter" }],
                },
                {
                    label: "Pleasant surroundings (with icon)",
                    icon: "photo",
                    children: [
                        {
                            label: "Happy atmosphere (with image)",
                            img: "https://cdn.quasar.dev/img/logo_calendar_128px.png",
                        },
                        { label: "Good table presentation" },
                        { label: "Pleasing decor" },
                    ],
                },
            ],
        },
    ],
})
</script>

<style lang="sass"></style>
