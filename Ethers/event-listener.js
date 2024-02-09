require ('dotenv').config();
const {ethers, formatEther, Block, formatUnits} = require('ethers');

const INFURA_HTTP_URL = process.env.INFURA_HTTP_URL;
const provider = new ethers.JsonRpcProvider(INFURA_HTTP_URL);

const CONTRACT_ADDRESS = "0xdAC17F958D2ee523a2206206994597C13D831ec7";  // USDT
const ABI = require('./abi.json');

async function getInfo() {
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
    console.log("Getting info...");
    
    let name = await contract.name();
    let balance = await contract.balanceOf(CONTRACT_ADDRESS);
    
    console.log("Name: ", name);

    contract.on("Transfer", (from, to, value, data) => {
        console.log("Transfer event: ", from, to, formatEther(value), '\n', data.emitter);
    });
    
}

getInfo();



