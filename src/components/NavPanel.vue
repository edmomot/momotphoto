<template>
    <div class="page-container md-layout-column">
        <md-app>
            <md-app-toolbar class="md-primary">
                <md-button class="md-icon-button" @click="showNavigation = !showNavigation">
                    <md-icon>menu</md-icon>
                </md-button>
                <span class="md-title">{{pageTitle}}</span>
            </md-app-toolbar>

            <md-app-drawer :md-active.sync="showNavigation" md-swipeable md-persistent="full">
                <md-toolbar class="md-transparent" md-elevation="0">
                    <span class="md-title">Momot Photo</span>
                </md-toolbar>

                <md-list>
                    <md-list-item>
                        <md-icon>home</md-icon>
                        <span class="md-list-item-text">
                        <router-link class="md-list-item-text" to="/">
                            Home
                        </router-link>
                    </span>
                    </md-list-item>

                    <md-list-item>
                        <md-icon>question_answer</md-icon>
                        <router-link class="md-list-item-text"
                                     to="/About">About
                        </router-link>
                    </md-list-item>

                    <md-list-item v-for="(album, index) in albums" :key="index">
                        <md-icon>photo_library</md-icon>
                        <span class="md-list-item-text">
                        <router-link
                                :to="album.route">{{album.name}}</router-link>
                    </span>
                    </md-list-item>
                </md-list>
            </md-app-drawer>

            <md-app-content>
                <router-view/>
            </md-app-content>
        </md-app>
    </div>
</template>

<script>
    export default {
        props: {'albums': Array},
        data: () => ({
            showNavigation: false
        }),
        computed: {
            pageTitle: function () {
                return this.$route.name;
            }
        }
    }
</script>

<style>
    .color-primary-0 {
        background-color: #2C426B
    }

    /* Main Primary color */

    .page-container, .md-app {
        min-height: 100vh;
    }

    .md-drawer {
        width: 230px;
        max-width: calc(100vw - 125px);
    }

    div.md-drawer {
        z-index: unset;
    }


</style>

