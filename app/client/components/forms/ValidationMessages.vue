<template>
    <p class="text-danger" v-show="invalidAndDirty">
        <slot></slot>
    </p>
</template>

<script>
    export default {
        props: [ 'field' ],
        computed: {
            invalidAndDirty() {
                const field = this.field;

                if(field) {
                    return field.invalid && field.dirty;
                }

                return false;
            }
        }
    };
</script>