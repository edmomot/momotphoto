<template>
<div>
    <v-navigation-drawer v-model="drawer" app :mobile-break-point="mobileBreakPoint">
        <v-list dense>
            <v-list-item link :to="{ path: '/' }" >
                <v-list-item-action>
                    <v-icon>mdi-home</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>Home</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item link :to="{ path: '/About' }" >
                <v-list-item-action>
                    <v-icon>mdi-contact-mail</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>About</v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-list-item v-for="(album, index) in albums" :key="index" link :to="{ path: album.route }" >
                <v-list-item-action>
                    <v-icon>mdi-image-multiple</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>{{album.name}}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>

        </v-list>
    </v-navigation-drawer>
    <v-app-bar color="indigo darken-2" app dark>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <v-toolbar-title>{{pageTitle}}</v-toolbar-title>
    </v-app-bar>
</div>
</template>

<script>
export default {
    props: { 'albums': Array },
    data: () => ({
        mobileBreakPoint: 1264,
        drawer: false,
    }),
    mounted: function () {
        this.drawer = this.mobileBreakPoint <= window.innerWidth;
    },
    computed: {
        pageTitle: function() {
            return this.$route.name;
        }
    }
}
</script>

<style>
    .color-primary-0 { background-color: #2C426B }	/* Main Primary color */
</style>

