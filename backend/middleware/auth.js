const jsonwebtoken = require('jsonwebtoken');

exports.isAuthenticated = async (req, res, next) => {
    try {

        const {token} = req.cookies;
        if(!token){
            return res.status(400).json({
                success : false,
                message : "kindly login first"
            })
        }

        const decodedData = await jsonwebtoken.verify(token, process.env.SECRET_KEY);
        req.user = decodedData;
        
        next();

    } catch (error) {
        return res.status(500).json({
            success : false,
            message : error.message
        })
    }
}