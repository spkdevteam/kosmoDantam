/**
 * @swagger
 * /api/client/bu/chair/getChairDetailsWithFilters:
 *   get:
 *     summary: Get chair details with filters
 *     description: Fetches details of chairs based on filters such as date range, client, business unit, branch, status, and user filters.
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
 *       - in: query
 *         name: createdUser
 *         schema:
 *           type: string
 *         required: false
 *         description: User who created the chair details.
 *         example: "67820851a840f3a7bf1a3077"
 *       - in: query
 *         name: updatedUser
 *         schema:
 *           type: string
 *         required: false
 *         description: User who last updated the chair details.
 *         example: "67820851a840f3a7bf1a3077"
 *       - in: query
 *         name: deletedUser
 *         schema:
 *           type: string
 *         required: false
 *         description: User who deleted the chair details.
 *         example: "67820851a840f3a7bf1a3077"
 *     responses:
 *       200:
 *         description: Chair details retrieved successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "All chairs retrieved successfully."
 *               data:
 *                 chairs:
 *                   - _id: "678643c0e5226e57fc160815"
 *                     branch:
 *                       _id: "67820e34a840f3a7bf1a312d"
 *                       name: "Kosmo Dental Clinic Branch two"
 *                     businessUnit:
 *                       _id: "67820851a840f3a7bf1a307a"
 *                       name: "kasif unit two Businsenss Unit"
 *                     chairLocation: "Second Floor"
 *                     chairNumber: "Chair 1"
 *                     isActive: false
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
 *                     createdAt: "2025-01-14T11:00:16.058Z"
 *                     updatedAt: "2025-03-18T16:35:24.333Z"
 *                     __v: 0
 *                   - _id: "67b15b57c7a6e7bc208051ff"
 *                     branch:
 *                       _id: "67820e34a840f3a7bf1a312d"
 *                       name: "Kosmo Dental Clinic Branch two"
 *                     businessUnit:
 *                       _id: "67820851a840f3a7bf1a307a"
 *                       name: "kasif unit two Businsenss Unit"
 *                     chairLocation: "DEPT-1"
 *                     chairNumber: "Chair 2 "
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
 *                     createdAt: "2025-02-16T03:28:23.829Z"
 *                     updatedAt: "2025-04-03T08:44:51.267Z"
 *                     __v: 0
 *                   - _id: "67b15b68c7a6e7bc2080520b"
 *                     branch:
 *                       _id: "67820e34a840f3a7bf1a312d"
 *                       name: "Kosmo Dental Clinic Branch two"
 *                     businessUnit:
 *                       _id: "67820851a840f3a7bf1a307a"
 *                       name: "kasif unit two Businsenss Unit"
 *                     chairLocation: "floor1"
 *                     chairNumber: "Chair 3"
 *                     isActive: true
 *                     status: "InProgress"
 *                     activePatientId:
 *                       _id: "67e25140b4939bff04227f23"
 *                       firstName: "Kasif "
 *                       lastName: "Patient One"
 *                     activeAppointmentId:
 *                       _id: "67ee49901a797f4c6fee82ab"
 *                       displayId: "KC-bnch-2024-AP1000104"
 *                     createdBy:
 *                       _id: "67820851a840f3a7bf1a3077"
 *                       firstName: "kasif"
 *                       lastName: "unit two"
 *                     deletedBy: null
 *                     updatedBy:
 *                       _id: "67820851a840f3a7bf1a3077"
 *                       firstName: "kasif"
 *                       lastName: "unit two"
 *                     deletedAt: null
 *                     createdAt: "2025-02-16T03:28:40.784Z"
 *                     updatedAt: "2025-04-03T08:46:11.774Z"
 *                     __v: 0
 *                   - _id: "67b15b76c7a6e7bc20805217"
 *                     branch:
 *                       _id: "67820e34a840f3a7bf1a312d"
 *                       name: "Kosmo Dental Clinic Branch two"
 *                     businessUnit:
 *                       _id: "67820851a840f3a7bf1a307a"
 *                       name: "kasif unit two Businsenss Unit"
 *                     chairLocation: "first floor"
 *                     chairNumber: "Chair 4 "
 *                     isActive: true
 *                     status: "InProgress"
 *                     activePatientId:
 *                       _id: "678643a2e5226e57fc1607b8"
 *                       firstName: "sandeep"
 *                       lastName: "p"
 *                     activeAppointmentId:
 *                       _id: "67ee49bd1a797f4c6fee82ad"
 *                       displayId: "KC-bnch-2024-AP1000106"
 *                     createdBy:
 *                       _id: "67820851a840f3a7bf1a3077"
 *                       firstName: "kasif"
 *                       lastName: "unit two"
 *                     deletedBy: null
 *                     updatedBy:
 *                       _id: "67820851a840f3a7bf1a3077"
 *                       firstName: "kasif"
 *                       lastName: "unit two"
 *                     deletedAt: null
 *                     createdAt: "2025-02-16T03:28:54.227Z"
 *                     updatedAt: "2025-04-03T08:43:45.397Z"
 *                     __v: 0
 *                   - _id: "67b15b92c7a6e7bc20805223"
 *                     branch:
 *                       _id: "67820e34a840f3a7bf1a312d"
 *                       name: "Kosmo Dental Clinic Branch two"
 *                     businessUnit:
 *                       _id: "67820851a840f3a7bf1a307a"
 *                       name: "kasif unit two Businsenss Unit"
 *                     chairLocation: "Floor-1"
 *                     chairNumber: "Chair  5 "
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
 *                     createdAt: "2025-02-16T03:29:22.363Z"
 *                     updatedAt: "2025-03-18T15:55:08.893Z"
 *                     __v: 0
 *                 pagination:
 *                   page: 1
 *                   perPage: 5
 *                   totalCount: 5
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