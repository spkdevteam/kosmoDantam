
const getRevenueSummaryCTRL = (req, res, next) => {
    try {
        const { clientId,buid,branchId ,from_date ,to_date  } = req.query

        console.log(clientId,buid,branchId ,from_date ,to_date ,'clientId,buid,branchId ,from_date ,to_date ' )

        res.json(
            {
                "status": true,
                "message": "Revenue summary fetched successfully",
                "data": [
                  {
                    "displayMessage": "Invoiced Amount",
                    "amount": 1000
                  },
                  {
                    "displayMessage": "Collection",
                    "amount": 800
                  },
                  {
                    "displayMessage": "Outstanding",
                    "amount": 200
                  },
                  {
                    "displayMessage": "Receivables TAT",
                    "amount": 53
                  }
                ]
              }
        )
    } catch (error) {
        next()
    }
}


module.exports = getRevenueSummaryCTRL