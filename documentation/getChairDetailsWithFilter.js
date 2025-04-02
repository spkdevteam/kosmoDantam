/**
 * @swagger
    /api/client/bu/chair/getChairDetailsWithFilters:
 *   get:
 *     summary: Get chair details with filters
 *     description: Fetches details of chairs based on filters such as date range, client, business unit, and user actions.
 *     tags:
 *       - ChairManagement
 *     parameters:
 *       - in: query
 *         name: from_Date
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: Start date of the filter range.
 *         example: "2025-03-01"
 *       - in: query
 *         name: toDate
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: End date of the filter range.
 *         example: "2025-03-31"
 *       - in: query
 *         name: searchKey
 *         schema:
 *           type: string
 *         required: false
 *         description: Search keyword for filtering chair details.
 *         example: "Kosmo"
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
 *         required: true
 *         description: Unique identifier for the business unit.
 *         example: "67e5351aace4e5db084ae486"
 *       - in: query
 *         name: branchId
 *         schema:
 *           type: string
 *         required: false
 *         description: Unique identifier for the branch.
 *         example: "67e57ddcffe39db434e73769"
 *     responses:
 *       200:
 *         description: Chair details retrieved successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               statusCode: 200
 *               message: "Chair details retrieved successfully."
 *               data:
 *                 _id: { "$oid": "67e58c51ffe39db434e7414c" }
 *                 branch:
 *                   _id: "67e57ddcffe39db434e73769"
 *                   name: "Kosmo"
 *                 businessUnit:
 *                   _id: "67e5351aace4e5db084ae486"
 *                   name: "business Unit"
 *                 chairLocation: "DumDum"
 *                 chairNumber: "1"
 *                 isActive: true
 *                 status: "Ready"
 *                 activePatientId: null
 *                 activeAppointmentId: null
 *                 createdBy:
 *                   _id: "67e5351aace4e5db084ae484"
 *                   firstName: "67e5351aace4e5db084ae484"
 *                   lastName: "67e5351aace4e5db084ae484"
 *                 deletedBy:
 *                   _id: "67e5351aace4e5db084ae484"
 *                   firstName: "67e5351aace4e5db084ae484"
 *                   lastName: "67e5351aace4e5db084ae484"
 *                 lastUpdationBy:
 *                   _id: "67e5351aace4e5db084ae484"
 *                   firstName: "67e5351aace4e5db084ae484"
 *                   lastName: "67e5351aace4e5db084ae484"
 *                 deletedAt: null
 *                 createdAt: { "$date": "2025-03-27T17:35:13.812Z" }
 *                 updatedAt: { "$date": "2025-03-28T04:23:34.979Z" }
 *                 __v: 0
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               statusCode: 500
 *               message: "Internal server error."
 */