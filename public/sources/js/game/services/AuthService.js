export default class AuthService {

    isLoggedIn() {
        return _.isString(this.token());
    }

    token() {
        return localStorage.getItem('token');
    }

}