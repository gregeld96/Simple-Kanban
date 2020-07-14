module.exports = function (err, req, res, next){
    const statusCode = 500;
    const errList = [];

    switch(err.name){
        case 'SequelizeValidatioError':
        case 'SequelizeUniqueConstrainError':
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
            let message = err.msg || 'internal server error'
            errList.push(message);
            statusCode = err.status || statusCode
            break;
    }

    res.ststus(ststusCode).json({msg: errList.toString()})
}