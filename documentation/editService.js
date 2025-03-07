/**
 * @swagger
 * /api/client/bu/services/editService:
 *   put:
 *     summary: Edit an existing service
 *     description: Updates the details of an existing service for a specified client, including branch, department, procedures, and pricing information.
 *     tags:
 *       - Services
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             clientId: "6735e64c5c58f271b1ce1678"
 *             branchId: "6736e43eecc4dfe280f90d03"
 *             serviceId: "6746b373b193ebcde5080449"
 *             deptId: "6746af38b193ebcde50803fd"
 *             serviceName: "asGeneral Checkup"
 *             description: "An updated routine checkup for patients."
 *             price: 120.0
 *     responses:
 *       200:
 *         description: Service updated successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               statusCode: 201
 *               message: "New service created"
 *               _id: "6746b373b193ebcde5080449"
 *               displayId: "KC-AB-2024-SV1029"
 *               __v: 0
 *               branchId: "6736e43eecc4dfe280f90d03"
 *               buId: "673ef64bdc1355e6ca2e61eb"
 *               deletedAt: null
 *               departmentId: "6746af38b193ebcde50803fd"
 *               description: "A routine checkup for patients."
 *               isActive: true
 *               price: 100
 *               procedures: []
 *               serviceName: "General Checkup-1"
 *       400:
 *         description: Validation error or missing data.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Validation error. Please check the input fields."
 *       404:
 *         description: Service not found.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Service not found with the provided serviceId."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Internal server error."
 */
