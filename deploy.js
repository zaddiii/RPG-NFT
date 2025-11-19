
import TonWeb from "tonweb";
import fs from "fs";

const tonweb = new TonWeb(new TonWeb.HttpProvider("https://testnet.toncenter.com/api/v2/jsonRPC")); // TON testnet

const PRIVATE_KEY = process.env.TON_PRIVATE_KEY; // save key as Render secret
const PUBLIC_KEY = process.env.TON_PUBLIC_KEY;

async function deployNFT() {
    const wallet = new TonWeb.wallet.all.v3R2({ publicKey: PUBLIC_KEY, secretKey: PRIVATE_KEY });

    // Example: Load compiled TVC (FunC compiled contract)
    const tvc = fs.readFileSync("./warriors.tvc"); // your contract file
    const initialData = {}; // contract init params

    const deployTx = await wallet.deployContract({ tvc, initParams: initialData });
    console.log("Deployed contract at address:", deployTx.address);
}

deployNFT();
