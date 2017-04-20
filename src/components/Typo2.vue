<template>
    <div style="display: flex">
        <div class="typo2">
                <div class="typo2__outerWrapper">
                    <div :style="imageStyle"></div>
                    <div :style="wrapperStyle">
                        <div :style="headerStyle" contenteditable>{{ header }}</div>
                        <div v-html="content" contenteditable class="body" :style="contentStyle"></div>
                    </div>
                </div>
        </div>

        <div class="typo2__controls">

            <h3>Image</h3>

            <div><input type="text" v-model="image"></div>

            <h3>Composition</h3>

            <div>Image / content ratio: <b>{{ ratio }} : {{ 100 - ratio }}</b><br><input type="range" v-model="ratio"></div>

            <div>Content padding: <b>{{ padding }}px</b><br><input type="range" v-model="padding"></div>

            <h3>Color</h3>

            <div>Background hue: <b>{{ hue }}°</b><br><input type="range" max="360" v-model="hue"></div>

            <div>Background lightness: <b>{{ lightness }}%</b><br><input type="range" v-model="lightness" min="10" max="90"></div>

            <h3>Header</h3>

            <div>Font family: <b>{{ fonts[headerFontIndex].slice(0,16) }}</b><br><input type="range" v-model="headerFontIndex" :max="fonts.length - 1"></div>

            <div>Header size: <b>{{ headerSize }}px</b><br><input type="range" v-model="headerSize" min="6" max="64"></div>
            
            <div>Header line height: <b>{{ headerLineheight }}px</b><br><input type="range" v-model="headerLineheight" min="6" max="64"></div>
            
            <div>Header bottom margin: <b>{{ headerMargin * 2 + 5 }}px</b><br><input type="range" v-model="headerMargin" min="0" max="64"></div>

            <div>Header opacity: <b>{{ headerOpacity }}</b><br><input type="range" v-model="headerOpacity" min="0.1" max="1" step="0.1"></div>

            <h3>Content</h3>

            <div>Font family: <b>{{ fonts[fontIndex].slice(0,16) }}</b><br><input type="range" v-model="fontIndex" :max="fonts.length - 1"></div>
            
            <div>Font size: <b>{{ contentSize }}px</b><br><input type="range" v-model="contentSize" min="6" max="64"></div>
            
            <div>Line height: <b>{{ lineheight }}px</b><br><input type="range" v-model="lineheight" min="6" max="64"></div>

            <div>Text opacity: <b>{{ opacity }}</b><br><input type="range" v-model="opacity" min="0.1" max="1" step="0.1"></div>

        </div>

    </div>

</template>

<script>

    import marked from 'marked';

    export default {
        props: {
            value: { default: '' }
        },
        data: () => ({
            image: 'https://images.pexels.com/photos/69212/pexels-photo-69212.jpeg?h=350&auto=compress&cs=tinysrgb',
            ratio: 50,
            header: 'Before they sold out hoodie gluten-free selfies',
            headerFontIndex: 0,
            headerMargin: 0,
            headerSize: 12,
            headerLineheight: 12,
            headerOpacity: 1,
            accentOffset: 0,
            accentLightnessOffset: 0,
            hue: 50,
            lightness: 50,
            content: '',
            padding: 0,
            lineheight: 12,
            headerSize: 24,
            contentSize: 12,
            opacity: 1,
            fontIndex: 0,
            fonts: ['Vollkorn', 'Bitter', 'Assistant','Asap']
        }),
        computed: {
            textColor() {
                return this.lightness > 40 ? 'black' : 'white'
            },
            imageStyle() {
                return {
                    width: this.ratio + '%',
                    backgroundImage: 'url('+this.image+')',
                    backgroundSize: 'cover'

                }
            },
            wrapperStyle() {
                return {
                    width: 100 - this.ratio + '%',
                    background: 'hsl('+this.hue+',50%,'+this.lightness+'%)',
                    padding: this.padding + 'px',

                }
            },
            headerStyle() {
                return {
                    lineHeight: this.headerLineheight + 'px',
                    color: this.textColor,
                    opacity: this.opacity,
                    fontSize: this.headerSize + 'px',
                    fontFamily: this.fonts[this.headerFontIndex],
                    fontWeight: 'bold',
                    marginBottom: this.headerMargin + 'px',
                    opacity: this.headerOpacity,
                }
            },
            contentStyle() {
                return {
                    lineHeight: this.lineheight + 'px',
                    color: this.textColor,
                    opacity: this.opacity,
                    fontSize: this.contentSize + 'px',
                    fontFamily: this.fonts[this.fontIndex]
                }
            }
        },
        mounted() {
            this.$http.get(this.value).then(res => {
                this.content = marked(res.data, {breaks: true})
            })
        }
    }

    /*

        style="background-image: linear-gradient(
      rgba(0, 0, 0, 0.3),
      rgba(0, 0, 0, 0.3)
    ), url({{ $background }});">

    */

</script>

<style>
    .typo2 {
        width: 75vw;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #eee;
        padding: 0 10vw;
    }
    .typo2__outerWrapper {
        display: flex;
        align-items: stretch;
    }
    .typo2__controls {
        height: 100vh;
        width: 25vw;
        padding: 1em 5em 2em 2em;
        font-family: Rubik, sans-serif;
        font-size: 14px;
        color: gray;
        overflow: scroll;
        line-height: 1.6em;
    }
    .typo2__controls input {
        width: 100%;
    }
    .typo2__controls input[type=text] {
        padding: 5px;
    }
    .typo2__controls h3 {
        margin: 0.5em 0 0.25em 0;
        opacity: 0.95;
    }
    .body p {
        margin: 0 0 1em 0;
        padding: 0;
    }
    .body p:last-child {
        margin: 0;
    }
    .body ul {
        margin: 0;
        padding: 0 0 0 1.1em;
    }
    .body li {
        margin: 0 0 0.5em 0;
    }
    .body li:last-child {
        margin: 0;
    }
</style>