<template>
    <div>
        <h2>{{album.name}}</h2>


        <h2>Images</h2>
        <div v-for='image in album.images' v-bind:key='image.name'>
            <img :src='image.url' :alt='image.name' />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        album: Object
    }
}
</script>

<style>
img {
    max-width: 60%;
}
</style>