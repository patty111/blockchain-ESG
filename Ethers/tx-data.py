import requests
import pandas as pd
from dotenv import load_dotenv
import os
import json

env = load_dotenv()

def get_transactions(block_number):
    api_key = os.getenv('ETHERSCAN_API_KEY')  # replace with your Etherscan API key
    url = f"https://api.etherscan.io/api?module=proxy&action=eth_getBlockByNumber&tag={block_number}&boolean=true&apikey={api_key}"
    response = requests.get(url)
    data = json.loads(response.text)
    print(data)
    return data['result']['transactions']


# replace with the start and end block numbers
startblock = '11565019'  # approx block number on 2021/1/1
endblock = '13565019'  # approx block number on 2024/1/1
transactions = get_transactions(1156019)
# for block in range(startblock, endblock):
#     transactions = get_transactions(block)

# for tx in transactions:
#     print(f"From: {tx['from']}, To: {tx['to']}, Value: {tx['value']}")


# assuming transactions is your list of transactions
df = pd.DataFrame(transactions)

# write the DataFrame to a CSV file
df.to_csv('transactions.csv', index=False)