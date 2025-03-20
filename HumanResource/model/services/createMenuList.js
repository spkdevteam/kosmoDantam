 
const { json } = require("body-parser");
const buildTree = require("../../utils/createMenuHirarchy");
const menuModel = require("../collection/userMenu");

const createNestedMenu = async () => {
    try {
        const result = await menuModel.find() 
        const out = await buildTree(JSON.parse(JSON.stringify(result)))   
        return out;
    } catch (error) {
        console.error("Error generating nested menu:", error);
    }
};

module.exports = createNestedMenu;
