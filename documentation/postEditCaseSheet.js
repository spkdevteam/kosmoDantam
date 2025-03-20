const swaggerDoc = `
* openapi: 3.0.0
* info:
*   title: CaseSheet
*   version: 1.0.0
*   description: API for editing case sheets for clients.
* 
* paths:
*   /api/client/bu/caseSheet/editCaseSheet:
*     post:
*       summary: Edit Case Sheet
*       description: Updates an existing case sheet for a client.
*       operationId: editCaseSheet
*       requestBody:
*         required: true
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 clientId:
*                   type: string
*                   example: "6782084da840f3a7bf1a2f72"
*                 caseSheetId:
*                   type: string
*                   example: "6799bedd1af1fed6c0fb180b"
*                 inputObj:
*                   type: object
*                   properties:
*                     tooth:
*                       type: array
*                       items:
*                         type: object
*                         properties:
*                           tooth:
*                             type: integer
*                             example: 48
*                           serviceId:
*                             type: string
*                             example: "67da59781a576693441d30ef"
*                           status:
*                             type: string
*                             enum: [Proposed, Opted, Cancelled]
*                             example: "Proposed"
*                     serviceid:
*                       type: string
*                       example: "67a6f2d8301e33bb9ce6c926"
*                     rate:
*                       type: number
*                       format: float
*                       example: 1234
*                     subTotal:
*                       type: number
*                       format: float
*                       example: 1234
*                     discount:
*                       type: number
*                       format: float
*                       example: 50
*                     grantTotal:
*                       type: number
*                       format: float
*                       example: 1184
*                     finished:
*                       type: string
*                       example: "Proposed"
*                     prposedDate:
*                       type: string
*                       format: date-time
*                       example: "2025-03-17T00:00:00.000Z"
*                     department:
*                       type: string
*                       example: "67a6edb65f984dad91cd02d9"
*                 branchId:
*                   type: string
*                   example: "67820c87a840f3a7bf1a3114"
*                 buid:
*                   type: string
*                   example: "67820851a840f3a7bf1a307a"
*               required:
*                 - clientId
*                 - caseSheetId
*                 - inputObj
*                 - branchId
*                 - buid
*       responses:
*         '200':
*           description: Case sheet updated successfully
*           content:
*             application/json:
*               schema:
*                 type: object
*                 properties:
*                   status:
*                     type: boolean
*                     example: true
*                   message:
*                     type: string
*                     example: "Casesheet updated Successfully"
*                   data:
*                     type: object
*                     properties:
*                       _id:
*                         type: string
*                         example: "6799bedd1af1fed6c0fb180b"
*                       displayId:
*                         type: string
*                         example: "KC-BU-2024-CS1000002"
*                       patientId:
*                         type: string
*                         example: "678b23dfd6ef2ca20e1f9a6b"
*                       branchId:
*                         type: string
*                         example: "67820e34a840f3a7bf1a312d"
*                       buId:
*                         type: string
*                         nullable: true
*                       createdBy:
*                         type: string
*                         example: "67820851a840f3a7bf1a3077"
*                       cheifComplaints:
*                         type: array
*                         items:
*                           type: object
*                           properties:
*                             painValue:
*                               type: integer
*                               example: 0
*                             tooth:
*                               type: array
*                               items:
*                                 type: string
*                                 example: "UR"
*                             complaints:
*                               type: array
*                               items:
*                                 type: object
*                                 properties:
*                                   compId:
*                                     type: string
*                                     example: "67820852a840f3a7bf1a3099"
*                                   _id:
*                                     type: string
*                                     example: "6799bedd1af1fed6c0fb180d"
*                       createdAt:
*                         type: string
*                         format: date-time
*                         example: "2025-01-29T05:38:37.513Z"
*                       updatedAt:
*                         type: string
*                         format: date-time
*                         example: "2025-03-19T12:07:50.707Z"
*                       __v:
*                         type: integer
*                         example: 62
*         '400':
*           description: Bad Request
*           content:
*             application/json:
*               schema:
*                 type: object
*                 properties:
*                   status:
*                     type: boolean
*                     example: false
*                   message:
*                     type: string
*                     example: "Invalid input data"
*         '404':
*           description: Case sheet not found
*           content:
*             application/json:
*               schema:
*                 type: object
*                 properties:
*                   status:
*                     type: boolean
*                     example: false
*                   message:
*                     type: string
*                     example: "Case sheet not found"
*         '500':
*           description: Internal Server Error
*           content:
*             application/json:
*               schema:
*                 type: object
*                 properties:
*                   status:
*                     type: boolean
*                     example: false
*                   message:
*                     type: string
*                     example: "An error occurred while updating the case sheet"
`;