/**
 * @swagger
 * /api/client/bu/leave/deleteLeaveApplication:
 *   delete:
 *     summary: Delete a leave application
 *     description: Deletes an existing leave application based on the provided leaveApplicationId and clientId passed as query parameters.
 *     tags:
 *       - Leave Management
 *     parameters:
 *       - in: query
 *         name: leaveApplicationId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the leave application to be deleted.
 *         example: "674ff69a32612884eeb5dd27"
 *       - in: query
 *         name: clientId
 *         required: true
 *         schema:
 *           type: string
 *         description: Reference to the client.
 *         example: "6735e64c5c58f271b1ce1678"
 *     responses:
 *       200:
 *         description: Leave application deleted successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Leave application deleted successfully."
 *       400:
 *         description: Validation error or missing required query parameters.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Validation error. Please provide all required query parameters."
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
