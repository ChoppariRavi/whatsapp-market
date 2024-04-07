export async function getServerSideProps(context: any) {
  const { id } = context.query;

  // Fetch webhook data from your API route
  const res = await fetch(`http://localhost:3000/api/webhooks/${id}`);
  const data = await res.json();

  // Pass the webhook data to the page component
  return {
    props: {
      webhookData: data,
    },
  };
}

export default function WebhookPage({ webhookData }: any) {
  return (
    <div>
      <h1>Webhook Data:</h1>
      {webhookData && <pre>{JSON.stringify(webhookData, null, 2)}</pre>}
    </div>
  );
}
