<template>
    <div class="row">
        <div class="col-xs-4 center-block">
            <h1>Login</h1>
            <div class="form-group">
                <label for="username">Username</label>
                <input id="username" type="text" class="form-control" placeholder="Username">
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input id="password" type="password" class="form-control" placeholder="Password">
            </div>
            <button type="button" class="btn btn-primary btn-block">Login</button>
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