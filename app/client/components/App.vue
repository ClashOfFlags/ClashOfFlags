<template>
    <navbar></navbar>
    <div class="container">
        <router-view></router-view>
    </div>
</template>

<style>
    .container {
        margin-top: 20px;
    }
</style>

<script>
    import Navbar from './Navbar.vue';

    export default {
        components: { Navbar }
    };
</script>