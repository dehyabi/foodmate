import { io } from 'socket.io-client';

const socket = io(
  typeof window !== 'undefined'
    ? 'http://localhost:3001' // for browser
    : 'http://socket-server:3001' // for SSR or Node inside Docker (optional)
);

export default socket;

