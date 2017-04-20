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
    .photo p {
        margin: 0;
    }
    .photo img {
        object-fit: cover;
        height: 75vh;
        align-self: center
    }

</style>