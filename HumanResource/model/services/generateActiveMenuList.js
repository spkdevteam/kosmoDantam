const menuModel = require("../collection/userMenu")

let temp = menuModel.find({deleted:false})
function generateActiveMenuList(menulist){
try {
    let menuList = traverse(menulist)
    return menuList
    function traverse (node){
        if(node){
            if(node?.subMenus?.length && !node.access){
                return node.subMenus.map((menu)=>{
                    const tempOut = temp.find(item => item.menuId == menu.menuId )
                    menu.api = tempOut.api
                    traverse(menu)
                    return menu
                })
            }
        }
    }

} catch (error) {
    
} }   

module.exports = generateActiveMenuList