/**
 * @swagger
 * /api/client/bu/prescription/create:
 *   post:
 *     summary: Create a new prescription
 *     tags:
 *       - Prescription
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clientId:
 *                 type: string
 *                 description: ID of the client
 *                 example: "67602303890afbdafd0817b5"
 *               branchId:
 *                 type: string
 *                 description: ID of the branch
 *                 example: "67602d00890afbdafd081e2b"
 *               buId:
 *                 type: string
 *                 description: ID of the business unit
 *                 example: "6760230a890afbdafd0818bd"
 *               patientId:
 *                 type: string
 *                 description: ID of the patient
 *                 example: "676126415105505ed820d418"
 *               doctorId:
 *                 type: string
 *                 description: ID of the doctor
 *                 example: "67602dde890afbdafd081eb2"
 *               caseSheetId:
 *                 type: string
 *                 description: ID of the case sheet
 *                 example: "6767cfb30e9a993bf8887281"
 *               drugArray:
 *                 type: array
 *                 description: List of prescribed drugs
 *                 items:
 *                   type: object
 *                   properties:
 *                     drugName:
 *                       type: string
 *                       description: Name of the drug
 *                       example: "Paracetamol"
 *                     drug:
 *                       type: string
 *                       description: Drug code
 *                       example: "PARA123"
 *                     dosage:
 *                       type: string
 *                       description: Dosage of the drug
 *                       example: "500mg"
 *                     frequesncy:
 *                       type: string
 *                       description: Frequency of drug intake
 *                       example: "Twice a day"
 *                     duration:
 *                       type: string
 *                       description: Duration of the prescription
 *                       example: "5 days"
 *                     note:
 *                       type: string
 *                       description: Additional notes for the drug
 *                       example: "Take after meals"
 *               additionalAdvice:
 *                 type: string
 *                 description: Additional advice for the patient
 *                 example: "Drink plenty of water and rest."
 *               createdBy:
 *                 type: string
 *                 description: ID of the creator
 *                 example: "651f9bd9b749c2a3e2567899"
 *     responses:
 *       201:
 *         description: Prescription created successfully
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
 *                   example: "Prescription created successfully."
 *                 data:
 *                   type: object
 *                   description: Created prescription details
 *       400:
 *         description: Bad request due to invalid input
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
 *                   example: "An error occurred while creating the prescription."
 */
