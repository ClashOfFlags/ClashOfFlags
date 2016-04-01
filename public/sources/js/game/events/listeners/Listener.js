export default class Listener{
    registerEvent(name){
        eventSystem().on(name, this.fire);
    }

    fire(){

    }
}