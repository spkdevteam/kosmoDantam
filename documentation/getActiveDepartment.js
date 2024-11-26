/**
 * @swagger
 * /api/client/bu/department/activeDepartments:
 *   get:
 *     summary: Get all active departments
 *     description: Fetches a list of all departments that are marked as active.
 *     tags:
 *       - Department
 *     parameters:
 *       - in: query
 *         name: clientId
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique identifier for the client.
 *         example: "6735e64c5c58f271b1ce1678"
 *     responses:
 *       200:
 *         description: List of active departments fetched successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Active departments fetched successfully."
 *               data:
 *                 - deptId: "UT-AB-2024-DP100008"
 *                   deptName: "Human Resources"
 *                   branchId: "BR001"
 *                   description: "Handles employee relations and administration."
 *                   isActive: true
 *                   clientId: "6735e64c5c58f271b1ce1678"
 *                 - deptId: "UT-AB-2024-DP100009"
 *                   deptName: "Finance"
 *                   branchId: "BR002"
 *                   description: "Manages company finances."
 *                   isActive: true
 *                   clientId: "6735e64c5c58f271b1ce1678"
 *       400:
 *         description: Missing required query parameter.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Invalid input data. Missing `clientId`."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Internal server error."
 */
