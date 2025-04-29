const httpStatusCode = require("../../utils/http-status-code")

const tooth = [
    {
      "toothNumber": 1,
      "toothName": "Upper Right Third Molar",
      "toothType": "Molar",
      "quadrant": "Upper Right",
      "eruptionAge": "17-21 years",
      "permanent": true
    },
    {
      "toothNumber": 2,
      "toothName": "Upper Right Second Molar",
      "toothType": "Molar",
      "quadrant": "Upper Right",
      "eruptionAge": "12-13 years",
      "permanent": true
    },
    {
      "toothNumber": 3,
      "toothName": "Upper Right First Molar",
      "toothType": "Molar",
      "quadrant": "Upper Right",
      "eruptionAge": "6-7 years",
      "permanent": true
    },
    {
      "toothNumber": 4,
      "toothName": "Upper Right Second Premolar",
      "toothType": "Premolar",
      "quadrant": "Upper Right",
      "eruptionAge": "10-11 years",
      "permanent": true
    },
    {
      "toothNumber": 5,
      "toothName": "Upper Right First Premolar",
      "toothType": "Premolar",
      "quadrant": "Upper Right",
      "eruptionAge": "9-11 years",
      "permanent": true
    },
    {
      "toothNumber": 6,
      "toothName": "Upper Right Canine",
      "toothType": "Canine",
      "quadrant": "Upper Right",
      "eruptionAge": "11-12 years",
      "permanent": true
    },
    {
      "toothNumber": 7,
      "toothName": "Upper Right Lateral Incisor",
      "toothType": "Incisor",
      "quadrant": "Upper Right",
      "eruptionAge": "7-8 years",
      "permanent": true
    },
    {
      "toothNumber": 8,
      "toothName": "Upper Right Central Incisor",
      "toothType": "Incisor",
      "quadrant": "Upper Right",
      "eruptionAge": "6-7 years",
      "permanent": true
    },
    {
      "toothNumber": 9,
      "toothName": "Upper Left Central Incisor",
      "toothType": "Incisor",
      "quadrant": "Upper Left",
      "eruptionAge": "6-7 years",
      "permanent": true
    },
    {
      "toothNumber": 10,
      "toothName": "Upper Left Lateral Incisor",
      "toothType": "Incisor",
      "quadrant": "Upper Left",
      "eruptionAge": "7-8 years",
      "permanent": true
    },
    {
      "toothNumber": 11,
      "toothName": "Upper Left Canine",
      "toothType": "Canine",
      "quadrant": "Upper Left",
      "eruptionAge": "11-12 years",
      "permanent": true
    },
    {
      "toothNumber": 12,
      "toothName": "Upper Left First Premolar",
      "toothType": "Premolar",
      "quadrant": "Upper Left",
      "eruptionAge": "9-11 years",
      "permanent": true
    },
    {
      "toothNumber": 13,
      "toothName": "Upper Left Second Premolar",
      "toothType": "Premolar",
      "quadrant": "Upper Left",
      "eruptionAge": "10-11 years",
      "permanent": true
    },
    {
      "toothNumber": 14,
      "toothName": "Upper Left First Molar",
      "toothType": "Molar",
      "quadrant": "Upper Left",
      "eruptionAge": "6-7 years",
      "permanent": true
    },
    {
      "toothNumber": 15,
      "toothName": "Upper Left Second Molar",
      "toothType": "Molar",
      "quadrant": "Upper Left",
      "eruptionAge": "12-13 years",
      "permanent": true
    },
    {
      "toothNumber": 16,
      "toothName": "Upper Left Third Molar",
      "toothType": "Molar",
      "quadrant": "Upper Left",
      "eruptionAge": "17-21 years",
      "permanent": true
    },
    {
      "toothNumber": 17,
      "toothName": "Lower Left Third Molar",
      "toothType": "Molar",
      "quadrant": "Lower Left",
      "eruptionAge": "17-21 years",
      "permanent": true
    },
    {
      "toothNumber": 18,
      "toothName": "Lower Left Second Molar",
      "toothType": "Molar",
      "quadrant": "Lower Left",
      "eruptionAge": "12-13 years",
      "permanent": true
    },
    {
      "toothNumber": 19,
      "toothName": "Lower Left First Molar",
      "toothType": "Molar",
      "quadrant": "Lower Left",
      "eruptionAge": "6-7 years",
      "permanent": true
    },
    {
      "toothNumber": 20,
      "toothName": "Lower Left Second Premolar",
      "toothType": "Premolar",
      "quadrant": "Lower Left",
      "eruptionAge": "10-11 years",
      "permanent": true
    },
    {
      "toothNumber": 21,
      "toothName": "Lower Left First Premolar",
      "toothType": "Premolar",
      "quadrant": "Lower Left",
      "eruptionAge": "9-11 years",
      "permanent": true
    },
    {
      "toothNumber": 22,
      "toothName": "Lower Left Canine",
      "toothType": "Canine",
      "quadrant": "Lower Left",
      "eruptionAge": "11-12 years",
      "permanent": true
    },
    {
      "toothNumber": 23,
      "toothName": "Lower Left Lateral Incisor",
      "toothType": "Incisor",
      "quadrant": "Lower Left",
      "eruptionAge": "7-8 years",
      "permanent": true
    },
    {
      "toothNumber": 24,
      "toothName": "Lower Left Central Incisor",
      "toothType": "Incisor",
      "quadrant": "Lower Left",
      "eruptionAge": "6-7 years",
      "permanent": true
    },
    {
      "toothNumber": 25,
      "toothName": "Lower Right Central Incisor",
      "toothType": "Incisor",
      "quadrant": "Lower Right",
      "eruptionAge": "6-7 years",
      "permanent": true
    },
    {
      "toothNumber": 26,
      "toothName": "Lower Right Lateral Incisor",
      "toothType": "Incisor",
      "quadrant": "Lower Right",
      "eruptionAge": "7-8 years",
      "permanent": true
    },
    {
      "toothNumber": 27,
      "toothName": "Lower Right Canine",
      "toothType": "Canine",
      "quadrant": "Lower Right",
      "eruptionAge": "11-12 years",
      "permanent": true
    },
    {
      "toothNumber": 28,
      "toothName": "Lower Right First Premolar",
      "toothType": "Premolar",
      "quadrant": "Lower Right",
      "eruptionAge": "9-11 years",
      "permanent": true
    },
    {
      "toothNumber": 29,
      "toothName": "Lower Right Second Premolar",
      "toothType": "Premolar",
      "quadrant": "Lower Right",
      "eruptionAge": "10-11 years",
      "permanent": true
    },
    {
      "toothNumber": 30,
      "toothName": "Lower Right First Molar",
      "toothType": "Molar",
      "quadrant": "Lower Right",
      "eruptionAge": "6-7 years",
      "permanent": true
    },
    {
      "toothNumber": 31,
      "toothName": "Lower Right Second Molar",
      "toothType": "Molar",
      "quadrant": "Lower Right",
      "eruptionAge": "12-13 years",
      "permanent": true
    },
    {
      "toothNumber": 32,
      "toothName": "Lower Right Third Molar",
      "toothType": "Molar",
      "quadrant": "Lower Right",
      "eruptionAge": "17-21 years",
      "permanent": true
    }
  ]


  const getAllTooths =async ()=>{
    try {
      return {status:true,statusCode:httpStatusCode.OK,data:tooth}
    } catch (error) {
      throw new Error(error)
    }
  }
  
  module.exports = getAllTooths