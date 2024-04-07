import React from "react";
import axios from "axios";
import { connectToDatabase } from "../../utils/db";
import MessagesModel from "../../models/Messages";
import "../../globals.css";

export default function WebhookPage({ data }: any) {
  const [phone, setPhone] = React.useState<any>(null);
  const [message, setMessage] = React.useState<any>(null);

  React.useEffect(() => {}, []);

  const sendMessageHandler = (body_param: any) => {
    const phon_no_id =
      body_param.entry[0].changes[0].value.metadata.phone_number_id;
    axios({
      method: "POST",
      url:
        "https://graph.facebook.com/v13.0/" +
        phon_no_id +
        "/messages?access_token=" +
        "EAAPpeIMSUhEBO7CF4B9kc3mDKhSGT62r1KMTniQn9N8TyPI64m08zB2NyNH7nJmv6y8rDga8ZBFUszZCqiGxUukwYWEuxYhGAOJLGTBAZCtC9T4fpECnE8g9ZAQTWpYZBcahJzm4QnDTBjZBZA0TeeVKZByhJjqrDPM71uFyEOkvwq2afhnUSuU5vLXrYsJDX3edqFSIGlISVIgnzXVlkY4ZD",
      data: {
        messaging_product: "whatsapp",
        to: phone,
        text: {
          body: "Hi.. I'm Bot, your message is " + message,
        },
      },
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        console.log("[Success]", "message sent successfully");
        setPhone(null);
        setMessage(null);
      })
      .catch((err: any) => {
        console.log("[error]", err);
      });
  };

  return (
    <div>
      <h1 className="text-center font-bold my-4 text-xl">
        Your Whats app messages
      </h1>
      {/* {data && <pre>{JSON.stringify(data, null, 2)}</pre>} */}
      <div className="flex flex-col h-screen">
        <div className="flex-1 overflow-y-auto">
          <div className="flex flex-col space-y-2">
            {/* <div className="flex items-start">
              <div className="bg-gray-200 rounded-lg p-2">
                <p className="text-sm">Hello!</p>
              </div>
            </div> */}
            {data &&
              data.map(({ entry }: any) => (
                <>
                  {entry[0].changes.map(
                    ({ value: { contacts, messages } }: any) => (
                      <div
                        key="messages[0].text.body"
                        className="flex justify-end items-end flex-col p-4"
                      >
                        {messages[0].type === "text" ? (
                          <div className="bg-blue-500 text-white rounded-lg p-2">
                            <p className="text-sm">{messages[0].text.body}</p>
                          </div>
                        ) : (
                          <div className="bg-red-500 text-white rounded-lg p-2">
                            <p className="text-sm">
                              We are currently handling text messages only!
                            </p>
                          </div>
                        )}
                        <p>{contacts[0].profile.name}</p>
                      </div>
                    )
                  )}
                </>
              ))}

            <div className="flex justify-between items-center p-2 flex-cold">
              <input
                type="text"
                placeholder="Type phone number"
                className="flex-1 p-2 rounded-full border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
                onChange={(e) => setPhone(e.target.value)}
              />
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 p-2 rounded-full border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                onClick={() => sendMessageHandler(data[0])}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
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
