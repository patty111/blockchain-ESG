// online decoder : https://www.ethereumdecoder.com/
require('dotenv').config();
const {Web3} = require('web3');

const INFURA_WSS_URL = process.env.INFURA_WSS_URL;
const INFURA_HTTP_URL = process.env.INFURA_HTTP_URL;
const httpProvider = new Web3.providers.HttpProvider(INFURA_HTTP_URL);

// var web3 = new Web3(new Web3.providers.WebsocketProvider(INFURA_WSS_URL));
var web3 = new Web3(httpProvider);

tx_hash = "0x9ef5db005614e03b51884682e0947b4acec93619ef291643d3d4802f40a6bd6b"

web3.eth.getTransaction(tx_hash).then(console.log);





// tx_hash = '0xa3b2a9fdef6a66ac0707f29ccc8580ecedb89ce2cfdc4341f25526c41f675ce8'

// web3.eth.getTransaction(tx_hash, (error, result) => {
//     if (error) {
//         console.log(error)
//     } else {
//         console.log(result)
//     }
// });
// web3.eth.getTransaction(tx_hash).then(console.log);