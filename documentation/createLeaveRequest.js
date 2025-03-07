/**
 * @swagger
 * /api/client/bu/leave/applyLeave:
 *   post:
 *     summary: Create a new leave request
 *     description: Submits a leave request for an employee with all relevant details, including leave type, dates, times, and status.
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
 *                 description: Reference to the client requesting leave.
 *                 example: "6735e64c5c58f271b1ce1678"
 *               employeeId:
 *                 type: string
 *                 description: Reference to the employee applying for leave.
 *                 example: "673efa60c071b7a57c1238b7"
 *               leaveType:
 *                 type: string
 *                 enum: [Sick, Casual, Annual, Maternity, Paternity, Other]
 *                 description: Type of leave being requested.
 *                 example: "Casual"
 *               startDate:
 *                 type: string
 *                 format: date
 *                 description: Start date of the leave period.
 *                 example: "2024-11-30"
 *               endDate:
 *                 type: string
 *                 format: date
 *                 description: End date of the leave period.
 *                 example: "2024-12-05"
 *               startTime:
 *                 type: string
 *                 format: time
 *                 description: Start time of the leave period.
 *                 example: "09:00"
 *               endTime:
 *                 type: string
 *                 format: time
 *                 description: End time of the leave period.
 *                 example: "18:00"
 *               reason:
 *                 type: string
 *                 description: Reason for the leave request.
 *                 maxlength: 500
 *                 example: "Attending a family event."
 *               buId:
 *                 type: string
 *                 description: Reference to the business unit associated with the employee.
 *                 example: "673d6103c071b7a57c1227dc"
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
 *       201:
 *         description: Leave request created successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Leave request created successfully."
 *               leaveRequest:
 *                 id: "64af73053f8d33c6e81a4578"
 *                 clientId: "6735e64c5c58f271b1ce1678"
 *                 employeeId: "673efa60c071b7a57c1238b7"
 *                 leaveType: "Casual"
 *                 startDate: "2024-11-30"
 *                 endDate: "2024-12-05"
 *                 startTime: "09:00"
 *                 endTime: "18:00"
 *                 reason: "Attending a family event."
 *                 buId: "673d6103c071b7a57c1227dc"
 *                 branchId: "6736e43eecc4dfe280f90d03"
 *                 status: "Pending"
 *                 createdAt: "2024-11-26T10:00:00.000Z"
 *                 updatedAt: "2024-11-26T10:00:00.000Z"
 *       400:
 *         description: Validation error or missing required fields.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Validation error. Please check the input fields."
 *       404:
 *         description: Employee or business unit not found.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Employee or Business Unit not found."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Internal server error."
 */
