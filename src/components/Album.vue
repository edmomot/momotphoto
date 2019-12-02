<template>
    <div class='album'>
        <div :class="[ imageContainerClass, { 'loading-images': loadingImagesAboveTheFold }]">
            <img v-for='(image, index) in imagesAboveTheFold'
                 v-bind:key='image.name'
                 :src='image.thumbnail'
                 :alt='image.name'
                 class="image-above-the-fold"
                 @click="showFullSizeImage(image, index)"/>
            <template v-if="doneLoadingImagesAboveTheFold">
                <img v-for='(image, index) in imagesBelowTheFold'
                     v-bind:key='image.name'
                     :src='image.thumbnail'
                     :alt='image.name'
                     class="image-below-the-fold"
                     @click="showFullSizeImage(image, index)"/>
            </template>
        </div>

        <full-screen-image
                :isOpen="fullSizeImageOpen"
                :options="fullSizeImageOptions"
                :items="fullScreenImages"
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
        loadingImagesAboveTheFold: true,
        doneLoadingImagesAboveTheFold: false,
        bricksInstance: null,
        fullSizeImageOpen: false,
        fullSizeImageOptions: {
            index: 0
        }
    }},
    computed: {
        imageContainerSelector: function () {
            return '.' + this.imageContainerClass;
        },
        imagesAboveTheFold: function () {
            return this.album.images.slice(0, 8);
        },
        imagesBelowTheFold: function() {
            return this.album.images.slice(8);
        },
        fullScreenImages: function () {
            return this.album.images.map(this.mapImageToFullScreenImageData);
        }
    },
    mounted: function () {
    },
    beforeRouteLeave: function(to, from, next) {
        this.loadingImagesAboveTheFold = true;
        this.doneLoadingImagesAboveTheFold = false;
        next();
    },
    beforeRouteEnter: function(to, from, next) {
        next(vm => {
            const gutter = 2;
            vm.bricksInstance = Bricks({
                container: vm.imageContainerSelector,
                packed: 'data-packed',
                sizes: [
                    { columns: 1, gutter },
                    { mq: '400px', columns: 2, gutter },
                    { mq: '600px', columns: 3, gutter },
                    { mq: '800px', columns: 4, gutter },
                    ...vm.range(1200, 1920 * 2, 200).map(size => ({ mq: size + 'px', columns: Math.floor((size - 250) / 200), gutter }))
                ],
                position: false
            });

            vm.bricksInstance.resize(true);
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
        packImagesAfterLoad: function () {
            this.$nextTick(() => {
                ImagesLoaded(this.imageContainerSelector + ' > img.image-above-the-fold', () => {
                    this.bricksInstance.pack();
                    this.loadingImagesAboveTheFold = false;
                    this.doneLoadingImagesAboveTheFold = true;
                    this.loadImagesBelowTheFold();
                });
            });
        },
        loadImagesBelowTheFold: function () {
            const loadRemainingImages = () => {
                ImagesLoaded(this.imageContainerSelector + ' > img.image-below-the-fold', () => {
                    this.bricksInstance.update();
                });
            };

            //setTimeout(loadRemainingImages, 2000);

            this.$nextTick(loadRemainingImages);
        },
        mapImageToFullScreenImageData: function (image) {
            return { w: image.width, h: image.height, src: image.url, title: image.name }
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
}

img {
    border-radius: 4px;

    /* loading */
    opacity: 0;
    transition: opacity 0s; /* transition to full opacity immediately */
}

img[data-packed] {
    /* loaded */
    opacity: 1;
    transition: opacity 200ms;
}
</style>