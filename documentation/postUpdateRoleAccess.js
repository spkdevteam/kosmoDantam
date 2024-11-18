/**
 * @swagger
 * components:
 *   schemas:
 *     SubMenu:
 *       type: object
 *       properties:
 *         deleted:
 *           type: boolean
 *           example: false
 *         isActive:
 *           type: boolean
 *           example: true
 *         _id:
 *           type: string
 *           example: "673833a71530ec2e0a3877e7"
 *         menuId:
 *           type: string
 *           example: "ML10000019"
 *         menuName:
 *           type: string
 *           example: "create"
 *         access:
 *           type: boolean
 *           example: false
 *         subMenus:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/SubMenu'
 *           example: []
 *     Capability:
 *       type: object
 *       properties:
 *         deleted:
 *           type: boolean
 *           example: false
 *         isActive:
 *           type: boolean
 *           example: true
 *         _id:
 *           type: string
 *           example: "67383b31e99b568dfbcb7e34"
 *         menuId:
 *           type: string
 *           example: "ML10000001"
 *         menuName:
 *           type: string
 *           example: "Menu"
 *         access:
 *           type: boolean
 *           example: false
 *         subMenus:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/SubMenu'
 *       required:
 *         - menuId
 *         - menuName
 *     RoleUpdate:
 *       type: object
 *       properties:
 *         roleId:
 *           type: string
 *           example: "RL10000018"
 *         name:
 *           type: string
 *           example: "newAdmin"
 *         reportingHead:
 *           type: string
 *           example: null
 *         capability:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Capability'
 *           example:
 *             - deleted: false
 *               isActive: true
 *               _id: "67383b31e99b568dfbcb7e34"
 *               menuId: "ML10000001"
 *               menuName: "Menu"
 *               access: false
 *               subMenus:
 *                 - deleted: false
 *                   isActive: true
 *                   _id: "673833341530ec2e0a37cfa7"
 *                   menuId: "ML10000013"
 *                   menuName: "Branches"
 *                   access: false
 *                   subMenus:
 *                     - deleted: false
 *                       isActive: true
 *                       _id: "673833a71530ec2e0a3877e7"
 *                       menuId: "ML10000019"
 *                       menuName: "create"
 *                       access: false
 *                       subMenus: []
 *       required:
 *         - roleId
 *         - name
 *         - capability
 * 
 * paths:
 *   /human/updateRoleAccess:
 *     post:
 *       summary: Update role access or create a new role if not found
 *       description: Updates the access details of an existing role or creates a new role if no matching role is found.
 *       tags:
 *         - role
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RoleUpdate'
 *       responses:
 *         200:
 *           description: Role updated successfully
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
 *                     example: "role modified"
 *         201:
 *           description: New role created successfully
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
 *                     example: "new role created"
 *                   roleId:
 *                     type: string
 *                     example: "RL10000018"
 *                   name:
 *                     type: string
 *                     example: "newAdmin"
 *                   capability:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/Capability'
 *         400:
 *           description: No active roles found
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
 *                     example: "no active roles found with this details"
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
