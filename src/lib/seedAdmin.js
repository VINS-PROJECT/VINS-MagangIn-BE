import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Fix path agar .env terbaca dari root project
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../../.env") });

// Log env check
console.log("Loaded MONGODB_URI =>", process.env.MONGODB_URI);

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("❌ ERROR: MONGODB_URI tidak ditemukan dalam .env");
  process.exit(1);
}

// Admin Model
const adminSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const Admin = mongoose.models.Admin || mongoose.model("Admin", adminSchema);

// Seeder Function
async function seedAdmin() {
  try {
    console.log("🔌 Menghubungkan ke MongoDB...");
    await mongoose.connect(MONGODB_URI);

    const existingAdmin = await Admin.findOne({ username: "admin" });

    if (existingAdmin) {
      console.log("✔️ Admin sudah ada. Tidak perlu menambah.");
      mongoose.connection.close();
      return;
    }

    const hashedPassword = await bcrypt.hash("Mark90r123", 10);

    const newAdmin = await Admin.create({
      username: "admin",
      password: hashedPassword,
    });

    console.log("🎉 Admin baru berhasil dibuat:", newAdmin.username);
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Gagal membuat admin:", error);
    mongoose.connection.close();
  }
}

seedAdmin();
