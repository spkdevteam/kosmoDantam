const getEmployeegraphCTRL = (req,res,next)=>{

    res.json({status:true,message:'success',data: [
        { name: "2025-05-09", doctor1: 20, doctor2:500,   doctor3: 50,     doctor4: 10 ,doctor6: 20 },
        { name: "2025-05-10", doctor1: 25, doctor2: 200,  doctor3: 60 ,    doctor4: 70 ,  doctor6: 50  },
        { name: "2025-05-11", doctor1: 31, doctor2: 420, doctor3: 47,   doctor4: 20 ,doctor6: 30 },
        { name: "2025-05-12", doctor1: 50, doctor2: 80, doctor3: 120 ,  doctor4: 50, doctor6: 10},
        { name: "2025-05-13", doctor1: 60, doctor2:600,   doctor3: 48,   doctor4: 50, doctor6: 10,},
        {name: "2025-05-14",  doctor1: 50, doctor2: 110, doctor3: 20,   doctor4: 15 ,  doctor6: 20,},
      ] })
}

module.exports = getEmployeegraphCTRL