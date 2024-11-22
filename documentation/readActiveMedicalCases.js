/**
 * @swagger
 * /api/client/bu/MediCases/readActiveCases:
 *   get:
 *     summary: Fetch active medical cases
 *     description: Retrieves a list of all active medical cases for a specific client.
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
 *     responses:
 *       200:
 *         description: List of active medical cases fetched successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Active medical cases fetched successfully."
 *               data:
 *                 - caseId: "674054a8c071b7a57c125d05"
 *                   caseName: "Asthma"
 *                   remark: "Current medications: Inhaler (Albuterol), Trigger: Dust"
 *                   isActive: true
 *                 - caseId: "6735e64c5c58f271b1ce1679"
 *                   caseName: "Diabetes"
 *                   remark: "Fasting Blood Sugar (FBS): 70-100 mg/dL (Normal)"
 *                   isActive: true
 *       400:
 *         description: Missing or invalid clientId.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Invalid input data. Please provide a valid clientId."
 *       404:
 *         description: No active cases found for the client.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "No active medical cases found for the given client."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Internal server error."
 */
