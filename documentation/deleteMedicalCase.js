/**
 * @swagger
 * /api/client/bu/MediCases/delete:
 *   delete:
 *     summary: Delete a medical case
 *     description: Deletes a medical case by setting its `deletedAt` field to the current timestamp, effectively performing a soft delete.
 *     tags:
 *       - Medical Cases
 *     parameters:
 *       - in: query
 *         name: clientId
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique identifier for the client.
 *         example: "6735e64c5c58f271b1ce1678"
 *       - in: query
 *         name: caseId
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique identifier for the medical case.
 *         example: "674054a8c071b7a57c125d05"
 *     responses:
 *       200:
 *         description: Medical case deleted successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Medical case deleted successfully."
 *               data: null
 *       400:
 *         description: Missing required query parameters or invalid input.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Invalid input data. Please provide both clientId and caseId."
 *       404:
 *         description: Medical case not found.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Medical case not found."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Internal server error."
 */
