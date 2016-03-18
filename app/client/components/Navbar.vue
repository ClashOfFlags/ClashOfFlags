<template>
    <nav class="navbar navbar-full navbar-light bg-faded">
        <img src="/assets/images/logo.png" style="width: 50px" class="navbar-brand">
        <a class="navbar-brand" v-link="{ path: '/', exact: true }">Clash of Flags</a>
        <div class="nav navbar-nav">
            <a class="nav-item nav-link" v-link="{ path: '/', exact: true }">Play</a>
            <a class="nav-item nav-link" v-link="{ path: '/login' }">Login</a>
            <a class="nav-item nav-link" v-link="{ path: '/register' }">Register</a>
            <a class="nav-item nav-link" v-link="{ path: '/about' }">About</a>
        </div>
    </nav>
</template>