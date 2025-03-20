/**
 * @swagger
 * paths:
 *   /human/login:
 *     post:
 *       summary: Create or update a role
 *       description: Creates a new role or updates an existing one if it already exists.
 *       tags:
 *         - role
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                   example: "admin123"
 *                 password:
 *                   type: string
 *                   example: "securePassword"
 *       responses:
 *         201:
 *           description: Role created or updated successfully
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
 *                     example: "Role updated successfully"
 *                   roleId:
 *                     type: string
 *                     example: "R001"
 *                   roleName:
 *                     type: string
 *                     example: "Admin"
 *                   capacity:
 *                     type: object
 *                     properties:
 *                       menuList:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["Dashboard", "Settings", "Reports"]
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
 *                     example: "Invalid role data"
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
