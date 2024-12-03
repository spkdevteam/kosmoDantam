/**
 * @swagger
 * /api/client/bu/MediCases/readActiveCasesByPage:
 *   get:
 *     summary: Get active medical cases by page
 *     description: Retrieve all active medical cases with pagination and optional keyword search.
 *     tags:
 *       - Medical Cases
 *     parameters:
 *       - in: query
 *         name: clientId
 *         schema:
 *           type: string
 *         required: true
 *         example: "6735e64c5c58f271b1ce1678"
 *         description: Unique identifier of the client.
 *       - in: query
 *         name: keyWord
 *         schema:
 *           type: string
 *           example: "fracture"
 *         description: Keyword to filter medical cases (default is an empty string).
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 0
 *           example: 1
 *         description: Page number for pagination (default is 0).
 *       - in: query
 *         name: perPage
 *         schema:
 *           type: integer
 *           default: 10
 *           example: 5
 *         description: Number of items per page (default is 10).
 *     responses:
 *       200:
 *         description: Medical cases retrieved successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Active medical cases fetched successfully."
 *               data:
 *                 totalCount: 25
 *                 activeCases:
 *                   - caseId: "mc123"
 *                     caseName: "Fracture Treatment"
 *                     description: "Case involving bone fracture treatment."
 *                     isActive: true
 *                     createdAt: "2024-12-01T12:00:00Z"
 *       400:
 *         description: Validation error or missing data.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Validation error. Please check the input fields."
 *       404:
 *         description: Active medical cases not found.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "No active medical cases found for the specified filters."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Internal server error."
 */
