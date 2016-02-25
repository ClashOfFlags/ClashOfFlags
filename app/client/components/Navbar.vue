<template>
    <nav class="navbar navbar-full navbar-light bg-faded">
        <a class="navbar-brand" v-link="{ path: '/' }">Clash of Flags</a>
        <div class="nav navbar-nav">
            <a class="nav-item nav-link active" v-link="{ path: '/' }">Play</a>
            <a class="nav-item nav-link" v-link="{ path: '/login' }">Login</a>
            <a class="nav-item nav-link" v-link="{ path: '/register' }">Register</a>
            <a class="nav-item nav-link" v-link="{ path: '/about' }">About</a>
        </div>
    </nav>
</template>