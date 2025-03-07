/**
 * @swagger
 * /api/client/bu/branch/listBranch:
 *   get:
 *     summary: Get a list of branches
 *     description: Retrieves a paginated list of branches filtered by keyword, client ID, and pagination parameters.
 *     tags:
 *       - Branches
 *     parameters:
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         required: false
 *         description: A search term to filter branches by name or other fields.
 *         example: "Main"
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: false
 *         description: The page number for pagination.
 *         example: 1
 *       - in: query
 *         name: perPage
 *         schema:
 *           type: integer
 *         required: false
 *         description: The number of results per page.
 *         example: 10
 *       - in: query
 *         name: clientId
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique identifier for the client.
 *         example: "6753e5e4b403a31c6f098826"
 *     responses:
 *       200:
 *         description: List of branches retrieved successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Branches retrieved successfully."
 *               branches:
 *                 - branchId: "6736e43eecc4dfe280f90d03"
 *                   branchName: "Main Branch"
 *                   address: "123 Main St, City, Country"
 *                 - branchId: "6736e43eecc4dfe280f90d04"
 *                   branchName: "Secondary Branch"
 *                   address: "456 Side St, City, Country"
 *               meta:
 *                 currentPage: 1
 *                 totalPages: 3
 *                 totalItems: 30
 *       400:
 *         description: Validation error or missing query parameters.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Invalid input. Please provide a valid clientId."
 *       404:
 *         description: No branches found for the specified client.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "No branches found for the given client."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Internal server error."
 */
