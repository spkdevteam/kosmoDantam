/**
 * @swagger
 * /api/client/bu/procedures/proceduresByPage:
 *   get:
 *     summary: Get procedures by page
 *     description: Retrieve a paginated list of procedures with optional keyword search.
 *     tags:
 *       - Procedures
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
 *           example: "dental"
 *         description: Keyword to filter procedures (default is an empty string).
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
 *         description: Procedures retrieved successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Procedures fetched successfully."
 *               data:
 *                 totalCount: 100
 *                 procedures:
 *                   - procedureId: "proc123"
 *                     procedureName: "Dental Cleaning"
 *                     description: "Regular dental cleaning to remove plaque and tartar."
 *                     isActive: true
 *                     createdAt: "2024-12-01T10:00:00Z"
 *                   - procedureId: "proc124"
 *                     procedureName: "Tooth Extraction"
 *                     description: "Procedure to safely remove a damaged or decayed tooth."
 *                     isActive: true
 *                     createdAt: "2024-12-01T11:00:00Z"
 *       400:
 *         description: Validation error or missing data.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Validation error. Please check the input fields."
 *       404:
 *         description: Procedures not found.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "No procedures found for the specified filters."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Internal server error."
 */
