/**
 * @swagger
 * /api/client/bu/chair/getChairDetailsWithFilters:
 *   get:
 *     summary: Get chair details with filters
 *     description: Fetches details of chairs based on filters such as date range, client, business unit, branch, and status.
 *     tags:
 *       - ChairManagement
 *     parameters:
 *       - in: query
 *         name: clientId
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique identifier for the client.
 *         example: "6782084da840f3a7bf1a2f72"
 *       - in: query
 *         name: businessUnitId
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique identifier for the business unit.
 *         example: "67820851a840f3a7bf1a307a"
 *       - in: query
 *         name: branchId
 *         schema:
 *           type: string
 *         required: false
 *         description: Unique identifier for the branch.
 *         example: "67820e34a840f3a7bf1a312d"
 *       - in: query
 *         name: fromDate
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: Start date of the filter range.
 *         example: "2025-02-15"
 *       - in: query
 *         name: toDate
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: End date of the filter range.
 *         example: "2025-02-17"
 *       - in: query
 *         name: searchKey
 *         schema:
 *           type: string
 *         required: false
 *         description: Search keyword for filtering chair details.
 *         example: "first"
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         required: false
 *         description: Chair status filter.
 *         example: "Ready"
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
 *     responses:
 *       200:
 *         description: Chair details retrieved successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Chair details retrieved successfully."
 *               data:
 *                 chairs:
 *                   - _id: "67b15b76c7a6e7bc20805217"
 *                     branch:
 *                       _id: "67820e34a840f3a7bf1a312d"
 *                       name: "Kosmo Dental Clinic Branch two"
 *                     businessUnit:
 *                       _id: "67820851a840f3a7bf1a307a"
 *                       name: "kasif unit two Business Unit"
 *                     chairLocation: "first floor"
 *                     chairNumber: "Chair 4"
 *                     isActive: true
 *                     status: "Ready"
 *                     activePatientId: null
 *                     activeAppointmentId: null
 *                     createdBy:
 *                       _id: "67820851a840f3a7bf1a3077"
 *                       firstName: "kasif"
 *                       lastName: "unit two"
 *                     deletedBy: null
 *                     updatedBy: null
 *                     deletedAt: null
 *                     createdAt: "2025-02-16T03:28:54.227Z"
 *                     updatedAt: "2025-03-18T16:34:52.425Z"
 *                     __v: 0
 *                 pagination:
 *                   page: 1
 *                   perPage: 10
 *                   totalCount: 1
 *                   totalPages: 1
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               statusCode: 500
 *               message: "Internal server error."
 */