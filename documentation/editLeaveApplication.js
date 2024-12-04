/**
 * @swagger
 * /api/client/bu/leave/editLeaveApplication:
 *   put:
 *     summary: Edit an existing leave application
 *     description: Updates the details of an existing leave application, including leave type, dates, times, and reason.
 *     tags:
 *       - Leave Management
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clientId:
 *                 type: string
 *                 description: Reference to the client.
 *                 example: "6735e64c5c58f271b1ce1678"
 *               employeeId:
 *                 type: string
 *                 description: Reference to the employee applying for leave.
 *                 example: "6735e64d5c58f271b1ce168c"
 *               leaveType:
 *                 type: string
 *                 enum: [Sick, Casual, Annual, Maternity, Paternity, Other]
 *                 description: Type of leave being requested.
 *                 example: "Casual"
 *               startDate:
 *                 type: string
 *                 format: date
 *                 description: Start date of the leave period.
 *                 example: "2024-12-05"
 *               endDate:
 *                 type: string
 *                 format: date
 *                 description: End date of the leave period.
 *                 example: "2024-12-05"
 *               startTime:
 *                 type: string
 *                 pattern: '^([01]\\d|2[0-3]):([0-5]\\d)$'
 *                 description: Start time of the leave period in HH:mm format.
 *                 example: "09:00"
 *               endTime:
 *                 type: string
 *                 pattern: '^([01]\\d|2[0-3]):([0-5]\\d)$'
 *                 description: End time of the leave period in HH:mm format.
 *                 example: "10:00"
 *               reason:
 *                 type: string
 *                 description: Reason for the leave application.
 *                 maxlength: 500
 *                 example: "Attending a family event."
 *               buId:
 *                 type: string
 *                 description: Reference to the business unit associated with the employee.
 *                 example: "673ef64bdc1355e6ca2e61eb"
 *               branchId:
 *                 type: string
 *                 description: Reference to the branch where the employee is located.
 *                 example: "6736e43eecc4dfe280f90d03"
 *             required:
 *               - clientId
 *               - employeeId
 *               - leaveType
 *               - startDate
 *               - endDate
 *               - startTime
 *               - endTime
 *               - buId
 *               - branchId
 *     responses:
 *       200:
 *         description: Leave application updated successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Leave application updated successfully."
 *               leaveApplication:
 *                 id: "64af73053f8d33c6e81a4578"
 *                 clientId: "6735e64c5c58f271b1ce1678"
 *                 employeeId: "6735e64d5c58f271b1ce168c"
 *                 leaveType: "Casual"
 *                 startDate: "2024-12-05"
 *                 endDate: "2024-12-05"
 *                 startTime: "09:00"
 *                 endTime: "10:00"
 *                 reason: "Attending a family event."
 *                 buId: "673ef64bdc1355e6ca2e61eb"
 *                 branchId: "6736e43eecc4dfe280f90d03"
 *                 updatedAt: "2024-11-26T10:00:00.000Z"
 *       400:
 *         description: Validation error or missing required fields.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Validation error. Please check the input fields."
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
