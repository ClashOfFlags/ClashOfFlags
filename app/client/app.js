import Vue from 'vue';
import testComponent from './testComponent.vue';

new Vue({
    el: 'body',
    components: {
        test: testComponent
    }
});