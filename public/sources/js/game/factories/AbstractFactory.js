import Builder from './Builder';

export default class AbstractFactory {
    constructor(game){
        this.game = game;
        this.rebuild();
    }

    rebuild() {
        this.builder = new Builder();

    }

    set(key, value) {
        this.builder.set(key, value);
        return this;
    }

    get(key, defaultValue) {
        return this.builder.get(key, defaultValue);
    }

    has(key) {
        return this.builder.has(key);
    }

    validate() {
        this.assertThatRequiredFieldsAreSet();
    }

    assertThatRequiredFieldsAreSet() {
        if (!this.required) {
            return true;
        }

        for (var i in this.required) {
            const key = this.required[i];

            if (!this.has(key)) {
                throw new Error('Cannot build ' + this.constructor.name + ', "' + key + '" is missing.');
            }
        }

        return true;
    }

    make() {
        this.validate();

        const object = this.doMake();

        this.rebuild();

        return object;
    }

}