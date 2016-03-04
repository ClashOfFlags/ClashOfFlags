import Bootstrapper from './setup/Bootstrapper';

Bootstrapper.bootstrap();

const socket = io();

console.log('socket.io!');