<template>
    <navbar></navbar>
    <div class="container">
        <router-view></router-view>
    </div>
</template>

<script>
    import Navbar from './Navbar.vue';

    export default {
        components: { Navbar }
    };
</script>