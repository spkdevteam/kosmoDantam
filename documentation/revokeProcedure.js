/**
 * @swagger
 * /api/client/bu/procedures/revoke:
 *   put:
 *     summary: Revoke a deleted procedure
 *     description: Restores a previously deleted procedure based on the provided `clientId` and `procedureId`.
 *     tags:
 *       - Procedures
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             clientId: "6735e64c5c58f271b1ce1678"
 *             procedureId: "673da3c1c071b7a57c122c92"
 *     responses:
 *       200:
 *         description: Procedure restored successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Procedure restored successfully."
 *               data:
 *                 clientId: "6735e64c5c58f271b1ce1678"
 *                 procedureId: "673da3c1c071b7a57c122c92"
 *       400:
 *         description: Validation error or missing data.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Validation error. Please check the input fields."
 *       404:
 *         description: Procedure not found or not deleted.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Procedure not found or is already active."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Internal server error."
 */
