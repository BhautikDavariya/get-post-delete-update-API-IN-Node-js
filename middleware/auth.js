"use strict";
const jwt = require("jsonwebtoken");

const allowedUrls = [
    "/login",
];

const adminUrls = ['/add']

// const superadminUrls = ["/get-all","/add","/Upadate","/delete","/get-by-id","/add-student","/get-all-student","/update-studentt","/delete-student","/get-student-id"];
// const adminUrls = ["/add","/Upadate","/delete","/add-student","/update-studen","/delete-student"]
// const userUrls = ["/get-all","/add","/get-all-student","/add-student"]
// const guestUrls = ["/get-all","/get-all-student"]

const ensureAuthorized = (req, res, next) => {
    if (allowedUrls.indexOf(req.path.toLowerCase()) !== -1) {
        return next();
    }
    const bearerHeader = req.headers["authorization"];
    if (
        !(typeof bearerHeader !== "undefined" && process.env.secret) ||
        !bearerHeader
    ) {
        return res.status(401).json({
            message: "Auth token not found",
            isSuccess: false,
        });
    }
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    jwt.verify(bearerToken, process.env.secret, async function (err, decoded) {
        if (err) {
            return res.status(401).json({
                message: "Auth token not found",
                error: err,
                isSuccess: false,
            });
        } else {
            if (!(adminUrls.indexOf(req.path.toLowerCase()) !== -1 && decoded.roles.includes('admin'))) {
                return res.status(401).json({
                    message: "You are not allowed to access this API",
                    error: err,
                    isSuccess: false,
                });
            }
            req.user = decoded;
            next();
            // if((superadminUrls.indexOf(req.path.toLowerCase()) !== -1 && decoded.roles.includes('SuperAdmin'))){
            //     req.user = decoded;
            //     next();
            // }
            // else if((adminUrls.indexOf(req.path.toLowerCase()) !== -1 && decoded.roles.includes('admin'))){
            //     req.user = decoded;
            //     next();
            // }
            // else if((userUrls.indexOf(req.path.toLowerCase()) !== -1 && decoded.roles.includes('user'))){
            //     req.user = decoded;
            //     next();
            // }
            // else if((guestUrls.indexOf(req.path.toLowerCase()) !== -1 && decoded.roles.includes('guest'))){
            //     req.user = decoded;
            //     next();
            // }
            // else{
            //     return res.status(401).json({
            //         message: "You have no permission to access this API",
            //         error: err,
            //         isSuccess: false,
            //     })
            // }
        }
    });
};
module.exports = {
    ensureAuthorized,
};