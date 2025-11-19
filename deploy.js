
import pkg from "ton";
const { TonClient, WalletContractV3R2 } = pkg;

const PUBLIC_KEY_HEX = "b33cc6ed629a4523928a01f7a436b0dcfb40f6dd77cc0e3f7a4f7e2a2d89bbea";
const WORKCHAIN = 0;
const client = new TonClient({ endpoint: "https://testnet.toncenter.com/api/v2/jsonRPC" });

async function deployNFT() {
    const pubKeyBigInt = BigInt("0x" + PUBLIC_KEY_HEX);

    const wallet = new WalletContractV3R2({
        publicKey: pubKeyBigInt, // must be BigInt
        workchain: WORKCHAIN
    });

    console.log("Wallet address:", wallet.address.toString());

    // If NFT init data is just a string, pass it directly
    const nftInitData = {
        _metadata: [ "ipfs://bafkreicrfqwi4hx7mxyuobdwagzlycpj2lduir65wqcu5j6znwkgevk2wm" ]
    };

    try {
        const deployMsg = await wallet.createDeployMessage({
            initParams: nftInitData
        });
        const res = await client.sendMessage(deployMsg);
        console.log("Deployment transaction sent:", res);
    } catch (err) {
        console.error("Deployment error:", err);
    }
}

deployNFT();