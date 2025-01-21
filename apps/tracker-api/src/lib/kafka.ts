import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'event-tracker-api',
  brokers: ['localhost:9092'],
});

export default kafka;
