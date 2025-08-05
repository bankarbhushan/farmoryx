import vegModel from "../models/veg.model.js";

export const createVeg = async (req, res) => {
  try {
    const { nameEnglish, nameHinglish, nameMarathi } = req.body;

    const existing = await vegModel.findOne({ nameHinglish });

    if (existing) {
      return res.status(400).json({ message: "This veg already exist." });
    }

    const newVeg = await vegModel.create({
      nameEnglish,
      nameHinglish,
      nameMarathi,
    });

    res.status(201).json({
      message: `${nameHinglish} created successfully`,
      data: newVeg,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getAllVeg = async (req, res) => {
  try {
    const feed = await vegModel.find();

    if (feed.length > 0) {
      return res
        .status(200)
        .json({ data: feed, message: "All veg featch Succussfully." });
    } else {
      return res.status(404).json({ message: "No veg found" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const updateVeg = async (req, res) => {
  try {
    const { id } = req.params;
    const { nameEnglish, nameHinglish, nameMarathi } = req.body;

    const veg = await vegModel.findById(id);

    if (!veg) {
      return res.status(404).json({ message: "veg not found" });
    }

    if (nameEnglish) veg.nameEnglish = nameEnglish;
    if (nameHinglish) veg.nameHinglish = nameHinglish;
    if (nameMarathi) veg.nameMarathi = nameMarathi;

    await veg.save();

    res.status(200).json({
      message: "veg updated successfully",
      data: veg,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const deleteVeg = async (req, res) => {
  try {
    const { id } = req.params;

    const veg = await vegModel.findById(id);

    const foundVeg = await vegModel.findByIdAndDelete(id);

    if (!foundVeg) {
      return res.status(404).json({ message: `Veg not found` });
    }
    res
      .status(200)
      .json({ message: `${veg.nameHinglish} deleted successfully` });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
