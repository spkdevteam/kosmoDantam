/**
 * @swagger
 * /api/client/bu/services/getServicesDetailsWithFilters:
 *   get:
 *     summary: Get service details with filters
 *     description: Fetches service details based on various filters such as date range, client, business unit, department, and user actions.
 *     tags:
 *       - Services
 *     parameters:
 *       - in: query
 *         name: from_Date
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: Start date for filtering services.
 *         example: "2025-03-01"
 *       - in: query
 *         name: toDate
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: End date for filtering services.
 *         example: "2025-03-31"
 *       - in: query
 *         name: searchKey
 *         schema:
 *           type: string
 *         required: false
 *         description: Search term for filtering service records.
 *         example: "scaling gums"
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
 *         name: departmentId
 *         schema:
 *           type: string
 *         required: false
 *         description: Unique identifier for the department.
 *         example: "67e5351aace4e5db084ae486"
 *       - in: query
 *         name: createdUser
 *         schema:
 *           type: string
 *         required: false
 *         description: ID of the user who created the service record.
 *         example: "67e5351aace4e5db084ae484"
 *       - in: query
 *         name: deletedUser
 *         schema:
 *           type: string
 *         required: false
 *         description: ID of the user who deleted the service record.
 *         example: "67e5351aace4e5db084ae484"
 *       - in: query
 *         name: updatedUser
 *         schema:
 *           type: string
 *         required: false
 *         description: ID of the user who last updated the service record.
 *         example: "67e5351aace4e5db084ae484"
 *       - in: query
 *         name: sortby
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *         required: false
 *         description: Sorting options for the service records (e.g., name, createdAt).
 *         example: ["serviceName", "-createdAt"]
 *     responses:
 *       200:
 *         description: Service details retrieved successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               statusCode: 200
 *               message: "Service details retrieved successfully."
 *               data:
 *                 _id: "67e642d829b91003740ab6bf"
 *                 displayId: "KC-bnch-2024-SV1000001"
 *                 __v: 0
 *                 branchId:
 *                   _id: "67e57ddcffe39db434e73769"
 *                   name: "Kosmo"
 *                 buId:
 *                   _id: "67e5351aace4e5db084ae486"
 *                   name: "business Unit"
 *                 deletedAt: null
 *                 departmentId:
 *                   _id: "67e5351aace4e5db084ae486"
 *                   deptName: "Periodontics"
 *                 description: "scaling gum"
 *                 isActive: true
 *                 price: 0
 *                 procedures: []
 *                 serviceName: "scaling gums"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               statusCode: 500
 *               message: "Internal server error."
 */
