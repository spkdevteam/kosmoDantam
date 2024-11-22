/**
 * @swagger
 * /api/client/bu/MediCases/create:
 *   post:
 *     summary: Create a new medical case
 *     description: Adds a new medical case to the master list of medical cases.
 *     tags:
 *       - Medical Cases
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clientId:
 *                 type: string
 *                 description: Database reference to the client.
 *                 example: "6735e64c5c58f271b1ce1678"
 *               caseId:
 *                 type: string
 *                 description: Unique identifier for the medical case.
 *                 example: null
 *               caseName:
 *                 type: string
 *                 description: Name of the medical case.
 *                 example: "Diabetes"
 *               remark:
 *                 type: string
 *                 description: Optional remarks about the medical case.
 *                 example: "Fasting Blood Sugar (FBS): 70-100 mg/dL (Normal), Postprandial Blood Sugar (PPBS): 90-140 mg/dL (Normal)"
 *     responses:
 *       201:
 *         description: Medical case created successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Medical case created successfully."
 *               data:
 *                 caseId: "CASE123"
 *                 caseName: "Diabetes"
 *                 remark: "Fasting Blood Sugar (FBS): 70-100 mg/dL (Normal), Postprandial Blood Sugar (PPBS): 90-140 mg/dL (Normal)"
 *       400:
 *         description: Invalid input data.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Invalid input data. Please provide valid fields."
 *       409:
 *         description: Medical case with the given caseId or caseName already exists.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "A medical case with the given caseId or caseName already exists."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Internal server error."
 */
