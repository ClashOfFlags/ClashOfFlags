<template>
    <div class="form-group" :class="hasDanger">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        props: [ 'field' ],
        computed: {
            hasDanger() {
                const field = this.field;
                let hasDanger = false;

                if(field) {
                    hasDanger = field.invalid && field.dirty;
                }

                return {
                    'has-danger': hasDanger
                };
            }
        }
    };
</script>