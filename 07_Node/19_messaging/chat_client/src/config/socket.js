import toast from 'react-hot-toast';
import { io } from 'socket.io-client';

const EXPRESS_URL = process.env.NEXT_PUBLIC_EXPRESSURL;

const socket = io(EXPRESS_URL, {
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  transports: ['websocket', 'polling'] // Try WebSocket first, fallback to polling
})

socket.on('connect_error', (error) => {
  toast.error('Socket connection error:', error);
});

socket.on('reconnect_attempt', (attempt) => {
  toast.log(`Socket reconnection attempt ${attempt}`);
});

export { socket }