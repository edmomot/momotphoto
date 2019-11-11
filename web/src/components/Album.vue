<template>
    <div>
        <h2>{{album.name}}</h2>

        <h2>Images</h2>

        <div v-for='image in album.images' v-bind:key='image.name'>
            <ImageThumbnail :image='image'></ImageThumbnail>
        </div>
    </div>
</template>

<script>
import ImageThumbnail from "./ImageThumbnail";

export default {
    props: {
        album: Object
    },
    components: { ImageThumbnail }
}
</script>

<style>
img {
    max-width: 60%;
}
</style>