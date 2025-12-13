import path from "path";
import { writeFile } from "fs/promises";

export async function uploadImages(files, folder = "uploads") {
  const urls = [];

  for (const file of files) {
    if (file.size === 0) continue;

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `${Date.now()}-${file.name.replace(/\s/g, "_")}`;
    const filePath = path.join(process.cwd(), "public", folder, fileName);

    await writeFile(filePath, buffer);

    urls.push(`/${folder}/${fileName}`);
  }

  return { urls };
}
