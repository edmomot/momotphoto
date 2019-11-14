<template>
    <div class='album'>
        <h2>{{album.name}}</h2>

        <h2>Images</h2>

        <div :class="[imageContainerClass, { 'loading-images': loadingImages}]">
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
        loadingImages: true,
        bricksInstance: null,
        repacking: true
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
                { mq: '800px', columns: 3, gutter: 1 },
                ...this.range(1000, 1920 * 2, 200).map(size => ({ mq: size + 'px', columns: Math.floor((size - 250) / 200), gutter: 1 }))
            ],
            position: false
        });

        this.bricksInstance.resize(true);

        ImagesLoaded(this.imageContainerSelector, () => {
            this.bricksInstance.pack();
            this.loadingImages = false;
        });
    },
    methods: {
        range: function (start, end, step) {
            return [...Array(Math.floor((end - start) / step)).keys()].map(i => i * step + start);
        }
    }
}
</script>

<style>
.album {
    width: 100%
}

.image-container {
    margin: auto;
    opacity: 1;
}

.image-container.loading-images {
    opacity: 0;
}
</style>