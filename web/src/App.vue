<template>
    <v-app id="inspire">
        <nav-panel />
        <v-content>
            <v-container
                    class="fill-height"
                    fluid
            >
                <router-view />
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
import NavPanel from "./components/NavPanel";

export default {
  name: 'App',

  components: {
      NavPanel,
  },

  data: () => ({
    //
  }),
};
</script>
