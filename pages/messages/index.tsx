import React from "react";
import { connectToDatabase } from "../../utils/db";
import MessagesModel from "../../models/Messages";

export default function WebhookPage({ data }: any) {
  const [isConnected, setIsConnected] = React.useState(false);
  const [transport, setTransport] = React.useState("N/A");

  React.useEffect(() => {}, []);

  return (
    <div>
      <h1>Webhook Data:</h1>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}

export async function getStaticProps() {
  await connectToDatabase();
  const res: any = await MessagesModel.find();
  return {
    props: {
      data: JSON.parse(JSON.stringify(res)),
    },
  };
}

// curl -i -X POST \
//   https://graph.facebook.com/v18.0/308547638998207/messages \
//   -H 'Authorization: Bearer EAAPpeIMSUhEBO7CF4B9kc3mDKhSGT62r1KMTniQn9N8TyPI64m08zB2NyNH7nJmv6y8rDga8ZBFUszZCqiGxUukwYWEuxYhGAOJLGTBAZCtC9T4fpECnE8g9ZAQTWpYZBcahJzm4QnDTBjZBZA0TeeVKZByhJjqrDPM71uFyEOkvwq2afhnUSuU5vLXrYsJDX3edqFSIGlISVIgnzXVlkY4ZD' \
//   -H 'Content-Type: application/json' \
//   -d '{ "messaging_product": "whatsapp", "to": "", "type": "template", "template": { "name": "hello_world", "language": { "code": "en_US" } } }'
