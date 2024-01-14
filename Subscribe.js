require('dotenv').config();
const {Web3} = require('web3');

const INFURA_WSS_URL = process.env.INFURA_WSS_URL;
var web3 = new Web3(new Web3.providers.WebsocketProvider(INFURA_WSS_URL));


// reference:https://docs.web3js.org/guides/web3_upgrade_guide/x/subscribe_migration_guide
// API has migrated from 1.0 to 4.x
// the "Readthedocs" is deprecated
// Subscribe to new block headers
async function subscribeToNewBlockHeaders() {
    // first subscribe
    // const subscription = await web3.eth.subscribe('newHeads');
    const subscription = await web3.eth.subscribe('newHeads');
    
    // listen to events
    subscription.on('data', heads => {
        console.log('New Block Headers: ' + heads.number);
    });
    subscription.on('error', error =>
        console.log('Error when subscribing to New block header: ', error),
    );
}


async function subscribeToNewPendingTransactions() {
    // first subscribe
    // const subscription = await web3.eth.subscribe('newHeads');
    const subscription = await web3.eth.subscribe('newPendingTransactions');
    
    // listen to events
    subscription.on('data', transaction => {
        console.log('New Pending Transaction: ' + transaction);
    });
    subscription.on('error', error =>
        console.log('Error when subscribing to New block header: ', error),
    );
}

// subscribeToNewBlockHeaders();
subscribeToNewPendingTransactions();
