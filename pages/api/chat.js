export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { message } = req.body;
        // Here you should integrate with your chat model backend
        // For demonstration, we'll just echo the message back
        const chatResponse = await getChatResponse(message); // Replace with your chat model logic
        res.status(200).json({ reply: chatResponse });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}

async function getChatResponse(message) {
    // Simulate a delay
    await new Promise(resolve => setTimeout(resolve, 2000)); // 2 seconds delay
    // Replace this with actual integration with your chat model
    return `You said: ${message}`;
}
