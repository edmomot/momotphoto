<template>
    <div class='album'>
        <h2>{{album.name}}</h2>

        <h2>Images</h2>

        <div :class='[ imageContainerClass, { repacking: repacking }]'>
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
        bricksInstance: null,
        repacking: true,
        waitingOnResizeStop: false,
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

        this.debouncedResize = this.debounce(this.resize, 500, () => this.repacking = true);

        ImagesLoaded(this.imageContainerSelector, () => {
            this.bricksInstance.pack();
            window.addEventListener('resize', this.debouncedResize);
        });
    },
    methods: {
        resize: function () {
            this.bricksInstance.pack();
            setTimeout(() => this.repacking = false, 250);
        },
        range: function (start, end, step) {
            return [...Array(Math.floor((end - start) / step)).keys()].map(i => i * step + start);
        },
        debounce: function (func, wait, immediate) {
            let timeout;
            return function() {
                let context = this, args = arguments;
                let later = function() {
                    timeout = null;
                    if (!immediate) func.apply(context, args);
                };
                let callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) func.apply(context, args);
            }
        }
    },
    beforeDestroy: function () {
        window.removeEventListener('resize', this.debouncedResize);
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
    transition: opacity 0.25s;
}

.image-container.repacking {
    opacity: 0.5;
}
</style>