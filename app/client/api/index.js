import register from './register';
import login from './login';

export default {

    register(email, username, password) {
        return register(email, username, password);
    },

    login(username, password) {
        return login(username, password);
    }

};