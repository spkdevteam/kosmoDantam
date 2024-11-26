/**
 * @swagger
 * /api/client/bu/chiefComplaint/create:
 *   post:
 *     summary: Create a new Chief Complaint
 *     description: Adds a new Chief Complaint to the system with the provided details.
 *     tags:
 *       - Chief Complaint
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               complaintId:
 *                 type: string
 *                 nullable: true
 *                 description: Unique identifier for the Chief Complaint. If null, it will be auto-generated.
 *                 example: null
 *               complaintName:
 *                 type: string
 *                 description: Name of the Chief Complaint.
 *                 example: "Severe Headache"
 *               discription:
 *                 type: string
 *                 description: Detailed description of the Chief Complaint.
 *                 example: "Complaint of frequent and severe headaches lasting more than a week."
 *               clientId:
 *                 type: string
 *                 description: Unique identifier for the client associated with the Chief Complaint.
 *                 example: "6735e64c5c58f271b1ce1678"
 *     responses:
 *       201:
 *         description: Chief Complaint created successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               statusCode: 201
 *               message: "New Chief Complaint created successfully."
 *               data:
 *                 complaintId: "UT-BU-2024-CC100015"
 *                 complaintName: "Severe Headache"
 *                 discription: "Complaint of frequent and severe headaches lasting more than a week."
 *                 clientId: "6735e64c5c58f271b1ce1678"
 *       400:
 *         description: Invalid input data.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               statusCode: 400
 *               message: "Invalid input data. Please check the provided details."
 *       409:
 *         description: Conflict due to an existing Chief Complaint with the same name.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               statusCode: 409
 *               message: "A Chief Complaint with the same name already exists."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               statusCode: 500
 *               message: "Internal server error."
 */
