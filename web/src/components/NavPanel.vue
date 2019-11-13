<template>
<div>
    <v-navigation-drawer
            v-model="drawer"
            app
    >
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
        </v-list>
    </v-navigation-drawer>
    <v-app-bar
            app
            color="indigo"
            dark
    >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>
</div>
</template>

<script>
export default {
    data: () => ({
        drawer: true
    })
}
</script>

