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
 *         example: ""
 *       - in: query
 *         name: toDate
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: End date for filtering procedures.
 *         example: ""
 *       - in: query
 *         name: buId
 *         schema:
 *           type: string
 *         required: false
 *         description: Unique identifier for the business unit.
 *         example: ""
 *       - in: query
 *         name: branchId
 *         schema:
 *           type: string
 *         required: false
 *         description: Unique identifier for the branch.
 *         example: ""
 *       - in: query
 *         name: createdUser
 *         schema:
 *           type: string
 *         required: false
 *         description: ID of the user who created the procedure record.
 *         example: ""
 *       - in: query
 *         name: updatedUser
 *         schema:
 *           type: string
 *         required: false
 *         description: ID of the user who last updated the procedure record.
 *         example: ""
 *       - in: query
 *         name: deletedUser
 *         schema:
 *           type: string
 *         required: false
 *         description: ID of the user who deleted the procedure record.
 *         example: ""
 *       - in: query
 *         name: serviceId
 *         schema:
 *           type: string
 *         required: false
 *         description: Unique identifier for the service.
 *         example: ""
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
 *                   - _id: "67a6f4ed6b54d7e951d696de"
 *                     services:
 *                       - _id: "67a6f2d8301e33bb9ce6c958"
 *                         serviceName: "All ceramic crown"
 *                       - _id: "67a6f2d8301e33bb9ce6c95c"
 *                         serviceName: "Laminate preparation"
 *                       - _id: "67a6f2d8301e33bb9ce6c95e"
 *                         serviceName: "Metal Ceramic crown"
 *                       - _id: "67a6f2d8301e33bb9ce6c962"
 *                         serviceName: "Zirconia crown"
 *                     procedureName: "Final cementation"
 *                     displayId: "KC-BU-2024-PC1006670"
 *                     buId:
 *                       _id: "67820851a840f3a7bf1a307a"
 *                       name: "kasif unit two Business Unit"
 *                     branchId:
 *                       _id: "67820c87a840f3a7bf1a3114"
 *                       name: "Kosmo Dental Clinic Branch one"
 *                     isActive: true
 *                     createdBy: null
 *                     deletedBy: null
 *                     updatedBy: null
 *                     deletedAt: null
 *                     createdAt: "2025-02-08T06:08:45.722Z"
 *                     updatedAt: "2025-02-16T02:22:02.609Z"
 *                     __v: 0
 *                   - _id: "67a6f4ed6b54d7e951d696dc"
 *                     services:
 *                       - _id: "67a6f2d8301e33bb9ce6c958"
 *                         serviceName: "All ceramic crown"
 *                       - _id: "67a6f2d8301e33bb9ce6c95c"
 *                         serviceName: "Laminate preparation"
 *                       - _id: "67a6f2d8301e33bb9ce6c95e"
 *                         serviceName: "Metal Ceramic crown"
 *                       - _id: "67a6f2d8301e33bb9ce6c962"
 *                         serviceName: "Zirconia crown"
 *                     procedureName: "Digital Scan"
 *                     displayId: "KC-BU-2024-PC1006667"
 *                     buId:
 *                       _id: "67820851a840f3a7bf1a307a"
 *                       name: "kasif unit two Business Unit"
 *                     branchId:
 *                       _id: "67820c87a840f3a7bf1a3114"
 *                       name: "Kosmo Dental Clinic Branch one"
 *                     isActive: true
 *                     createdBy: null
 *                     deletedBy: null
 *                     updatedBy: null
 *                     deletedAt: null
 *                     createdAt: "2025-02-08T06:08:45.721Z"
 *                     updatedAt: "2025-02-08T06:08:46.178Z"
 *                     __v: 0
 *                   - _id: "67a6f4ed6b54d7e951d696d6"
 *                     services:
 *                       - _id: "67a6f2d8301e33bb9ce6c958"
 *                         serviceName: "All ceramic crown"
 *                       - _id: "67a6f2d8301e33bb9ce6c95c"
 *                         serviceName: "Laminate preparation"
 *                       - _id: "67a6f2d8301e33bb9ce6c95e"
 *                         serviceName: "Metal Ceramic crown"
 *                       - _id: "67a6f2d8301e33bb9ce6c962"
 *                         serviceName: "Zirconia crown"
 *                     procedureName: "Bisque try in"
 *                     displayId: "KC-BU-2024-PC1006666"
 *                     buId:
 *                       _id: "67820851a840f3a7bf1a307a"
 *                       name: "kasif unit two Business Unit"
 *                     branchId:
 *                       _id: "67820c87a840f3a7bf1a3114"
 *                       name: "Kosmo Dental Clinic Branch one"
 *                     isActive: true
 *                     createdBy: null
 *                     deletedBy: null
 *                     updatedBy: null
 *                     deletedAt: null
 *                     createdAt: "2025-02-08T06:08:45.720Z"
 *                     updatedAt: "2025-02-08T06:08:45.880Z"
 *                     __v: 0
 *                   - _id: "67a6f4ed6b54d7e951d696da"
 *                     services:
 *                       - _id: "67a6f2d8301e33bb9ce6c958"
 *                         serviceName: "All ceramic crown"
 *                       - _id: "67a6f2d8301e33bb9ce6c95c"
 *                         serviceName: "Laminate preparation"
 *                       - _id: "67a6f2d8301e33bb9ce6c95e"
 *                         serviceName: "Metal Ceramic crown"
 *                       - _id: "67a6f2d8301e33bb9ce6c962"
 *                         serviceName: "Zirconia crown"
 *                     procedureName: "Crown preparation"
 *                     displayId: "KC-BU-2024-PC1006684"
 *                     buId:
 *                       _id: "67820851a840f3a7bf1a307a"
 *                       name: "kasif unit two Business Unit"
 *                     branchId:
 *                       _id: "67820c87a840f3a7bf1a3114"
 *                       name: "Kosmo Dental Clinic Branch one"
 *                     isActive: true
 *                     createdBy: null
 *                     deletedBy: null
 *                     updatedBy: null
 *                     deletedAt: null
 *                     createdAt: "2025-02-08T06:08:45.721Z"
 *                     updatedAt: "2025-02-08T06:08:46.059Z"
 *                     __v: 0
 *                   - _id: "67a6f4ed6b54d7e951d696e0"
 *                     services:
 *                       - _id: "67a6f2d8301e33bb9ce6c958"
 *                         serviceName: "All ceramic crown"
 *                       - _id: "67a6f2d8301e33bb9ce6c95c"
 *                         serviceName: "Laminate preparation"
 *                       - _id: "67a6f2d8301e33bb9ce6c95e"
 *                         serviceName: "Metal Ceramic crown"
 *                       - _id: "67a6f2d8301e33bb9ce6c962"
 *                         serviceName: "Zirconia crown"
 *                     procedureName: "Rubber base impression"
 *                     displayId: "KC-BU-2024-PC1006668"
 *                     buId:
 *                       _id: "67820851a840f3a7bf1a307a"
 *                       name: "kasif unit two Business Unit"
 *                     branchId:
 *                       _id: "67820c87a840f3a7bf1a3114"
 *                       name: "Kosmo Dental Clinic Branch one"
 *                     isActive: true
 *                     createdBy: null
 *                     deletedBy: null
 *                     updatedBy: null
 *                     deletedAt: null
 *                     createdAt: "2025-02-08T06:08:45.722Z"
 *                     updatedAt: "2025-02-08T06:08:46.355Z"
 *                     __v: 0
 *                   - _id: "67a6f4ed6b54d7e951d696d8"
 *                     services:
 *                       - _id: "67a6f2d8301e33bb9ce6c958"
 *                         serviceName: "All ceramic crown"
 *                       - _id: "67a6f2d8301e33bb9ce6c95c"
 *                         serviceName: "Laminate preparation"
 *                       - _id: "67a6f2d8301e33bb9ce6c95e"
 *                         serviceName: "Metal Ceramic crown"
 *                       - _id: "67a6f2d8301e33bb9ce6c962"
 *                         serviceName: "Zirconia crown"
 *                     procedureName: "Bite registration"
 *                     displayId: "KC-BU-2024-PC1006665"
 *                     buId:
 *                       _id: "67820851a840f3a7bf1a307a"
 *                       name: "kasif unit two Business Unit"
 *                     branchId:
 *                       _id: "67820c87a840f3a7bf1a3114"
 *                       name: "Kosmo Dental Clinic Branch one"
 *                     isActive: true
 *                     createdBy: null
 *                     deletedBy: null
 *                     updatedBy: null
 *                     deletedAt: null
 *                     createdAt: "2025-02-08T06:08:45.721Z"
 *                     updatedAt: "2025-02-08T06:08:45.970Z"
 *                     __v: 0
 *                 pagination:
 *                   page: 1
 *                   perPage: 10
 *                   totalCount: 6
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