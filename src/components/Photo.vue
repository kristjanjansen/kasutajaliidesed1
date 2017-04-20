<template>
    <div class="photo">
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
    .photo {
        width: 100vw;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
    }
    .photo img {
        height: 80vh;
        align-self: center
    }

</style>