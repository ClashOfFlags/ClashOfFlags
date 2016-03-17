<template>
    <div class="row">
        <div class="col-xs-4 center-block">
            <h1>Login</h1>
            <validator name="validation">
                <!-- Username -->
                <form-group :field="$validation.username">
                    <label class="form-control-label" for="username">Username</label>
                    <input id="username"
                           type="text"
                           class="form-control"
                           placeholder="Username"
                           v-model="username"
                           v-validate:username="{ minlength: 3, maxlength: 16 }">
                    <validation-messages :field="$validation.username">
                        <span v-show="$validation.username.minlength">Your username must be at least 3 characters long</span>
                        <br>
                        <span v-show="$validation.username.maxlength">Your username cannot be longer than 16 characters</span>
                    </validation-messages>
                </form-group>
                <!-- Username -->
                <!-- Password -->
                <form-group :field="$validation.password">
                    <label class="form-control-label" for="password">Password</label>
                    <input id="password"
                           type="password"
                           class="form-control"
                           placeholder="Password"
                           v-model="password"
                           v-validate:password="{ minlength: 8, maxlength: 100 }">
                    <validation-messages :field="$validation.password">
                        <span v-show="$validation.password.minlength">Your password should be at least 8 characters long</span>
                        <br>
                        <span v-show="$validation.password.maxlength">Your password cannot be longer than 100 characters</span>
                    </validation-messages>
                </form-group>
                <!-- Password -->
                <!-- Submit -->
                <button type="button" class="btn btn-primary btn-block" :disabled="$validation.invalid" @click="login()">Login</button>
                <!-- Submit -->
            </validator>
            <hr>
            <a class="text-muted" v-link="{ path: '/register' }">Need an account?</a>
            <br>
            <a class="text-muted" v-link="{ path: '/forgot/password' }">Forgot your password?</a>
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
                username: '',
                password: ''
            };
        },
        methods: {
            login() {
                api.login(this.username, this.password);
            }
        }
    };
</script>