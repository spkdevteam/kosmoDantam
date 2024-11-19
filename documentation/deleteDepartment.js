/**
 * @swagger
 * /api/client/bu/department/deleteDepartment:
 *   delete:
 *     summary: Delete a department
 *     description: Deletes a department based on the provided `deptId` and `clientId`.
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
 *       - in: query
 *         name: deptId
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique identifier for the department to be deleted.
 *         example: "UT-AB-2024-DP100008"
 *     responses:
 *       200:
 *         description: Department deleted successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Department deleted successfully."
 *       400:
 *         description: Missing required query parameters.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Invalid input data. Missing `clientId` or `deptId`."
 *       404:
 *         description: Department not found.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Department not found."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Internal server error."
 */
