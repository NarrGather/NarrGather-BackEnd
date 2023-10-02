const jwt = require("jsonwebtoken");
const { users } = require("../models");

// Daftar hitam untuk menyimpan token yang dinonaktifkan
const tokenBlacklist = new Set();

module.exports = async function (req, res, next) {
  try {
    // Check jika request header authorization ada atau gak
    if (!req.headers.authorization) {
      return res.status(401).json({
        status: "failed",
        message: "Token Gak ada/authorization nya gak ada",
      });
    }

    const bearerToken = req.headers.authorization;
    const token = bearerToken.split("Bearer ")[1];

    // Cek jika token ada dalam daftar hitam
    if (tokenBlacklist.has(token)) {
      return res.status(401).json({
        status: "failed",
        message: "Token sudah dinonaktifkan",
      });
    }

    const payload = jwt.verify(token, "rahasia");

    // Cek status pengguna
    const user = await users.findByPk(payload.id);
    if (!user || user.deleted) {
      tokenBlacklist.add(token); // Tambahkan token ke daftar hitam
      return res.status(401).json({
        status: "failed",
        message: "Pengguna tidak ditemukan atau sudah dihapus",
      });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};
