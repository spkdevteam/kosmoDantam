/**
 * @swagger
 * /api/client/bu/department/allDepartmentsByPage:
 *   get:
 *     summary: Get all departments by page
 *     description: Fetches a paginated list of departments for a specific client with optional keyword and branch filtering.
 *     tags:
 *       - Department
 *     parameters:
 *       - in: query
 *         name: clientId
 *         schema:
 *           type: string
 *         required: true
 *         example: "6735e64c5c58f271b1ce1678"
 *         description: Unique identifier of the client.
 *       - in: query
 *         name: branchId
 *         schema:
 *           type: string
 *           example: "8974f63b4d52a341b3g92z78"
 *         description: Unique identifier of the branch.
 *       - in: query
 *         name: keyWord
 *         schema:
 *           type: string
 *           example: "pain"
 *         description: Keyword to filter departments (default is an empty string).
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
 *         description: List of departments fetched successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Departments fetched successfully."
 *               data:
 *                 currentPage: 1
 *                 totalPages: 5
 *                 departments: 
 *                   - departmentId: "6754e62c8d12a341b2f78a93"
 *                     name: "Orthopedics"
 *                     description: "Department focused on musculoskeletal care."
 *                     isActive: true
 *                   - departmentId: "6754e62c8d12a341b2f78a94"
 *                     name: "Cardiology"
 *                     description: "Department focused on heart and vascular care."
 *                     isActive: true
 *       400:
 *         description: Missing or invalid parameters.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Invalid input. Please check the query parameters."
 *       404:
 *         description: No departments found.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "No departments found for the given client or keyword."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Internal server error."
 */
