import OnPlayerShootListener from './listeners/OnPlayerShootListener';

export default class EventDispatcher {
    constructor($container) {

        this.$container = $container;

        this.listeners = [
            OnPlayerShootListener
        ];
    }

    registerListeners() {

        console.log('register listeners');
        for (var i in this.listeners) {
            var listenerClass = this.listeners[i];

            (new listenerClass(this.$container)).register();

        }
    }
}