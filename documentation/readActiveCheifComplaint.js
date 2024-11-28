/**
 * @swagger
 * /api/client/bu/chiefComplaint/readactive:
 *   get:
 *     summary: Get all active Chief Complaints
 *     description: Fetches a list of all Chief Complaints that are marked as active for a specific client.
 *     tags:
 *       - Chief Complaint
 *     parameters:
 *       - in: query
 *         name: clientId
 *         required: true
 *         description: Unique identifier for the client to fetch active Chief Complaints.
 *         schema:
 *           type: string
 *         example: "6735e64c5c58f271b1ce1678"
 *     responses:
 *       200:
 *         description: List of active Chief Complaints fetched successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               statusCode: 200
 *               message: "Active Chief Complaints fetched successfully."
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
 *                   isActive: true
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
