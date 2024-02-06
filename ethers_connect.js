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

readBlock();