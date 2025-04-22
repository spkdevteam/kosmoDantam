/**
 * @swagger
 * /api/client/bu/procedures/getProcedureDetailsWithFilters:
 *   get:
 *     summary: Get procedure details with filters
 *     description: Retrieves procedure details based on various filters such as date range, client, business unit, department, services, and user actions.
 *     tags:
 *       - Procedures
 *     parameters:
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
 *         name: searchKey
 *         schema:
 *           type: string
 *         required: false
 *         description: Search term for filtering procedure records.
 *         example: "final"
 *       - in: query
 *         name: procedureId
 *         schema:
 *           type: string
 *         required: false
 *         description: Procedure ID to filter procedures.
 *       - in: query
 *         name: clientId
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique identifier for the client.
 *         example: "6782084da840f3a7bf1a2f72"
 *       - in: query
 *         name: fromDate
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: Start date for filtering procedures.
 *       - in: query
 *         name: toDate
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: End date for filtering procedures.
 *       - in: query
 *         name: buId
 *         schema:
 *           type: string
 *         required: false
 *         description: Unique identifier for the business unit.
 *       - in: query
 *         name: branchId
 *         schema:
 *           type: string
 *         required: false
 *         description: Unique identifier for the branch.
 *       - in: query
 *         name: createdUser
 *         schema:
 *           type: string
 *         required: false
 *         description: ID of the user who created the procedure record.
 *       - in: query
 *         name: updatedUser
 *         schema:
 *           type: string
 *         required: false
 *         description: ID of the user who last updated the procedure record.
 *       - in: query
 *         name: deletedUser
 *         schema:
 *           type: string
 *         required: false
 *         description: ID of the user who deleted the procedure record.
 *       - in: query
 *         name: serviceId
 *         schema:
 *           type: string
 *         required: false
 *         description: Unique identifier for the service.
 *     responses:
 *       200:
 *         description: Procedure details retrieved successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Procedure details retrieved successfully."
 *               data:
 *                 procedures:
 *                   - _id: "67a6f4ed6b54d7e951d696dc"
 *                     services:
 *                       - _id: "67a6f2d8301e33bb9ce6c958"
 *                         serviceName: "All  ceramic crown "
 *                         departmentId: "67a6edb65f984dad91cd02d2"
 *                       - _id: "67a6f2d8301e33bb9ce6c95c"
 *                         serviceName: "Laminate preparation"
 *                         departmentId: "67a6edb65f984dad91cd02d2"
 *                       - _id: "67a6f2d8301e33bb9ce6c95e"
 *                         serviceName: "Metal  Ceramic crown "
 *                         departmentId: "67a6edb65f984dad91cd02d2"
 *                       - _id: "67a6f2d8301e33bb9ce6c962"
 *                         serviceName: "Zirconia crown "
 *                         departmentId: "67a6edb65f984dad91cd02d2"
 *                     procedureName: "Digital Scan"
 *                     displayId: "KC-BU-2024-PC1006667"
 *                     buId:
 *                       _id: "67820851a840f3a7bf1a307a"
 *                       name: "kasif unit two Businsenss Unit"
 *                     branchId:
 *                       _id: "67820c87a840f3a7bf1a3114"
 *                       name: "Kosmo Dental Clinic Branch one"
 *                     isActive: false
 *                     createdBy: null
 *                     deletedBy: null
 *                     updatedBy:
 *                       _id: "67820851a840f3a7bf1a3077"
 *                       firstName: "kasif"
 *                       lastName: "unit two"
 *                     deletedAt: null
 *                     createdAt: "2025-02-08T06:08:45.721Z"
 *                     updatedAt: "2025-04-12T18:53:59.904Z"
 *                     __v: 0
 *                   - _id: "67a6f4ed6b54d7e951d696da"
 *                     procedureName: "Crown preparation"
 *                     displayId: "KC-BU-2024-PC1006684"
 *                     buId:
 *                       _id: "67820851a840f3a7bf1a307a"
 *                       name: "kasif unit two Businsenss Unit"
 *                     branchId:
 *                       _id: "67820c87a840f3a7bf1a3114"
 *                       name: "Kosmo Dental Clinic Branch one"
 *                     isActive: true
 *                     createdBy: null
 *                     deletedBy: null
 *                     updatedBy:
 *                       _id: "67820851a840f3a7bf1a3077"
 *                       firstName: "kasif"
 *                       lastName: "unit two"
 *                     deletedAt: null
 *                     createdAt: "2025-02-08T06:08:45.721Z"
 *                     updatedAt: "2025-04-07T12:07:55.428Z"
 *                     __v: 0
 *                     services:
 *                       # same as above...
 *                   - _id: "67a6f4ed6b54d7e951d696d8"
 *                     procedureName: "Bite registation"
 *                     displayId: "KC-BU-2024-PC1006665"
 *                     buId:
 *                       _id: "67820851a840f3a7bf1a307a"
 *                       name: "kasif unit two Businsenss Unit"
 *                     branchId:
 *                       _id: "67820c87a840f3a7bf1a3114"
 *                       name: "Kosmo Dental Clinic Branch one"
 *                     isActive: true
 *                     createdBy: null
 *                     deletedBy: null
 *                     updatedBy:
 *                       _id: "67820851a840f3a7bf1a3077"
 *                       firstName: "kasif"
 *                       lastName: "unit two"
 *                     deletedAt: null
 *                     createdAt: "2025-02-08T06:08:45.721Z"
 *                     updatedAt: "2025-04-09T08:59:13.465Z"
 *                     __v: 0
 *                     services:
 *                       # same as above...
 *                 metadata:
 *                   page: 1
 *                   perPage: 10
 *                   totalCount: 3
 *                   totalPages: 1
 *                   createdBy: []
 *                   editedBy:
 *                     - _id: "67820851a840f3a7bf1a3077"
 *                       firstName: "kasif"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               statusCode: 500
 *               message: "Internal server error."
 */