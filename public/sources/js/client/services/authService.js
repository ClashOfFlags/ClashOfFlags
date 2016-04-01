import api from '../api';

class AuthService {

    constructor() {
        this.userKey = 'user';
        this.tokenKey = 'token';
        this.loggedIn = false;
        this.user = this.getUser();

        if(this.user) {
            this.loggedIn = true;
        }
    }

    login(username, password) {
        return api.login(username, password)
            .then(result => {
                const token = result.token;

                if(!token) {
                    return false;
                }

                this.loggedIn = true;
                this.user = result.user;

                this.setUser(this.user);
                this.setToken(token);

                return true;
            });
    }

    logout() {
        this.loggedIn = false;
        this.user = null;

        localStorage.removeItem(this.userKey);
        localStorage.removeItem(this.tokenKey);
    }

    getUser() {
        const rawUser = localStorage.getItem(this.userKey);

        if(rawUser === null){
            return null;
        }

        try {
            return JSON.parse(rawUser);
        } catch(err) {
            console.error(err);

            return null;
        }
    }

    setUser(user) {
        localStorage.setItem(this.userKey, JSON.stringify(user));
    }

    getToken() {
        return localStorage.getItem(this.tokenKey);
    }

    setToken(token) {
        localStorage.setItem(this.tokenKey, token);
    }

}

export default new AuthService();