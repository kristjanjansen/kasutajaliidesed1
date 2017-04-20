<template>
    <div class="typo">

        <div class="typo__content">
                <div :style="wrapperStyle">
                    <div v-html="content" class="body" :style="contentStyle"></div>
                </div>
        </div>

        <div class="typo__controls">
            <div>Content padding: <b>{{ padding }}px</b><br><input type="range" v-model="padding"></div>
            <div>Font: <b>{{ fonts[fontIndex].slice(0,12) }}</b><br><input type="range" v-model="fontIndex" :max="fonts.length - 1"></div>
            <div>Font size: <b>{{ contentSize }}px</b><br><input type="range" v-model="contentSize" min="6" max="32"></div>
            <div>Line height: <b>{{ lineheight }}px</b><br><input type="range" v-model="lineheight" min="6" max="32"></div>
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
            content: '',
            padding: 0,
            lineheight: 12,
            headerSize: 12,
            contentSize: 12,
            opacity: 1,
            fontIndex: 0,
            fonts: ['serif', 'sans-serif', 'Vollkorn', 'Bitter', 'Assistant','Asap']
        }),
        computed: {
            wrapperStyle() {
                return {
                    width: '60vw',
                    background: 'white',
                    padding: this.padding + 'px',

                }
            },
            contentStyle() {
                return {
                    lineHeight: this.lineheight + 'px',
                    color: 'rgba(0,0,0,' + this.opacity + ')',
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

</script>

<style>
    .typo {
        width: 100vw;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .typo__content {
        width: 75vw;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #eee;
    }
    .typo__controls {
        height: 100vh;
        width: 25vw;
        padding: 2em 5em 2em 2em;
        font-family: Rubik, sans-serif;
        font-size: 14px;
        color: gray;
        overflow: scroll;
        line-height: 1.1em;
    }
    .typo__controls > div {
        margin-bottom: 0.75em;
    }
    .typo__controls input {
        width: 100%;
    }
    .typo__controls input[type=text] {
        padding: 5px;
    }
    .typo__controls h3 {
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