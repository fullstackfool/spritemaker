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
                    <button type="button" @click="initialise"
                            class="btn btn-outline-danger btn-block inline-block">
                        Clear Frame
                    </button>
                </div>
                <div class="col-6">
                    <button type="button" class="btn btn-success btn-block inline-block"
                            @click="initialise">
                        Update Frame
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'v-control-panel',
        props: {
            colors: {},
            height: {},
            initialise: {},
            width: {}
        }
    }
</script>
<style lang="scss">

    .space-children > .spaced + .spaced {
        margin-top: 15px;
    }

</style>