/**
 * @swagger
 * /api/client/bu/MediCases/toggle:
 *   patch:
 *     summary: Toggle the active status of a medical case
 *     description: Toggles the `isActive` status of a specific medical case, enabling or disabling it based on its current state.
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
 *     responses:
 *       200:
 *         description: Medical case status toggled successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Medical case status toggled successfully."
 *               data:
 *                 caseId: "674054a8c071b7a57c125d05"
 *                 caseName: "Asthma"
 *                 isActive: false
 *       400:
 *         description: Missing or invalid input data.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Invalid input data. Please provide valid clientId and caseId."
 *       404:
 *         description: Medical case not found.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Medical case not found for the given clientId and caseId."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Internal server error."
 */
