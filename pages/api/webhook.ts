export default function handler(
  req: { method: string; body: any; query: any },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: { (arg0: { message: string }): void; new (): any };
      end: { (arg0: string): void; new (): any };
    };
    setHeader: (arg0: string, arg1: string[]) => void;
    send: any
  }
) {
  if (req.method === "POST") {
    // Process the incoming request
    const data = req.body;

    // Trigger some action in your application
    console.log("Received webhook data:", data);

    // Respond with a success message
    res.status(200).json({ message: "Webhook received" });
  } else {
    // Return a 405 Method Not Allowed if the request method is not POST
    // res.setHeader("Allow", ["POST"]);
    // res.status(405).end(`Method ${req.method} Not Allowed`);
    let mode = req?.query?.["hub.mode"];
    let challange = req?.query?.["hub.challenge"];
    let token = req?.query?.["hub.verify_token"];

    if (mode && token) {
      if (mode === "subscribe") {
        res.status(200)
        res.send(challange);
      } else {
        res.status(403).end(`Method ${req.method} Not Allowed`);
      }
    } else {
      res.status(200).json({ message: "Hello World" });
    }
  }
}
