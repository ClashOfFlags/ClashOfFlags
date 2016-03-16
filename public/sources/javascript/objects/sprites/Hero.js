import Player from './Player';

export default class Hero extends Player {
    moveToDirection(newDirection) {
        const moved = super.moveToDirection(newDirection);

    }

    stopMoving(){
        const stopped = super.stopMoving();


    }
}
