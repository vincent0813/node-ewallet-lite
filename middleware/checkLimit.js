const { TRANSACTION_LIMIT } = require('../utils/constants/transaction');

const checkLimit = async (req, res, next) => {
    const userLimits = req.user.limits;
    const amount = req.body.amount;

    if (userLimits.length !== 0) {
        userLimits.forEach(limit => {
            if (limit.value + amount > TRANSACTION_LIMIT[limit.limitType]) {
                return res
                    .status(400)
                    .send(`Error: Exceeding ${limit.limitType} LIMIT!`);
            }
        });
    }

    next();

    // UPDATE LIMIT
    // Object.keys(TRANSACTION_LIMIT).forEach(key => {
    //     const limit = {
    //         limitType: key,
    //         key: ,
    //         value: 0
    //     };
    //     req.user.limits.push(limit);
    // });
};

module.exports = checkLimit;
