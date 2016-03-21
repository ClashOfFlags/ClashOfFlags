<template>
    <div>Hello</div>
</template>

<script type="text/babel">
    export default {
        route: {
            activate() {
                console.log(this.$route);
            }
        }
    }
</script>