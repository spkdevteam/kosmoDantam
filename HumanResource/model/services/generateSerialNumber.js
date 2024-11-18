const serialNumber = require('../collection/serialNumber')

const getserialNumber = async (collection) => {
    try {
        const result = await serialNumber.findOneAndUpdate({ collectionName: collection }, { $inc: { nextNum: 1 } })
        if (result) {
            return result.prefix + result.nextNum
        }
        else {
            return null
        }
    } catch (error) {
        return null
    }
}

module.exports = getserialNumber