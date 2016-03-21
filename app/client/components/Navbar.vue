<template>
    <nav class="navbar navbar-full navbar-light bg-faded">
        <a class="navbar-brand" v-link="{ path: '/', exact: true }">
            <img src="/assets/images/others/logo.png" style="width: 70px; display: inline-block">
            <span style="display: inline-block">Clash of Flags</span>
        </a>
        <div class="nav navbar-nav">
            <a class="nav-item nav-link" v-link="{ path: '/', exact: true }">Play</a>
            <a class="nav-item nav-link" v-link="{ path: '/login' }">Login</a>
            <a class="nav-item nav-link" v-link="{ path: '/register' }">Register</a>
            <a class="nav-item nav-link" v-link="{ path: '/about' }">About</a>
        </div>
    </nav>
</template>