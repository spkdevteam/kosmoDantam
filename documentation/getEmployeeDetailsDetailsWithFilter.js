/**
 * @swagger
 * /api/client/bu/employee/getEmployeeDetailsDetailsWithFilter:
 *   get:
 *     summary: Get employee details with filters
 *     description: Retrieves employee details based on various filters such as client ID, page number, per page, date range, created/updated user, business unit, branch, and search key.
 *     tags:
 *       - Employees
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
 *         description: Search term for filtering employee records.
 *         example: "kasif"
 *       - in: query
 *         name: employeeId
 *         schema:
 *           type: string
 *         required: false
 *         description: employee ID to filter employee (optional).
 *         example: ""
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
 *         description: Start date for filtering employees.
 *         example: ""
 *       - in: query
 *         name: toDate
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: End date for filtering employees.
 *         example: ""
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *         required: false
 *         description: ID of the role of the employee.
 *         example: ""
 *       - in: query
 *         name: createdUser
 *         schema:
 *           type: string
 *         required: false
 *         description: ID of the user who created the employee record.
 *         example: ""
 *       - in: query
 *         name: updatedUser
 *         schema:
 *           type: string
 *         required: false
 *         description: ID of the user who last updated the employee record.
 *         example: ""
 *       - in: query
 *         name: businessUnit
 *         schema:
 *           type: string
 *         required: false
 *         description: Unique identifier for the business unit.
 *       - in: query
 *         name: branch
 *         schema:
 *           type: string
 *         required: false
 *         description: Unique identifier for the branch.
 *     responses:
 *       200:
 *         description: Employee details retrieved successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Employee details retrieved successfully."
 *               data:
 *                 employees:
 *                   - _id: "68008bd96ac640edae5c9fe1"
 *                     displayId: "KC-bnch-2024-EM1000034"
 *                     rid: 15
 *                     role:
 *                       _id: "6782084da840f3a7bf1a3046"
 *                       name: "Specialist"
 *                     branch:
 *                       _id: "67820e34a840f3a7bf1a312d"
 *                       name: "Kosmo Dental Clinic Branch two"
 *                     businessUnit:
 *                       _id: "67820851a840f3a7bf1a307a"
 *                       name: "kasif unit two Businsenss Unit"
 *                     roleId: 15
 *                     firstName: "Abhik"
 *                     lastName: "pal"
 *                     email: "abk@gmail.com"
 *                     phone: "6546959545"
 *                     tc: true
 *                     isUserVerified: true
 *                     isActive: true
 *                     gender: "Male"
 *                     age: null
 *                     bloodGroup: ""
 *                     patientGroup: null
 *                     referedBy: null
 *                     profileImage: ""
 *                     profileCreated: false
 *                     panNumber: ""
 *                     adharNumber: ""
 *                     city: "Kolkata"
 *                     state: "West Bengal"
 *                     country: "India"
 *                     ZipCode: "265956"
 *                     address: "dssdf"
 *                     dateOfBirth: null
 *                     optionalEmail: ""
 *                     emergencyPhone: ""
 *                     activePatientId: null
 *                     createdBy:
 *                       _id: "67820851a840f3a7bf1a3077"
 *                       firstName: "kasif"
 *                       lastName: "unit two"
 *                     deletedBy: null
 *                     updatedBy: null
 *                     deletedAt: null
 *                     createdAt: "2025-04-17T05:04:25.942Z"
 *                     updatedAt: "2025-04-17T05:04:25.942Z"
 *                     __v: 0
 *                 metadata:
 *                   page: 1
 *                   perPage: 10
 *                   totalCount: 1
 *                   totalPages: 1
 *                   createdBy:
 *                     - _id: "67820851a840f3a7bf1a3077"
 *                       firstName: "kasif"
 *                   editedBy: []
 *               includeAdmin: "false"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               statusCode: 500
 *               message: "Internal server error."
 */