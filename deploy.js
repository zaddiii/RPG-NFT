
import { TonClient, WalletContractV3R2 } from "ton";
import fs from "fs";

// ⚠️ These should be set in Render Environment Variables
const PRIVATE_KEY = process.env.TON_PRIVATE_KEY; // hex format
const PUBLIC_KEY = process.env.TON_PUBLIC_KEY;   // hex format

async function deployNFT() {
    // Connect to TON testnet
    const client = new TonClient({ endpoint: "https://testnet.toncenter.com/api/v2/jsonRPC" });

    // Initialize wallet
    const wallet = new WalletContractV3R2({
        publicKey: Buffer.from(PUBLIC_KEY, "hex"),
        workchain: 0
    });

    // Load compiled NFT contract TVC
    const tvc = fs.readFileSync("./warrior.tvc");

    // Your NFT metadata IPFS URL
    const metadataUrl = "ipfs://bafkreicrfqwi4hx7mxyuobdwagzlycpj2lduir65wqcu5j6znwkgevk2wm";

    // Deploy the NFT contract with metadata
    const deployTx = await wallet.deployContract({
        tvc,
        initParams: {
            _metadata: [metadataUrl]  // array, even for single NFT
        }
    });

    console.log("NFT deployed at address:", deployTx.address.toString());
}

deployNFT().catch(console.error);