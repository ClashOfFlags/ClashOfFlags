<template>
    <div class="row">
        <div class="col-xs-12 col-sm-8 col-md-6 col-lg-4 center-block">
            <h1>Register</h1>
            <validator name="validation">
                <!-- Email -->
                <form-group :field="$validation.email">
                    <label class="form-control-label" for="email">Email</label>
                    <input id="email"
                           type="email"
                           class="form-control"
                           placeholder="Email"
                           v-model="email"
                           v-validate:email="{ email: true }">
                    <validation-messages :field="$validation.email">
                        <span v-show="$validation.email.email">Please enter a valid email address</span>
                    </validation-messages>
                </form-group>
                <!-- Email -->
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
                <button type="button" class="btn btn-primary btn-block" :disabled="$validation.invalid" @click="register()">Register</button>
                <!-- Submit -->
            </validator>
            <hr>
            <a class="text-muted" v-link="{ path: '/login' }">Already have an account?</a>
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
                password: '',
                pending: false
            };
        },
        computed: {
            submitDisabled() {
                return this.$validation.invalid || this.pending;
            }
        },
        methods: {
            register() {
                this.pending = true;

                api.register(this.email, this.username, this.password)
                    .then(data => {
                        this.pending = false;

                        if(data === 'true') {
                            return;
                        }

                        toastr.success('You can login now', 'Successfully registered!');
                        this.$route.router.go('/login');
                    });
            }
        }
    };
</script>