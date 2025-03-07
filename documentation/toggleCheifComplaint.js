/**
 * @swagger
 * /api/client/bu/chiefComplaint/toggle:
 *   patch:
 *     summary: Toggle the active status of a Chief Complaint
 *     description: Updates the `isActive` status of a Chief Complaint identified by `complaintId`.
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
 *                 description: Unique identifier for the Chief Complaint to toggle.
 *                 example: "67444ddab93ebcdex57e2a4"
 *               clientId:
 *                 type: string
 *                 description: Unique identifier for the client associated with the Chief Complaint.
 *                 example: "6735e64c5c58f271b1ce1678"
 *     responses:
 *       200:
 *         description: Chief Complaint status toggled successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               statusCode: 200
 *               message: "Chief Complaint status toggled successfully."
 *               data:
 *                 complaintId: "67444ddab93ebcdex57e2a4"
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
