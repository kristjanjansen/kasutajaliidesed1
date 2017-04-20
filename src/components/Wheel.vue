<template>
    <div class="wheel">
        <input type="range" v-model="offset" max="360">
        <svg width="300" height="300">
            <g transform="translate(150,150)">
            <path
                v-for="angle in 360"
                :d="sector(angle,angle+1)"
                :fill="'hsl('+angle+', 100%, 50%)'"
            ></path>
            <path
                v-for="angle in 360"
                :d="sector(angle,angle+1,1)"
                fill="rgba(0,0,0,0)"
                @mouseover="currentAngle = angle"
            ></path>
            <circle
                :cx="x(currentAngle, radius)"
                :cy="y(currentAngle, radius)"
                r="20"
                stroke="white"
                stroke-width="3"
                :fill="'hsl('+currentAngle+', 100%, 50%)'"
                style="pointer-events: none"
            ></circle>
            <circle
                :cx="x(currentAngle2, radius)"
                :cy="y(currentAngle2, radius)"
                r="10"
                stroke="white"
                stroke-width="3"
                :fill="'hsl('+currentAngle2+', 100%, 50%)'"
                style="pointer-events: none"
            ></circle>
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
                :x2="x(currentAngle2, radius)"
                :y2="y(currentAngle2, radius)"
                stroke="rgba(255,255,255,0.25)"
                stroke-width="3"
            ></line>
            </g>
        </svg>
        <div
            class="sample"
            :style="{
                color: 'hsl('+currentAngle+', 100%, 50%)',
                background: 'hsl('+currentAngle2+', 100%, 50%)'
            }"
        >
            <h1>Hello</h1>
        </div>
    </div>
</template>

<script>

    import { arc } from 'd3-shape'

    export default {
        props: {
            value: { default: '' }
        },
        data: () => ({ currentAngle: 0, radius: 100, offset: 180 }),
        computed: {
            currentAngle2() {
                return this.currentAngle - this.offset
            }
        },
        methods: {
            sector(start, end, innerRadius = false) {
                innerRadius = innerRadius ? innerRadius : this.radius - 10 
                return arc()
                    .innerRadius(innerRadius)
                    .outerRadius(this.radius + 10)
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
    .wheel {
        width: 100vw;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        background: #114759;
        color: #EBF2F4;
        font-family: Rubik, sans-serif;
        font-size: 2em;
        line-height: 140%;
    }
    .sample {
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 2s;
        background: red
    }

</style>