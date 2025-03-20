const message = require("../../../utils/message")
const menuModel = require("../collection/userMenu")
const getserialNumber = require("./generateSerialNumber")
const createMenu = async (data) => {
    try {
        let { reportingMenu, menuName, menuId, api } = data
        if (!reportingMenu) return { status: false, message: message.lblMenuHeadNotFound, }
        if (!menuId) menuId = await getserialNumber('menuList')

        const newMenu = {reportingMenu,menuName,menuId,api}

        const result = await menuModel.updateOne(
            { $or: [{ menuId: menuId }, { menuName: menuName }], reportingMenu: reportingMenu },
            { $set: newMenu },
            { upsert: true }
        );

        if (result.modifiedCount) {
            return { status: true, message: 'menu updation success', ...newMenu }
        }
        else if (result.upsertedCount) {
            return { status: true, message: 'new Menu created', ...newMenu }
        }
        else return { status: false, message: 'no changes to update', ...newMenu }
    } catch (error) {
        return { status: false, message: error.errmsg }
    }
}

module.exports = createMenu