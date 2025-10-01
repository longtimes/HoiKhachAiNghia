export async function handler(event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello from proxy function!" }),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  };
}
