/**
 * @swagger
 *  /api/client/bu/leave/toggleLeaveApplication:
 *   patch:
 *     summary: Toggle leave application status
 *     description: Toggles the status of a leave application (e.g., Active/Inactive) based on the provided leaveApplicationId and clientId.
 *     tags:
 *       - Leave Management
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - leaveApplicationId
 *               - clientId
 *             properties:
 *               leaveApplicationId:
 *                 type: string
 *                 description: Unique identifier of the leave application whose status needs to be toggled.
 *                 example: "674ff69a32612884eeb5dd27"
 *               clientId:
 *                 type: string
 *                 description: Reference to the client.
 *                 example: "6735e64c5c58f271b1ce1678"
 *     responses:
 *       200:
 *         description: Leave application status toggled successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Leave application status toggled successfully."
 *               currentStatus: "Active"
 *       400:
 *         description: Validation error or missing required fields in the request body.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Validation error. Please provide all required fields."
 *       404:
 *         description: Leave application not found.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Leave application not found."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Internal server error."
 */
