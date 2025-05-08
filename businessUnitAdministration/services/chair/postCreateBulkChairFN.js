
const postCreateBulkChairFN = async ({clientId, buId, branchId, arrayObj, mainUser_id}) =>{
    try {
        const results = [];
    
        arrayObj.forEach((element, index) => {
          const { chairLocation, chairNumber } = element;
    
          if (!chairLocation || !chairNumber) {
            results.push({
              message: "Missing Chair Location or Chair Number",
              status: false,
            });
          // } else {
          //   results.push({
          //     index: index + 1,
          //     message: "Inserted",
          //     status: true,
          //   });
          }
        });
    
        return {
          status: true,
          message: "Bulk chair created successfully.",
        };
      } catch (error) {
        console.log("Error", error.message)
    };
}

module.exports = postCreateBulkChairFN