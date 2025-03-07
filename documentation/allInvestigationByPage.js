/**
 * @swagger
 * /api/client/bu/investigation/allInvestigationByPage:
 *   get:
 *     summary: Get all investigations by page
 *     description: Retrieve all investigations with pagination and optional keyword search.
 *     tags:
 *       - Investigation
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
 *           example: "blood test"
 *         description: Keyword to filter investigations (default is an empty string).
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
 *         description: Investigations retrieved successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Investigations fetched successfully."
 *               data:
 *                 totalCount: 50
 *                 investigations:
 *                   - investigationId: "inv123"
 *                     investigationName: "Complete Blood Count"
 *                     description: "A routine blood test for various metrics."
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
 *         description: Investigations not found.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "No investigations found for the specified filters."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Internal server error."
 */
