/**
 * @swagger
 * /api/client/bu/findings:
 *   get:
 *     summary: Retrieve all findings
 *     description: Fetches a list of all findings associated with a specific client. Optionally, the results can be filtered by `isActive` or include deleted findings.
 *     tags:
 *       - Findings
 *     parameters:
 *       - in: query
 *         name: clientId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the client to fetch findings for.
 *         example: "6735e64c5c58f271b1ce1678"
 *       - in: query
 *         name: isActive
 *         schema:
 *           type: boolean
 *         required: false
 *         description: Filter findings by active status. If not provided, all findings are returned.
 *         example: true
 *       - in: query
 *         name: includeDeleted
 *         schema:
 *           type: boolean
 *         required: false
 *         description: Whether to include deleted findings in the response. Defaults to `false`.
 *         example: false
 *     responses:
 *       200:
 *         description: A list of findings retrieved successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Findings fetched successfully."
 *               data:
 *                 - findingsId: "67413850c071b7a57c126372"
 *                   findingsName: "Blood Test Results"
 *                   description: "Detailed analysis of blood test results."
 *                   isActive: true
 *                   deletedAt: null
 *                 - findingsId: "67413850c071b7a57c126373"
 *                   findingsName: "X-ray Report"
 *                   description: "Chest X-ray findings."
 *                   isActive: false
 *                   deletedAt: "2024-11-01T10:30:00.000Z"
 *       400:
 *         description: Validation error due to missing or invalid query parameters.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Validation error. Please provide a valid clientId."
 *       404:
 *         description: No findings found for the provided client.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "No findings found for the specified client."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Internal server error."
 */
