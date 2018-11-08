<template>
    <section class="space-children">
        <div class="row spaced">
            <div class="col-md-8 spaced">
                <v-pixels-display
                        :frame="currentFrame"
                        :width="width"
                        :height="height"
                        @pixel-selected="setPixel($event)"/>
            </div>

            <div class="col-md-4 spaced">
                <v-control-panel :height="height" :width="width" @initialise="initialise()"/>
            </div>
        </div>

        <div class="spaced frames">
            <div class="card">
                <div class="card-body">
                    <div class="frame frame-add">
                        +
                    </div>

                    <div class="frame" v-for="frame in frames">
                        <div v-for="(row, rowIndex) in frame" class="pixel-row">
                            <span class="pixel xs" :class="{sm: width > 25}"
                                  v-for="(pixel, pixelIndex) in row"
                                  :style="'background: ' + pixel.color"
                                  @click="setPixel(rowIndex, pixelIndex)">
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="spaced">
            <div class="row">
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-body space-children">
                            <div class="text-right spaced">
                                <button class="btn btn-light" v-clipboard:copy="output">Copy</button>
                            </div>
                            <pre class="w-100 spaced mb-0" v-html="output"></pre>
                        </div>
                    </div>
                </div>

                <div class="col-md-6">
                    <div class="card h-100">
                        <div class="card-body h-100 space-children input">
                            <div class="text-right spaced">
                                <button class="btn btn-light" @click="setPixels()">Apply</button>
                            </div>
                            <textarea class="w-100 spaced" v-model="input"></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="spaced footer p-1"></div>
    </section>
</template>

<script>
    import VPixelsDisplay from "./VPixelsDisplay";
    import VControlPanel from "./VControlPanel";

    var tinycolor = require("tinycolor2");

    export default {
        name: 'v-sprite-maker',

        components: {
            VControlPanel,
            VPixelsDisplay
        },

        data() {
            return {
                width: 16,
                height: 16,
                input: '',
                frames: [],
                frameIndex: 0,
            }
        },

        computed: {
            /**
             * The currently active frame.
             */
            currentFrame() {
                return this.frames[this.frameIndex];
            },

            /**
             * The value of the output console.
             */
            output() {
                if (this.currentFrame && this.currentFrame.length) {
                    let pixelString = '';

                    this.currentFrame.forEach(row => {
                        row.forEach(pixel => {
                            pixelString += this.calcColor(pixel.color) + ', ';
                        });

                        pixelString += '\n'
                    });

                    return pixelString;
                }
            },
        },

        mounted() {
            this.initialise();
        },

        methods: {
            initialise() {
                let row = [];
                let rows = [];

                for (let i = 0; i < this.width; i++) {
                    row[i] = {color: this.baseColor};
                }

                for (let j = 0; j < this.height; j++) {
                    rows[j] = row;
                }

                Vue.set(this.frames, this.frameIndex, rows);
            },

            /**
             * Convert to RGB565 for led matrix
             *
             * @param color
             * @returns {string}
             */
            calcColor(color) {
                if (!color) {
                    return;
                }

                var r = parseInt("0x" + color[1] + color[2]);
                var g = parseInt("0x" + color[3] + color[4]);
                var b = parseInt("0x" + color[5] + color[6]);

                //RGB565
                var rgb565 = (((r & 0xf8) << 8) + ((g & 0xfc) << 3) + ((b & 0xf8) >> 3)).toString(16);

                //pad 0s
                while (rgb565.length < 4) {
                    rgb565 = "0" + rgb565;
                }

                return ("0x" + rgb565.toUpperCase());
            },

            /**
             * Update the select pixel to the currently selected color.
             *
             * @param event
             */
            setPixel(event) {
                this.frames[this.frameIndex][event.rowIndex][event.pixelIndex].color =
                    (this.frames[this.frameIndex][event.rowIndex][event.pixelIndex].color == this.colors.hex)
                        ? this.baseColor
                        : this.colors.hex;
            },

            //TODO: Color conversion broken
            setPixels() {
                let pixels = this.input.split(', ');
                let count = 0;

                this.frames[this.frameIndex].forEach((row, rowIndex) => {
                    row.forEach((pixel, pixelIndex) => {
                        this.frames[this.frameIndex][rowIndex][pixelIndex].color = tinycolor(pixels[count].replace('0x', '#')).toString('hex6');
                        count++;
                    });
                });
            }
        }
    }
</script>

<style lang="scss">

    .frame {
        .pixel-row {
            white-space: nowrap;

            & + .pixel-row {
                margin-top: -4px;
            }

            .pixel {
                height: 30px;
                width: 30px;
                position: relative;
                display: inline-block;
                border: 1px solid darkgrey;

                & + .pixel {
                    margin-left: 1px;
                }

                &.sm {
                    height: 20px;
                    width: 20px;
                }

                &.xs {
                    height: 10px;
                    width: 10px;
                }
            }
        }
    }

    .frames .frame .pixel-row + .pixel-row {
        margin-top: -10px;
    }

    .space-children > .spaced + .spaced {
        margin-top: 15px;
    }

    .input {
        display: flex;
        flex-direction: column;

        textarea {
            flex-grow: 1;
        }
    }
</style>