require ('dotenv').config();
const {ethers, formatEther, Block, formatUnits} = require('ethers');

const INFURA_HTTP_URL = process.env.INFURA_HTTP_URL;
const provider = new ethers.JsonRpcProvider(INFURA_HTTP_URL);

const CONTRACT_ADDRESS = "0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE";
const ABI = require('./abi.json');

async function getInfo() {
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
    console.log("Getting info...");
    
    let name = await contract.name();
    let sym = await contract.symbol();
    let decimals = await contract.decimals();
    let totalSupply = await contract.totalSupply();
    let balance = await contract.balanceOf(CONTRACT_ADDRESS);
    

    console.log("Name: ", name);
    console.log("Symbol: ", sym);
    console.log("Decimals: ", decimals);
    console.log("Total Supply: ", formatUnits(totalSupply));
    console.log("Balance: ", formatEther(balance));
}

getInfo();



