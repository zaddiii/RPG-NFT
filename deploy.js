
import { TonClient, WalletContractV3R2 } from "ton";
import fs from "fs";

const PRIVATE_KEY = process.env.TON_PRIVATE_KEY; // hex string
const PUBLIC_KEY = process.env.TON_PUBLIC_KEY;   // hex string

async function deployNFT() {
    const client = new TonClient({ endpoint: "https://testnet.toncenter.com/api/v2/jsonRPC" });

    const wallet = new WalletContractV3R2({
        publicKey: Buffer.from(PUBLIC_KEY, "hex"),
        secretKey: Buffer.from(PRIVATE_KEY, "hex"),
        workchain: 0
    });

    const tvc = fs.readFileSync("./warrior.tvc");
    const metadataUrl = "ipfs://bafkreicrfqwi4hx7mxyuobdwagzlycpj2lduir65wqcu5j6znwkgevk2wm";

    const deployTx = await wallet.deployContract({
        tvc,
        initParams: {
            _metadata: [metadataUrl]
        }
    });

    console.log("NFT deployed at address:", deployTx.address.toString());
}

deployNFT().catch(console.error);