<template>
    <nav class="navbar navbar-full navbar-light bg-faded">
        <a class="navbar-brand" v-link="{ path: '/', exact: true }">
            <img src="/assets/images/others/logo.png" style="width: 70px; display: inline-block">
            <span style="display: inline-block">Clash of Flags</span>
        </a>
        <div class="nav navbar-nav">
            <a class="nav-item nav-link" v-link="{ path: '/', exact: true }">Play</a>
            <a class="nav-item nav-link" v-link="{ path: '/login' }" v-if="!authService.loggedIn">Login</a>
            <a class="nav-item nav-link" v-link="{ path: '/register' }" v-if="!authService.loggedIn">Register</a>
            <a class="nav-item nav-link" v-link="{ path: '/about' }">About</a>
            <a class="nav-item nav-link" v-link="{ path: '/statistics' }">Statistics</a>
            <a class="nav-item nav-link" href="" v-if="authService.loggedIn" @click="logout($event)">Logout</a>
        </div>
        <div class="nav navbar-nav pull-sm-right" v-if="authService.loggedIn">
            <a class="nav-item nav-link" v-link="{ path: '/profile' }">{{ authService.user.username }}</a>
        </div>
    </nav>
</template>

<script type="text/babel">
    import authService from '../services/authService';

    export default {
        data() {
            return {
                authService: authService
            };
        },
        methods: {
            logout(event) {
                event.preventDefault();
                toastr.info('Good bye ' + this.authService.user.username, 'Logged out');
                authService.logout();
            }
        }
    };
</script>