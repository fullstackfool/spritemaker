<template>
    <div class="card h-100">
        <div class="card-body d-flex flex-column space-children">
            <div class="row col spaced">
                <swatches class="h-auto" v-model="colors"/>
            </div>

            <div class="row spaced">
                <label for="width" class="col-sm-3 col-form-label">Width</label>
                <div class="col-sm-9">
                    <input class="form-control" id="width" type="number" v-model="width">
                </div>

                <label for="height" class="col-sm-3 col-form-label">Height</label>
                <div class="col-sm-9">
                    <input class="form-control" id="height" type="number" v-model="height">
                </div>
            </div>

            <div class="row spaced">
                <div class="col-6">
                    <button type="button" @click="emitInitialise()"
                            class="btn btn-outline-danger btn-block inline-block">
                        Clear Frame
                    </button>
                </div>
                <div class="col-6">
                    <button type="button" class="btn btn-success btn-block inline-block"
                            @click="emitInitialise()">
                        Update Frame
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {Swatches} from 'vue-color';

    export default {
        name: 'v-control-panel',

        components: {
            Swatches
        },

        props: {
            colors: {
                type: Object,
                required: false,
                default: () => {
                    return {h: 150, s: 0.66, v: 0.30}
                }
            },
            /**
             * The width, in columns, to display
             */
            width: {
                type: Number,
                required: false,
                default: 16
            },

            /**
             * The height, in rows, to display
             */
            height: {
                type: Number,
                required: false,
                default: 16
            }
        },

        data() {
            return {
                mutatableColors: this.colors
            }
        },

        methods: {
            emitInitialise() {
                this.$emit('initialise');
            }
        }
    }
</script>

<style lang="scss">
    .space-children > .spaced + .spaced {
        margin-top: 15px;
    }

    .vc-swatches {
        width: 100% !important;
        -webkit-box-shadow: none !important;
        -moz-box-shadow: none !important;
        box-shadow: none !important;

        .vc-swatches-box {
            padding: 0;
        }
    }
</style>