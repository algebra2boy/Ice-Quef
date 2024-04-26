import SocketIOClient from 'socket.io-client';
import ServerAddress from './props/Server';

const socket = SocketIOClient(ServerAddress());

export default socket;
