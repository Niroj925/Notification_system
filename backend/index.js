const express = require("express");
const amqp = require("amqplib");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(bodyParser.json());

const RABBITMQ_URL = "amqp://localhost";

// Function to send messages to RabbitMQ
async function sendToQueue(queueName, message) {
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();
    await channel.assertQueue(queueName, { durable: true });
    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));
    console.log(`Message sent to ${queueName}`);
    await channel.close();
    await connection.close();
}

// API Endpoint to send notifications
app.post("/send-notification", async (req, res) => {
    const { type, recipient, message } = req.body;
    const notification = { recipient, message };

    // Determine queue based on notification type
    const queueMap = {
        email: "email_queue",
        sms: "sms_queue",
        whatsapp: "whatsapp_queue",
        system: "system_queue",
    };

    if (!queueMap[type]) return res.status(400).json({ error: "Invalid notification type" });

    await sendToQueue(queueMap[type], notification);
    res.json({ success: true, message: "Notification queued" });
});

app.listen(5000, () => console.log("Notification API running on port 5000"));
