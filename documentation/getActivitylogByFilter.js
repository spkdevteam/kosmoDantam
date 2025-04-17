/**
 * @swagger
 * /api/client/bu/activityLog/getActivityLogDetailsByFilter:
 *   get:
 *     summary: Get activity logs by filters
 *     description: Retrieve activity logs based on various optional filters such as date range, user, patient, branch, and more, with pagination support.
 *     tags:
 *       - Activity Log
 *     parameters:
 *       - in: query
 *         name: clientId
 *         schema:
 *           type: string
 *         required: true
 *         example: "6782084da840f3a7bf1a2f72"
 *         description: Unique identifier of the client.
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *           example: 1
 *         description: Page number for pagination.
 *       - in: query
 *         name: perPage
 *         schema:
 *           type: integer
 *           default: 10
 *           example: 10
 *         description: Number of items per page.
 *       - in: query
 *         name: fromDate
 *         schema:
 *           type: string
 *           format: date
 *           example: "2025-01-01"
 *         description: Start date for filtering logs.
 *       - in: query
 *         name: toDate
 *         schema:
 *           type: string
 *           format: date
 *           example: "2025-03-01"
 *         description: End date for filtering logs.
 *       - in: query
 *         name: buId
 *         schema:
 *           type: string
 *           example: "67820851a840f3a7bf1a307a"
 *         description: Business Unit ID to filter logs.
 *       - in: query
 *         name: searchKey
 *         schema:
 *           type: string
 *           example: "Invoice"
 *         description: Keyword to search activity or description.
 *       - in: query
 *         name: branchId
 *         schema:
 *           type: string
 *           example: "67820e34a840f3a7bf1a312d"
 *         description: Branch ID to filter logs.
 *       - in: query
 *         name: patientId
 *         schema:
 *           type: string
 *           example: ""
 *         description: Patient ID to filter logs.
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *           example: ""
 *         description: User ID to filter logs.
 *       - in: query
 *         name: year
 *         schema:
 *           type: string
 *           example: "2025"
 *         description: Filter logs by year.
 *     responses:
 *       200:
 *         description: Activity logs retrieved successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Activity logs retrieved successfully."
 *               data:
 *                 activityLogs:
 *                   - _id: "67a821c491c03f67d6c5fd53"
 *                     branchId:
 *                       _id: "67820e34a840f3a7bf1a312d"
 *                       name: "Kosmo Dental Clinic Branch two"
 *                     buId:
 *                       _id: "67820851a840f3a7bf1a307a"
 *                       name: "kasif unit two Businsenss Unit"
 *                     userId:
 *                       _id: "67871f6a7bb6b5c411365ff7"
 *                       firstName: "sandeep"
 *                       lastName: "p"
 *                     sourceLink: "dantam.app/invoice"
 *                     activity: "Invoice Created"
 *                     description: ""
 *                     data: {}
 *                     status: false
 *                     datetime: "12/05/1988T00:10:51.000z"
 *                     createdBy:
 *                       _id: "67820851a840f3a7bf1a3077"
 *                       firstName: "kasif"
 *                       lastName: "unit two"
 *                     updatedBy:
 *                       _id: "67820851a840f3a7bf1a3077"
 *                       firstName: "kasif"
 *                       lastName: "unit two"
 *                     deletedBy: null
 *                     deletedAt: null
 *                     createdAt: "2025-02-09T03:32:20.392Z"
 *                     updatedAt: "2025-02-09T16:31:46.329Z"
 *                     __v: 0
 *                 metadata:
 *                   page: 1
 *                   perPage: 1
 *                   totalCount: 1
 *                   totalPages: 1
 *       400:
 *         description: Validation error or missing parameters.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Validation error. Please check the input fields."
 *       404:
 *         description: No activity logs found.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "No activity logs found for the specified filters."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Internal server error."
 */