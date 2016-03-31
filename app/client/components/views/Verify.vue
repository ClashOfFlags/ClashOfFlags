<template>
    <br>
    <div class="row">
        <div class="col-xs-12 col-sm-8 col-md-6 col-lg-4 center-block">
            <div class="alert alert-info" v-if="pending">Verifying your account, please wait.</div>
            <div class="alert alert-success" v-if="verified">
                Your account has been verified!<br>
                You can <a class="alert-link" v-link="{ path: '/login' }">login</a> now.
            </div>
            <div class="alert alert-danger" v-if="invalid">
                The verification token is invalid.<br>
                You can create a new account over <a class="alert-link" v-link="{ path: '/register' }">here</a>.
            </div>
        </div>
    </div>
</template>

<script type="text/babel">
    import api from '../../api';

    export default {
        data() {
            return {
                pending: true,
                verified: false
            };
        },
        computed: {
            invalid() {
                return !this.pending && !this.verified;
            }
        },
        route: {
            activate() {
                const token = this.$route.params.token;

                api.verify(token)
                        .then(result => {
                            this.pending = false;
                            this.verified = result;
                        });
            }
        }
    }
</script>