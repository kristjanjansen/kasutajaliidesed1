<template>
    <div class="heading">
        <div v-html="value">
        </div>
    </div>
</template>

<script>

    export default {
        props: {
            value: { default: '' }
        }
    }

</script>

<style>
    .heading {
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
    .heading a {
        text-decoration: none;
        font-size: 1em !important;
        overflow-wrap: break-word;
        word-wrap: break-word;
        word-break: break-all;
        hyphens: auto;
    }

</style>