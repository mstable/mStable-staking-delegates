# mStable Staking Delegates

This repo is for adding/adjust and removing profiles of mStable Staking Delegates.

### How to add a new profile

1. Fork this repo
2. Add your profile to the `/src/delegates.json` file in the "delegatees" array like this:

```
{
    "chainId": 1, // Has to be 1 = Ethereum, required
    "address": "0x0E4489998a3eAEBa52B3623268E47f62065aC09B", // Your ethereum address, required
    "bio": "Metanaut, mStable maxi/moonboi", // Short description of your profile, required
    "displayName": "Josef", // Name that is going to appear in the UI, required
    "profileURI": "https://twitter.com/aokijosef" // Your profile URI, can be twitter or something else, optional
},
```

3. Optionally: Add your profile picture in the folder `/src/pfp/`.

- It has to be a .jpg file
- It has to be named `<address>.jpg`
- It has to be a square image, max size of 256x256

4. Commit your changes and push them to the repo.

5. Create a pull request.

### How to edit a profile

1. Fork this repo
2. Edit your profile in the `/src/delegates.json` file in the "delegatees" array like this:

```
{
    "chainId": 1, // Has to be 1 = Ethereum, required
    "address": "0x0E4489998a3eAEBa52B3623268E47f62065aC09B", // Your ethereum address, required
    "bio": "Metanaut, mStable maxi/moonboi", // Short description of your profile, required
    "displayName": "Josef", // Name that is going to appear in the UI, required
    "profileURI": "https://twitter.com/aokijosef" // Your profile URI, can be twitter or something else, optional
    "avatarURI": "ipfs://QmWckEYR3Ucv9r4pQTaXGQULg8VRXZ45HjaAsidtPUJRDV" // Your profile picture, only delete if you want to upload a new one, otherwise keep it unchanged
},
```

3. Optionally: Add a new profile picture in the folder `/src/pfp/`.

- It has to be a .jpg file
- It has to be named `<address>.jpg`
- It has to be a square image, max size of 256x256
- IMPORTANT: If you want to upload a new profile picture, you have to delete `avatarURI`.

4. Commit your changes and push them to the repo.

5. Create a pull request.

### What is mStable doing afterwards?

The pull request will be reviewed by the mStable team and if it's approved, it will be merged into the master branch. We will then run

`yarn run exec`

This will upload any profile pictures to IPFS, update the `delegates.json` file, and upload it to IPFS as well. The new CIDv0 will be added to `src/uploads.json` automatically. From there it will needs to be updated in the [mStable-apps repo](https://github.com/mstable/mStable-apps).

Note: To run this, you need to have a Infura IPFS project. Copy and rename `.env.template` to `.env` and fill in the IPFS `PROJECT_ID` and `PROJECT_SECRET`.
