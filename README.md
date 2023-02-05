# crypto-watcher

Crypto Watcher is a privacy-oriented tool used to track Ether and token balances across multiple addresses and groups (ledgers).

All the data is stored locally in an AES256 encrypted database.

## Installation

```sh
git clone https://github.com/lbeder/crypto-watcher

cd crypto-watcher

yarn
```

## Usage

```sh
yarn <command>

Commands:
  yarn show              Show the configuration
  yarn add-addresses     Add an address or a list of space-separated addresses
                         to a named ledger
  yarn remove-addresses  Remove an address or a list of space-separated
                         addresses from a named ledger
  yarn remove-ledger     Remove an entire named ledger
  yarn add-token         Add a token to the config
  yarn remove-token      Remove a token from the config
  yarn query             Query all addresses and tokens

Options:
  --version  Show version number                                       [boolean]
  --url      Web3 provider's URL     [string] [default: "http://localhost:8545"]
  --verbose  Verbose mode                                              [boolean]
  --price    Query prices using Coingecko             [boolean] [default: false]
  --help     Show help                                                 [boolean]
```

### Example

#### Adding addresses

Let's start by adding the following addresses to the following named ledgers:

* **Binance**:
  * `0xBE0eB53F46cd790Cd13851d5EFf43D12404d33E8`
  * `0xF977814e90dA44bFA03b6295A0616a897441aceC`
* **Kraken**:
  * `0xDA9dfA130Df4dE4673b89022EE50ff26f6EA73Cf`

```sh
yarn add-addresses --name "Binance" --data 0xBE0eB53F46cd790Cd13851d5EFf43D12404d33E8 0xF977814e90dA44bFA03b6295A0616a897441aceC

? Enter password [hidden]

yarn add-addresses --name "Kraken" --data 0xDA9dfA130Df4dE4673b89022EE50ff26f6EA73Cf

? Enter password [hidden]

```

We can see that the configuration has been updated:

```sh
yarn show

? Enter password [hidden]

Configuration:
‾‾‾‾‾‾‾‾‾‾‾‾‾‾
Ledgers:
‾‾‾‾‾‾‾‾
{
  "Binance": [
    "0xBE0eB53F46cd790Cd13851d5EFf43D12404d33E8",
    "0xF977814e90dA44bFA03b6295A0616a897441aceC"
  ],
  "Kraken": [
    "0xDA9dfA130Df4dE4673b89022EE50ff26f6EA73Cf"
  ]
}

Tokens:
‾‾‾‾‾‾‾
{}
```

As you can see, by default the known token list is empty, therefore querying the balances will only return Ether amounts:

```sh
yarn query

? Enter password [hidden]

Processing the "Binance" ledger...
Processing the "Kraken" ledger...

Total Amounts:
‾‾‾‾‾‾‾‾‾‾‾‾‾‾
  ETH: 5,224,590.318

Ledger Totals:
‾‾‾‾‾‾‾‾‾‾‾‾‾‾
Binance
  ETH: 3,443,750.339

Kraken
  ETH: 1,780,839.979
```

Let's add the USDT, USDC, DAI, and LINK tokens and try again:

```sh
yarn add-token --symbol USDT --address 0xdAC17F958D2ee523a2206206994597C13D831ec7 --decimals 6

? Enter password [hidden]

yarn add-token --symbol USDC --address 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48 --decimals 6

? Enter password [hidden]

yarn add-token --symbol DAI --address 0x6B175474E89094C44Da98b954EedeAC495271d0F

? Enter password [hidden]

yarn add-token --symbol LINK --address 0x514910771AF9Ca656af840dff83E8264EcF986CA

? Enter password [hidden]

```

We can check and verify that the tokens are now part of the configuration:

```sh
yarn show

? Enter password [hidden]

Configuration:
‾‾‾‾‾‾‾‾‾‾‾‾‾‾
Ledgers:
‾‾‾‾‾‾‾‾
{
  "Binance": [
    "0xBE0eB53F46cd790Cd13851d5EFf43D12404d33E8",
    "0xF977814e90dA44bFA03b6295A0616a897441aceC"
  ],
  "Kraken": [
    "0xDA9dfA130Df4dE4673b89022EE50ff26f6EA73Cf"
  ]
}

Tokens:
‾‾‾‾‾‾‾
{
  "USDT": {
    "address": "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    "decimals": 6
  },
  "USDC": {
    "address": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    "decimals": 6
  },
  "LINK": {
    "address": "0x514910771AF9Ca656af840dff83E8264EcF986CA",
    "decimals": 18
  }
}
```

Let's query the balances again:

```sh
yarn query

? Enter password [hidden]

Processing the "Binance" ledger...
Processing the "Kraken" ledger...

Total Amounts:
‾‾‾‾‾‾‾‾‾‾‾‾‾‾
  ETH: 5,224,590.318
  USDT: 600,000,261
  USDC: 500,000,000
  LINK: 60,531,868.704

Ledger Totals:
‾‾‾‾‾‾‾‾‾‾‾‾‾‾
Binance
  ETH: 3,443,750.339
  USDT: 600,000,161
  USDC: 500,000,000
  LINK: 51,031,868.704

Kraken
  ETH: 1,780,839.979
  USDT: 100
  LINK: 9,500,000
```

If you are interested in querying the $ value of the balances, you can pass the optional `--price` flag which will query the balances using [https://www.coingecko.com/](CoinGecko API):

```sh
yarn query --price

? Enter password [hidden]

Processing the "Binance" ledger...
Processing the "Kraken" ledger...

Prices:
‾‾‾‾‾‾‾
  ETH: $1,619.24
  USDT: $1.001
  LINK: $6.93
  USDC: $1

Total Amounts:
‾‾‾‾‾‾‾‾‾‾‾‾‾‾
  ETH: 5,224,590.318 ($8,459,865,626.94)
  USDT: 600,000,261 ($600,600,261.261)
  USDC: 500,000,000 ($500,000,000)
  LINK: 60,531,868.704 ($419,485,850.119)

  Total Value: $9,979,951,738.319

Ledger Totals:
‾‾‾‾‾‾‾‾‾‾‾‾‾‾
Binance
  ETH: 3,443,750.339 ($5,576,258,299.151)
  USDT: 600,000,161 ($600,600,161.161)
  USDC: 500,000,000 ($500,000,000)
  LINK: 51,031,868.704 ($353,650,850.119)

  Value: $7,030,509,310.431

Kraken
  ETH: 1,780,839.979 ($2,883,607,327.788)
  USDT: 100 ($100.1)
  LINK: 9,500,000 ($65,835,000)

  Value: $2,949,442,427.888
```
