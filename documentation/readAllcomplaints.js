/**
 * @swagger
 * /api/client/bu/chiefComplaint/all:
 *   get:
 *     summary: Get all Chief Complaints
 *     description: Fetches a list of all Chief Complaints for a specific client, regardless of their active status.
 *     tags:
 *       - Chief Complaint
 *     parameters:
 *       - in: query
 *         name: clientId
 *         required: true
 *         description: Unique identifier for the client to fetch all Chief Complaints.
 *         schema:
 *           type: string
 *         example: "6735e64c5c58f271b1ce1678"
 *     responses:
 *       200:
 *         description: List of all Chief Complaints fetched successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               statusCode: 200
 *               message: "All Chief Complaints fetched successfully."
 *               data:
 *                 - complaintId: "67444ddab93ebcdex57e2a4"
 *                   complaintName: "Severe Headache"
 *                   discription: "Complaint of frequent and severe headaches lasting more than a week."
 *                   clientId: "6735e64c5c58f271b1ce1678"
 *                   isActive: true
 *                 - complaintId: "67444ddab93ebcdex57e2a5"
 *                   complaintName: "Back Pain"
 *                   discription: "Persistent pain in the lower back."
 *                   clientId: "6735e64c5c58f271b1ce1678"
 *                   isActive: false
 *       400:
 *         description: Missing or invalid `clientId` parameter.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               statusCode: 400
 *               message: "Invalid or missing `clientId` parameter."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               statusCode: 500
 *               message: "Internal server error."
 */
