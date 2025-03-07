/**
 * @swagger
 * /api/client/bu/investigation/getAllInvestigation:
 *   get:
 *     summary: Get all investigations
 *     description: Retrieves a list of all investigations, including active and inactive investigations, for a specific client.
 *     tags:
 *       - Investigation
 *     parameters:
 *       - in: query
 *         name: clientId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier for the client whose investigations are to be fetched.
 *         example: "6735e64c5c58f271b1ce1678"
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of all investigations.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               statusCode: 200
 *               message: "All investigations fetched successfully."
 *               data:
 *                 - investigationId: "INV-2024-001"
 *                   investigationName: "Blood Test"
 *                   description: "A test to analyze the blood components."
 *                   isActive: true
 *                 - investigationId: "INV-2024-002"
 *                   investigationName: "ECG"
 *                   description: "Electrocardiogram test to measure heart activity."
 *                   isActive: false
 *       400:
 *         description: Bad request due to missing or invalid `clientId`.
 *         content:
 *           application/json:
 *             example:
 *               status: false,
 *               statusCode: 400,
 *               message: "Invalid or missing clientId. Please provide a valid clientId."
 *       404:
 *         description: No investigations found for the specified client.
 *         content:
 *           application/json:
 *             example:
 *               status: false,
 *               statusCode: 404,
 *               message: "No investigations found for the given client."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: false,
 *               statusCode: 500,
 *               message: "Internal server error."
 */
