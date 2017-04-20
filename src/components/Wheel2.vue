<template> 
    <div class="wheel2">
        <div
            class="wheel2__left"
            :style="{
                color: 'hsl('+currentAngle+', 100%, 50%)',
                background: 'hsl('+currentAngle2+', 100%, '+l+'%)'
            }"
        >
            <h1 contenteditable="">Hello</h1>
        </div>
        <div class="wheel2__right">
            <div class="wheel2__controls">
                <div>Primary hue: <b>{{ currentAngle }} deg</b><br><input type="range" v-model="currentAngle" max="360"></div>
                <div>Secondary color lightness: <b>{{ l }}%</b><br><input type="range" v-model="l" min="25" max="50"></div>
                <div>Secondary hue offset: <b>{{ offset }} deg</b><br><input type="range" v-model="offset" min="-180" max="180" step="7.5"></div>
            </div>
            <svg width="300" height="300" style="padding-left: 0.3em">
                <g transform="translate(150,150)">
                <path
                    v-for="angle in 24"
                    :d="sector(angle*15-7.5,(angle*15)+7.5,radius-10,radius+10)"
                    :fill="'hsl('+angle*15+', 100%, 50%)'"
                ></path>
                <path
                    v-for="angle in 24"
                    :d="sector(angle*15-7.5,angle*15+7.5,radius-30,radius-10)"
                    :fill="'hsl('+angle*15+', 100%, 25%)'"
                ></path>
                <!--path
                    v-for="angle in 360"
                    :d="sector(angle,angle+1,0,radius+20)"
                    fill="rgba(0,0,0,0)"
                    @click="toAngle(angle)"
                ></path-->
                <line
                    x1="0"
                    y1="0"
                    :x2="x(currentAngle, radius)"
                    :y2="y(currentAngle, radius)"
                    stroke="rgba(255,255,255,0.25)"
                    stroke-width="3"
                ></line>
                <line
                    x1="0"
                    y1="0"
                    :x2="x(currentAngle2, lightness(l))"
                    :y2="y(currentAngle2, lightness(l))"
                    stroke="rgba(255,255,255,0.25)"
                    stroke-width="3"
                ></line>
                <circle
                    :cx="x(currentAngle, radius)"
                    :cy="y(currentAngle, radius)"
                    r="17"
                    stroke="white"
                    stroke-width="3"
                    :fill="'hsl('+currentAngle+', 100%, 50%)'"
                    style="pointer-events: none"
                ></circle>
                <circle
                    :cx="x(currentAngle2, lightness(l))"
                    :cy="y(currentAngle2, lightness(l))"
                    r="12"
                    stroke="white"
                    stroke-width="3"
                    :fill="'hsl('+currentAngle2+', 100%, '+l+'%)'"
                    style="pointer-events: none"
                ></circle>
                </g>
            </svg>
        </div>
    </div>
</template>

<script>

    import { arc } from 'd3-shape'
    import { scaleLinear } from 'd3-scale'
    import anime from 'animejs'

    export default {
        props: {
            value: { default: '' }
        },
        data: () => ({ currentAngle: 0, radius: 110, offset: 0, l: 45 }),
        computed: {
            currentAngle2() {
                return parseInt(this.currentAngle) + parseInt(this.offset)
            }
        },
        methods: {
            complementary() {
                anime({
                    targets: this,
                    offset: 10
                })
            },
            lightness(l) {
                return scaleLinear()
                    .domain([25, 50])
                    .range([this.radius-20, this.radius])
                    (l)
            },
            toAngle(angle) {
                anime({
                    targets: this,
                    currentAngle: angle,
                    l: 50,
                    offset: 90,
                    easing: 'easeInOutCubic',
                    round: true
                })
            },
            sector(start, end, inner, outer) {
                return arc()
                    .innerRadius(inner)
                    .outerRadius(outer)
                    .startAngle(this.deg2rad(start))
                    .endAngle(this.deg2rad(end))()
            },
            deg2rad(deg) {
              return deg * (Math.PI / 180);
            },
            x(deg, radius) {
              return Math.cos(this.deg2rad(deg - 90)) * radius
            },
            y(deg, radius) {
              return Math.sin(this.deg2rad(deg - 90)) * radius
            }
        },
        mounted() {
        }
    }

</script>

<style>
    .wheel2 {
        width: 100vw;
        height: 100vh;
        display: flex;
        align-items: stretch;
    }
    .wheel2__right {
        width: 30vw;
        background: #222;
        color: #EBF2F4;
        font-family: Rubik, sans-serif;
        font-size: 2em;
        line-height: 140%;
    }
    .wheel2__left {
        width: 70vw;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: Rubik, sans-serif;
        font-size: 6em;
        line-height: 140%;
        text-align: center;
    }
    .wheel2__controls {
        padding: 2em 5em 2em 2em;
        font-family: Rubik, sans-serif;
        font-size: 16px;
        color: rgba(255,255,255,0.9);
        overflow: auto;
        line-height: 2em;
    }
    .wheel2__controls input {
        width: 100%;
    }
    h1[contenteditable] {
        outline: none;
    }

</style>