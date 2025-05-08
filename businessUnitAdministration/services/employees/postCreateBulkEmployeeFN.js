
const postCreateBulkEmployeeFN = async ({ clientId, buId, branchId, arrayObj, mainUser_id }) =>{
    try {
        const results = [];
    
        //firstName, lastName, email, phone,gender, city, state, country, ZipCode, address, panNumber, aadharNumber, emergencyPhone, bloodGroup, password
        arrayObj.forEach((element, index) => {
          const { firstName, lastName, email, phone, gender } = element;
    
          if (!firstName || !lastName || !email || !phone || !gender ){
            results.push({
              message: "Missing firstName or lastName or email or phone",
              status: false,
            });
          // } else {
          //   results.push({
          //     message: "Inserted",
          //     status: true,
          //   });
          }
        });
    
        return {
          status: true,
          message: "Bulk employee created successfully.",
        };
      } catch (error) {
        console.log("Error", error.message)
    };
}

module.exports = postCreateBulkEmployeeFN