require ('dotenv').config();
const {ethers, formatEther, Block} = require('ethers');
const fs = require('fs');

const INFURA_WSS_URL = process.env.INFURA_WSS_URL;
const INFURA_HTTP_URL = process.env.INFURA_HTTP_URL;
// const provider = new ethers.JsonRpcProvider(INFURA_HTTP_URL);

async function subscribePendingTx() {
    const provider = new ethers.WebSocketProvider(INFURA_WSS_URL);

    provider.on('pending', (tx) => {
        // console.log(tx);
        provider.getTransaction(tx).then((transaction) => {
            let txJsonData = JSON.stringify(transaction, null, 2);
            fs.appendFile('pending-tx.json', txJsonData + ',\n', (err) => {
                if (err) throw err;
            });
        });
    });
}

subscribePendingTx();