const responseStatusCode = require('../entity/response-status-code');

const applyResult = (result, res, successStatusCode) => {
    if (result.hasError()) {
        if (result.hasCriticalError()) {
            res.status(responseStatusCode.INTERNAL_SERVER_ERROR);
        } else {
            res.status(responseStatusCode.BAD_REQUEST);
        }
        res.send(result.getErrorList());
    } else if (result.isResultEmpty()) {
        res.status(responseStatusCode.BAD_REQUEST);
        res.send([]);
    } else {
        res.status(successStatusCode);
        res.send(result.getResult());
    }
};

module.exports = applyResult;