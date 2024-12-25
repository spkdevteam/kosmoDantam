/**
 * @swagger
 * /api/client/bu/patient/createPatientWhileBooking:
 *   post:
 *     summary: Create a new patient while booking an appointment
 *     tags:
 *       - Patient
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clientId:
 *                 type: string
 *                 description: Unique identifier for the client
 *                 example: "67602303890afbdafd0817b5"
 *               buId:
 *                 type: string
 *                 description: Unique identifier for the business unit
 *                 example: "6760230a890afbdafd0818bd"
 *               branchId:
 *                 type: string
 *                 description: Unique identifier for the branch
 *                 example: "67602d00890afbdafd081e2b"
 *               businessUnit:
 *                 type: string
 *                 description: Unique identifier for the business unit
 *                 example: "6760230a890afbdafd0818bd"
 *               firstName:
 *                 type: string
 *                 description: First name of the patient
 *                 example: "John"
 *               lastName:
 *                 type: string
 *                 description: Last name of the patient
 *                 example: "Doe"
 *               gender:
 *                 type: string
 *                 description: Gender of the patient
 *                 example: "Male"
 *               bloodGroup:
 *                 type: string
 *                 description: Blood group of the patient
 *                 example: "O+"
 *               phone:
 *                 type: string
 *                 description: Phone number of the patient
 *                 example: "1234567890"
 *               age:
 *                 type: number
 *                 description: Age of the patient
 *                 example: 30
 *               patientGroup:
 *                 type: string
 *                 description: Group of the patient
 *                 example: null
 *               referedBy:
 *                 type: string
 *                 description: Referrer of the patient
 *                 example: null
 *               roleId:
 *                 type: string
 *                 description: Role ID of the patient
 *                 example: "67602305890afbdafd0818a7"
 *     responses:
 *       201:
 *         description: Patient created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Patient created successfully."
 *                 data:
 *                   type: object
 *                   description: Details of the created patient
 *                   properties:
 *                     patientId:
 *                       type: string
 *                       description: Unique ID of the created patient
 *                       example: "676126415105505ed820d418"
 *       400:
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Invalid input data."
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Unauthorized access."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "An error occurred while creating the patient."
 */
