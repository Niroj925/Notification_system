const amqp = require("amqplib");
const nodemailer = require("nodemailer");

const queueName = "email_queue";
const RABBITMQ_URL = "amqp://localhost";

// Setup Email Transport
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: "hamroghar531@gmail.com", pass: "yiugehkr8364kjwbphdjkor" }
});



async function consumeEmailQueue() {
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();
    await channel.assertQueue(queueName, { durable: true });

    console.log("Waiting for Email notifications...");

    channel.consume(queueName, async (msg) => {
        const { recipient, message } = JSON.parse(msg.content.toString());
        const mailOptions = {
            from: "hamroghar531@gmail.com",
            to: recipient,
            subject: "Notification",
            text: message
        }; 
    
        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                throw new ForbiddenException(error.message)
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        console.log(`Email sent to ${recipient}`);
        channel.ack(msg);
    });
}

consumeEmailQueue();
