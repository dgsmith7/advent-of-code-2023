import { promises as fs } from "fs";

export async function writeAnswerFile(filename, answerString) {
  await fs.writeFile(filename, answerString);
}

export async function readAFile(filename) {
  // Reading the file
  const data = await fs.readFile(filename);
  return data.toString();
}
