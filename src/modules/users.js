import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const getUsers = () => {
  const filePath = path.join(__dirname, "../data/users.json");
  return fs.readFileSync(filePath);
};
