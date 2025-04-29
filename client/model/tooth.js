const mongoose = require('mongoose');
const { ConnectDb } = require('../../db/connection');
const Schema = mongoose.Schema;

const toothSchema = new Schema({
  toothNumber: { type: Number, required: true, unique: true },
  toothName: { type: String, required: true },
  toothType: {
    type: String,
    enum: ['Incisor', 'Canine', 'Premolar', 'Molar', 'Wisdom'],
    required: true,
  },
  quadrant: {
    type: String,
    enum: ['Upper Right', 'Upper Left', 'Lower Right', 'Lower Left'],
    required: true,
  },
  eruptionAge: { type: String, required: true },
  permanent: { type: Boolean, required: true },
}, { timestamps: true });

const toothModel = mongoose.model('tooth', toothSchema);

const upsertTeeth = async (teeth) => {
  try {
    const results = await Promise.all(
      teeth.map(async (item) => {
        return Tooth.updateOne(
          { toothNumber: item.toothNumber }, // Filter
          { $set: { ...item } }, // Update data
          { upsert: true } // Upsert option
        );
      })
    );
    return results;
  } catch (error) {
    console.error('Error upserting teeth:', error);
    throw error;
  }
};

module.exports = { toothModel, upsertTeeth };
