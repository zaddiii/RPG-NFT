
import { TonClient, WalletContractV3R2 } from "ton";
import fs from "fs";

// Your public key in hex
const PUBLIC_KEY = process.env.TON_PUBLIC_KEY; // e.g., "0a1b2c3d..." hex string

async function deployNFT() {
    const client = new TonClient({ endpoint: "https://testnet.toncenter.com/api/v2/jsonRPC" });

    // Wallet initialization
    const wallet = new WalletContractV3R2({
        publicKey: Buffer.from(PUBLIC_KEY, "hex"), // convert hex string to Buffer
        workchain: 0
    });

    // Load compiled NFT contract TVC
    const tvc = fs.readFileSync("./warrior.tvc");

    // Your NFT metadata IPFS URL
    const metadataUrl = "ipfs://bafkreicrfqwi4hx7mxyuobdwagzlycpj2lduir65wqcu5j6znwkgevk2wm";

    // Deploy the NFT contract
    const deployTx = await wallet.deployContract({
        tvc,
        initParams: {
            _metadata: [metadataUrl]  // array for single NFT
        }
    });

    console.log("NFT deployed at address:", deployTx.address.toString());
}

deployNFT().catch(console.error);