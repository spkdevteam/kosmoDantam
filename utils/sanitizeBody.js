// manual sanitization for input body 

const sanitizeInput = (input) => {
    return input?.length? input?.replace(/[<>]/g, ''):input;
};

const sanitizeBody = async (dataObj) => {
   const temp = { }
   await Promise.all( Object.keys(dataObj).map((keys) => {
      typeof(temp[keys]) == 'String'? temp[keys] = sanitizeInput(dataObj[keys]):temp[keys] =dataObj[keys]
   }))
  
   return temp
}

module.exports = sanitizeBody