<template>
    <q-dialog
        class="eng-modal"
        :model-value="state"
        @update:model-value="onUpdate"
    >
        <q-card style="width: 900px; max-width: 80vw">
            <q-card-section>
                <div class="text-h6">Guidelines</div>
            </q-card-section>

            <q-separator />

            <q-card-section
                style="height: 70vh"
                class="scroll"
            >
                <q-splitter
                    v-model="data.splitterModel"
                    style="height: 100%"
                >
                    <template v-slot:before>
                        <q-tabs
                            v-model="data.tab"
                            active-class="active"
                            vertical
                            active-color="primary"
                            dense
                            no-caps
                            switch-indicator
                        >
                            <q-tab
                                name="about"
                                label="About Us"
                            />
                            <q-tab
                                name="alarms"
                                label="Alarms"
                            />
                            <q-tab
                                name="movies"
                                label="Movies"
                            />
                        </q-tabs>
                    </template>

                    <template v-slot:after>
                        <q-tab-panels
                            v-model="data.tab"
                            animated
                            swipeable
                            vertical
                            transition-prev="jump-up"
                            transition-next="jump-up"
                        >
                            <q-tab-panel name="about">
                                <div class="text-h5 q-mb-md">About Us</div>
                                <p>
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis
                                    praesentium cumque magnam odio iure quidem, quod illum numquam
                                    possimus obcaecati commodi minima assumenda consectetur culpa
                                    fuga nulla ullam. In, libero.
                                </p>
                                <br />
                                <p>
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis
                                    praesentium cumque magnam odio iure quidem, quod illum numquam
                                    possimus obcaecati commodi minima assumenda consectetur culpa
                                    fuga nulla ullam. In, libero. Lorem ipsum dolor sit, amet
                                    consectetur adipisicing elit. Quis praesentium cumque magnam
                                    odio iure quidem, quod illum numquam possimus obcaecati commodi
                                    minima assumenda consectetur culpa fuga nulla ullam. In, libero.
                                </p>
                            </q-tab-panel>

                            <q-tab-panel name="alarms">
                                <div class="text-h5 q-mb-md">Alarms</div>
                                <p>
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis
                                    praesentium cumque magnam odio iure quidem, quod illum numquam
                                    possimus obcaecati commodi minima assumenda consectetur culpa
                                    fuga nulla ullam. In, libero.
                                </p>
                                <p>
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis
                                    praesentium cumque magnam odio iure quidem, quod illum numquam
                                    possimus obcaecati commodi minima assumenda consectetur culpa
                                    fuga nulla ullam. In, libero.
                                </p>
                            </q-tab-panel>

                            <q-tab-panel name="movies">
                                <div class="text-h5 q-mb-md">Movies</div>
                                <p>
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis
                                    praesentium cumque magnam odio iure quidem, quod illum numquam
                                    possimus obcaecati commodi minima assumenda consectetur culpa
                                    fuga nulla ullam. In, libero.
                                </p>
                                <p>
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis
                                    praesentium cumque magnam odio iure quidem, quod illum numquam
                                    possimus obcaecati commodi minima assumenda consectetur culpa
                                    fuga nulla ullam. In, libero.
                                </p>
                                <p>
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis
                                    praesentium cumque magnam odio iure quidem, quod illum numquam
                                    possimus obcaecati commodi minima assumenda consectetur culpa
                                    fuga nulla ullam. In, libero.
                                </p>
                            </q-tab-panel>
                        </q-tab-panels>
                    </template>
                </q-splitter>
            </q-card-section>

            <q-separator />

            <q-card-actions align="right">
                <q-btn
                    flat
                    label="Close"
                    color="primary"
                    v-close-popup
                />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
import { reactive } from "vue"

const props = defineProps({
    state: {
        type: Boolean,
        required: true,
    },
})

const emit = defineEmits<{
    (e: "update"): void
}>()

const data = reactive({
    splitterModel: 25,
    tab: "about",
})

const onUpdate = () => {
    emit("update")
}
</script>

<style lang="sass">
.eng-modal
    .q-tabs .q-tabs__content .q-tab
        justify-content: flex-start

    .q-tabs--vertical
        height: unset

    .q-tab.active
        background: var(--red-background)
</style>
