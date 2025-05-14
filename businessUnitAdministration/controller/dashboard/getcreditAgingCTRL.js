
const getcreditAgingCTRL = (req,res,next)=>{
    try {
        const input = req.query 

        res.json({
            "status": true,
            "message": "",
            "data": [
              {
                "displayMessage": "90+",
                "amount": 1000
              },
              {
                "displayMessage": "180+",
                "amount": 250
              },
              {
                "displayMessage": "270+",
                "amount": 200
              },
              {
                "displayMessage": "1+Year",
                "amount": 100
              }
            ]
          })
    } catch (error) {
        next()
    }
}

module.exports = getcreditAgingCTRL