{
    "designation": "Branch Admin",
    "Menu": {
      "Branches": {
        "displayName": "All Branches",
        "access": true,
        "api": "/path/to/menupage",
        "subMenu": {
          "create": {
            "access": true,
            "api": "/path/to/Api"
          },
          "Edit": {
            "access": true,
            "api": "/path/to/Api"
          },
          "Delete": {
            "access": false,
            "api": ""
          }
        }
      },
      "Chairs": {
        "displayName": "All Chairs",
        "access": true,
        "api": "/path/to/menupage",
        "subMenu": {
          "create": {
            "access": true,
            "api": "/path/to/Api"
          },
          "Edit": {
            "access": false,
            "api": ""
          },
          "Delete": {
            "access": false,
            "api": ""
          }
        }
      },
      "Employee": {
        "displayName": "All Employees",
        "access": false,
        "api": "",
        "subMenu": {}
      },
      "Department": {
        "displayName": "All Departments",
        "access": false,
        "api": "",
        "subMenu": {}
      },
      "Services": {
        "displayName": "All Services ",
        "access": true,
        "api": "/path/to/menupage",
        "subMenu": {
          "create": {
            "access": true,
            "api": "/path/to/Api"
          },
          "Edit": {
            "access": false,
            "api": ""
          },
          "Delete": {
            "access": false,
            "api": ""
          }
        }
      },
      "Procedures": {
        "displayName": "All Procedures",
        "access": true,
        "api": "/path/to/menupage",
        "subMenu": {
          "create": {
            "access": false,
            "api": ""
          },
          "Edit": {
            "access": false,
            "api": ""
          },
          "delete": {
            "access": false,
            "api": ""
          }
        }
      }
    }
  }
