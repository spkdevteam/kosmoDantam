/**
 * @swagger
 * /api/client/bu/procedures/toggleProcedure:
 *   patch:
 *     summary: Toggle procedure status (on/off)
 *     description: Toggles the status of a procedure (activates or deactivates) based on the provided `clientId` and `procedureId`.
 *     tags:
 *       - Procedures
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             clientId: "6735e64c5c58f271b1ce1678"
 *             procedureId: "UT-AB-2024-PC100004"
 *             
 *     responses:
 *       200:
 *         description: Procedure status updated successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Procedure status updated successfully."
 *               data:
 *                 clientId: "6735e64c5c58f271b1ce1678"
 *                 procedureId: "UT-AB-2024-PC100004"
 *                 status: true  # or false depending on the operation
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
