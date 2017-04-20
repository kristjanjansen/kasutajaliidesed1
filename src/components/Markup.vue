<template>
    <div class="markup">
        <div v-html="value" class="content">
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
    .markup {
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        background: #114759;
        color: #EBF2F4;
        font-family: Rubik, sans-serif;
        --font-size: 2em;
        line-height: 130%;
    }
    .content {
        width: 80vw;
        padding-top: 5vh;
    }
    .markup img {
        height: 100vh;
    }
    .markup h3 {
        margin: 1.5em 0 0 0;
    }
    a { 
        color: #EBF2F4; 
        overflow-wrap: break-word;
        word-wrap: break-word;
        word-break: break-all;
        hyphens: auto;
        text-decoration: none;
        opacity: 0.75;
        border-bottom: 3px solid rgba(255,255,255,0.5);
    }
    strong em {
        color: #FDCA40;
        font-style: normal;
    }
    em strong {
        font-style: normal;
        opacity: 0.3;
        font-weight: normal;
    }
    table {
        border-collapse: collapse;
        width: 100%;
    }
    th {
        padding:0.8rem;
    }
    td {
        border-top: 2px solid rgba(255,255,255,0.2);
        padding:0.8rem;
    }
    th {
        opacity: 0.3;
        text-align: left;
    }
    blockquote {
        border-left: 6px solid rgba(255,255,255,0.5);
        margin: 0;
        padding-left: 1em;
    }
    /*
    ul {
        display: flex;
        padding: 0;
        margin: 0;
        justify-content: space-around;
        list-style: none;
    }
    li {
        flex: 1;
        text-align: center;
        border: 2px solid rgba(255,255,255,0.2);
    }
    */

</style>