<template>
    <div id="app" class='column-container' >
        <nav-panel class='nav-panel column'></nav-panel>
        <div class='nav-contents column'>
            <router-view />
        </div>
    </div>
</template>

<script>
import NavPanel from "./components/NavPanel";

export default {
    components: {
        NavPanel
    }
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

.nav-panel {
    width: 260px;
}

.column {
    float: left;
}

.column-container:after {
    content: '';
    display: table;
    clear: both;
}

.nav-contents {

}
</style>
