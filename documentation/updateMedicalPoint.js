/**
 * @swagger
 * /api/client/bu/MediCases/update:
 *   put:
 *     summary: Update an existing medical case
 *     description: Updates the details of a medical case in the master list based on the provided caseId.
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
 *               caseName:
 *                 type: string
 *                 description: Name of the medical case.
 *                 example: "Asthma"
 *               remark:
 *                 type: string
 *                 description: Additional remarks about the medical case.
 *                 example: "Current medications: Inhaler (Albuterol), Trigger: Dust"
 *     responses:
 *       200:
 *         description: Medical case updated successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Medical case updated successfully."
 *               data:
 *                 clientId: "6735e64c5c58f271b1ce1678"
 *                 caseId: "674054a8c071b7a57c125d05"
 *                 caseName: "Asthma"
 *                 remark: "Current medications: Inhaler (Albuterol), Trigger: Dust"
 *       400:
 *         description: Invalid input data.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Invalid input data. Please check the provided fields."
 *       404:
 *         description: Medical case not found.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Medical case with the given caseId not found."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Internal server error."
 */
