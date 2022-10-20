module.exports = function (request, response, next) {

    const sessionUId = request.session.user;
    const requestUId = request.body.uId;

    console.log(sessionUId + ':' + requestUId)
    try {
        if (sessionUId !== requestUId) {
            throw new Error('PAGE SETUP DEPRECATED!');
        }
        request.user = request.session.user;
        next();
    } catch (error) {
        return response.status(403).json({message: error.message})
    }
}