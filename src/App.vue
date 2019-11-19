<template>
    <v-app id="inspire">
        <nav-panel :albums="albums" />
        <v-content class="blue-grey lighten-5">
            <v-container fluid>
                <router-view />
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
import NavPanel from "./components/NavPanel";

export default {
    name: 'App',
    props: { 'albums': Array },
    components: {
      NavPanel,
    },
    data: () => ({
    //
    }),
};
</script>

<style>

    .color-primary-0 { background-color: #2C426B }	/* Main Primary color */
    .color-primary-1 { background-color: #B4BED0 }
    .color-primary-2 { background-color: #5B6F93 }
    .color-primary-3 { background-color: #0C1F42 }
    .color-primary-4 { background-color: #010816 }

    .color-secondary-1-0 { background-color: #5E9032 }	/* Main Secondary color (1) */
    .color-secondary-1-1 { background-color: #DDF0CC }
    .color-secondary-1-2 { background-color: #9AC573 }
    .color-secondary-1-3 { background-color: #2E5809 }
    .color-secondary-1-4 { background-color: #0E1E00 }

    .color-secondary-2-0 { background-color: #61266A }	/* Main Secondary color (2) */
    .color-secondary-2-1 { background-color: #CBB1CF }
    .color-secondary-2-2 { background-color: #895591 }
    .color-secondary-2-3 { background-color: #3A0741 }
    .color-secondary-2-4 { background-color: #130016 }

</style>