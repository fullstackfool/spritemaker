<template>
    <div class="card">
        <div class="card-body frame frame-main">
            <div v-for="(row, rowIndex) in frames[frameIndex]" class="pixel-row">
                            <span class="pixel" :class="{sm: width > 25}"
                                  v-for="(pixel, pixelIndex) in row"
                                  :style="'background: ' + pixel.color"
                                  @click="setPixel">
                            </span>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'v-pixels-display',
        props: {
            frameIndex: {},
            frames: {},
            setPixel: {},
            width: {}
        }
    }
</script>
<style lang="scss">
    .frame.frame-main {
        text-align: center;
        overflow-x: scroll;
    }

    .frame {
    }

</style>