require ('dotenv').config();
const { ethers, formatEther, Block } = require('ethers');

const INFURA_HTTP_URL = process.env.INFURA_HTTP_URL;
const provider = new ethers.JsonRpcProvider(INFURA_HTTP_URL);

async function readBlock() {
    let blockNumber = await provider.getBlockNumber();

    provider.getBlock(blockNumber).then((block) => {
       console.log(block)
    });
}

async function readTx() {
    let txHash = '0x3aed3a00f1520bf0676e5ca61381e797b414d860df3c6fc91fcfd12fd4c2d2fb';
    provider.getTransaction(txHash).then((tx) => {
        console.log(tx);
        console.log(ethers.formatEther(tx.value) + ' ETH');
    });
}

// readBlock();
readTx();