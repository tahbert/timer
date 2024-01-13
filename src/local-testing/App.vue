<template>
    <router-view />
</template>

<script setup lang="ts">
import { onMounted } from "vue"

import { RestApiService } from "@linkse/fe-utils"

onMounted(() => {
    const appEnv = "linkse-qim-reports"
    const envKey = "env"

    const env = window.localStorage.getItem(envKey)

    if (env !== appEnv) {
        window.localStorage.clear()
        window.localStorage.setItem(envKey, appEnv)
        window.location.reload()
    }

    // Set base url, and auth token
    RestApiService.setBaseUrl(import.meta.env.VITE_API_URL)
    RestApiService.headers.setAccessToken(import.meta.env.VITE_ACCESS_TOKEN)
    RestApiService.headers.setTenantId(import.meta.env.VITE_TENANT_ID)
})
</script>

<style lang="sass">
::-webkit-scrollbar
    height: 1px

*::-webkit-scrollbar-thumb
    background-color: #A5ACB4 !important
</style>
