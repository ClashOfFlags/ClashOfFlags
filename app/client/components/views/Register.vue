<template>
    <div class="row">
        <div class="col-xs-4 center-block">
            <h1>Register</h1>
            <div class="form-group">
                <label for="email">Email</label>
                <input id="email" type="email" class="form-control" placeholder="name@domain.com">
            </div>
            <div class="form-group">
                <label for="username">Username</label>
                <input id="username" type="text" class="form-control" placeholder="Username">
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input id="password" type="password" class="form-control" placeholder="Password">
            </div>
            <button type="button" class="btn btn-primary btn-block">Register</button>
        </div>
    </div>
</template>

<style>
    .center-block {
        float: none;
    }
</style>