export default function handler(
  req: { method: string; body: any },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: { (arg0: { message: string }): void; new (): any };
      end: { (arg0: string): void; new (): any };
    };
    setHeader: (arg0: string, arg1: string[]) => void;
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
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
