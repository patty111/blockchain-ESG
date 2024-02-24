import requests
import pandas as pd
from dotenv import load_dotenv
import os
import json
from decimal import Decimal


load_dotenv()

def get_transactions(block_number: int):
    api_key = os.getenv('ETHERSCAN_API_KEY')  # replace with your Etherscan API key
    url = f"https://api.etherscan.io/api?module=proxy&action=eth_getBlockByNumber&tag={block_number}&boolean=true&apikey={api_key}"
    response = requests.get(url)
    data = json.loads(response.text)

    return data['result']['transactions']


def decode_transfer_input(input_data):
    # method id
    data = input_data[10:]

    # next 64 characters are recipient's address
    recipient_address = '0x' + data[24:64]

    # rest is the amount transferred, in hexadecimal, wei
    amount_hex = data[64:]
    if amount_hex:
        amount_in_wei = Decimal(int(amount_hex, 16))
        amount_in_eth = amount_in_wei / Decimal(10**18)
    else:
        amount_in_wei = Decimal(0)
        amount_in_eth = Decimal(0)

    return recipient_address, amount_in_eth


# startblock = 19293540
# endblock = 19297283

transactions = get_transactions(hex(18908899))

# filter transactions for the MCO2 contract
mco2_contract_address = '0xfC98e825A2264D890F9a1e68ed50E1526abCcacD'.lower()
mco2_txs = []

for tx in transactions:
    if tx['to'] is not None and tx['to'].lower() == mco2_contract_address:
        mco2_txs.append(tx)
        
    if tx['from'] is not None and tx['from'].lower() == mco2_contract_address:
        mco2_txs.append(tx)
            

for tx in mco2_txs:
    transfer_input_parsing = decode_transfer_input(tx['input'])
    print(f"Interacted With: {tx['to']}\nFrom: {tx['from']}, Recipient: {transfer_input_parsing[0]}\nAmount: {transfer_input_parsing[1]}ETH")
    print('-----------------------------------')