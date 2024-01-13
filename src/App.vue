<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router"
</script>

<template>
    <div class="wrapper">
        <nav>
            <router-link to="/">Home</router-link>
            <router-link to="/about">About</router-link>
        </nav>
    </div>

    <router-view />
</template>

<style lang="sass"></style>
