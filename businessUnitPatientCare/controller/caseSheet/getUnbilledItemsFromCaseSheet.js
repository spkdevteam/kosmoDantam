const devLogFaliure = require("../../../middleware/devLog/devLogFaliure");
const getUnbilledItemsFromCaseSheetFn = require("../../services/caseSheet/getUnbilledItemsFromCaseSheetFn");

const getUnbilledItemsFromCaseSheet = async (req, res, next) => {
    try {
        const { clientId, caseSheetId } = req?.params;
        console.log(clientId, caseSheetId);
        if (!clientId || !caseSheetId) return res.status(200).json({ status: false, message: "Bad request!!", data: {} });
        const result = await getUnbilledItemsFromCaseSheetFn({ clientId, caseSheetId });
        if (!result?.status) {
            req.faliure = {}
            req.faliure.data = result?.faliure;
            const rawIp =
                req.headers['x-forwarded-for']?.split(',').shift() ||
                req.socket?.remoteAddress ||
                req.ip;
            const userIp = rawIp == '::1' ? '127.0.0.1' : rawIp;
            req.faliure.ip = userIp;
            await devLogFaliure(req, res, () => { });
        }
        return res.status(200).json({ status: result?.status, message: result?.message, itemKart: result?.itemKart });
    }
    catch (error) {
        next(error);
    }
}

module.exports = getUnbilledItemsFromCaseSheet;