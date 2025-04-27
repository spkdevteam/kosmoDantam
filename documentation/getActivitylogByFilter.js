/**
 * @swagger
 * /api/client/bu/activityLog/getActivityLogDetailsWithFilter:
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
 *           example: ""
 *         description: Start date for filtering logs.
 *       - in: query
 *         name: toDate
 *         schema:
 *           type: string
 *           format: date
 *           example: ""
 *         description: End date for filtering logs.
 *       - in: query
 *         name: buId
 *         schema:
 *           type: string
 *           example: ""
 *         description: Business Unit ID to filter logs.
 *       - in: query
 *         name: searchKey
 *         schema:
 *           type: string
 *           example: ""
 *         description: Keyword to search activity, description, or within data.
 *       - in: query
 *         name: branchId
 *         schema:
 *           type: string
 *           example: ""
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
 *         name: createdUser
 *         schema:
 *           type: string
 *           example: ""
 *         description: Filter by creator user ID.
 *       - in: query
 *         name: updatedUser
 *         schema:
 *           type: string
 *           example: ""
 *         description: Filter by updater user ID.
 *     responses:
 *       200:
 *         description: Activity Logs details retrieved successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Activity Logs details retrieved successfully."
 *               data:
 *                 activityLogs:
 *                   - _id: "680a04783d0cd89533bec8ef"
 *                     patientId:
 *                       _id: "680a04783d0cd89533bec8ed"
 *                       firstName: "forActivityLog"
 *                       lastName: "forActivityLog"
 *                     module: "patient"
 *                     branchId:
 *                       _id: "67820e34a840f3a7bf1a312d"
 *                       name: "Kosmo Dental Clinic Branch two"
 *                     buId:
 *                       _id: "67820851a840f3a7bf1a307a"
 *                       name: "kasif unit two Businsenss Unit"
 *                     userId: null
 *                     ipAddress: "::1"
 *                     activity: "Created a patient"
 *                     description: "Creating the patient, and saving activity log for it"
 *                     data:
 *                       displayId: "KC-bnch-2024-PT1000054"
 *                       branch: "67820e34a840f3a7bf1a312d"
 *                       businessUnit: "67820851a840f3a7bf1a307a"
 *                       mainPatientLinkedid: null
 *                       isChainedWithMainPatient: false
 *                       relation: null
 *                       firstName: "forActivityLog"
 *                       lastName: "forActivityLog"
 *                       profileImage: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
 *                       email: "foractivityl3og@yopmail.com"
 *                       phone: "1236547898"
 *                       gender: "Male"
 *                       age: 22
 *                       bloodGroup: ""
 *                       patientGroup: ""
 *                       referedBy: ""
 *                       city: ""
 *                       state: ""
 *                       country: ""
 *                       ZipCode: ""
 *                       address: ""
 *                       isActive: true
 *                       createdBy: "67820851a840f3a7bf1a3077"
 *                       deletedAt: null
 *                       updatedBy: null
 *                       deletedBy: null
 *                       _id: "680a04783d0cd89533bec8ed"
 *                       medicalHistory: []
 *                       createdAt: "2025-04-24T09:29:28.496Z"
 *                       updatedAt: "2025-04-24T09:29:28.496Z"
 *                       __v: 0
 *                     status: true
 *                     dateTime: "2025-04-24T09:29:28.779Z"
 *                     createdBy:
 *                       _id: "67820851a840f3a7bf1a3077"
 *                       firstName: "kasif"
 *                       lastName: "unit two"
 *                     updatedBy: null
 *                     deletedBy: null
 *                     deletedAt: null
 *                     createdAt: "2025-04-24T09:29:28.785Z"
 *                     updatedAt: "2025-04-24T09:29:28.785Z"
 *                     __v: 0
 *                 metadata:
 *                   page: 1
 *                   perPage: 10
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