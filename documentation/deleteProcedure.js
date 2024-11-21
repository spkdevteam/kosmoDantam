/**
 * @swagger
 * /api/client/bu/procedures/delete:
 *   delete:
 *     summary: Delete a procedure
 *     description: Deletes a procedure based on the provided `clientId` and `procedureId`.
 *     tags:
 *       - Procedures
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             clientId: "6735e64c5c58f271b1ce1678"
 *             procedureId: "UT-AB-2024-PC100004"
 *     responses:
 *       200:
 *         description: Procedure deleted successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Procedure deleted successfully."
 *       400:
 *         description: Validation error or missing data.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Validation error. Please check the input fields."
 *       404:
 *         description: Procedure not found by procedureId.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Procedure with the specified ID not found."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Internal server error."
 */
