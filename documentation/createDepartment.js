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
 *             buId: "673ef64bdc1355e6ca2e61eb"
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
 *                 buId: "673ef64bdc1355e6ca2e61eb"
 *                 branchId: "6736e43eecc4dfe280f90d03"
 *                 description: "Handles employee relations and administration."
 *       400:
 *         description: Validation error or duplicate entry.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Validation error. Please check the input fields."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Internal server error."
 */
