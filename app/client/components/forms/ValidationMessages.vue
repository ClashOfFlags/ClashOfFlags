<template>
    <p class="text-danger" v-show="invalidAndTouched">
        <slot></slot>
    </p>
</template>

<script>
    export default {
        props: [ 'field' ],
        computed: {
            invalidAndTouched() {
                const field = this.field;

                if(field) {
                    return field.invalid && field.touched;
                }

                return false;
            }
        }
    };
</script>