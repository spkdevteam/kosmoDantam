/**
 * @swagger
 * /api/client/bu/findings/readAllFindingsByPage:
 *   get:
 *     summary: Get all findings by page
 *     description: Retrieve all findings with pagination and optional keyword search.
 *     tags:
 *       - Findings
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
 *           example: "test"
 *         description: Keyword to filter findings (default is an empty string).
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
 *         description: Findings retrieved successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Findings fetched successfully."
 *               data:
 *                 totalCount: 25
 *                 findings:
 *                   - findingId: "abc123"
 *                     findingName: "Test Finding"
 *                     description: "Description of the finding."
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
 *         description: Findings not found.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "No findings found for the specified filters."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Internal server error."
 */
