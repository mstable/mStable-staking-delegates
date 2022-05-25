import delegates from "./delegates.json";
import uploads from "./uploads.json";
import * as path from "path";
import * as fs from "fs";

import { uploadFile } from "./modules/ipfs";

let delegateNewList = [];

const exec = async () => {
  for (const delegatee of delegates.delegatees) {
    // check if avatarURI is set and skip
    if (delegatee.hasOwnProperty("avatarURI")) {
      delegateNewList.push(delegatee);
      continue;
    }

    let avatarURI: string;

    const pfpPath = path.join(__dirname, "/pfp/", `${delegatee.address}.jpg`);
    try {
      avatarURI = await uploadFile(pfpPath);
      console.log(
        `Found pfp for ${delegatee.address} and uploaded to ${avatarURI}`
      );
      if (avatarURI) {
        delegateNewList.push({
          ...delegatee,
          avatarURI: "ipfs://" + avatarURI,
        });
      } else {
        console.log(`File upload failed for ${delegatee.address}`);
        delegateNewList.push(delegatee);
      }

      fs.unlinkSync(pfpPath);
    } catch (error) {
      console.error(
        `Could not find pfp for ${delegatee.address}, ${delegatee.displayName}, ${delegatee.ensName}`
      );
      delegateNewList.push(delegatee);
    }
  }

  delegates.delegatees = delegateNewList;
  delegates.timestamp = new Date().toISOString();
  delegates.version.minor++;

  try {
    fs.writeFileSync(
      path.join(__dirname, "delegates.json"),
      JSON.stringify(delegates, null, 2),
      { flag: "w+" }
    );
  } catch (err) {
    console.error(err);
  }

  const hash = await uploadFile(path.join(__dirname, "./delegates.json"));
  console.log(`Uploaded file to ${hash}`);

  const receipt = {
    path: hash,
    version: `v${delegates.version.major}.${delegates.version.minor}.${delegates.version.patch}`,
  };

  uploads.files.push(receipt);

  fs.writeFileSync(
    path.join(__dirname, "./uploads.json"),
    JSON.stringify(uploads, null, 2),
    { flag: "w+" }
  );
};

exec();
