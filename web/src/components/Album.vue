<template>
    <div class='album'>
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
        const gutter = 2;
        this.bricksInstance = Bricks({
            container: this.imageContainerSelector,
            packed: 'data-packed',
            sizes: [
                { columns: 1, gutter },
                { mq: '400px', columns: 2, gutter },
                { mq: '600px', columns: 3, gutter },
                { mq: '800px', columns: 4, gutter },
                ...this.range(1200, 1920 * 2, 200).map(size => ({ mq: size + 'px', columns: Math.floor((size - 250) / 200), gutter }))
            ],
            position: false
        });

        this.bricksInstance.resize(true);
        this.packImagesAfterLoad();
    },
    beforeRouteEnter: function(to, from, next) {
        next(vm => {
            vm.loadingImages = true;
            vm.packImagesAfterLoad();
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
        },
        packImagesAfterLoad: function() {
            ImagesLoaded(this.imageContainerSelector, () => {
                this.bricksInstance.pack();
                this.loadingImages = false;
            });
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
    transition: opacity 200ms;
}

.image-container.loading-images {
    opacity: 0;
    transition: opacity 0s; /* transition to full opacity immediately */
}

img {
    border-radius: 4px;
}
</style>