<template>
    <div>
        <img :src='image.thumbnail' :alt='image.name' />
    </div>
</template>

<script>
export default {
    props: {
        image: Object
    }
}
</script>

<style>
img {
    max-width: 60%;
}
</style>