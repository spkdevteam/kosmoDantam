/**
 * @swagger
 * /api/client/bu/booking/getBranchDetails:
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
 *         example: "2024-01-01"
 *       - in: query
 *         name: toDate
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: End date for filtering branch details (YYYY-MM-DD).
 *         example: "2024-12-31"
 *       - in: query
 *         name: SearchKey
 *         schema:
 *           type: string
 *         required: false
 *         description: Search keyword for filtering branch details.
 *         example: "pragya"
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
 *         example: "6735e64c5c58f271b1ce1678"
 *       - in: query
 *         name: businessUnitId
 *         schema:
 *           type: string
 *         required: false
 *         description: Unique identifier for the business unit.
 *         example: "67e5351aace4e5db084ae486"
 *     responses:
 *       200:
 *         description: Branch details retrieved successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               statusCode: 200
 *               message: "Branch details retrieved successfully."
 *               data:
 *                 _id: "67e578b0ffe39db434e73658"
 *                 displayId: "KC-bnch-2024-BR1000001"
 *                 businessUnit:
 *                   _id: "67e5351aace4e5db084ae486"
 *                   name: "Business Unit"
 *                 branchHead: null
 *                 bookingContact: "7907441232"
 *                 name: "pragya"
 *                 incorporationName: "L12345MH2023PLC000789"
 *                 cinNumber: "U12345KA2019PTC012345"
 *                 gstNumber: "27AAAPA1234A1Z5"
 *                 branchPrefix: "pd"
 *                 branchLogo: null
 *                 emailContact: "pragya@yopmail.com"
 *                 contactNumber: "9836867983"
 *                 city: "South 24 Parganas district"
 *                 state: "West Bengal"
 *                 country: "India"
 *                 ZipCode: "700074"
 *                 address: "2/13 DumDum, Nager Bazar"
 *                 isActive: false
 *                 createdBy: null
 *                 deletedAt: "2025-03-27T16:16:27.361Z"
 *                 createdAt: "2025-03-27T16:11:28.969Z"
 *                 updatedAt: "2025-03-27T16:16:27.362Z"
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
