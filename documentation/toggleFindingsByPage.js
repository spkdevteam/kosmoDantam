/**
 * @swagger
 * /api/client/bu/findings/toggleFindingsByPage:
 *   put:
 *     summary: Toggle Status of a Finding
 *     description: Toggles the status (active/inactive) of a finding identified by `findingsId` and `clientId`. Includes pagination and keyword filters for related findings.
 *     tags:
 *       - Findings
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clientId:
 *                 type: string
 *                 description: Unique identifier of the client.
 *                 example: "6735e64c5c58f271b1ce1678"
 *               findingsId:
 *                 type: string
 *                 description: Unique identifier of the finding to toggle status.
 *                 example: "67413850c071b7a57c126372"
 *               keyWord:
 *                 type: string
 *                 description: Keyword to filter related findings.
 *                 example: "fracture"
 *               page:
 *                 type: integer
 *                 description: Page number for pagination (default is 0).
 *                 example: 1
 *               perPage:
 *                 type: integer
 *                 description: Number of items per page (default is 10).
 *                 example: 5
 *     responses:
 *       200:
 *         description: Finding status toggled successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               statusCode: 200
 *               message: "Finding status toggled successfully."
 *               data:
 *                 findingsId: "findings123"
 *                 findingName: "Hairline Fracture"
 *                 isActive: false
 *                 relatedFindings:
 *                   totalCount: 10
 *                   findings:
 *                     - findingsId: "findings124"
 *                       findingName: "Complete Fracture"
 *                       isActive: true
 *                     - findingsId: "findings125"
 *                       findingName: "Sprain"
 *                       isActive: true
 *       400:
 *         description: Invalid input data.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               statusCode: 400
 *               message: "Invalid input data. Please verify the details."
 *       404:
 *         description: Finding not found for the provided `findingsId`.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               statusCode: 404
 *               message: "Finding not found."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               statusCode: 500
 *               message: "Internal server error."
 */
