import socketClient from "@/utils/socket";
import React from "react";

export default function WebhookPage() {
  const [isConnected, setIsConnected] = React.useState(false);
  const [transport, setTransport] = React.useState("N/A");

  React.useEffect(() => {
    const fetchData = async () => {
      const socket = await socketClient();
      
      socket.on("connect", () => {
        setIsConnected(true);
        setTransport(socket.io.engine.transport.name);

        socket.io.engine.on("upgrade", (transport) => {
          setTransport(transport.name);
        });
      })
      
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Webhook Data:</h1>
      <p>Status: {isConnected ? "connected" : "disconnected"}</p>
      <p>Transport: {transport}</p>
    </div>
  );
}

// curl -i -X POST \
//   https://graph.facebook.com/v18.0/308547638998207/messages \
//   -H 'Authorization: Bearer EAAPpeIMSUhEBO7CF4B9kc3mDKhSGT62r1KMTniQn9N8TyPI64m08zB2NyNH7nJmv6y8rDga8ZBFUszZCqiGxUukwYWEuxYhGAOJLGTBAZCtC9T4fpECnE8g9ZAQTWpYZBcahJzm4QnDTBjZBZA0TeeVKZByhJjqrDPM71uFyEOkvwq2afhnUSuU5vLXrYsJDX3edqFSIGlISVIgnzXVlkY4ZD' \
//   -H 'Content-Type: application/json' \
//   -d '{ "messaging_product": "whatsapp", "to": "", "type": "template", "template": { "name": "hello_world", "language": { "code": "en_US" } } }'
