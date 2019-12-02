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

const imageWidth = 200;
const tallImageHeightPixels = 300;
const shortImageHeightPixels = 133;
const percentageOfImagesThatAreTall = 0.33;

const typicalImageHeight =
    tallImageHeightPixels * percentageOfImagesThatAreTall +
    shortImageHeightPixels * (1 - percentageOfImagesThatAreTall);

const horizontalContainerPaddingPixels = 12;
const navigationDrawerWidthPixels = 256;
const mobileBreakPoint = 1264;
const qHdResolutionWidth = 1920 * 2;
const scrollBarWidthPixels = 7;
const gutter = 1;

function range(start, end, step) {
    return [...Array(Math.floor((end - start) / step)).keys()].map(i => i * step + start);
}

function numberOfColumnsWithoutDrawer(size) {
    return Math.floor((size - scrollBarWidthPixels) / imageWidth);
}

function numberOfColumnsWithDrawer(size) {
    return Math.floor((size - navigationDrawerWidthPixels - scrollBarWidthPixels) / imageWidth);
}

const allSizes = range(imageWidth + horizontalContainerPaddingPixels, mobileBreakPoint + horizontalContainerPaddingPixels, imageWidth + gutter)
    .map(size => ({ mq: (size) + 'px', columns: numberOfColumnsWithoutDrawer(size), gutter }))
    .concat(range(mobileBreakPoint + horizontalContainerPaddingPixels, qHdResolutionWidth + horizontalContainerPaddingPixels, imageWidth + gutter)
        .map(size => ({ mq: size + 'px', columns: numberOfColumnsWithDrawer(size), gutter })));

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
            return this.album.images.slice(0, this.numberOfImagesToLoadInitially());
        },
        imagesBelowTheFold: function() {
            return this.album.images.slice(this.numberOfImagesToLoadInitially());
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
            vm.bricksInstance = Bricks({
                container: vm.imageContainerSelector,
                packed: 'data-packed',
                sizes: allSizes,
                position: false
            });

            vm.bricksInstance.resize(true);
            vm.packImagesAfterLoad();
        });
    },
    methods: {
        numberOfImagesToLoadInitially: function () {
            return Math.floor((window.innerHeight * window.innerWidth) / (imageWidth * typicalImageHeight));
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

.image-container > img {
    /* loading */
    opacity: 0;
    transition: opacity 0s; /* transition to full opacity immediately */
}

.image-container > img[data-packed] {
    /* loaded */
    opacity: 1;
    transition: opacity 200ms;
}
</style>