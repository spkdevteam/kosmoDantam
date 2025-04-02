/**
 * @swagger
 * /api/client/bu/department/getDepartmentDetailsWithFilters:
 *   get:
 *     summary: Get department details with filters
 *     description: Fetches department details based on various filters such as date range, client, business unit, user actions, and sorting.
 *     tags:
 *       - Department
 *     parameters:
 *       - in: query
 *         name: from_Date
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: Start date for filtering departments.
 *         example: "2025-03-01"
 *       - in: query
 *         name: toDate
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: End date for filtering departments.
 *         example: "2025-03-31"
 *       - in: query
 *         name: searchKey
 *         schema:
 *           type: string
 *         required: false
 *         description: Search term for filtering department records.
 *         example: "Periodontics"
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: false
 *         description: Page number for pagination.
 *         example: 1
 *       - in: query
 *         name: perPage
 *         schema:
 *           type: integer
 *         required: false
 *         description: Number of results per page.
 *         example: 10
 *       - in: query
 *         name: clientId
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique identifier for the client.
 *         example: "67e5351aace4e5db084ae486"
 *       - in: query
 *         name: businessUnitId
 *         schema:
 *           type: string
 *          
 *         description: Unique identifier for the business unit.
 *         example: "67e5351aace4e5db084ae486"
 *       - in: query
 *         name: branchId
 *         schema:
 *           type: string
 *         required: false
 *         description: Unique identifier for the branch.
 *         example: "67e57ddcffe39db434e73769"
 *       - in: query
 *         name: createdUser
 *         schema:
 *           type: string
 *         required: false
 *         description: ID of the user who created the department record.
 *         example: "67e5351aace4e5db084ae484"
 *       - in: query
 *         name: deletedUser
 *         schema:
 *           type: string
 *         required: false
 *         description: ID of the user who deleted the department record.
 *         example: "67e5351aace4e5db084ae484"
 *       - in: query
 *         name: updatedUser
 *         schema:
 *           type: string
 *         required: false
 *         description: ID of the user who last updated the department record.
 *         example: "67e5351aace4e5db084ae484"
 *       - in: query
 *         name: sortby
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *         required: false
 *         description: Sorting options for the department records (e.g., name, createdAt).
 *         example: ["deptName", "-createdAt"]
 *     responses:
 *       200:
 *         description: Department details retrieved successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               statusCode: 200
 *               message: "Department details retrieved successfully."
 *               data:
 *                 _id: {"$oid": "67e58ee629b91003740ab643"}
 *                 displayId: "KC-pd-2024-DP1000001"
 *                 __v: 0
 *                 branch:
 *                   _id: "67e57ddcffe39db434e73769"
 *                   name: "Kosmo"
 *                 businessUnit:
 *                   _id: "67e5351aace4e5db084ae486"
 *                   name: "business Unit"
 *                 createdBy:
 *                   _id: "67e5351aace4e5db084ae484"
 *                   firstName: "67e5351aace4e5db084ae484"
 *                   lastName: "67e5351aace4e5db084ae484"
 *                 deletedBy:
 *                   _id: "67e5351aace4e5db084ae484"
 *                   firstName: "67e5351aace4e5db084ae484"
 *                   lastName: "67e5351aace4e5db084ae484"
 *                 lastUpdationBy:
 *                   _id: "67e5351aace4e5db084ae484"
 *                   firstName: "67e5351aace4e5db084ae484"
 *                   lastName: "67e5351aace4e5db084ae484"
 *                 deletedAt: null
 *                 deptName: "Periodontics"
 *                 description: "For gum disease treatment"
 *                 isActive: true
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               statusCode: 500
 *               message: "Internal server error."
 */
