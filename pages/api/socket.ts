import { Server, Socket } from 'socket.io';

let io: Server;
const clientsByRoom: { [roomName: string]: Socket[] } = {};
let allUsers: any[] = [];

export const config = {
  api: {
    bodyParser: false,
  },
};

const socketHandler = (req:any, res:any) => {
    console.log('[res.socket.server]', res)
  if (res?.io) {
    console.log('[res.socket.server]', res.socket.server.io)
    console.log('Socket is already running')
  } else {
    console.log('Socket is initializing')
    console.log('[res.socket.server]', res.scoket, res.socket?.server || 3030)
    const io = new Server(res.socket?.server || 3030)
    res.io = io

    io.on('connection', socket => {
        socket.on('sendNotification', (data) => {
          console.log(`BROADCASTING NOTIFICATION`);
          io.emit('notification', data);
        });

        socket.on('user:connect', (data: any) => {
          const { id, isActive, role: { title }, orgId } = JSON.parse(JSON.stringify(data));
          const existingUser = allUsers.find((user) => user.id === id);
            if (existingUser) {
              existingUser.socketId = socket.id;
            } else {
              allUsers.push({ id: id, socketId: socket.id, isActive: isActive, role: title, orgId:orgId });
            }
        });
  
        socket.on('user:disconnect', () => {
          const index = allUsers.findIndex((user) => user.socketId === socket.id);
            if (index !== -1) {
              console.log('User deleted');
              allUsers.splice(index, 1);
              console.log(`ACTIVE USERS CONNECTED VIA SOCKET AFTER DELETE`,allUsers.length);
            }
        });
  
        socket.on('joinRoom', (roomName) => {
          socket.join(roomName);
          console.log(`Client ${socket.id} joined room ${roomName}`);
        });
  
        socket.on('leaveRoom', (roomName) => {
          socket.leave(roomName);
          console.log(`Client ${socket.id} left room ${roomName}`);
        });
  
        socket.on('sendMessageToRoom', (data) => {
          const { roomName, message } = data;
          io.to(roomName).emit('message', message);
          console.log(`Message sent to room ${roomName}:`, message);
        });
  
        socket.on('sendMessageToClients', (data) => {
          const { roomName, clientIds, message } = data;
          if (clientsByRoom[roomName]) {
            clientsByRoom[roomName]
              .filter((client) => clientIds.includes(client.id))
              .forEach((client) => {
                client.emit('message', message);
              });
          }
          console.log(`Message sent to clients in room ${roomName}:`, message);
        });

        socket.on('sendMessageToSingleuser', (data) => {
          console.log(`ACTIVE USERS CONNECTED VIA SOCKET`,allUsers.length);
          const user = allUsers.find((user) => user.id === data.userId);
          console.log('user',user);
          if (user) {
            io.to(user.socketId).emit('notification', data.notification);
          } else{
            console.log('User not found to send message');
          }
          console.log(`Message sent to client  ${data.userId}:`, data.notification);
        });
    })
  }
  res.end()
}

export default socketHandler;