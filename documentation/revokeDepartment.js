/**
 * @swagger
 * /api/client/bu/department/revokeDepartment:
 *   put:
 *     summary: Revoke a deleted department
 *     description: Restores a previously deleted department by updating its `isDeleted` status to `false`.
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
 *                 description: Unique identifier for the department to be restored.
 *                 example: "673efa60c071b7a57c1238b7"
 *           example:
 *             clientId: "6735e64c5c58f271b1ce1678"
 *             deptId: "673efa60c071b7a57c1238b7"
 *     responses:
 *       200:
 *         description: Department restored successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Department restored successfully."
 *       400:
 *         description: Invalid input data or missing required fields.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Invalid input data. Missing required fields: `clientId` or `deptId`."
 *       404:
 *         description: Department not found or already active.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Department not found or is already active."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "An unexpected error occurred. Please try again later."
 */
