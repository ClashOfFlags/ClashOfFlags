import Vue from 'vue';
import FormGroup from './FormGroup.vue';
import ValidationMessages from './ValidationMessages.vue';
import './validators';

Vue.component('form-group', FormGroup);
Vue.component('validation-messages', ValidationMessages);