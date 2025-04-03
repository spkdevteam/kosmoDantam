/**
 * @swagger
 * /api/client/bu/services/getServiceDetailsWithFilters:
 *   get:
 *     summary: Get service details with filters
 *     description: Fetches service details with optional filters like keyword, client ID, department ID, and more.
 *     tags:
 *       - Services
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
 *           default: 4
 *           example: 4
 *         description: Number of items per page (default is 4).
 *       - in: query
 *         name: searchKey
 *         schema:
 *           type: string
 *           example: ""
 *         description: Keyword to filter services (default is an empty string).
 *       - in: query
 *         name: fromDate
 *         schema:
 *           type: string
 *           format: date
 *           example: ""
 *         description: The start date to filter the services (optional).
 *       - in: query
 *         name: toDate
 *         schema:
 *           type: string
 *           format: date
 *           example: ""
 *         description: The end date to filter the services (optional).
 *       - in: query
 *         name: createdUser
 *         schema:
 *           type: string
 *           example: ""
 *         description: User who created the service (optional).
 *       - in: query
 *         name: updatedUser
 *         schema:
 *           type: string
 *           example: ""
 *         description: User who updated the service (optional).
 *       - in: query
 *         name: deletedUser
 *         schema:
 *           type: string
 *           example: ""
 *         description: User who deleted the service (optional).
 *       - in: query
 *         name: departmentId
 *         schema:
 *           type: string
 *           example: "67a6edb65f984dad91cd02d0"
 *         description: Department ID to filter services (optional).
 *       - in: query
 *         name: buId
 *         schema:
 *           type: string
 *           example: ""
 *         description: Business unit ID to filter services (optional).
 *       - in: query
 *         name: branchId
 *         schema:
 *           type: string
 *           example: ""
 *         description: Branch ID to filter services (optional).
 *     responses:
 *       200:
 *         description: Service details retrieved successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Department details retrieved successfully."
 *               data:
 *                 services:
 *                   - _id: "67a6f2d8301e33bb9ce6c926"
 *                     displayId: "KC-BU-2024-SV1006452"
 *                     departmentId:
 *                       _id: "67a6edb65f984dad91cd02d0"
 *                       deptName: "Endodontics"
 *                     serviceName: "Amalgam restoration"
 *                     description: null
 *                     isActive: true
 *                     branchId:
 *                       _id: "67820c87a840f3a7bf1a3114"
 *                       name: "Kosmo Dental Clinic Branch one"
 *                     buId:
 *                       _id: "67820851a840f3a7bf1a307a"
 *                       name: "kasif unit two Business Unit"
 *                     price: 0
 *                     createdBy: null
 *                     deletedBy: null
 *                     updatedBy: null
 *                     deletedAt: null
 *                     createdAt: null
 *                     updatedAt: null
 *                     __v: 0
 *                   - _id: "67a6f2d8301e33bb9ce6c92a"
 *                     displayId: "KC-BU-2024-SV1006475"
 *                     departmentId:
 *                       _id: "67a6edb65f984dad91cd02d0"
 *                       deptName: "Endodontics"
 *                     serviceName: "Composite Veneer/Laminate"
 *                     description: null
 *                     isActive: true
 *                     branchId:
 *                       _id: "67820c87a840f3a7bf1a3114"
 *                       name: "Kosmo Dental Clinic Branch one"
 *                     buId:
 *                       _id: "67820851a840f3a7bf1a307a"
 *                       name: "kasif unit two Business Unit"
 *                     price: 0
 *                     createdBy: null
 *                     deletedBy: null
 *                     updatedBy: null
 *                     deletedAt: null
 *                     createdAt: null
 *                     updatedAt: null
 *                     __v: 0
 *                   - _id: "67a6f2d8301e33bb9ce6c92e"
 *                     displayId: "KC-BU-2024-SV1006457"
 *                     departmentId:
 *                       _id: "67a6edb65f984dad91cd02d0"
 *                       deptName: "Endodontics"
 *                     serviceName: "Re Root Can Treatment"
 *                     description: "s"
 *                     isActive: true
 *                     branchId:
 *                       _id: "67820c87a840f3a7bf1a3114"
 *                       name: "Kosmo Dental Clinic Branch one"
 *                     buId:
 *                       _id: "67820851a840f3a7bf1a307a"
 *                       name: "kasif unit two Business Unit"
 *                     price: 0
 *                     createdBy: null
 *                     deletedBy: null
 *                     updatedBy: null
 *                     deletedAt: null
 *                     createdAt: null
 *                     updatedAt: null
 *                     __v: 0
 *                   - _id: "67a6f2d8301e33bb9ce6c930"
 *                     displayId: "KC-BU-2024-SV1006459"
 *                     departmentId:
 *                       _id: "67a6edb65f984dad91cd02d0"
 *                       deptName: "Endodontics"
 *                     serviceName: "Root Canal Treatment"
 *                     description: null
 *                     isActive: true
 *                     branchId:
 *                       _id: "67820c87a840f3a7bf1a3114"
 *                       name: "Kosmo Dental Clinic Branch one"
 *                     buId:
 *                       _id: "67820851a840f3a7bf1a307a"
 *                       name: "kasif unit two Business Unit"
 *                     price: 0
 *                     createdBy: null
 *                     deletedBy: null
 *                     updatedBy: null
 *                     deletedAt: null
 *                     createdAt: null
 *                     updatedAt: null
 *                     __v: 0
 *                 pagination:
 *                   page: 1
 *                   perPage: 4
 *                   totalCount: 7
 *                   totalPages: 2
 *       400:
 *         description: Missing or invalid parameters.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Invalid input. Please check the query parameters."
 *       404:
 *         description: No services found with the given filters.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "No services found for the given client or keyword."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Internal server error."
 */