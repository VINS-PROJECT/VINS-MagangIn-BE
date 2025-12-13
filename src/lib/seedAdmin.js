import connectDB from "./db";
import User from "@/models/User";

export default async function seedAdmin() {
  await connectDB();

  const username = "admin";
  const password = "MagangIn2025";

  const admin = await User.findOne({ username });

  if (admin) {
    admin.passwordHash = password; // plaintext → akan di-hash oleh pre-save
    admin.role = "admin";
    await admin.save();
    console.log("✅ Admin password di-reset");
  } else {
    await User.create({
      username,
      passwordHash: password, // plaintext → akan di-hash
      role: "admin",
    });
    console.log("✅ Admin dibuat");
  }
}
