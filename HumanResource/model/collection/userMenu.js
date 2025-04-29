const mongoose = require('mongoose');

const menuSchema = mongoose.Schema({
    reportingMenu: { type: String, default: null }, // References parent menuName
    menuName: { type: String, unique: true, required: true }, // Root of the menu structure
    menuId: { type: String  }, // Unique identifier for the menu
    api: { type: String, default: '' },
    deleted:{ type: Boolean, default: false },
    isActive:{ type: Boolean, default: true },
});

const menuModel = mongoose.model('menu', menuSchema);
module.exports = menuModel;
