<template>
    <div class="video">
        <iframe width="853" height="480" :src="'https://www.youtube.com/embed/' + value" frameborder="0" allowfullscreen></iframe>
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
    .video {
        width: 100vw;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #114759;
        color: #EBF2F4;
    }
    
</style>