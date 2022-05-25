import * as dotenv from "dotenv";
dotenv.config();

import * as fs from "fs";
import { create, IPFSHTTPClient } from "ipfs-http-client";

let ipfs: IPFSHTTPClient | undefined;

const authorization =
  "Basic " +
  Buffer.from(
    process.env.PROJECT_ID + ":" + process.env.PROJECT_SECRET
  ).toString("base64");

try {
  ipfs = create({
    url: "https://ipfs.infura.io:5001",
    headers: {
      authorization,
    },
  });
} catch (error) {
  console.error("IPFS error ", error);
  ipfs = undefined;
}

// upload file to ipfs
const uploadFile = async (path: string) => {
  if (!ipfs) {
    console.error("IPFS is not initialized");
    return;
  }

  const buffer = fs.readFileSync(path);

  if (!buffer) {
    throw new Error("Could not read file");
  }
  console.log(`File ${path} read`);
  const result = await ipfs.add(buffer);
  return result.path;
};

export { uploadFile };
