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
 *         description: Page number for pagination.
 *       - in: query
 *         name: perPage
 *         schema:
 *           type: integer
 *           default: 20
 *         description: Number of items per page.
 *       - in: query
 *         name: searchKey
 *         schema:
 *           type: string
 *         description: Keyword to filter services.
 *       - in: query
 *         name: serviceId
 *         schema:
 *           type: string
 *         description: Service ID to filter services.
 *       - in: query
 *         name: fromDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date to filter services.
 *       - in: query
 *         name: toDate
 *         schema:
 *           type: string
 *           format: date
 *         description: End date to filter services.
 *       - in: query
 *         name: createdUser
 *         schema:
 *           type: string
 *         description: User who created the service.
 *       - in: query
 *         name: updatedUser
 *         schema:
 *           type: string
 *         description: User who updated the service.
 *       - in: query
 *         name: deletedUser
 *         schema:
 *           type: string
 *         description: User who deleted the service.
 *       - in: query
 *         name: departmentId
 *         schema:
 *           type: string
 *         description: Department ID to filter services.
 *       - in: query
 *         name: buId
 *         schema:
 *           type: string
 *         description: Business unit ID to filter services.
 *       - in: query
 *         name: branchId
 *         schema:
 *           type: string
 *         description: Branch ID to filter services.
 *     responses:
 *       200:
 *         description: Service details retrieved successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Service details retrieved successfully."
 *               data:
 *                 services:
 *                   - _id: "67a6f2d8301e33bb9ce6c926"
 *                     displayId: "KC-BU-2024-SV1006452"
 *                     departmentId:
 *                       _id: "67a6edb65f984dad91cd02d0"
 *                       deptName: "Endodontics"
 *                     serviceName: "Amalgum restoration"
 *                     description: null
 *                     isActive: true
 *                     branchId:
 *                       _id: "67820c87a840f3a7bf1a3114"
 *                       name: "Kosmo Dental Clinic Branch one"
 *                     buId:
 *                       _id: "67820851a840f3a7bf1a307a"
 *                       name: "kasif unit two Businsenss Unit"
 *                     price: 0
 *                     createdBy: null
 *                     deletedBy: null
 *                     updatedBy:
 *                       _id: "67820851a840f3a7bf1a3077"
 *                       firstName: "kasif"
 *                       lastName: "unit two"
 *                     deletedAt: null
 *                     createdAt: null
 *                     updatedAt: "2025-04-10T12:05:58.615Z"
 *                     __v: 0
 *                   - _id: "67a6f2d8301e33bb9ce6c928"
 *                     displayId: "KC-BU-2024-SV1006456"
 *                     departmentId:
 *                       _id: "67a6edb65f984dad91cd02d0"
 *                       deptName: "Endodontics"
 *                     serviceName: "Composite restoration"
 *                     description: null
 *                     isActive: true
 *                     branchId:
 *                       _id: "67820c87a840f3a7bf1a3114"
 *                       name: "Kosmo Dental Clinic Branch one"
 *                     buId:
 *                       _id: "67820851a840f3a7bf1a307a"
 *                       name: "kasif unit two Businsenss Unit"
 *                     price: 0
 *                     createdBy: null
 *                     deletedBy: null
 *                     updatedBy:
 *                       _id: "67820851a840f3a7bf1a3077"
 *                       firstName: "kasif"
 *                       lastName: "unit two"
 *                     deletedAt: null
 *                     createdAt: null
 *                     updatedAt: "2025-04-08T09:43:16.009Z"
 *                     __v: 0
 *                   - _id: "67a6f2d8301e33bb9ce6c932"
 *                     displayId: "KC-BU-2024-SV1006460"
 *                     departmentId:
 *                       _id: "67a6edb65f984dad91cd02d0"
 *                       deptName: "Endodontics"
 *                     serviceName: "Temporary restoration ZOE"
 *                     description: null
 *                     isActive: true
 *                     branchId:
 *                       _id: "67820c87a840f3a7bf1a3114"
 *                       name: "Kosmo Dental Clinic Branch one"
 *                     buId:
 *                       _id: "67820851a840f3a7bf1a307a"
 *                       name: "kasif unit two Businsenss Unit"
 *                     price: 0
 *                     createdBy: null
 *                     deletedBy: null
 *                     updatedBy:
 *                       _id: "67820851a840f3a7bf1a3077"
 *                       firstName: "kasif"
 *                       lastName: "unit two"
 *                     deletedAt: null
 *                     createdAt: null
 *                     updatedAt: "2025-04-10T16:34:19.737Z"
 *                     __v: 0
 *                   # ... other services
 *                 pagination:
 *                   page: 1
 *                   perPage: 20
 *                   totalCount: 7
 *                   totalPages: 1
 *                   createdBy: []
 *                   editedBy:
 *                     - firstName: "kasif"
 *                       lastName: "unit two"
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