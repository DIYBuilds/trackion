import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'trackion-events-consummer-app',
  brokers: ['localhost:9092'],
});

const topic = 'events'; // Name of the topic to consume from
const groupId = 'trackion-consumer-group'; // Consumer group ID

const consumer = kafka.consumer({ groupId });

export const consumeEvents = async () => {
  try {
    // Connect to the consumer
    await consumer.connect();
    console.log('Kafka consumer connected.');

    // Subscribe to the topic
    await consumer.subscribe({ topic, fromBeginning: true });

    console.log(`Subscribed to topic: ${topic}`);

    // Listen for messages
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log({
          topic,
          partition,
          offset: message.offset,
          key: message.key?.toString(),
          value: message.value?.toString(),
        });

        // You can process the message here
        const event = JSON.parse(message.value?.toString() || '{}');
        console.log('Event received:', event);
      },
    });
  } catch (err) {
    console.error('Error in Kafka consumer:', err);
  }
};

(async () => {
  await consumeEvents();
})();

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down Kafka consumer...');
  await consumer.disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('Shutting down Kafka consumer...');
  await consumer.disconnect();
  process.exit(0);
});
