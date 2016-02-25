<template>
    <navbar></navbar>
    <router-view></router-view>
</template>

<script>
    import Navbar from './Navbar.vue';

    export default {
        components: { Navbar }
    };
</script>