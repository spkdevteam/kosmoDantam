
function buildTree(array) {
    let out = array.filter((menu) =>
        menu.reportingMenu == null
    )
    function traverse(outarray) {
        if (outarray.length) {
            return outarray.map((item) => {
                delete item.api;
                delete item.__v;
                delete item.reportingMenu;
                

                item.access = false
                item.subMenus = array.filter((menu) => menu.reportingMenu == item.menuName)
                traverse(item.subMenus)
                return item
            })
        }
        else return null
    }
    let val =  traverse(out)
     

    return val
}

module.exports = buildTree