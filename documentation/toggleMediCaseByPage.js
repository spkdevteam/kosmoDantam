/**
 * @swagger
 * /api/client/bu/mediCases/toggleMediCaseByPage:
 *   put:
 *     summary: Toggle Status of a Medical Case
 *     description: Toggles the status (active/inactive) of a medical case identified by `caseId` and `clientId`. Includes pagination and keyword filters for related cases.
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
 *                 description: Unique identifier of the client.
 *                 example: "6735e64c5c58f271b1ce1678"
 *               caseId:
 *                 type: string
 *                 description: Unique identifier of the medical case to toggle status.
 *                 example: "67405127c071b7a57c125cdc"
 *               keyWord:
 *                 type: string
 *                 description: Keyword to filter related medical cases.
 *                 example: "cardiology"
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
 *         description: Medical case status toggled successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               statusCode: 200
 *               message: "Medical case status toggled successfully."
 *               data:
 *                 caseId: "case123"
 *                 caseName: "Cardiology Consultation"
 *                 isActive: false
 *                 relatedCases:
 *                   totalCount: 25
 *                   cases:
 *                     - caseId: "case124"
 *                       caseName: "Neurology Consultation"
 *                       isActive: true
 *                     - caseId: "case125"
 *                       caseName: "Orthopedic Review"
 *                       isActive: false
 *       400:
 *         description: Invalid input data.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               statusCode: 400
 *               message: "Invalid input data. Please verify the details."
 *       404:
 *         description: Medical case not found for the provided `caseId`.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               statusCode: 404
 *               message: "Medical case not found."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               statusCode: 500
 *               message: "Internal server error."
 */
