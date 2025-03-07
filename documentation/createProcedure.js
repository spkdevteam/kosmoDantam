/**
 * @swagger
 * /api/client/bu/procedures/create:
 *   post:
 *     summary: Create a new procedure
 *     description: Adds a new procedure to the system for specified services and department, with detailed information about the procedure.
 *     tags:
 *       - Procedures
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clientId:
 *                 type: string
 *                 example: "6735e64c5c58f271b1ce1678"
 *               deptId:
 *                 type: string
 *                 example: "6746af38b193ebcde50803fd"
 *               branchId:
 *                 type: string
 *                 example: "6736e43eecc4dfe280f90d03"
 *               services:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["6746b2deb193ebcde5080439", "6746b373b193ebcde5080449"]
 *               procedureName:
 *                 type: string
 *                 example: "Fillings (Amalgam or Composite)"
 *               buId:
 *                 type: string
 *                 example: "673ef64bdc1355e6ca2e61eb"
 *               description:
 *                 type: string
 *                 example: "General Dental Care is designed to maintain optimal oral health. This service includes essential procedures such as Teeth Cleaning (Prophylaxis) to remove plaque, tartar, and stains, and Fillings to restore cavities or tooth damage using high-quality materials like amalgam or composite resin. Regular visits to maintain general dental care can help prevent cavities, gum disease, and ensure a bright, healthy smile."
 *     responses:
 *       201:
 *         description: Procedure created successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Procedure created successfully."
 *               procedure:
 *                 clientId: "6735e64c5c58f271b1ce1678"
 *                 deptId: "6746af38b193ebcde50803fd"
 *                 services: ["6746b2deb193ebcde5080439", "6746b373b193ebcde5080449"]
 *                 procedureName: "Fillings (Amalgam or Composite)"
 *                 buId: "673ef64bdc1355e6ca2e61eb"
 *                 description: "General Dental Care is designed to maintain optimal oral health. This service includes essential procedures such as Teeth Cleaning (Prophylaxis) to remove plaque, tartar, and stains, and Fillings to restore cavities or tooth damage using high-quality materials like amalgam or composite resin. Regular visits to maintain general dental care can help prevent cavities, gum disease, and ensure a bright, healthy smile."
 *                 branchId: "6736e43eecc4dfe280f90d03"
 *       400:
 *         description: Validation error or missing data.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Validation error. Please check the input fields."
 *       404:
 *         description: Department or Service not found.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Department or Service not found."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Internal server error."
 */
