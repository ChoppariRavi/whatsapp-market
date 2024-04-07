import { io, Socket } from "socket.io-client";

let socket: Socket;

export async function connectSocket() {
  await fetch("/api/socket");
  socket = io();

  socket.on("notification", (data) => {
    console.log("Received notification:", data);
    // Handle the notifications like showing toast.
    // toast.success(`Notification received! - ${data.title}`);
  });
}

export async function receiveNotifications() {
  return new Promise(async (resolve, reject) => {
    if (!socket) {
      try {
        await fetch("/api/socket");
        socket = io();
      } catch (error) {
        reject(error);
        return;
      }
    }

    socket.on("notification", (data) => {
      // console.log('Received notification:', data);
      // toast.success(`Notification received! - ${data.message}`);
      resolve(data); // Resolve the Promise with the received data
    });
  });
}

export async function connectSocketForUser(userInfo: any) {
  console.log("user info", userInfo);
  if (!socket) {
    socket = io();
  }
  console.log("socket connected with ", socket.id);
  socket.emit("user:connect", userInfo);
}

export function sendNotification(message: string, type: any) {
  if (socket) {
    socket.emit("sendNotification", { message, type });
  }
}

export function joinRoom(roomName: string) {
  if (socket) {
    socket.emit("joinRoom", roomName);
  }
}

export function leaveRoom(roomName: string) {
  if (socket) {
    socket.emit("leaveRoom", roomName);
  }
}

export function sendMessageToEntireRoom(roomName: string, message: string) {
  if (socket) {
    socket.emit("sendMessageToRoom", { roomName, message });
  }
}

export function sendMessageToSpecificClients(
  roomName: string,
  clientIds: string[],
  message: string
) {
  if (socket) {
    socket.emit("sendMessageToClients", { roomName, clientIds, message });
  }
}

export async function sendMessageToSpecificUser(
  userId: string,
  notification: any
) {
  if (!socket) {
    await fetch("/api/socket");
    socket = io();
  }
  socket.emit("sendMessageToSingleuser", {
    userId: userId,
    notification: { ...notification },
  });
}

export async function removeSocketConnectionForUser() {
  if (!socket) {
    await fetch("/api/socket");
    socket = io();
  }
  socket.emit("user:disconnect");
}
