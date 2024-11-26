/**
 * @swagger
 * /api/client/bu/procedures/edit:
 *   put:
 *     summary: Edit an existing procedure
 *     description: Updates the details of an existing procedure, allowing modifications to department, services, procedure name, description, etc.
 *     tags:
 *       - Procedures
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             clientId: "6735e64c5c58f271b1ce1678"
 *             deptId: "673efa60c071b7a57c1238b7"
 *             services: [
 *               "UT-AB-2024-SV1001", 
 *               "UT-AB-2024-SV1014"
 *             ]
 *             procedureName: "Fillings (Amalgam or Composite)"
 *             procedureId: "673da3c1c071b7a57c122c92"
 *             description: "General Dental Care is designed to maintain optimal oral health. This service includes essential procedures such as Teeth Cleaning (Prophylaxis) to remove plaque, tartar, and stains, and Fillings to restore cavities or tooth damage using high-quality materials like amalgam or composite resin. Regular visits to maintain general dental care can help prevent cavities, gum disease, and ensure a bright, healthy smile."
 *             branchId: "6736e43eecc4dfe280f90d03"
 *             delete: false
 *             isActive: true
 *     responses:
 *       200:
 *         description: Procedure updated successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Procedure updated successfully."
 *               data:
 *                 deptId: "UT-AB-2024-DP100008"
 *                 services: [
 *                   "UT-AB-2024-SV1001", 
 *                   "UT-AB-2024-SV1014"
 *                 ]
 *                 procedureName: "Fillings (Amalgam or Composite)"
 *                 procedureId: "UT-AB-2024-PC100004"
 *                 description: "General Dental Care is designed to maintain optimal oral health. This service includes essential procedures such as Teeth Cleaning (Prophylaxis) to remove plaque, tartar, and stains, and Fillings to restore cavities or tooth damage using high-quality materials like amalgam or composite resin. Regular visits to maintain general dental care can help prevent cavities, gum disease, and ensure a bright, healthy smile."
 *                 branchId: "BR001"
 *                 delete: false
 *                 isActive: true
 *       400:
 *         description: Validation error or missing data.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Validation error. Please check the input fields."
 *       404:
 *         description: Procedure not found or invalid procedureId.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Procedure with the specified ID not found."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Internal server error."
 */
