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
 *           example:
 *             clientId: "6735e64c5c58f271b1ce1678"
 *             deptId: "UT-AB-2024-DP100008"
 *             services: ["UT-AB-2024-SV1001", "UT-AB-2024-SV1014"]
 *             procedureName: "Fillings (Amalgam or Composite)"
 *             procedureId: null
 *             description: "General Dental Care is designed to maintain optimal oral health. This service includes essential procedures such as Teeth Cleaning (Prophylaxis) to remove plaque, tartar, and stains, and Fillings to restore cavities or tooth damage using high-quality materials like amalgam or composite resin. Regular visits to maintain general dental care can help prevent cavities, gum disease, and ensure a bright, healthy smile."
 *             branchId: "BR001"
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
 *                 deptId: "UT-AB-2024-DP100008"
 *                 services: ["UT-AB-2024-SV1001", "UT-AB-2024-SV1014"]
 *                 procedureName: "Fillings (Amalgam or Composite)"
 *                 procedureId: "generatedProcedureId"
 *                 description: "General Dental Care is designed to maintain optimal oral health. This service includes essential procedures such as Teeth Cleaning (Prophylaxis) to remove plaque, tartar, and stains, and Fillings to restore cavities or tooth damage using high-quality materials like amalgam or composite resin. Regular visits to maintain general dental care can help prevent cavities, gum disease, and ensure a bright, healthy smile."
 *                 branchId: "BR001"
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
