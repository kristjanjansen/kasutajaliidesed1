<template>
    <iframe :src="value" class="site">
    </iframe>
</template>

<script>

    export default {
        props: {
            value: { default: '' }
        }
    }

</script>

<style>
    .site {
        border: none;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
    }

</style>