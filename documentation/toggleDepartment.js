// /**
//  * @swagger
//  * /api/client/bu/department/toggleDepartment:
//  *   patch:
//  *     summary: Toggle department status (on/off)
//  *     description: Toggles the status of a department (activates or deactivates) based on the provided `clientId` and `deptId`.
//  *     tags:
//  *       - Department
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           example:
//  *             clientId: "6735e64c5c58f271b1ce1678"
//  *             deptId: "UT-AB-2024-DP100008"
//  *              
//  *     responses:
//  *       200:
//  *         description: Department status updated successfully.
//  *         content:
//  *           application/json:
//  *             example:
//  *               status: true
//  *               message: "Department status updated successfully."
//  *               data:
//  *                 clientId: "6735e64c5c58f271b1ce1678"
//  *                 deptId: "UT-AB-2024-DP100008"
//  *                 status: true  # or false depending on the operation
//  *       400:
//  *         description: Validation error or missing data.
//  *         content:
//  *           application/json:
//  *             example:
//  *               status: false
//  *               message: "Validation error. Please check the input fields."
//  *       404:
//  *         description: Department not found by deptId.
//  *         content:
//  *           application/json:
//  *             example:
//  *               status: false
//  *               message: "Department with the specified ID not found."
//  *       500:
//  *         description: Internal server error.
//  *         content:
//  *           application/json:
//  *             example:
//  *               status: false
//  *               message: "Internal server error."
//  */
