
// deploy.js
import pkg from "ton"; // default import for CommonJS module
const { TonClient, WalletContractV3R2 } = pkg;

// === CONFIG ===

// Your wallet public key (64 hex characters, no 0x prefix)
const PUBLIC_KEY = "b33cc6ed629a4523928a01f7a436b0dcfb40f6dd77cc0e3f7a4f7e2a2d89bbea";

// Workchain (usually 0)
const WORKCHAIN = 0;

// TON Testnet endpoint
const client = new TonClient({ endpoint: "https://testnet.toncenter.com/api/v2/jsonRPC" });

// NFT metadata URL (IPFS)
const METADATA_URL = "ipfs://bafkreicrfqwi4hx7mxyuobdwagzlycpj2lduir65wqcu5j6znwkgevk2wm";

// Convert hex public key to BigInt
const pubKeyBigInt = BigInt("0x" + PUBLIC_KEY);

async function deployNFT() {
    // Initialize wallet
    const wallet = new WalletContractV3R2({
        publicKey: pubKeyBigInt,
        workchain: WORKCHAIN
    });

    console.log("Wallet address (fund with testnet TON):", wallet.address.toString());

    // Make sure your wallet has some testnet TON
    // You can use TON Surf Testnet Faucet or TON Labs Testnet faucet

    // Deploy NFT
    const nftInitData = {
        _metadata: [METADATA_URL] // single NFT metadata
    };

    console.log("Deploying NFT...");

    try {
        const deployTx = await wallet.createDeployMessage({
            initParams: nftInitData
            // TVC file not needed if using SDK default NFT contract
        });

        const sendResult = await client.sendMessage(deployTx);
        console.log("NFT deployment transaction sent:", sendResult);
    } catch (err) {
        console.error("Error deploying NFT:", err);
    }
}

deployNFT();