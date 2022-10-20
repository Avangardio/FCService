const Page = require('../db/pageModel');
const redisClient = require('./redisClient');

async function redisInitiatePages(start) {
   if(!start) await redisClient.connect();

       const cachedUsers = await Page.find({}).select({'_id': 0, '__v': 0});
       cachedUsers.map(async (page) => {
           await redisClient.set(page.uId, JSON.stringify(page));
           return {uId: page.uId, firstName: page.firstName, lastName: page.lastName, profilePhoto: page.profilePhoto};
       });
       return cachedUsers;

}
module.exports = redisInitiatePages;