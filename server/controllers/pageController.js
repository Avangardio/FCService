const Page = require('../components/db/pageModel');
const redisClient = require('../components/redis/redisClient');
const eventHandler = require('../components/eventHandler');
class PageController {
    async page_GET (request, response) {

        const {pageId} = request.params;

        if(redisClient.exists(pageId)){
            const cachedPage = JSON.parse(await redisClient.get(pageId));
            response.status(200).send({
                message: 'Success getting pageSetup page.(FROM CACHE!)',
                page: cachedPage
            });
            return;
        }

        await Page.findOne({uId: pageId})
            .then((page) => {
                if(page === null) throw new Error("User Page Not Found!");
                response.status(200).send({
                    message: 'Success getting pageSetup page.',
                    page: page
                });
            })
            .catch((e) => {
                response.status(404).send({
                    message: e.message,
                });
            });
    };

    async page_POST (request, response) {
        const user = request.body.uId;

        const {firstName, lastName, profilePhoto, city, aboutMe, birthDay} = request.body.pageData;
        const update = {
            firstName,
            lastName,
            profilePhoto: profilePhoto ? profilePhoto : undefined,
            uId: user,
            city,
            aboutMe,
            birthDay
        };


        const searchPage = await Page.findOne({uId: user});
        if(searchPage === null) {
            const page = new Page({
                ...update
            })
            redisClient.set(update.uId, JSON.stringify(update));
            await page.save()
                .then(result => {
                    response.status(201).send({message: "Page Created Success"})
                })
                .catch(error => {
                    console.log(error);
                    response.status(400).send({message: "Error creating page"})
                })
            eventHandler.emit('redisUpdate');
            return;
        }

        redisClient.set(update.uId, JSON.stringify(update));
        await Page.findOneAndUpdate({uId: user}, update)
            .then((result) => {
                response.status(200).send({message: 'Page Update Success!'})
                })
            .catch((error) => {
                response.status(400).send({message: error.message})
                });
        eventHandler.emit('redisUpdate');

    };

    async getPageApi (request, response) {
    }

}


module.exports = new PageController();