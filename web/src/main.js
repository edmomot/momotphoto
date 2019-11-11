import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';

import Home from './components/Home.vue';
import About from './components/About.vue';

import AlbumApiService from './services/AlbumApiService';
import AlbumRoutingService from "./services/AlbumRoutingService";

Vue.config.productionTip = false;

Vue.use(VueRouter);


AlbumApiService.getAllAlbums().then(allAlbums => {
    const albumRoutes = AlbumRoutingService.AlbumRoutes(allAlbums);

    const staticRoutes = [
      { path: '/', name: 'home', component: Home, props: { albumRoutes: albumRoutes }},
      { path: '/about', name: 'about', component: About }
    ];

    const router = new VueRouter({ mode: 'history', routes: [...staticRoutes, ...albumRoutes] });

    new Vue({
        router,
        render: h => h(App)
    }).$mount('#app');
});

