/**
 * @swagger
 * components:
 *   schemas:
 *     Role:
 *       type: object
 *       properties:
 *         roleId:
 *           type: string
 *           example: "R001"
 *         roleName:
 *           type: string
 *           example: "Admin"
 *         capacity:
 *           type: object
 *           properties:
 *             menuList:
 *               type: array
 *               items:
 *                 type: string
 *               example: ["Dashboard", "Settings", "Reports"]
 *       required:
 *         - roleName
 *         - capacity
 *
 * paths:
 *   /human/createRole:
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
 *               $ref: '#/components/schemas/Role'
 *       responses:
 *         201:
 *           description: Role created successfully
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
 *                     example: "New role created"
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
 *                     example: "An error occurred while processing the request"
 */
