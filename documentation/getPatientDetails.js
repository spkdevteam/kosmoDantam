/**
 * @swagger
 * /api/client/bu/patient/getPatientDetails:
 *   get:
 *     summary: Get filtered patient details
 *     description: Fetches patient details based on query filters including client, date range, branch, business unit, and status.
 *     tags:
 *       - Patients
 *     parameters:
 *       - in: query
 *         name: clientId
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique identifier for the client.
 *         example: "67eb8868c31f4280a42689bb"
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
 *         name: SearchKey
 *         schema:
 *           type: string
 *         required: false
 *         description: Search keyword for filtering patient details.
 *         example: "tonu"
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
 *         name: branchId
 *         schema:
 *           type: string
 *         required: false
 *         description: Unique identifier for the branch.
 *         example: ""
 *       - in: query
 *         name: businessUnitId
 *         schema:
 *           type: string
 *         required: false
 *         description: Unique identifier for the business unit.
 *         example: ""
 *       - in: query
 *         name: mainPatientLinkedId
 *         schema:
 *           type: string
 *         required: false
 *         description: ID of the main linked patient if exists.
 *       - in: query
 *         name: createdUser
 *         schema:
 *           type: string
 *         required: false
 *         description: ID of the user who created the record.
 *       - in: query
 *         name: updatedUser
 *         schema:
 *           type: string
 *         required: false
 *         description: ID of the user who last updated the record.
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         required: false
 *         description: Status filter for the patient (e.g., active/inactive).
 *     responses:
 *       200:
 *         description: Patients details retrieved successfully.
 *         content:
 *           application/json:
 *             example:
 *               message: "Patients details retrieved successfully."
 *               data:
 *                 patients:
 *                   - _id: "6801052cebbad8155313cfa8"
 *                     displayId: "KC-bnch-2024-PT1000033"
 *                     branch:
 *                       _id: "67fc9182291424ec113fded2"
 *                       name: "Testing Branch"
 *                       incorporationName: "Tets bran"
 *                     businessUnit:
 *                       _id: "67eb886ac31f4280a4268ae3"
 *                       name: "avishek G Businsenss Unit"
 *                       emailContact: "avi@yopmail.com"
 *                       contactNumber: "7897897894"
 *                     mainPatientLinkedid: null
 *                     isChainedWithMainPatient: false
 *                     relation: null
 *                     firstName: "tonu"
 *                     lastName: "abc"
 *                     profileImage: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
 *                     email: "abhisek@shnosoft.in"
 *                     phone: "5459595595"
 *                     gender: "Male"
 *                     age: 20
 *                     bloodGroup: "a-(+ve)"
 *                     patientGroup: null
 *                     referedBy: null
 *                     isActive: true
 *                     deletedAt: null
 *                     updatedBy:
 *                       _id: "67eb9fd2c9afec7c3b5f82f5"
 *                       firstName: "Avishek"
 *                       lastName: "Gupta"
 *                       email: "avii@yopmail.com"
 *                       phone: "8900010083"
 *                     deletedBy: null
 *                     medicalHistory: []
 *                     createdAt: "2025-04-17T13:42:04.584Z"
 *                     updatedAt: "2025-04-18T06:51:58.318Z"
 *                     __v: 0
 *                 metaData:
 *                   currentPage: 1
 *                   perPage: 10
 *                   SearchKey: "tonu"
 *                   totalDocs: 1
 *                   totalPages: 1
 *                   createdBy: []
 *                   editedBy:
 *                     - _id: "67eb9fd2c9afec7c3b5f82f5"
 *                       firstName: "Avishek"
 *               status: true
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               statusCode: 500
 *               message: "Internal server error."
 */