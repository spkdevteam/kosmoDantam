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
 *           schema:
 *             type: object
 *             properties:
 *               clientId:
 *                 type: string
 *                 description: The ID of the client associated with the procedure.
 *                 example: "6735e64c5c58f271b1ce1678"
 *               procedureId:
 *                 type: string
 *                 description: The unique ID of the procedure to be deleted.
 *                 example: "6746b6a2b193ebcde5080459"
 *           example:
 *             clientId: "6735e64c5c58f271b1ce1678"
 *             procedureId: "6746b6a2b193ebcde5080459"
 *     responses:
 *       200:
 *         description: Procedure deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Procedure deleted successfully."
 *       400:
 *         description: Validation error or missing data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Validation error. Please check the input fields."
 *       404:
 *         description: Procedure not found by procedureId.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Procedure with the specified ID not found."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Internal server error."
 */
