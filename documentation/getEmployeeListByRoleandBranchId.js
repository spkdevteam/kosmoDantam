/**
 * @swagger
 * /api/client/bu/employee/getEmployeelist/{clientId}/{branchId}/{role}:
 *   get:
 *     summary: Retrieve a list of employees
 *     description: Fetches a list of employees for a specific client, branch, and role.
 *     tags:
 *       - Employees
 *     parameters:
 *       - in: path
 *         name: clientId
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique identifier for the client.
 *         example: "6753e5e4b403a31c6f098826"
 *       - in: path
 *         name: branchId
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique identifier for the branch.
 *         example: "12345"
 *       - in: path
 *         name: role
 *         schema:
 *           type: string
 *         required: true
 *         description: Role of the employees to filter.
 *         example: "Manager"
 *     responses:
 *       200:
 *         description: A list of employees.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Employees retrieved successfully."
 *               data:
 *                 employees:
 *                   - employeeId: "EMP001"
 *                     name: "John Doe"
 *                     role: "Manager"
 *                     branchId: "12345"
 *                   - employeeId: "EMP002"
 *                     name: "Jane Smith"
 *                     role: "Manager"
 *                     branchId: "12345"
 *       400:
 *         description: Validation error or missing required path parameters.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Invalid input. Please provide valid parameters."
 *       404:
 *         description: No employees found for the specified criteria.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "No employees found for the given criteria."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Internal server error."
 */
