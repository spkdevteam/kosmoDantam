/**
 * @swagger
 * /api/client/bu/department/toggleDepartment:
 *   patch:
 *     summary: Toggle the active state of a department
 *     description: Toggles the `isActive` status of a department, enabling or disabling it based on its current state.
 *     tags:
 *       - Department
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clientId:
 *                 type: string
 *                 description: Unique identifier for the client associated with the department.
 *                 example: "6735e64c5c58f271b1ce1678"
 *               deptId:
 *                 type: string
 *                 description: Unique identifier for the department whose state is to be toggled.
 *                 example: "6746af38b193ebcde50803fd"
 *           example:
 *             clientId: "6735e64c5c58f271b1ce1678"
 *             deptId: "6746af38b193ebcde50803fd"
 *     responses:
 *       200:
 *         description: Department state toggled successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Department active state toggled successfully."
 *               deptId: "673efa60c071b7a57c1238b7"
 *               clientId: "6735e64c5c58f271b1ce1678"
 *               isActive: false
 *       400:
 *         description: Invalid input data or missing required fields.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Invalid input data. Missing required fields: `clientId` or `deptId`."
 *       404:
 *         description: Department not found.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Department not found for the given `clientId` and `deptId`."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "An unexpected error occurred. Please try again later."
 */
