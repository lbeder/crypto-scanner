# crypto-watcher

Crypto Watcher is a privacy-oriented tool used to track ETH and token balances across multiple addresses and groups (ledgers).

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
  yarn change-password   Change the encryption password
  yarn add-addresses     Add an address or a list of space-separated addresses
                         to a named ledger
  yarn remove-addresses  Remove an address or a list of space-separated
                         addresses from a named ledger
  yarn remove-ledger     Remove an entire named ledger
  yarn add-token         Add a token to the config
  yarn remove-token      Remove a token from the config
  yarn query             Query all addresses and tokens

Options:
      --version  Show version number                                   [boolean]
      --url      Web3 provider's URL [string] [default: "http://localhost:8545"]
  -v, --verbose  Verbose mode                                          [boolean]
  -p, --price    Query prices using Coingecko         [boolean] [default: false]
      --help     Show help                                             [boolean]
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

Added 0xBE0eB53F46cd790Cd13851d5EFf43D12404d33E8 to Binance
Added 0xF977814e90dA44bFA03b6295A0616a897441aceC to Binance
```

```sh
yarn add-addresses --name "Kraken" --data 0xDA9dfA130Df4dE4673b89022EE50ff26f6EA73Cf

? Enter password [hidden]

Added 0xDA9dfA130Df4dE4673b89022EE50ff26f6EA73Cf to Kraken
```

We can see that the configuration has been updated:

```sh
yarn show

? Enter password [hidden]

Configuration
‾‾‾‾‾‾‾‾‾‾‾‾‾
Ledgers
‾‾‾‾‾‾‾
┌────────────────────────────────────────────┐
│ Binance                                    │
├────────────────────────────────────────────┤
│ 0xBE0eB53F46cd790Cd13851d5EFf43D12404d33E8 │
├────────────────────────────────────────────┤
│ 0xF977814e90dA44bFA03b6295A0616a897441aceC │
└────────────────────────────────────────────┘

┌────────────────────────────────────────────┐
│ Kraken                                     │
├────────────────────────────────────────────┤
│ 0xDA9dfA130Df4dE4673b89022EE50ff26f6EA73Cf │
└────────────────────────────────────────────┘

Tokens
‾‾‾‾‾‾
┌────────┬─────────┬──────────┐
│ Symbol │ Address │ Decimals │
└────────┴─────────┴──────────┘
```

As you can see, by default the known token list is empty, therefore querying the balances will only return Ether amounts:

```sh
yarn query

? Enter password [hidden]

Processing the "Binance" ledger...
Processing the "Kraken" ledger...

Total Amounts
‾‾‾‾‾‾‾‾‾‾‾‾‾
┌────────┬───────────────┐
│ Symbol │ Amount        │
├────────┼───────────────┤
│ ETH    │ 4,824,589.617 │
└────────┴───────────────┘
```

We can also provide the `-v/--verbose` flag to print verbose amounts for all addresses and ledgers:

```sh
yarn query -v

? Enter password [hidden]

Processing the "Binance" ledger...
Processing the "Kraken" ledger...

Address Amounts
‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
┌────────────────────────────────────────────┬────────┬───────────────┐
│ Address                                    │ Symbol │
├────────────────────────────────────────────┼────────┼───────────────┤
│ 0xBE0eB53F46cd790Cd13851d5EFf43D12404d33E8 │ ETH    │ 1,996,008.284 │
├────────────────────────────────────────────┼────────┼───────────────┤
│ 0xF977814e90dA44bFA03b6295A0616a897441aceC │ ETH    │ 1,047,741.358 │
├────────────────────────────────────────────┼────────┼───────────────┤
│ 0xDA9dfA130Df4dE4673b89022EE50ff26f6EA73Cf │ ETH    │ 1,780,839.974 │
└────────────────────────────────────────────┴────────┴───────────────┘

Ledger Total Amounts
‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
Binance
‾‾‾‾‾‾‾
┌────────┬───────────────┐
│ Symbol │ Amount        │
├────────┼───────────────┤
│ ETH    │ 3,043,749.642 │
└────────┴───────────────┘

Kraken
‾‾‾‾‾‾
┌────────┬───────────────┐
│ Symbol │ Amount        │
├────────┼───────────────┤
│ ETH    │ 1,780,839.974 │
└────────┴───────────────┘

Total Amounts
‾‾‾‾‾‾‾‾‾‾‾‾‾
┌────────┬───────────────┐
│ Symbol │ Amount        │
├────────┼───────────────┤
│ ETH    │ 4,824,589.617 │
└────────┴───────────────┘
```

Let's add the USDT, USDC, DAI, and LINK tokens and try again:

```sh
yarn add-token --symbol USDT --address 0xdAC17F958D2ee523a2206206994597C13D831ec7 --decimals 6

? Enter password [hidden]

Added USDT at 0xdAC17F958D2ee523a2206206994597C13D831ec7 with 6 decimals
```

```sh
yarn add-token --symbol USDC --address 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48 --decimals 6

? Enter password [hidden]

Added USDC at 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48 with 6 decimals
```

```sh
yarn add-token --symbol DAI --address 0x6B175474E89094C44Da98b954EedeAC495271d0F

? Enter password [hidden]

Added DAI at 0x6B175474E89094C44Da98b954EedeAC495271d0F with 18 decimals
```

```sh
yarn add-token --symbol LINK --address 0x514910771AF9Ca656af840dff83E8264EcF986CA

? Enter password [hidden]

Added LINK at 0x514910771AF9Ca656af840dff83E8264EcF986CA with 18 decimals
```

We can check and verify that the tokens are now part of the configuration:

```sh
yarn show

? Enter password [hidden]

Configuration
‾‾‾‾‾‾‾‾‾‾‾‾‾
Ledgers
‾‾‾‾‾‾‾
┌────────────────────────────────────────────┐
│ Binance                                    │
├────────────────────────────────────────────┤
│ 0xBE0eB53F46cd790Cd13851d5EFf43D12404d33E8 │
├────────────────────────────────────────────┤
│ 0xF977814e90dA44bFA03b6295A0616a897441aceC │
└────────────────────────────────────────────┘

┌────────────────────────────────────────────┐
│ Kraken                                     │
├────────────────────────────────────────────┤
│ 0xDA9dfA130Df4dE4673b89022EE50ff26f6EA73Cf │
└────────────────────────────────────────────┘

Tokens
‾‾‾‾‾‾
┌────────┬────────────────────────────────────────────┬──────────┐
│ Symbol │ Address                                    │ Decimals │
├────────┼────────────────────────────────────────────┼──────────┤
│ USDT   │ 0xdAC17F958D2ee523a2206206994597C13D831ec7 │ 6        │
├────────┼────────────────────────────────────────────┼──────────┤
│ USDC   │ 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48 │ 6        │
├────────┼────────────────────────────────────────────┼──────────┤
│ DAI    │ 0x6B175474E89094C44Da98b954EedeAC495271d0F │ 18       │
├────────┼────────────────────────────────────────────┼──────────┤
│ LINK   │ 0x514910771AF9Ca656af840dff83E8264EcF986CA │ 18       │
└────────┴────────────────────────────────────────────┴──────────┘
```

Let's query the balances again:

```sh
yarn query

? Enter password [hidden]

Processing the "Binance" ledger...
Processing the "Kraken" ledger...

Total Amounts
‾‾‾‾‾‾‾‾‾‾‾‾‾
┌────────┬───────────────┐
│ Symbol │ Amount        │
├────────┼───────────────┤
│ ETH    │ 4,824,589.617 │
├────────┼───────────────┤
│ USDT   │ 261           │
├────────┼───────────────┤
│ DAI    │ 292,409       │
├────────┼───────────────┤
│ LINK   │ 64,500,000    │
└────────┴───────────────┘
```

Let's query again with the `-v/--verbose` flag:

```sh
yarn query -v

? Enter password [hidden]

Processing the "Binance" ledger...
Processing the "Kraken" ledger...

Address Amounts
‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
┌────────────────────────────────────────────┬────────┬───────────────┐
│ Address                                    │ Symbol │
├────────────────────────────────────────────┼────────┼───────────────┤
│ 0xBE0eB53F46cd790Cd13851d5EFf43D12404d33E8 │ ETH    │ 1,996,008.284 │
├────────────────────────────────────────────┼────────┼───────────────┤
│ 0xBE0eB53F46cd790Cd13851d5EFf43D12404d33E8 │ USDT   │ 161           │
├────────────────────────────────────────────┼────────┼───────────────┤
│ 0xBE0eB53F46cd790Cd13851d5EFf43D12404d33E8 │ LINK   │ 5,000,000     │
├────────────────────────────────────────────┼────────┼───────────────┤
│ 0xF977814e90dA44bFA03b6295A0616a897441aceC │ ETH    │ 1,047,741.358 │
├────────────────────────────────────────────┼────────┼───────────────┤
│ 0xF977814e90dA44bFA03b6295A0616a897441aceC │ LINK   │ 50,000,000    │
├────────────────────────────────────────────┼────────┼───────────────┤
│ 0xDA9dfA130Df4dE4673b89022EE50ff26f6EA73Cf │ ETH    │ 1,780,839.974 │
├────────────────────────────────────────────┼────────┼───────────────┤
│ 0xDA9dfA130Df4dE4673b89022EE50ff26f6EA73Cf │ USDT   │ 100           │
├────────────────────────────────────────────┼────────┼───────────────┤
│ 0xDA9dfA130Df4dE4673b89022EE50ff26f6EA73Cf │ DAI    │ 292,409       │
├────────────────────────────────────────────┼────────┼───────────────┤
│ 0xDA9dfA130Df4dE4673b89022EE50ff26f6EA73Cf │ LINK   │ 9,500,000     │
└────────────────────────────────────────────┴────────┴───────────────┘

Ledger Total Amounts
‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
Binance
‾‾‾‾‾‾‾
┌────────┬───────────────┐
│ Symbol │ Amount        │
├────────┼───────────────┤
│ ETH    │ 3,043,749.642 │
├────────┼───────────────┤
│ USDT   │ 161           │
├────────┼───────────────┤
│ LINK   │ 55,000,000    │
└────────┴───────────────┘

Kraken
‾‾‾‾‾‾
┌────────┬───────────────┐
│ Symbol │ Amount        │
├────────┼───────────────┤
│ ETH    │ 1,780,839.974 │
├────────┼───────────────┤
│ USDT   │ 100           │
├────────┼───────────────┤
│ DAI    │ 292,409       │
├────────┼───────────────┤
│ LINK   │ 9,500,000     │
└────────┴───────────────┘

Total Amounts
‾‾‾‾‾‾‾‾‾‾‾‾‾
┌────────┬───────────────┐
│ Symbol │ Amount        │
├────────┼───────────────┤
│ ETH    │ 4,824,589.617 │
├────────┼───────────────┤
│ USDT   │ 261           │
├────────┼───────────────┤
│ DAI    │ 292,409       │
├────────┼───────────────┤
│ LINK   │ 64,500,000    │
└────────┴───────────────┘

```

If you are interested in querying the $ value of the balances, you can pass the optional `-p/--price` flag which will query the balances using [https://www.coingecko.com/](CoinGecko API):

```sh
yarn query -p

? Enter password [hidden]

Processing the "Binance" ledger...
Processing the "Kraken" ledger...


Prices
‾‾‾‾‾‾
┌────────┬───────────┐
│ Symbol │ Price     │
├────────┼───────────┤
│ ETH    │ $1,799.88 │
├────────┼───────────┤
│ USDT   │ $1.002    │
├────────┼───────────┤
│ LINK   │ $7.32     │
├────────┼───────────┤
│ DAI    │ $1.001    │
└────────┴───────────┘

Total Amounts
‾‾‾‾‾‾‾‾‾‾‾‾‾
┌────────┬───────────────┬────────────────────┬──────────────────┐
│ Symbol │ Amount        │ Value              │ % of Total Value │
├────────┼───────────────┼────────────────────┼──────────────────┤
│ ETH    │ 4,824,589.617 │ $8,683,682,359.067 │ 94.8402          │
├────────┼───────────────┼────────────────────┼──────────────────┤
│ USDT   │ 261           │ $261.522           │ 0.00000146595    │
├────────┼───────────────┼────────────────────┼──────────────────┤
│ DAI    │ 292,409       │ $292,701.409       │ 0.00164072       │
├────────┼───────────────┼────────────────────┼──────────────────┤
│ LINK   │ 64,500,000    │ $472,140,000       │ 2.64651          │
└────────┴───────────────┴────────────────────┴──────────────────┘
```

You can also combine both the `-p/--price` and the `-v/--verbose` flags for the full output with an aggregated total $ values and holding percentages:

```sh
yarn query -p -v

? Enter password [hidden]

Processing the "Binance" ledger...
Processing the "Kraken" ledger...

Prices
‾‾‾‾‾‾
┌────────┬───────────┐
│ Symbol │ Price     │
├────────┼───────────┤
│ ETH    │ $1,799.88 │
├────────┼───────────┤
│ USDT   │ $1.002    │
├────────┼───────────┤
│ LINK   │ $7.32     │
├────────┼───────────┤
│ DAI    │ $1.001    │
└────────┴───────────┘

Address Amounts
‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
┌────────────────────────────────────────────┬────────┬───────────────┬────────────────────┐
│ Address                                    │ Symbol │ Value         │
├────────────────────────────────────────────┼────────┼───────────────┼────────────────────┤
│ 0xBE0eB53F46cd790Cd13851d5EFf43D12404d33E8 │ ETH    │ 1,996,008.284 │ $3,592,575,389.781 │
├────────────────────────────────────────────┼────────┼───────────────┼────────────────────┤
│ 0xBE0eB53F46cd790Cd13851d5EFf43D12404d33E8 │ USDT   │ 161           │ $161.322           │
├────────────────────────────────────────────┼────────┼───────────────┼────────────────────┤
│ 0xBE0eB53F46cd790Cd13851d5EFf43D12404d33E8 │ LINK   │ 5,000,000     │ $36,600,000        │
├────────────────────────────────────────────┼────────┼───────────────┼────────────────────┤
│ 0xF977814e90dA44bFA03b6295A0616a897441aceC │ ETH    │ 1,047,741.358 │ $1,885,808,716.191 │
├────────────────────────────────────────────┼────────┼───────────────┼────────────────────┤
│ 0xF977814e90dA44bFA03b6295A0616a897441aceC │ LINK   │ 50,000,000    │ $366,000,000       │
├────────────────────────────────────────────┼────────┼───────────────┼────────────────────┤
│ 0xDA9dfA130Df4dE4673b89022EE50ff26f6EA73Cf │ ETH    │ 1,780,839.974 │ $3,205,298,253.095 │
├────────────────────────────────────────────┼────────┼───────────────┼────────────────────┤
│ 0xDA9dfA130Df4dE4673b89022EE50ff26f6EA73Cf │ USDT   │ 100           │ $100.2             │
├────────────────────────────────────────────┼────────┼───────────────┼────────────────────┤
│ 0xDA9dfA130Df4dE4673b89022EE50ff26f6EA73Cf │ DAI    │ 292,409       │ $292,701.409       │
├────────────────────────────────────────────┼────────┼───────────────┼────────────────────┤
│ 0xDA9dfA130Df4dE4673b89022EE50ff26f6EA73Cf │ LINK   │ 9,500,000     │ $69,540,000        │
└────────────────────────────────────────────┴────────┴───────────────┴────────────────────┘

Ledger Total Amounts
‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
Binance
‾‾‾‾‾‾‾
┌────────┬───────────────┬────────────────────┬─────────────────────────┐
│ Symbol │ Amount        │ Value              │ % of Ledger Total Value │
├────────┼───────────────┼────────────────────┼─────────────────────────┤
│ ETH    │ 3,043,749.642 │ $5,478,384,105.973 │ 93.1542                 │
├────────┼───────────────┼────────────────────┼─────────────────────────┤
│ USDT   │ 161           │ $161.322           │ 0.00000142017           │
├────────┼───────────────┼────────────────────┼─────────────────────────┤
│ LINK   │ 55,000,000    │ $402,600,000       │ 3.54421                 │
└────────┴───────────────┴────────────────────┴─────────────────────────┘

Kraken
‾‾‾‾‾‾
┌────────┬───────────────┬────────────────────┬─────────────────────────┐
│ Symbol │ Amount        │ Value              │ % of Ledger Total Value │
├────────┼───────────────┼────────────────────┼─────────────────────────┤
│ ETH    │ 1,780,839.974 │ $3,205,298,253.095 │ 97.8678                 │
├────────┼───────────────┼────────────────────┼─────────────────────────┤
│ USDT   │ 100           │ $100.2             │ 0.00000154619           │
├────────┼───────────────┼────────────────────┼─────────────────────────┤
│ DAI    │ 292,409       │ $292,701.409       │ 0.00451670              │
├────────┼───────────────┼────────────────────┼─────────────────────────┤
│ LINK   │ 9,500,000     │ $69,540,000        │ 1.07303                 │
└────────┴───────────────┴────────────────────┴─────────────────────────┘

Total Amounts
‾‾‾‾‾‾‾‾‾‾‾‾‾
┌────────┬───────────────┬────────────────────┬──────────────────┐
│ Symbol │ Amount        │ Value              │ % of Total Value │
├────────┼───────────────┼────────────────────┼──────────────────┤
│ ETH    │ 4,824,589.617 │ $8,683,682,359.067 │ 94.8402          │
├────────┼───────────────┼────────────────────┼──────────────────┤
│ USDT   │ 261           │ $261.522           │ 0.00000146595    │
├────────┼───────────────┼────────────────────┼──────────────────┤
│ DAI    │ 292,409       │ $292,701.409       │ 0.00164072       │
├────────┼───────────────┼────────────────────┼──────────────────┤
│ LINK   │ 64,500,000    │ $472,140,000       │ 2.64651          │
└────────┴───────────────┴────────────────────┴──────────────────┘

Total Value: $18,312,230,643.997
```
