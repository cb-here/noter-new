import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const envPath = path.resolve(__dirname, ".env");

console.log("Loading .env from:", envPath);

const result = dotenv.config({ path: envPath });

if (result.error) {
  console.log("dotenv failed:", result.error);
}

export default result;