// deploy.js
import ton from "ton";
import fs from "fs";

const { TonClient, WalletContractV3R2, Account } = ton;

// === CONFIG ===

// Your wallet public key (64 hex characters, no 0x)
const PUBLIC_KEY = "b33cc6ed629a4523928a01f7a436b0dcfb40f6dd77cc0e3f7a4f7e2a2d89bbea";

// Workchain (usually 0)
const WORKCHAIN = 0;

// TON Testnet endpoint
const client = new TonClient({ endpoint: "https://testnet.toncenter.com/api/v2/jsonRPC" });

// NFT metadata URL (IPFS)
const METADATA_URL = "ipfs://bafkreicrfqwi4hx7mxyuobdwagzlycpj2lduir65wqcu5j6znwkgevk2wm";

// Convert public key to buffer
const pubKeyBuffer = Buffer.from(PUBLIC_KEY, "hex");

async function deployNFT() {
    // Initialize wallet
    const wallet = new WalletContractV3R2({
        publicKey: pubKeyBuffer,
        workchain: WORKCHAIN
    });

    console.log("Wallet address (to fund with test TON):", wallet.address.toString());

    // Deploy NFT
    const nftInitData = {
        _metadata: [METADATA_URL] // single NFT metadata
    };

    console.log("Deploying NFT...");

    const deployTx = await wallet.createDeployMessage({
        initParams: nftInitData,
    });

    const sendResult = await client.sendMessage(deployTx);

    console.log("NFT deployment transaction sent:", sendResult);
}

deployNFT().catch(console.error);