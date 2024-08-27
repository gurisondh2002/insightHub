const Admin = require("../models/admin.model");
const CryptoJS = require('crypto-js');
const jwt = require("jsonwebtoken");


module.exports = {

  createAdmin: async (req, res) => {
    try {
      const existingAdmin = await Admin.findOne({ adminEmail: req.body.adminEmail });
      if (existingAdmin) {
        return res.status(400).json({ message: 'Admin already exists' });
      }
      const encryptedPassword = CryptoJS.AES.encrypt(req.body.adminPassword, process.env.ADMINSECRET).toString();

      const newAdmin = new Admin({
        adminName: req.body.adminName,
        adminEmail: req.body.adminEmail,
        adminPassword: encryptedPassword,
        adminGender: req.body.adminGender || undefined,
        adminPhone: req.body.adminPassword,
        adminProfile: req.file ? req.file.filename : ''
      });

      await newAdmin.save();
      res.status(201).json({ message: 'Admin created successfully', newAdmin });
    } catch (error) {
      console.error('Error creating Admin:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },


  loginAdmin: async (req, res) => {
    try {
      const admin = await Admin.findOne({ adminEmail: req.body.adminEmail });
      if (!admin) {
        return res.status(401).json({ message: "Wrong credentials..." });
      }

      const decryptPassword = CryptoJS.AES.decrypt(admin.adminPassword, process.env.ADMINSECRET);
      const decryptedPassword = decryptPassword.toString(CryptoJS.enc.Utf8);

      if (decryptedPassword !== req.body.adminPassword) {
        return res.status(401).json({ message: "Wrong password" });
      }

      const adminToken = jwt.sign({ id: admin.id }, process.env.JWT_SEC, { expiresIn: "7d" });

      const { password, __v, createdAt, updatedAt, ...adminData } = admin._doc;

      res.status(200).json({ ...adminData, token: adminToken });
    } catch (err) {
      console.error("Login failed:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
};