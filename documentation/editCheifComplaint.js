/**
 * @swagger
 * /api/client/bu/chiefComplaint/edit:
 *   put:
 *     summary: Edit an existing Chief Complaint
 *     description: Updates the details of an existing Chief Complaint identified by `complaintId`.
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
 *                 description: Unique identifier for the Chief Complaint to be updated.
 *                 example: "67444ddab193ebcde507e2a4"
 *               complaintName:
 *                 type: string
 *                 description: Updated name of the Chief Complaint.
 *                 example: "Severe Headache"
 *               discription:
 *                 type: string
 *                 description: Updated description of the Chief Complaint.
 *                 example: "Complaint of frequent and severe headaches lasting more than a week."
 *               clientId:
 *                 type: string
 *                 description: Unique identifier for the client associated with the Chief Complaint.
 *                 example: "6735e64c5c58f271b1ce1678"
 *     responses:
 *       200:
 *         description: Chief Complaint updated successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               statusCode: 200
 *               message: "Chief Complaint updated successfully."
 *               data:
 *                 complaintId: "67444ddab193ebcde507e2a4"
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
 *               message: "Invalid input data. Please verify the details."
 *       404:
 *         description: Chief Complaint not found for the provided `complaintId`.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               statusCode: 404
 *               message: "Chief Complaint not found."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               statusCode: 500
 *               message: "Internal server error."
 */
