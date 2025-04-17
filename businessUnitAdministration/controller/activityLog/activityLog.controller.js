const activityLog = async (req, res, next) => {
    try {
        return res.status(200).json({
            "status": true,
            "message": "Activity logs retrieved successfully.",
            "data": {
              "activityLogs": [
                {
                  "_id": "67a821c491c03f67d6c5fd53",
                  "branchId": {
                    "_id": "67820e34a840f3a7bf1a312d",
                    "name": "Kosmo Dental Clinic Branch two"
                  },
                  "buId": {
                    "_id": "67820851a840f3a7bf1a307a",
                    "name": "kasif unit two Businsenss Unit"
                  },
                  "userId": {
                    "_id": "67871f6a7bb6b5c411365ff7",
                    "firstName": "Abhisek",
                    "lastName": "K"
                  },
                  "sourceLink": "dantam.app/invoice",
                  "activity": "Invoice Created",
                  "description": "",
                  "data": {},
                  "status": false,
                  "datetime": "12/05/1988T00:10:51.000z",
                  "createdBy": {
                    "_id": "67820851a840f3a7bf1a3077",
                    "firstName": "kasif",
                    "lastName": "unit two"
                  },
                  "updatedBy": {
                    "_id": "67820851a840f3a7bf1a3077",
                    "firstName": "kasif",
                    "lastName": "unit two"
                  },
                  "deletedBy": null,
                  "deletedAt": null,
                  "createdAt": "2025-02-09T03:32:20.392Z",
                  "updatedAt": "2025-02-09T16:31:46.329Z",
                  "__v": 0
                },
                {
                  "_id": "67a821c491c03f67d6c5fd53",
                  "branchId": {
                    "_id": "67820e34a840f3a7bf1a312d",
                    "name": "Kosmo Dental Clinic Branch two"
                  },
                  "buId": {
                    "_id": "67820851a840f3a7bf1a307a",
                    "name": "kasif unit two Businsenss Unit"
                  },
                  "userId": {
                    "_id": "67871f6a7bb6b5c411365ff7",
                    "firstName": "Ayan",
                    "lastName": "S"
                  },
                  "sourceLink": "dantam.app/invoice",
                  "activity": "Invoice Created",
                  "description": "",
                  "data": {},
                  "status": false,
                  "datetime": "12/05/1988T00:10:51.000z",
                  "createdBy": {
                    "_id": "67820851a840f3a7bf1a3077",
                    "firstName": "kasif",
                    "lastName": "unit two"
                  },
                  "updatedBy": {
                    "_id": "67820851a840f3a7bf1a3077",
                    "firstName": "kasif",
                    "lastName": "unit two"
                  },
                  "deletedBy": null,
                  "deletedAt": null,
                  "createdAt": "2025-02-09T03:32:20.392Z",
                  "updatedAt": "2025-02-09T16:31:46.329Z",
                  "__v": 0
                },
                {
                  "_id": "67a821c491c03f67d6c5fd53",
                  "branchId": {
                    "_id": "67820e34a840f3a7bf1a312d",
                    "name": "Kosmo Dental Clinic Branch two"
                  },
                  "buId": {
                    "_id": "67820851a840f3a7bf1a307a",
                    "name": "kasif unit two Businsenss Unit"
                  },
                  "userId": {
                    "_id": "67871f6a7bb6b5c411365ff7",
                    "firstName": "sandeep",
                    "lastName": "p"
                  },
                  "sourceLink": "dantam.app/invoice",
                  "activity": "Invoice Created",
                  "description": "",
                  "data": {},
                  "status": false,
                  "datetime": "12/05/1988T00:10:51.000z",
                  "createdBy": {
                    "_id": "67820851a840f3a7bf1a3077",
                    "firstName": "kasif",
                    "lastName": "unit two"
                  },
                  "updatedBy": {
                    "_id": "67820851a840f3a7bf1a3077",
                    "firstName": "kasif",
                    "lastName": "unit two"
                  },
                  "deletedBy": null,
                  "deletedAt": null,
                  "createdAt": "2025-02-09T03:32:20.392Z",
                  "updatedAt": "2025-02-09T16:31:46.329Z",
                  "__v": 0
                },
              ],
              "metadata": {
                "page": 1,
                "perPage": 1,
                "totalCount": 3,
                "totalPages": 1
              }
            }
          });
    } catch (error) {
        next(error);
    }
}

module.exports = activityLog;