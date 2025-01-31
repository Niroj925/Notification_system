const amqp = require("amqplib");
const twilio = require("twilio");

const queueName = "sms_queue";
const client = new twilio("TWILIO_ACCOUNT_SID", "TWILIO_AUTH_TOKEN");

async function consumeSMSQueue() {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();
    await channel.assertQueue(queueName, { durable: true });

    console.log("Waiting for SMS notifications...");

    channel.consume(queueName, async (msg) => {
        const { recipient, message } = JSON.parse(msg.content.toString());

        // Send SMS
        await client.messages.create({
            body: message,
            from: "+1234567890",
            to: recipient
        });

        console.log(`SMS sent to ${recipient}`);
        channel.ack(msg);
    });
}

consumeSMSQueue();
