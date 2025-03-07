/**
 * @swagger
 * /api/client/bu/chiefComplaint/ListComplaintByPage:
 *   get:
 *     summary: Retrieve a paginated list of chief complaints
 *     description: Fetch a list of chief complaints based on optional filters such as client ID, keyword, page number, and the number of items per page.
 *     tags:
 *       - Chief Complaint
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
 *           example: "pain"
 *         description: Keyword to filter complaints (default is an empty string).
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
 *         description: A list of chief complaints.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Chief complaints retrieved successfully."
 *               data:
 *                 complaints:
 *                   - id: "complaint1"
 *                     title: "Tooth pain"
 *                     description: "Severe pain in the lower molar region."
 *                     createdAt: "2024-12-02T10:30:00Z"
 *                   - id: "complaint2"
 *                     title: "Jaw stiffness"
 *                     description: "Difficulty in opening the mouth."
 *                     createdAt: "2024-12-01T09:15:00Z"
 *                 page: 1
 *                 perPage: 5
 *                 totalItems: 25
 *                 totalPages: 5
 *       400:
 *         description: Validation error or invalid query parameters.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Validation error. Please check the query parameters."
 *       404:
 *         description: Client ID not found or invalid.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Client with the specified ID not found."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Internal server error."
 */
