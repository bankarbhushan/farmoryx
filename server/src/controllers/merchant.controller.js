import mongoose from "mongoose";
import merchantModel from "../models/merchant.model.js";

// Create Merchant
export const createMerchant = async (req, res) => {
  try {
    const { name, phone, shopName, address } = req.body;

    const existing = await merchantModel.findOne({ name });
    if (existing) {
      return res.status(400).json({ message: "name already registered." });
    }

    const newMerchant = await merchantModel.create({
      name,
      phone,
      address,
      shopName,
    });

    res.status(201).json({
      message: `Merchant ${newMerchant.name} created successfully.`,
      data: newMerchant,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get All Merchants
export const getAllMerchants = async (req, res) => {
  try {
    const merchants = await merchantModel.find();

    if (merchants.length === 0) {
      return res.status(404).json({ message: "No merchants found." });
    }

    res.status(200).json({ data: merchants });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Unable to fetch merchants", error: error.message });
  }
};

// Update Merchant
export const updateMerchant = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phone, shopName, address, role } = req.body;

    if (role) {
      return res.status(403).json({ message: "Email or role update not all" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Merchant ID" });
    }

    const merchant = await merchantModel.findById(id);
    if (!merchant) {
      return res.status(404).json({ message: "Merchant not found." });
    }

    if (name) merchant.name = name;
    if (phone) merchant.phone = phone;
    if (shopName) merchant.shopName = shopName;
    if (address) merchant.address = address;

    await merchant.save();

    res.status(200).json({
      message: "Merchant updated successfully.",
      data: merchant,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete Merchant
export const deleteMerchant = async (req, res) => {
  try {
    const { id } = req.params;

    const merchant = await merchantModel.findByIdAndDelete(id);

    if (!merchant) {
      return res.status(404).json({ message: "Merchant not found" });
    }

    res.status(200).json({ message: `${merchant.name} deleted successfully` });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
