/**
 * @swagger
 * components:
 *   schemas:
 *     Menu:
 *       type: object
 *       properties:
 *         menuId:
 *           type: string
 *           example: "M001"
 *         menuName:
 *           type: string
 *           example: "Dashboard"
 *         reportingMenu:
 *           type: string
 *           example: "MainMenu"
 *         api:
 *           type: string
 *           example: "/dashboard"
 *         
 *       required:
 *         - menuName
 *         - reportingMenu
 *
 * paths:
 *   /human/createMenu:
 *     post:
 *       summary: Create or update a menu item
 *       description: Creates a new menu item or updates an existing one if it already exists.
 *       tags:
 *         - role
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Menu'
 *       responses:
 *         201:
 *           description: Menu created successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: boolean
 *                     example: true
 *                   message:
 *                     type: string
 *                     example: "new Menu created"
 *                   menuId:
 *                     type: string
 *                     example: "M001"
 *                   menuName:
 *                     type: string
 *                     example: "Dashboard"
 *                   reportingMenu:
 *                     type: string
 *                     example: "MainMenu"
 *                   api:
 *                     type: string
 *                     example: "/dashboard"
 *         400:
 *           description: Invalid input data
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: boolean
 *                     example: false
 *                   message:
 *                     type: string
 *                     example: "Menu head not found"
 *         500:
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: boolean
 *                     example: false
 *                   message:
 *                     type: string
 *                     example: "An error occurred while processing the request"
 */
