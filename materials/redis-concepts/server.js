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

// Connect to the Redis server
// client.connect()
//     .then(() => {
//         console.log('Redis client connected successfully');
//     })
//     .catch((err) => {
//         console.error('Failed to connect to Redis server:', err);
//     });

async function connectRedis() {
    try {
        await client.connect();
        console.log('Redis client connected successfully async');
        await client.set('framework', 'Redis');
        await client.set('language', 'JavaScript');
        await client.set('database', 'RedisDB');
        await client.set('count', '100');
        
        // Retrieve and log the value for the key 'framework'
        const extractedValue = await client.get('framework');
        console.log('Value for "framework":', extractedValue);
        // Delete the key 'framework' and log the number of keys removed
        const deletedValue = await client.del('framework');
        console.log('Deleted "framework", number of keys removed:', deletedValue);
        // Attempt to retrieve the value for the deleted key 'framework'
        const valueAfterDeletion = await client.get('framework');
        console.log('Value for "framework" after deletion:', valueAfterDeletion); // Should be null
        // Increment the value of 'count' by 1
        await client.incr('count');
        await client.incr('count');
        await client.incr('count');
        const incrementedValue = await client.get('count');
        console.log('Incremented value for "count":', incrementedValue); // Should be 101
        // Decrement the value of 'count' by 1
        await client.decr('count');
        const decrementedValue = await client.get('count');
        console.log('Decremented value for "count":', decrementedValue); // Should be back to 100
    } catch (err) {
        console.error('Failed to connect to Redis server:', err);
    } finally {
        // Close the Redis client connection. Ensures no open connections.
        // await client.quit();
    }
}

// Call the function to connect to Redis
connectRedis();
// Export the client for use in other modules
module.exports = client;