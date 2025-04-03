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
 *         name: from_Date
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: Start date for filtering procedures.
 *         example: "2025-03-01"
 *       - in: query
 *         name: toDate
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: End date for filtering procedures.
 *         example: "2025-03-31"
 *       - in: query
 *         name: searchKey
 *         schema:
 *           type: string
 *         required: false
 *         description: Search term for filtering procedure records.
 *         example: "Root canal"
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
 *         name: serviceId
 *         schema:
 *           type: string
 *         required: false
 *         description: Unique identifier for the service.
 *         example: "67e5351aace4e5db084ae486"
 *       - in: query
 *         name: createdUser
 *         schema:
 *           type: string
 *         required: false
 *         description: ID of the user who created the procedure record.
 *         example: "67e5351aace4e5db084ae484"
 *       - in: query
 *         name: deletedUser
 *         schema:
 *           type: string
 *         required: false
 *         description: ID of the user who deleted the procedure record.
 *         example: "67e5351aace4e5db084ae484"
 *       - in: query
 *         name: updatedUser
 *         schema:
 *           type: string
 *         required: false
 *         description: ID of the user who last updated the procedure record.
 *         example: "67e5351aace4e5db084ae484"
 *       - in: query
 *         name: sortby
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *         required: false
 *         description: Sorting options for procedure records (e.g., name, createdAt).
 *         example: ["procedureName", "-createdAt"]
 *     responses:
 *       200:
 *         description: Procedure details retrieved successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               statusCode: 200
 *               message: "Procedure details retrieved successfully."
 *               data:
 *                 _id: "67e6627c29b91003740ab706"
 *                 displayId: "KC-adc-2024-PC1000001"
 *                 __v: 0
 *                 branchId:
 *                   _id: "67e57ddcffe39db434e73769"
 *                   name: "Kosmo"
 *                 buId:
 *                   _id: "67e5351aace4e5db084ae486"
 *                   name: "business Unit"
 *                 deptId:
 *                   _id: "67e5351aace4e5db084ae486"
 *                   deptName: "Periodontics"
 *                 description: "Root canal"
 *                 isActive: true
 *                 procedureName: "Root canal"
 *                 services:
 *                   - _id: "67e5351aace4e5db084ae486"
 *                     serviceName: "scaling gums"
 *                   - _id: "67e53e1aace4e5db084ae486"
 *                     serviceName: "scaling"
 *                   - _id: "67e5351aace4x5db084ae486"
 *                     serviceName: "gums"
 *                 createdBy:
 *                   _id: "67e5351aace4e5db084ae484"
 *                   firstName: "John"
 *                   lastName: "Doe"
 *                 deletedBy:
 *                   _id: "67e5351aace4e5db084ae484"
 *                   firstName: "Jane"
 *                   lastName: "Doe"
 *                 lastUpdationBy:
 *                   _id: "67e5351aace4e5db084ae484"
 *                   firstName: "Alice"
 *                   lastName: "Smith"
 *                 deletedAt: "2025-03-28T08:51:54.360Z"
 *                 createdAt: "2025-03-28T08:49:00.584Z"
 *                 updatedAt: "2025-03-28T04:23:34.979Z"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               statusCode: 500
 *               message: "Internal server error."
 */
