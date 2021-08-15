import amqplib from 'amqplib';
import { IPublisher } from "../../../domain/interfaces/IPublisher";

class CalculatorPublisher implements IPublisher{

    async publishInQueue(message: any, queueName: string): Promise<boolean> { 

        const { AMQP_HOST, AMQP_PORT, AMQP_USER, AMQP_PASS } = process.env;
        const connection = await amqplib.connect(`amqp://${AMQP_USER}:${AMQP_PASS}@${AMQP_HOST}:${AMQP_PORT}`, 'heartbeat=60');
        const channel = await connection.createChannel();
        
        try {
            const exchange = 'calculator.direct';
            const queue = queueName;
            const routingKey = queueName;
            
            // Creating exchange
            await channel.assertExchange(exchange, 'direct', {durable: true});

            // Creating queue
            await channel.assertQueue(queue, {durable: true, maxLength: 3});

            // Creating bind to associate the exchange and the queue
            await channel.bindQueue(queue, exchange, routingKey);
        
            const result = await channel.publish( exchange, routingKey, Buffer.from(JSON.stringify(message)) );
        
            if(result)
                console.log('Message published');
        
            return result;
        }
        catch(e) {
            console.error('Error in publishing message', e);
            return false;
        }
        finally {
            await channel.close();
            await connection.close();
            console.info('Channel and connection closed');
        }

      }
}

export { CalculatorPublisher };