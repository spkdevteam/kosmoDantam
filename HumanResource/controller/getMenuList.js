const createNestedMenu = require("../model/services/createMenuList")

const getMenuList = async (req,res)=>{
try {
    console.clear()
    const menuList = await createNestedMenu()
    res.json(menuList)
} catch (error) {
    
}

}

module.exports = getMenuList