export default class Builder {
    constructor() {
        this.attributes = {};
    }

    get(key, defaultValue) {
        if(!this.has(key)){
            return defaultValue;
        }

        return this.attributes[key];
    }

    set(key, value) {
        this.attributes[key] = value;
    }

    has(key) {
        return this.attributes.hasOwnProperty(key);
    }
}