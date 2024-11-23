/**
 * @swagger
 * /api/client/bu/department/create:
 *   post:
 *     summary: Create a new department
 *     description: Adds a new department to the system for a specified client. Requires a token in the Authorization header.
 *     tags:
 *       - new
 *     security:
 *       - BearerAuth: [] # Requires token authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             clientId: "6735e64c5c58f271b1ce1678"
 *             deptName: "Human Resources"
 *             deptId: null
 *             branchId: "6736e43eecc4dfe280f90d03"
 *             description: "Handles employee relations and administration."
 *     responses:
 *       201:
 *         description: Department created successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Department created successfully."
 *               data:
 *                 clientId: "6735e64c5c58f271b1ce1678"
 *                 deptName: "Human Resources"
 *                 deptId: "generatedDeptId"
 *                 branchId: "6736e43eecc4dfe280f90d03"
 *                 description: "Handles employee relations and administration."
 *       400:
 *         description: Validation error or duplicate entry.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Validation error. Please check the input fields."
 *       401:
 *         description: Unauthorized access. Token is required.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Unauthorized access. Token is required."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Internal server error."
 */

/**
 * Swagger Components
 * Note: Add the following `BearerAuth` security scheme in your Swagger components section.
 */
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT # Optional
 */
