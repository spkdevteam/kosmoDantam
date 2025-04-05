// manual sanitization for input body 

// const sanitizeInput = (input) => {
//     return input?.length? input?.replace(/[<>]/g, ''):input;
// };

// const sanitizeBody = async (dataObj) => {
//    const temp = { }
//    await Promise.all( Object.keys(dataObj).map((keys) => {
//       typeof(temp[keys]) == 'String'? temp[keys] = sanitizeInput(dataObj[keys]):temp[keys] =dataObj[keys]
//    }))
  
//    return temp
// }

// module.exports = sanitizeBody

const sanitizeInput = (input) => {
   if (input === "null" || input === "undefined") return null;
   return input?.length ? input.replace(/[<>]/g, '') : input;
};

const sanitizeBody = (dataObj) => {
   const temp = {};

   Object.keys(dataObj).forEach((key) => {
       const value = dataObj[key];

       if (typeof value === 'string') {
           const trimmed = value.trim();

           // Transform stringified null/undefined to actual null
           if (trimmed === 'null' || trimmed === 'undefined' || trimmed === '') {
               temp[key] = null;
           } else {
               temp[key] = sanitizeInput(trimmed);
           }
       } else {
           temp[key] = value;
       }
   });

   return temp;
};

module.exports = sanitizeBody;
