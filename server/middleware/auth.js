import jwt from 'jsonwebtoken';

// for example, you want to like a post
// click the like button => auth middleware (next) => like controller

const auth = async (req, res, next) => {
    try {
        // console.log(req.headers);
        const token = req.headers.authorization.split(" ")[1];
        // if token.length < 500, it means that it is our own token,
        // if token.length >= 500, that is Google auth
        const isCustomAuth = token.length < 500;

        let decodedData;

        // if it is our own token
        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, 'test');

            req.userId = decodedData?.id;
        } else {
            decodedData = jwt.decode(token);

            // sub is the Google's name for a specific id that differentiates every single Google user.
            // Basically, it's an id that we can differentiate the users with finally we can call the next\
            // so that we can pass the action onto the second thing.
            req.userId = decodedData?.sub;
        }

        next();
    } catch (error) {
        console.log(error);
    }
}

export default auth;