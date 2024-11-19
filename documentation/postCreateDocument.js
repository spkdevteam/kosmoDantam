/**
 * @swagger
 * /api/client/bu/department/createDepartment:
 *   post:
 *     summary: Create a new department
 *     description: Adds a new department to the system for a specified client.
 *     tags:
 *       - Department
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             clientId: "6735e64c5c58f271b1ce1678"
 *             deptName: "Human Resources"
 *             deptId: "DPT001"
 *             branchId: "BR001"
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
 *                 deptId: "DPT001"
 *                 branchId: "BR001"
 *                 description: "Handles employee relations and administration."
 *       400:
 *         description: Validation error or duplicate entry.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Department name already exists."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Internal server error."
 */
