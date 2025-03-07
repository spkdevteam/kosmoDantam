/**
 * @swagger
 * /api/client/bu/branch/createBranch:
 *   post:
 *     summary: Create a new branch
 *     description: API to create a new branch for a client. Accepts branch details such as prefix, name, contact information, location, and other identifiers.
 *     tags:
 *       - Branches
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clientId:
 *                 type: string
 *                 description: Unique ID of the client.
 *                 example: "6735e64c5c58f271b1ce1678"
 *               branchPrefix:
 *                 type: string
 *                 description: Prefix for the branch name or code.
 *                 example: "BR001"
 *               name:
 *                 type: string
 *                 description: Name of the branch.
 *                 example: "Mumbai HQ"
 *               emailContact:
 *                 type: string
 *                 description: Email contact for the branch.
 *                 example: "branch@mumbai.com"
 *               contactNumber:
 *                 type: string
 *                 description: Contact number for the branch.
 *                 example: "+91-9876543210"
 *               country:
 *                 type: string
 *                 description: Country where the branch is located.
 *                 example: "India"
 *               state:
 *                 type: string
 *                 description: State where the branch is located.
 *                 example: "Maharashtra"
 *               city:
 *                 type: string
 *                 description: City where the branch is located.
 *                 example: "Mumbai"
 *               zipCode:
 *                 type: string
 *                 description: ZIP code for the branch location.
 *                 example: "400001"
 *               address:
 *                 type: string
 *                 description: Full address of the branch.
 *                 example: "123, Marine Drive, Mumbai, Maharashtra"
 *               incorporationName:
 *                 type: string
 *                 description: Legal name of the branch or its incorporation name.
 *                 example: "Mumbai Corporate Branch"
 *               cinNumber:
 *                 type: string
 *                 description: Corporate Identification Number (CIN) of the branch.
 *                 example: "U12345MH2023PTC123456"
 *               gstNumber:
 *                 type: string
 *                 description: Goods and Services Tax Identification Number (GSTIN) for the branch.
 *                 example: "27ABCDE1234F2Z5"
 *               businessUnitId:
 *                 type: string
 *                 description: ID of the business unit associated with the branch.
 *                 example: "673ef64bdc1355e6ca2e61eb"
 *               branchHeadId:
 *                 type: string
 *                 description: ID of the head of the branch.
 *                 example: "6746b2deb193ebcde5080439"
 *           example:
 *             clientId: "6735e64c5c58f271b1ce1678"
 *             branchPrefix: "BR001"
 *             name: "Mumbai HQ"
 *             emailContact: "branch@mumbai.com"
 *             contactNumber: "+91-9876543210"
 *             country: "India"
 *             state: "Maharashtra"
 *             city: "Mumbai"
 *             zipCode: "400001"
 *             address: "123, Marine Drive, Mumbai, Maharashtra"
 *             incorporationName: "Mumbai Corporate Branch"
 *             cinNumber: "U12345MH2023PTC123456"
 *             gstNumber: "27ABCDE1234F2Z5"
 *             businessUnitId: "673ef64bdc1355e6ca2e61eb"
 *             branchHeadId: "6746b2deb193ebcde5080439"
 *     responses:
 *       201:
 *         description: Branch created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Branch created successfully."
 *                 data:
 *                   type: object
 *                   properties:
 *                     branchId:
 *                       type: string
 *                       description: Unique ID of the created branch.
 *                       example: "6747a38eb193ebcde50804a0"
 *       400:
 *         description: Validation error or missing required fields.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Validation error. Please check the input fields."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Internal server error."
 */
