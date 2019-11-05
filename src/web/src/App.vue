<template>
  <div id="app">
    <nav>
      <router-link to='/'>Home</router-link>
      <router-link to='/About'>About</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
}
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
