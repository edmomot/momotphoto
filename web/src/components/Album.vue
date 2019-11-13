<template>
    <div class='album'>
        <h2>{{album.name}}</h2>

        <h2>Images</h2>

        <div :class='imageContainerClass'>
            <img v-for='image in album.images' v-bind:key='image.name' :src='image.thumbnail' :alt='image.name' />
        </div>
    </div>
</template>

<script>
import Bricks from 'bricks.js';
import ImagesLoaded from 'imagesloaded';

export default {
    props: {
        album: Object
    },
    data: () => { return {
        imageContainerClass: 'image-container',
        bricksInstance: null
    }},
    computed: {
        imageContainerSelector: function () {
            return '.' + this.imageContainerClass;
        }
    },
    mounted: function () {
        this.bricksInstance = Bricks({
            container: this.imageContainerSelector,
            packed: 'data-packed',
            sizes: [
                { columns: 2, gutter: 1 },
                { mq: '768px', columns: 3, gutter: 1 },
                { mq: '1024px', columns: 4, gutter: 1 }
            ],
            position: true
        });
        ImagesLoaded(this.imageContainerSelector, () => this.bricksInstance.pack());
    }
}
</script>

<style>
.album {

}
</style>