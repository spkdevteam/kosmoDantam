/**
 * @swagger
 * /api/client/bu/department/toggleDepartmentWithPage:
 *   put:
 *     summary: Toggle Status of a Department
 *     description: Toggles the status (active/inactive) of a department identified by `deptId` and `clientId`. Includes pagination and keyword filters for related departments.
 *     tags:
 *       - Department
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clientId:
 *                 type: string
 *                 description: Unique identifier of the client.
 *                 example: "6735e64c5c58f271b1ce1678"
 *               deptId:
 *                 type: string
 *                 description: Unique identifier of the department to toggle status.
 *                 example: "6746af38b193ebcde50803fd"
 *               keyWord:
 *                 type: string
 *                 description: Keyword to filter related departments.
 *                 example: "HR"
 *               page:
 *                 type: integer
 *                 description: Page number for pagination (default is 0).
 *                 example: 1
 *               perPage:
 *                 type: integer
 *                 description: Number of items per page (default is 10).
 *                 example: 5
 *     responses:
 *       200:
 *         description: Department status toggled successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               statusCode: 200
 *               message: "Department status toggled successfully."
 *               data:
 *                 deptId: "dept123"
 *                 departmentName: "Human Resources"
 *                 isActive: false
 *                 relatedDepartments:
 *                   totalCount: 15
 *                   departments:
 *                     - deptId: "dept124"
 *                       departmentName: "Finance"
 *                       isActive: true
 *                     - deptId: "dept125"
 *                       departmentName: "IT"
 *                       isActive: true
 *       400:
 *         description: Invalid input data.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               statusCode: 400
 *               message: "Invalid input data. Please verify the details."
 *       404:
 *         description: Department not found for the provided `deptId`.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               statusCode: 404
 *               message: "Department not found."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               statusCode: 500
 *               message: "Internal server error."
 */
