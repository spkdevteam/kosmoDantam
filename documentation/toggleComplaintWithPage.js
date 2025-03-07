/**
 * @swagger
 * /api/client/bu/chiefComplaint/toggleComplaintWithPage:
 *   put:
 *     summary: Toggle Status of Chief Complaint
 *     description: Toggles the status (active/inactive) of a Chief Complaint identified by `complaintId` for a specific client. Includes pagination and keyword filters for related complaints.
 *     tags:
 *       - Chief Complaint
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clientId:
 *                 type: string
 *                 description: Unique identifier of the client.
 *                 example: "6735e64c5c58f271b1ce1678"
 *               complaintId:
 *                 type: string
 *                 description: Unique identifier for the Chief Complaint to toggle status.
 *                 example: "67444ddab93ebcdex57e2a4"
 *               keyWord:
 *                 type: string
 *                 description: Keyword to filter related complaints.
 *                 example: "headache"
 *               page:
 *                 type: integer
 *                 description: Page number for pagination (default is 0).
 *                 example: 1
 *               perPage:
 *                 type: integer
 *                 description: Number of items per page (default is 10).
 *                 example: 5
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
 *                 complaintName: "Severe Headache"
 *                 isActive: false
 *                 relatedComplaints:
 *                   totalCount: 20
 *                   complaints:
 *                     - complaintId: "complaint123"
 *                       complaintName: "Moderate Headache"
 *                       isActive: true
 *                     - complaintId: "complaint124"
 *                       complaintName: "Severe Nausea"
 *                       isActive: true
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
