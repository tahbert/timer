<template>
    <q-page>
        <div class="eng-home-view col-row q-pa-lg">
            <div>
                <div class="text-h6 text-center text-grey-8">
                    Select a specific topic on the sidebar
                </div>
                <div class="text-subtitle1 text-center text-grey-8">
                    A topic with content is a topic without an arrow icon
                </div>
            </div>
            <q-img
                src="/assets/images/boy.png"
                spinner-color="white"
                fit="scale-down"
                style="max-height: 500px"
            />
        </div>
    </q-page>
</template>

<script setup lang="ts"></script>

<style lang="sass">
.eng-home-view
    height: calc(100vh - 50px)
    overflow: auto
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    gap: 20px
</style>
