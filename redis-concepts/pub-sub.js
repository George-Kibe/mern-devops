// pub/sub ->
// publisher -> publish message to channel
// subscriber -> subscribe to channel and receive/consume messages

const redis = require('redis');
// Create a Redis client
const client = redis.createClient({
    // url: 'redis://localhost:6379'
    host: 'localhost', // Redis server host
    port: 6379 // Redis server port
});

// event listener for connection
client.on('connect', () => {
    console.log('Connected to Redis server');
});

// event listener for errors
client.on('error', (err) => {
    console.error('Redis error:', err);
});

async function startTestRedisPubSub() {
    try {
        await client.connect();
        console.log('Connected to Redis server: Pub/Sub Section');
        // Create a new subscriber client sharing connection details with the main client
        const subscriber = client.duplicate();
        await subscriber.connect(); // connect to redis server

        // Subscribe to a channel
        await subscriber.subscribe('sample-channel', (message, channel) => {
            console.log(`Received message from news channel: ${channel} message: ${message}`);
        });

        // Publish messages to the channel
        await client.publish('sample-channel', 'Hello, this is the first news message test!');
        await client.publish('sample-channel', 'Breaking News: Redis Pub/Sub is working!');

        // Wait for a few seconds to ensure messages are received before exiting
        await new Promise(resolve => setTimeout(resolve, 5000));

        // Unsubscribe and disconnect the subscriber
        await subscriber.unsubscribe('sample-channel');
        await subscriber.quit();

        // Pipeling and Transactions
        // Pipeline -> send multiple commands to Redis server in one go, reducing network round-trips
        // Transaction -> execute a group of commands atomically using MULTI and EXEC
        const multi = client.multi(); // start a transaction block
        multi.set('key-transaction1', 'value1');
        multi.set('key-transaction2', 'value2');
        multi.get('key-transaction1');
        multi.get('key-transaction2');
        const results = await multi.exec(); // execute the transaction
        console.log('Multi Transaction Results:', results);

        const pipeline = client.multi(); // start a transaction block
        pipeline.set('key-pipeline1', 'value1');
        pipeline.set('key-pipeline2', 'value2');
        pipeline.get('key-pipeline1');
        pipeline.get('key-pipeline2');
        const pipelineResults = await pipeline.exec(); // execute the transaction
        console.log('Pipeline Transaction Results:', pipelineResults);

        // Clean up
        await client.del('key-transaction1', 'key-transaction2', 'key-pipeline1', 'key-pipeline2');

        // Performance Monitoring
        console.time("Without Pipelining...");
        for (let i = 0; i < 1000; i++) {
            await client.set(`perf-key-${i}`, `value-${i}`);
        }
        console.timeEnd("Without Pipelining...");

        console.time("With Pipelining...");
        const bigPipleline = client.multi();
        for (let i = 0; i < 1000; i++) {
            bigPipleline.set(`perf-pipe-key-${i}`, `value-${i}`);
        }
        await bigPipleline.exec();
        console.timeEnd("With Pipelining...");
        
    } catch (err) {
        console.error('Error in Pub/Sub:', err);
    } finally {
        // Close the connection
        //await client.quit();
    }
}

startTestRedisPubSub();