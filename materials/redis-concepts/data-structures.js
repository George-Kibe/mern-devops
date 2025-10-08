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

async function startRedisDataStructures() { 
    try {
        await client.connect();
        console.log('Connected to Redis server: Data Structures Section'); 
        // String operations -> set, get, mset, mget, del
        await client.set('user:name', 'George Kibe');
        const name = await client.get('user:name');
        console.log('User Name:', name);

        await client.mSet({'user:email':'georgekibew@gmail.com', 'user:country': 'Kenya', 'user:age': '28' });
        const [email, country, age] = await client.mGet(['user:email', 'user:country', 'user:age']);
        console.log('User Email:', email);
        console.log('User Country:', country);
        console.log('User Age:', age);

        await client.del('user:name', 'user:email', 'user:country');
        const deletedName = await client.get('user:name');
        console.log('Deleted User Name (should be null):', deletedName);

        // List operations -> lPush, rPush, lPop, rPop, lRange
        await client.rPush('tasks', ['Task 1', 'Task 2', 'Task 3']);
        const tasks = await client.lRange('tasks', 0, -1); // all tasks
        console.log('Tasks List:', tasks);

        const firstTask = await client.lPop('tasks');
        console.log('First Task (lPop):', firstTask);

        const remainingTasks = await client.lRange('tasks', 0, -1);
        console.log('Remaining Tasks after lPop:', remainingTasks);

        await client.del('tasks');

        
        // Set operations -> sAdd, sRem, sMembers, sIsMember
        await client.sAdd('tags', ['nodejs', 'redis', 'database']);
        const tags = await client.sMembers('tags');
        console.log('Tags Set:', tags);

        const isMember = await client.sIsMember('tags', 'redis');
        console.log('Is "redis" a member of tags set?:', isMember);

        await client.sRem('tags', 'nodejs');
        const updatedTags = await client.sMembers('tags');
        console.log('Updated Tags Set after removing "nodejs":', updatedTags);

        await client.del('tags');

        // Hash operations -> hSet, hGet, hGetAll, hDel
        await client.hSet('user:info', { name: 'George Kibe', email: 'georgekibew@gmail.com', country: 'Kenya' });  
        const userInfo = await client.hGetAll('user:info');
        console.log('User Info Hash:', userInfo);

        const userEmail = await client.hGet('user:info', 'email');
        console.log('User Email from Hash:', userEmail);

        await client.hDel('user:info', 'country');
        const updatedUserInfo = await client.hGetAll('user:info');
        console.log('Updated User Info Hash after deleting country:', updatedUserInfo);

        await client.del('user:info');

        // Sorted Set operations ->  zAdd, zRange, zRem, zRank, zScore
        
        await client.zAdd('leaderboard', [
            { score: 100, value: 'Player1' },
            { score: 200, value: 'Player2' },
            { score: 150, value: 'Player3' }
        ]);
        const leaderboard = await client.zRange('leaderboard', 0, -1, { WITHSCORES: true });
        console.log('Leaderboard Sorted Set:', leaderboard);

        await client.zRem('leaderboard', 'Player1');
        const updatedLeaderboard = await client.zRange('leaderboard', 0, -1, { WITHSCORES: true });
        console.log('Updated Leaderboard after removing Player1:', updatedLeaderboard);
        const player2Rank = await client.zRank('leaderboard', 'Player2');
        console.log('Player2 Rank in Leaderboard:', player2Rank);
        const player3Score = await client.zScore('leaderboard', 'Player3');
        console.log('Player3 Score in Leaderboard:', player3Score);
        

        await client.del('leaderboard');
    } catch (error) {
        console.error('Error connecting to Redis server:', error);
    } finally {
        // await client.quit();
    }
}
startRedisDataStructures();