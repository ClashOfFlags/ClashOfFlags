<template>
    <div class="row">
        <div class="col-xs-4 center-block">
            <h1>Register</h1>
            <div class="form-group">
                <label for="email">Email</label>
                <input id="email"
                       type="email"
                       class="form-control"
                       placeholder="name@domain.com"
                       v-model="email">
            </div>
            <div class="form-group">
                <label for="username">Username</label>
                <input id="username"
                       type="text"
                       class="form-control"
                       placeholder="Username"
                       v-model="username">
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input id="password"
                       type="password"
                       class="form-control"
                       placeholder="Password"
                       v-model="password">
            </div>
            <button type="button" class="btn btn-primary btn-block" @click="register()">Register</button>
        </div>
    </div>
</template>

<style>
    .center-block {
        float: none;
    }
</style>

<script type="text/babel">
    import api from '../../api';

    export default {
        data() {
            return {
                email: '',
                username: '',
                password: ''
            };
        },
        methods: {
            register() {
                api.register(this.email, this.username, this.password);
            }
        }
    };
</script>