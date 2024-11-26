/**
 * @swagger
 * /api/client/bu/chiefComplaint/revoke:
 *   put:
 *     summary: Revoke a Chief Complaint
 *     description: Revokes a Chief Complaint identified by `complaintId` for a specific client. This marks the complaint as inactive or revoked.
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
 *                 description: Unique identifier for the Chief Complaint to revoke.
 *                 example: "67444ddab93ebcdex57e2a4"
 *               clientId:
 *                 type: string
 *                 description: Unique identifier for the client associated with the Chief Complaint.
 *                 example: "6735e64c5c58f271b1ce1678"
 *     responses:
 *       200:
 *         description: Chief Complaint revoked successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               statusCode: 200
 *               message: "Chief Complaint revoked successfully."
 *               data:
 *                 complaintId: "67444ddab93ebcdex57e2a4"
 *                 complaintName: "Severe Headache"
 *                 isActive: false
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
