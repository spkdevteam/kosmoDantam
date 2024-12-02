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
 *           schema:
 *             type: object
 *             properties:
 *               clientId:
 *                 type: string
 *                 description: The ID of the client associated with the procedure.
 *                 example: "6735e64c5c58f271b1ce1678"
 *               deptId:
 *                 type: string
 *                 description: The ID of the department.
 *                 example: "6746af38b193ebcde50803fd"
 *               services:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of service IDs associated with the procedure.
 *                 example: ["6746b2deb193ebcde5080439", "6746b373b193ebcde5080449"]
 *               procedureName:
 *                 type: string
 *                 description: The name of the procedure.
 *                 example: "Fillings (Amalgam or Composite)"
 *               procedureId:
 *                 type: string
 *                 description: The unique ID of the procedure to be edited.
 *                 example: "6746b6a2b193ebcde5080459"
 *               description:
 *                 type: string
 *                 description: The description of the procedure.
 *                 example: "General Dental Care is designed to maintain optimal oral health. This service includes essential procedures such as Teeth Cleaning (Prophylaxis) to remove plaque, tartar, and stains, and Fillings to restore cavities or tooth damage using high-quality materials like amalgam or composite resin. Regular visits to maintain general dental care can help prevent cavities, gum disease, and ensure a bright, healthy smile."
 *               branchId:
 *                 type: string
 *                 description: The ID of the branch associated with the procedure.
 *                 example: "6736e43eecc4dfe280f90d03"
 *               buId:
 *                 type: string
 *                 description: The business unit ID associated with the procedure.
 *                 example: "673ef64bdc1355e6ca2e61eb"
 *               delete:
 *                 type: boolean
 *                 description: Indicates if the procedure should be marked for deletion.
 *                 example: false
 *               isActive:
 *                 type: boolean
 *                 description: Indicates if the procedure is active.
 *                 example: true
 *           example:
 *             clientId: "6735e64c5c58f271b1ce1678"
 *             deptId: "6746af38b193ebcde50803fd"
 *             services: [
 *               "6746b2deb193ebcde5080439", 
 *               "6746b373b193ebcde5080449"
 *             ]
 *             procedureName: "Fillings (Amalgam or Composite)"
 *             procedureId: "6746b6a2b193ebcde5080459"
 *             description: "General Dental Care is designed to maintain optimal oral health. This service includes essential procedures such as Teeth Cleaning (Prophylaxis) to remove plaque, tartar, and stains, and Fillings to restore cavities or tooth damage using high-quality materials like amalgam or composite resin. Regular visits to maintain general dental care can help prevent cavities, gum disease, and ensure a bright, healthy smile."
 *             branchId: "6736e43eecc4dfe280f90d03"
 *             buId: "673ef64bdc1355e6ca2e61eb"
 *             delete: false
 *             isActive: true
 *     responses:
 *       200:
 *         description: Procedure updated successfully.
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
 *                   example: "Procedure updated successfully."
 *                 data:
 *                   type: object
 *                   properties:
 *                     deptId:
 *                       type: string
 *                       example: "6746af38b193ebcde50803fd"
 *                     services:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["6746b2deb193ebcde5080439", "6746b373b193ebcde5080449"]
 *                     procedureName:
 *                       type: string
 *                       example: "Fillings (Amalgam or Composite)"
 *                     procedureId:
 *                       type: string
 *                       example: "6746b6a2b193ebcde5080459"
 *                     description:
 *                       type: string
 *                       example: "General Dental Care is designed to maintain optimal oral health. This service includes essential procedures such as Teeth Cleaning (Prophylaxis) to remove plaque, tartar, and stains, and Fillings to restore cavities or tooth damage using high-quality materials like amalgam or composite resin. Regular visits to maintain general dental care can help prevent cavities, gum disease, and ensure a bright, healthy smile."
 *                     branchId:
 *                       type: string
 *                       example: "6736e43eecc4dfe280f90d03"
 *                     buId:
 *                       type: string
 *                       example: "673ef64bdc1355e6ca2e61eb"
 *                     delete:
 *                       type: boolean
 *                       example: false
 *                     isActive:
 *                       type: boolean
 *                       example: true
 *       400:
 *         description: Validation error or missing data.
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
 *       404:
 *         description: Procedure not found or invalid procedureId.
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
 *                   example: "Procedure with the specified ID not found."
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
