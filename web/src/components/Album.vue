<template>
    <div class='album'>
        <h2>{{album.name}}</h2>

        <h2>Images</h2>

        <div :class="[imageContainerClass, { 'loading-images': loadingImages}]">
            <img v-for='(image, index) in album.images'
                 v-bind:key='image.name'
                 :src='image.thumbnail'
                 :alt='image.name'
                 @click="showFullSizeImage(image, index)"/>
        </div>

        <full-screen-image
                :isOpen="fullSizeImageOpen"
                :options="fullSizeImageOptions"
                :items="imagesWithSize"
                @close="hideFullSizeImage"/>
    </div>
</template>

<script>
import Bricks from 'bricks.js';
import ImagesLoaded from 'imagesloaded';
import { PhotoSwipe } from 'v-photoswipe'

export default {
    props: {
        album: Object
    },
    data: () => { return {
        imageContainerClass: 'image-container',
        loadingImages: true,
        bricksInstance: null,
        repacking: true,
        fullSizeImageOpen: false,
        fullSizeImageOptions: {
            index: 0
        }
    }},
    computed: {
        imageContainerSelector: function () {
            return '.' + this.imageContainerClass;
        },
        imagesWithSize: function() {
            return this.album.images.map(x => ({ w: x.width, h: x.height, src: x.url, title: x.name }))
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
        },
        showFullSizeImage: function (image, index) {
            this.fullSizeImageOpen = true;
            this.fullSizeImageOptions.index = index;
        },
        hideFullSizeImage: function () {
            this.fullSizeImageOpen = false;
        }
    },
    components: {
        'full-screen-image': PhotoSwipe
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