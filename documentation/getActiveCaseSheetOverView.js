/**
 * @swagger
 * /api/client/bu/caseSheet/getActiveCaseSheetOverView/{clientId}/{patientId}:
 *   get:
 *     summary: Retrieve Active Case Sheet Overview
 *     description: Fetches the active case sheet overview for a specific patient under a specific client.
 *     tags:
 *       - CaseSheet
 *     parameters:
 *       - in: path
 *         name: clientId
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique identifier for the client.
 *         example: "12345"
 *       - in: path
 *         name: patientId
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique identifier for the patient.
 *         example: "67890"
 *     responses:
 *       200:
 *         description: Active case sheet overview retrieved successfully.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Active case sheet overview retrieved successfully."
 *               data:
 *                 caseSheetId: "KC-BU-2024-CS100093"
 *                 displayId: "KC-BU-2024-CS100093"
 *                 patientName: "John Doe"
 *                 status: "In Progress"
 *                 services:
 *                   - serviceId: "676111fe99aa09502e8115ef"
 *                     serviceName: "Tooth Cleaning"
 *                     rate: 500
 *                     discount: 50
 *                     total: 450
 *       400:
 *         description: Missing or invalid path parameters.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Invalid clientId or patientId."
 *       404:
 *         description: Active case sheet not found for the given patient.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Active case sheet not found for the given patient."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "An error occurred while retrieving the active case sheet."
 */
