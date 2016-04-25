'use strict';

class EventBus {

    constructor() {
        this.eventListenersMap = {};
    }

    register(eventClass, listener) {
        const event = new eventClass();

        this.guardEvent(event);

        const listeners = this.getListenersFor(event);

        listeners.push(listener);
    }

    fire(event) {
        this.guardEvent(event);

        const listeners = this.getListenersFor(event);

        listeners.forEach(listener => {
            this.executeListener(listener, event);
        });
    }

    /* public */
    /* private */

    executeListener(listener, event) {
        try {
            listener(event);
        } catch(err) {
            console.error(`Error while executing event listener for ${ event.name }!`, err);
        }
    }

    getListenersFor(event) {
        const listeners = this.eventListenersMap[event.name];

        if(!listeners) {
            this.eventListenersMap[event.name] = [];

            return this.eventListenersMap[event.name];
        }

        return listeners;
    }

    guardEvent(event) {
        if(!event.name) {
            throw new Error('You need an actual event object to register a listener!');
        }
    }

}

module.exports = new EventBus();