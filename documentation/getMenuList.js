/**
 * @swagger
 * paths:
 *   /human/menuList:
 *     get:
 *       summary: Get menu list
 *       description: Retrieves a hierarchical list of menus, including submenus and their access permissions.
 *       tags:
 *         - role
 *       responses:
 *         200:
 *           description: Successfully retrieved menu list
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
 *                     example: "Menu list retrieved successfully"
 *                   data:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         menuId:
 *                           type: string
 *                           example: "ML10000001"
 *                         menuName:
 *                           type: string
 *                           example: "Menu"
 *                         access:
 *                           type: boolean
 *                           example: false
 *                         subMenus:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               menuId:
 *                                 type: string
 *                                 example: "ML10000013"
 *                               menuName:
 *                                 type: string
 *                                 example: "Branches"
 *                               access:
 *                                 type: boolean
 *                                 example: false
 *                               subMenus:
 *                                 type: array
 *                                 items:
 *                                   type: object
 *                                   properties:
 *                                     menuId:
 *                                       type: string
 *                                       example: "ML10000019"
 *                                     menuName:
 *                                       type: string
 *                                       example: "Create"
 *                                     access:
 *                                       type: boolean
 *                                       example: false
 *                                     subMenus:
 *                                       type: array
 *                                       example: []
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
 *                     example: "Internal server error"
 */
