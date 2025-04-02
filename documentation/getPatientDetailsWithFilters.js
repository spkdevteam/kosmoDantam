/**
 * @swagger
 * /api/client/bu/patient/getPatientDetailsWithFilters:
 *   get:
 *     summary: Get patient details with filters
 *     description: Fetches patient details based on filters such as date range, client, business unit, user actions, and sorting.
 *     tags:
 *       - Patients
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
 *         description: Search keyword for filtering patient details.
 *         example: "Joye"
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
 *       - in: query
 *         name: createdUser
 *         schema:
 *           type: string
 *         required: false
 *         description: ID of the user who created the patient record.
 *         example: "67e5351aace4e5db084ae484"
 *       - in: query
 *         name: deletedUser
 *         schema:
 *           type: string
 *         required: false
 *         description: ID of the user who deleted the patient record.
 *         example: "67e5351aace4e5db084ae484"
 *       - in: query
 *         name: updatedUser
 *         schema:
 *           type: string
 *         required: false
 *         description: ID of the user who last updated the patient record.
 *         example: "67e5351aace4e5db084ae484"
 *       - in: query
 *         name: sortby
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *         required: false
 *         description: Sorting options for the results (e.g., name, age).
 *         example: ["firstName", "-age"]
 *     responses:
 *       200:
 *         description: Patient details retrieved successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               statusCode: 200
 *               message: "Patient details retrieved successfully."
 *               data:
 *                 _id: {"$oid": "67e59b5a786178bedddd484e"}
 *                 displayId: "KC-bnch-2024-PT1000003"
 *                 branch:
 *                   _id: "67e57ddcffe39db434e73769"
 *                   name: "Kosmo"
 *                 businessUnit:
 *                   _id: "67e5351aace4e5db084ae486"
 *                   name: "business Unit"
 *                 mainPatientLinkedid: null
 *                 isChainedWithMainPatient: false
 *                 relation: null
 *                 firstName: "Joye"
 *                 lastName: "Doe"
 *                 profileImage: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
 *                 email: "john@gmail.com"
 *                 phone: "5665656677"
 *                 gender: "Male"
 *                 age: 35
 *                 bloodGroup: "a-(+ve)"
 *                 patientGroup: ""
 *                 referedBy: ""
 *                 city: ""
 *                 state: ""
 *                 country: "India"
 *                 ZipCode: ""
 *                 address: ""
 *                 isActive: true
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
 *                 medicalHistory: []
 *                 createdAt: {"$date": "2025-03-27T18:39:22.180Z"}
 *                 updatedAt: {"$date": "2025-03-27T18:39:22.180Z"}
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
