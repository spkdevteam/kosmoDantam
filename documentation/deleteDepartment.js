/**
 * @swagger
 * /api/client/bu/department/deleteDepartment:
 *   delete:
 *     summary: Delete a department
 *     description: Deletes a department using the provided `deptId` and `clientId`. 
 *                  Both parameters are required for identifying the specific department to delete.
 *     tags:
 *       - Department
 *     parameters:
 *       - in: query
 *         name: clientId
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique identifier for the client associated with the department.
 *         example: "6735e64c5c58f271b1ce1678"
 *       - in: query
 *         name: deptId
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique identifier for the department to be deleted. 
 *                      This can be either an ObjectId or a custom string identifier.
 *         example: "673efa60c071b7a57c1238b7"
 *     responses:
 *       200:
 *         description: Department deleted successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Department deleted successfully."
 *       400:
 *         description: Invalid input data or missing query parameters.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Invalid input data. Missing required parameters: `clientId` or `deptId`."
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
