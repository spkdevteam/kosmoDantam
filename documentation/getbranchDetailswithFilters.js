/**
 * @swagger
 * /api/client/bu/branch/getBranchDetails:
 *   get:
 *     summary: Get branch details
 *     description: Fetches details of branches based on the provided criteria.
 *     tags:
 *       - Branches
 *     parameters:
 *       - in: query
 *         name: from_Date
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: Start date for filtering branch details (YYYY-MM-DD).
 *       - in: query
 *         name: toDate
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: End date for filtering branch details (YYYY-MM-DD).
 *       - in: query
 *         name: SearchKey
 *         schema:
 *           type: string
 *         required: false
 *         description: Search keyword for filtering branch details.
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
 *         description: Number of records per page for pagination.
 *         example: 10
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
 *         description: ID of the user who created the branch.
 *       - in: query
 *         name: updatedUser
 *         schema:
 *           type: string
 *         required: false
 *         description: ID of the user who last updated the branch.
 *     responses:
 *       200:
 *         description: Branch details retrieved successfully.
 *         content:
 *           application/json:
 *             example:
 *               message: "Branch details retrieved successfully."
 *               data:
 *                 branches:
 *                   - _id: "67eb95a9c9afec7c3b5f7f32"
 *                     displayId: "KC-bnch-2024-BR1000001"
 *                     businessUnit:
 *                       _id: "67eb886ac31f4280a4268ae3"
 *                       name: "avishek G Businsenss Unit"
 *                     branchHead: null
 *                     bookingContact: "7907441232"
 *                     name: "Oral Care Clinic"
 *                     incorporationName: "AGJDYG7293AJDDW"
 *                     cinNumber: ""
 *                     gstNumber: ""
 *                     branchPrefix: "ORC"
 *                     branchLogo: "1743493529408_sree-dental-hospital-logo-1.png"
 *                     emailContact: "oralcare@yopmail.com"
 *                     contactNumber: "9098898997"
 *                     city: "Kolkata"
 *                     state: "West Bengal"
 *                     country: "India"
 *                     ZipCode: "700089"
 *                     address: ""
 *                     isActive: true
 *                     createdBy: null
 *                     deletedAt: null
 *                     createdAt: "2025-04-01T07:28:41.175Z"
 *                     updatedAt: "2025-04-19T11:12:22.112Z"
 *                     __v: 0
 *                     updatedBy:
 *                       _id: "67eb886ac31f4280a4268ae0"
 *                       firstName: "avishek"
 *                       lastName: "G"
 *                 metaData:
 *                   currentPage: 1
 *                   perPage: 10
 *                   SearchKey: ""
 *                   totalDocs: 1
 *                   totalPages: 1
 *                   createdBy: []
 *                   editedBy:
 *                     - _id: "67eb886ac31f4280a4268ae0"
 *                       firstName: "avishek"
 *               status: true
 *       400:
 *         description: Missing or invalid input parameters.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               statusCode: 400
 *               message: "Invalid input data. Please check the query parameters."
 *       404:
 *         description: No branch details found for the given criteria.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               statusCode: 404
 *               message: "No branch details found for the specified criteria."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               statusCode: 500
 *               message: "Internal server error."
 */