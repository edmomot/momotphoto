<template>
    <div>
        <h1>Home</h1>
        <h2>Routes</h2>
        <ul>
            <li v-for='albumRoute in albumRoutes' v-bind:key='albumRoute.path'>
                <router-link :to='albumRoute.path'>{{albumRoute.name}}</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        albumRoutes: Array
    }
}
</script>