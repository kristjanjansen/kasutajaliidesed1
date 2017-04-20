<template>
    <div class="colors">
        <div class="color" v-for="value in values" :style="{background: value}"></div>
    </div>
</template>

<script>

    export default {
        props: {
            value: { default: [] }
        },
        computed: {
            values() {
                return this.value.split(',')
            }
        }
    }

</script>

<style>
    
    .colors {
        display: flex;
        width: 100vw;
        height: 100vh;
    }
    .color {
        flex: 1;
    }

</style>