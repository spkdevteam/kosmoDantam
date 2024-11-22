/**
 * @swagger
 * /api/client/bu/MediCases/revokeDelete:
 *   patch:
 *     summary: Revoke a deleted medical case
 *     description: Restores a previously deleted medical case by removing the `deletedAt` timestamp.
 *     tags:
 *       - Medical Cases
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clientId:
 *                 type: string
 *                 description: Unique identifier for the client.
 *                 example: "6735e64c5c58f271b1ce1678"
 *               caseId:
 *                 type: string
 *                 description: Unique identifier for the medical case.
 *                 example: "674054a8c071b7a57c125d05"
 *             required:
 *               - clientId
 *               - caseId
 *     responses:
 *       200:
 *         description: Medical case restored successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Medical case restored successfully."
 *               data:
 *                 caseId: "674054a8c071b7a57c125d05"
 *                 caseName: "Asthma"
 *                 remark: "Current medications: Inhaler (Albuterol), Trigger: Dust"
 *                 deletedAt: null
 *                 isActive: true
 *       400:
 *         description: Missing required fields or invalid input.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Invalid input data. Please provide both clientId and caseId."
 *       404:
 *         description: Medical case not found or not marked as deleted.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Medical case not found or not marked as deleted."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Internal server error."
 */
