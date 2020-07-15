module.exports = function (err, req, res, next){
    let statusCode = 500;
    let errList = [];

    switch(err.name){
        case 'SequelizeValidationError':
        case 'SequelizeUniqueConstraintError':
            statusCode = 400;
            err.errors.forEach(errData => {
                errList.push(errData.message)
            })
            break;
        case 'JsonWebTokenError':
            statusCode = 400;
            errList.push(`Token Invalid`);
            break;
        default:
            let message = err.msg || 'Internal Server Error'
            errList.push(message);
            statusCode = err.status || statusCode
            break;
    }

    res.status(statusCode).json({msg: errList.toString()})
}