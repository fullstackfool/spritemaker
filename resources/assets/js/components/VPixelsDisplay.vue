<template>
    <div class="card">
        <div class="card-body frame frame-main">
            <div v-for="(row, rowIndex) in frame" class="pixel-row">
                <span class="pixel" :class="{sm: width > 25}"
                      v-for="(pixel, pixelIndex) in row"
                      :style="'background: ' + pixel.color"
                      @click="emitPixelSelected(rowIndex, pixelIndex)">
                </span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'v-pixels-display',

        props: {
            /**
             * The currently active frame.
             */
            frame: {
                type: Array,
                required: true
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

        methods: {
            /**
             * Emit the selected pixel to the parent.
             *
             * @param rowIndex
             * @param pixelIndex
             */
            emitPixelSelected(rowIndex, pixelIndex) {
                this.$emit('pixel-selected', {rowIndex, pixelIndex});
            }
        },
    }
</script>

<style lang="scss">
    .frame.frame-main {
        text-align: center;
        overflow-x: scroll;
    }
</style>