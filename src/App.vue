<template>

    <div id="app">
        <div
            v-for="(slide, index) in slides"
                v-show="currentSlide === index"
                class="slide"
            >
                <component :is="slide.component" :value="slide.content"></component>
        </div>
        <div class="prev" @click="prev"></div>
        <div class="next" @click="next"></div>
        <div class="counter" style="cursor: pointer" @click="next">{{ currentSlide + 1 }} / {{ slides.length }} </div>
    </div>

</template>

<script>

    import Markup from './components/Markup.vue'
    import Heading from './components/Heading.vue'
    import Youtube from './components/Youtube.vue'
    import Photo from './components/Photo.vue'
    import Color from './components/Color.vue'
    import Typo from './components/Typo.vue'
    import Typo2 from './components/Typo2.vue'
    import Contrast from './components/Contrast.vue'
    import Wheel from './components/Wheel.vue'
    import Wheel2 from './components/Wheel2.vue'
    import Site from './components/Site.vue'

    import marked from 'marked';

    import slides from '../slides.md'

    export default {
        name: 'App',
        components: { Markup, Heading, Youtube, Photo, Color, Typo, Typo2, Contrast, Wheel, Wheel2, Site },
        data: () => ({
            slides: [],
            currentSlide: 0,
            string: ''
        }),
        methods: {
            prev() {
                if (this.currentSlide > 0) {
                    this.currentSlide--
                }
            },
            next() {
                this.currentSlide++
            },
            parseSlides(string) {
                this.slides = string
                    .split(/---\n/)
                    .map(slide => {
                        return {
                            slide: slide.trim(),
                            component: 'markup',
                            content: marked(slide.trim(), {breaks: true})
                        }
                    })
                    .map(slide => {
                        var customComponent = slide.slide.match(/\[\[(.*)\]\]/)
                        if (customComponent) {
                            var parts = customComponent[1].split(' ')
                            slide.component = customComponent
                                ? parts[0]
                                : 'markup'
                            slide.content = parts[1]
                        }
                        return slide
                    })
                    .map(slide => {
                        var imageComponent = slide.content.match(/^<p><img(.*)><\/p>\n$/)
                        slide.component = imageComponent ? 'photo' : slide.component
                        return slide
                    })
                    .map(slide => {
                        var headerComponent = marked.lexer(slide.slide).filter(token => {
                            return token.type !== 'heading'
                        })
                        slide.component = headerComponent.length == 0
                            ? 'heading' : slide.component
                        return slide
                    })
                    .map(slide => {
                        var youtubeComponent = slide.slide.match(/^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/)
                        if (youtubeComponent) {
                            slide.component = 'youtube'
                            slide.content = youtubeComponent[1]
                        }
                        return slide
                    })
            }
        },
        mounted() {
            document.addEventListener("keydown", e => {
                if (e.keyCode == 37) { this.prev() }
                if (e.keyCode == 39) { this.next() }
            })
            this.parseSlides(slides)
        }
    }

</script>

<style>
    * {
        box-sizing: border-box;
        outline: none;
    }
    body {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-size: calc(1em + 1vw);
        line-height: 1.5em;
    }
    h1 {
        font-size: calc(1em + 3vw);
        line-height: 100%;
    }
    h2 {
        font-size: calc(1em + 2vw);
        line-height: 120%;
    }
    .prev {
        position: fixed;
        width: calc(5em - 7vw);
        top: 0;
        bottom: 0;
        left: 0;
    }
    .next {
        position: fixed;
        width: calc(5em - 7vw);
        top: 0;
        bottom: 0;
        right: 0;
    }
    .prev:hover, .next:hover {
        background: rgba(0,0,0,0.1);
    }
    .counter {
        position: fixed;
        bottom: 0.5em;
        right: 1em;
        font-family: Rubik, sans-serif;
        color: white;
        font-size: 0.7em;
        opacity: 0.5;
    }

</style>
