<template>
    <div class="contrast">
        <div class="contrast__content" :style="{background: col(hue, lightness)}">

            <div :style="{color: col(altHue,50)}">
            <h1>Hello World</h1>
            </div>

        </div>
        <div class="controls contrast__controls">
            <div>Hue {{ hue }}<br><input type="range" v-model="hue" max="360"></div>
            <div>+ {{ offset }}<br><input type="range" v-model="offset" max="180"></div>
            <div>= {{ altHue }}<br><input disabled type="range" v-model="altHue" max="360"></div>
            <!--div>Bg lightness {{ lightness }}<br><input type="range" v-model="lightness" max="100"></div-->
        </div>
    </div>
</template>

<script>

    export default {
        props: {
            value: { default: [] }
        },
        data: () => ({
            hue: 0,
            lightness: 50,
            offset: 20
        }),
        computed: {
            altHue() {
                return parseInt(this.hue) + parseInt(this.offset)
            }
        },
        methods: {
            col(hue,lightness) {
                return 'hsla('+hue+', 75%, '+lightness+'%, 1)'
            }
        }
    }

</script>

<style>
    
    .contrast__content {
        display: flex;
        width: 100vw;
        height: 100vh;
        align-items: center;
        justify-content: center;
        font-family: Rubik, sans-serif;
        text-align: center;
    }
    .contrast h1 {
        font-size: 7em;
    }
    .contrast p {
        font-size: 1.5em;
        line-height: 140%;
    }
    .contrast__controls {
        color: white;
    }

</style>