/**
 * @swagger
 * /api/client/bu/department/getDepartmentDetailsWithFilters:
 *   get:
 *     summary: Get department details with filters
 *     description: Fetches department details with optional filters like keyword, client ID, branch ID, etc.
 *     tags:
 *       - Department
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
 *         description: Page number for pagination (default is 1).
 *       - in: query
 *         name: perPage
 *         schema:
 *           type: integer
 *           default: 2
 *           example: 2
 *         description: Number of items per page (default is 2).
 *       - in: query
 *         name: searchKey
 *         schema:
 *           type: string
 *           example: "perio"
 *         description: Keyword to filter departments (default is an empty string).
 *       - in: query
 *         name: departmentId
 *         schema:
 *           type: string
 *           example: ""
 *         description: department ID to filter department (optional).
 *       - in: query
 *         name: fromDate
 *         schema:
 *           type: string
 *           format: date
 *           example: ""
 *         description: The start date to filter the departments (optional).
 *       - in: query
 *         name: buId
 *         schema:
 *           type: string
 *           example: ""
 *         description: Business unit ID to filter departments (optional).
 *       - in: query
 *         name: branchId
 *         schema:
 *           type: string
 *           example: ""
 *         description: Branch ID to filter departments (optional).
 *       - in: query
 *         name: createdUser
 *         schema:
 *           type: string
 *           example: ""
 *         description: User who created the department (optional).
 *       - in: query
 *         name: updatedUser
 *         schema:
 *           type: string
 *           example: ""
 *         description: User who updated the department (optional).
 *       - in: query
 *         name: deletedUser
 *         schema:
 *           type: string
 *           example: ""
 *         description: User who deleted the department (optional).
 *     responses:
 *       200:
 *         description: Department details retrieved successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Department details retrieved successfully."
 *               data:
 *                 departments:
 *                   - _id: "67a6edb65f984dad91cd02cc"
 *                     deptName: "Periodontics"
 *                     displayId: "KC-BU-2024-DP1000473"
 *                     branchId:
 *                       _id: "67820c87a840f3a7bf1a3114"
 *                       name: "Kosmo Dental Clinic Branch one"
 *                     buId:
 *                       _id: "67820851a840f3a7bf1a307a"
 *                       name: "kasif unit two Business Unit"
 *                     description: null
 *                     isActive: true
 *                     createdBy: null
 *                     deletedBy: null
 *                     updatedBy: null
 *                     deletedAt: null
 *                     createdAt: null
 *                     updatedAt: null
 *                     __v: 0
 *                   - _id: "67a6edb65f984dad91cd02cd"
 *                     deptName: "Periodontics"
 *                     displayId: "KC-BU-2024-DP1000474"
 *                     branchId:
 *                       _id: "67820e34a840f3a7bf1a312d"
 *                       name: "Kosmo Dental Clinic Branch two"
 *                     buId:
 *                       _id: "67820851a840f3a7bf1a307a"
 *                       name: "kasif unit two Business Unit"
 *                     description: null
 *                     isActive: true
 *                     createdBy: null
 *                     deletedBy: null
 *                     updatedBy: null
 *                     deletedAt: null
 *                     createdAt: null
 *                     updatedAt: null
 *                     __v: 0
 *                 metadata:
 *                   page: 1
 *                   perPage: 2
 *                   totalCount: 2
 *                   totalPages: 1
 *       400:
 *         description: Missing or invalid parameters.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Invalid input. Please check the query parameters."
 *       404:
 *         description: No departments found with the given filters.
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