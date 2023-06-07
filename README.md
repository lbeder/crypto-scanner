# crypto-scanner

Crypto Scanner is a privacy-focused tool designed to help you keep track of your ETH and token balances across multiple addresses and ledgers. With support for importing external assets and pricing them in USD or other assets like ETH, it's the perfect tool for managing your entire portfolio.

What sets Crypto Scanner apart from other similar tools is its approach to data retrieval. Instead of fetching your balances from a centralized API, which can compromise your privacy and security, Crypto Scanner uses an RPC URL (`http://localhost:8545` by default) to retrieve your data. This means that your balances are requested directly from your local machine, and your sensitive information remains completely private and secure.

By using this approach, Crypto Scanner ensures that your data is never transmitted over the internet or stored on a third-party server. This greatly reduces the risk of data breaches and ensures that you have complete control over your cryptocurrency portfolio.

What's more, all the data is stored in an AES256 encrypted database, ensuring that your sensitive information remains protected even if your device is compromised. With its robust security features and intuitive interface, Crypto Scanner is the ideal choice for privacy-conscious users who want to keep their cryptocurrency investments safe and secure.

## Installation

The `crypto-scanner` tool stores the DB at `<HOME_DIR>/.crypto-scanner/db` by default.

### Locally

```sh
git clone https://github.com/lbeder/crypto-scanner

cd crypto-scanner

yarn
```

### Globally

```sh
npm install -g crypto-scanner
```

Or run with npx:

```sh
npx crypto-scanner
```

This will also allow you to run the `crypto-scanner` in the terminal.

## Usage

### General

```sh
crypto-scanner <command>

Commands:
  crypto-scanner show              Show the DB
  crypto-scanner scan              Scans all addresses and tokens
  crypto-scanner change-password   Change the encryption password
  crypto-scanner export-db         Export the DB to an external file. Note that the export is *not* encrypted
  crypto-scanner import-DB         Import the DB from an external file. Note that the import should not be *not*
                                   encrypted
  crypto-scanner add-addresses     Add an address or a list of space-separated addresses to a named ledger
  crypto-scanner remove-addresses  Remove an address or a list of space-separated addresses from a named ledger
  crypto-scanner remove-ledger     Remove an entire named ledger
  crypto-scanner add-token         Add a token to the DB
  crypto-scanner remove-token      Remove a token from the DB
  crypto-scanner add-asset         Add an asset to the DB
  crypto-scanner update-asset      Update an asset in the DB
  crypto-scanner remove-asset      Remove an asset from the DB

Options:
      --help               Show help                                                                           [boolean]
      --version            Show version number                                                                 [boolean]
      --provider-url       Web3 provider's URL                               [string] [default: "http://localhost:8545"]
  -p, --price              Query prices using Coingecko                                       [boolean] [default: false]
  -g, --global-token-list  Use global token list (derived from https://tokens.coingecko.com/ethereum/all.json)
                                                                                              [boolean] [default: false]
```

### Scan all Balances

```sh
crypto-scanner scan

Scans all addresses and tokens

Options:
      --help                  Show help                                                                        [boolean]
      --version               Show version number                                                              [boolean]
      --provider-url          Web3 provider's URL                            [string] [default: "http://localhost:8545"]
  -p, --price                 Query prices using Coingecko                                    [boolean] [default: false]
  -g, --global-token-list     Use global token list (derived from https://tokens.coingecko.com/ethereum/all.json)
                                                                                              [boolean] [default: false]
  -r, --csv                   The CSV reports output directory (optional)                                       [string]
  -v, --verbose               Verbose mode                                                                     [boolean]
  -e, --show-empty-addresses  Show empty addresses                                            [boolean] [default: false]
```

### Show the DB

```sh
crypto-scanner show

Show the DB

Options:
      --help               Show help                                                                           [boolean]
      --version            Show version number                                                                 [boolean]
      --provider-url       Web3 provider's URL                               [string] [default: "http://localhost:8545"]
  -p, --price              Query prices using Coingecko                                       [boolean] [default: false]
  -g, --global-token-list  Use global token list (derived from https://tokens.coingecko.com/ethereum/all.json)
                                                                                              [boolean] [default: false]
```

### Example

#### Adding Addresses

Let's start by adding the following addresses to the following named ledgers:

* **Binance**:
  * `0xBE0eB53F46cd790Cd13851d5EFf43D12404d33E8`
  * `0xF977814e90dA44bFA03b6295A0616a897441aceC`
* **Kraken**:
  * `0xDA9dfA130Df4dE4673b89022EE50ff26f6EA73Cf`

```sh
crypto-scanner add-addresses --name "Binance" --addresses 0xBE0eB53F46cd790Cd13851d5EFf43D12404d33E8 0xF977814e90dA44bFA03b6295A0616a897441aceC --notes "Binance 7" "Binance 8"

? Enter password [hidden]

Added 0xBE0eB53F46cd790Cd13851d5EFf43D12404d33E8 to Binance (with a note: "Binance 7")
Added 0xF977814e90dA44bFA03b6295A0616a897441aceC to Binance (with a note: "Binance 8")
```

```sh
crypto-scanner add-addresses --name "Kraken" --addresses 0xDA9dfA130Df4dE4673b89022EE50ff26f6EA73Cf

? Enter password [hidden]

Added 0xDA9dfA130Df4dE4673b89022EE50ff26f6EA73Cf to Kraken
```

```sh
crypto-scanner add-addresses --name "Coinbase" --addresses 0x71660c4005BA85c37ccec55d0C4493E66Fe775d3 --notes "Coinbase 1"

? Enter password [hidden]

Added 0x71660c4005BA85c37ccec55d0C4493E66Fe775d3 to Coinbase (with a note: "Coinbase 1")
```

We can see that the DB has been updated:

```sh
crypto-scanner show

? Enter password [hidden]

DB
‾‾

Version: 1

Ledgers
‾‾‾‾‾‾‾
┌──────────┬────────────────────────────────────────────┬────────────┐
│ Ledger   │ Address                                    │ Note       │
├──────────┼────────────────────────────────────────────┼────────────┤
│ Binance  │ 0xBE0eB53F46cd790Cd13851d5EFf43D12404d33E8 │ Binance 7  │
├──────────┼────────────────────────────────────────────┼────────────┤
│ Binance  │ 0xF977814e90dA44bFA03b6295A0616a897441aceC │ Binance 8  │
├──────────┼────────────────────────────────────────────┼────────────┤
│ Kraken   │ 0xDA9dfA130Df4dE4673b89022EE50ff26f6EA73Cf │            │
├──────────┼────────────────────────────────────────────┼────────────┤
│ Coinbase │ 0x71660c4005BA85c37ccec55d0C4493E66Fe775d3 │ Coinbase 1 │
└──────────┴────────────────────────────────────────────┴────────────┘
```

As you can see, by default the known token list is empty, therefore scanning the balances will only return ETH amounts:

```sh
crypto-scanner scan

? Enter password [hidden]

Scanning all addresses and tokens...

Finished | ████████████████████████████████████████ 100% | ETA: 0s | 4/4
Finished | ████████████████████████████████████████ 100% | ETA: NULLs | 0/0

Total Amounts
‾‾‾‾‾‾‾‾‾‾‾‾‾
┌──────┬──────────────┐
│ Name │ Amount       │
├──────┼──────────────┤
│ ETH  │ 5,176,721.94 │
└──────┴──────────────┘
```

You can also provide the `-v/--verbose` flag to print verbose amounts for all addresses and ledgers:

```sh
crypto-scanner scan -v

? Enter password [hidden]

Scanning all addresses and tokens...

Finished | ████████████████████████████████████████ 100% | ETA: 0s | 4/4
Finished | ████████████████████████████████████████ 100% | ETA: NULLs | 0/0

Addresses
‾‾‾‾‾‾‾‾‾
┌──────────┬────────────────────────────────────────────┬──────────────┬────────────┐
│ Ledger   │ Address                                    │ ETH          │ Note       │
├──────────┼────────────────────────────────────────────┼──────────────┼────────────┤
│ Binance  │ 0xBE0eB53F46cd790Cd13851d5EFf43D12404d33E8 │ 1,996,008.36 │ Binance 7  │
├──────────┼────────────────────────────────────────────┼──────────────┼────────────┤
│ Binance  │ 0xF977814e90dA44bFA03b6295A0616a897441aceC │ 1,470,354.07 │ Binance 8  │
├──────────┼────────────────────────────────────────────┼──────────────┼────────────┤
│ Kraken   │ 0xDA9dfA130Df4dE4673b89022EE50ff26f6EA73Cf │ 1,690,839.97 │            │
├──────────┼────────────────────────────────────────────┼──────────────┼────────────┤
│ Coinbase │ 0x71660c4005BA85c37ccec55d0C4493E66Fe775d3 │ 19,519.55    │ Coinbase 1 │
├──────────┼────────────────────────────────────────────┼──────────────┼────────────┤
│          │ Total                                      │ 5,176,721.94 │            │
├──────────┼────────────────────────────────────────────┼──────────────┼────────────┤
│          │                                            │ ETH          │            │
└──────────┴────────────────────────────────────────────┴──────────────┴────────────┘

Ledgers
‾‾‾‾‾‾‾
┌──────────┬──────────────┐
│ Ledger   │ ETH          │
├──────────┼──────────────┤
│ Binance  │ 3,466,362.43 │
├──────────┼──────────────┤
│ Kraken   │ 1,690,839.97 │
├──────────┼──────────────┤
│ Coinbase │ 19,519.55    │
├──────────┼──────────────┤
│ Total    │ 5,176,721.94 │
├──────────┼──────────────┤
│          │ ETH          │
└──────────┴──────────────┘

Total Amounts
‾‾‾‾‾‾‾‾‾‾‾‾‾
┌──────┬──────────────┐
│ Name │ Amount       │
├──────┼──────────────┤
│ ETH  │ 5,176,721.94 │
└──────┴──────────────┘
```

#### Adding Tokens

Let's add the `USDT`, `USDC`, `DAI`, and `LINK`tokens and try again:

```sh
crypto-scanner add-token --symbol USDT --address 0xdAC17F958D2ee523a2206206994597C13D831ec7 --decimals 6

? Enter password [hidden]

Added USDT at 0xdAC17F958D2ee523a2206206994597C13D831ec7 with 6 decimals
```

```sh
crypto-scanner add-token --symbol USDC --address 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48 --decimals 6

? Enter password [hidden]

Added USDC at 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48 with 6 decimals
```

```sh
crypto-scanner add-token --symbol DAI --address 0x6B175474E89094C44Da98b954EedeAC495271d0F

? Enter password [hidden]

Added DAI at 0x6B175474E89094C44Da98b954EedeAC495271d0F with 18 decimals
```

```sh
crypto-scanner add-token --symbol LINK --address 0x514910771AF9Ca656af840dff83E8264EcF986CA

? Enter password [hidden]

Added LINK at 0x514910771AF9Ca656af840dff83E8264EcF986CA with 18 decimals
```

You can check and verify that the tokens are now part of the DB:

```sh
crypto-scanner show

? Enter password [hidden]

DB
‾‾

Version: 1

Ledgers
‾‾‾‾‾‾‾
┌──────────┬────────────────────────────────────────────┬────────────┐
│ Ledger   │ Address                                    │ Note       │
├──────────┼────────────────────────────────────────────┼────────────┤
│ Binance  │ 0xBE0eB53F46cd790Cd13851d5EFf43D12404d33E8 │ Binance 7  │
├──────────┼────────────────────────────────────────────┼────────────┤
│ Binance  │ 0xF977814e90dA44bFA03b6295A0616a897441aceC │ Binance 8  │
├──────────┼────────────────────────────────────────────┼────────────┤
│ Kraken   │ 0xDA9dfA130Df4dE4673b89022EE50ff26f6EA73Cf │            │
├──────────┼────────────────────────────────────────────┼────────────┤
│ Coinbase │ 0x71660c4005BA85c37ccec55d0C4493E66Fe775d3 │ Coinbase 1 │
└──────────┴────────────────────────────────────────────┴────────────┘

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

Let's scan the balances again:

```sh
crypto-scanner scan

? Enter password [hidden]

Scanning all addresses and tokens...

Finished | ████████████████████████████████████████ 100% | ETA: 0s | 4/4
Finished | ████████████████████████████████████████ 100% | ETA: 0s | 4/4

Total Amounts
‾‾‾‾‾‾‾‾‾‾‾‾‾
┌──────┬────────────────┐
│ Name │ Amount         │
├──────┼────────────────┤
│ ETH  │ 5,176,721.9    │
├──────┼────────────────┤
│ USDT │ 30,000,533.18  │
├──────┼────────────────┤
│ USDC │ 100,000,490.99 │
├──────┼────────────────┤
│ DAI  │ 292,409        │
├──────┼────────────────┤
│ LINK │ 64,500,000     │
└──────┴────────────────┘
```

Let's scan again with the `-v/--verbose` flag:

```sh
crypto-scanner scan -v

? Enter password [hidden]

Scanning all addresses and tokens...

Finished | ████████████████████████████████████████ 100% | ETA: 0s | 4/4
Finished | ████████████████████████████████████████ 100% | ETA: 0s | 4/4

Addresses
‾‾‾‾‾‾‾‾‾
┌──────────┬────────────────────────────────────────────┬──────────────┬───────────────┬────────────────┬─────────┬────────────┬────────────┐
│ Ledger   │ Address                                    │ ETH          │ USDT          │ USDC           │ DAI     │ LINK       │ Note       │
├──────────┼────────────────────────────────────────────┼──────────────┼───────────────┼────────────────┼─────────┼────────────┼────────────┤
│ Binance  │ 0xBE0eB53F46cd790Cd13851d5EFf43D12404d33E8 │ 1,996,008.36 │ 161           │ 0              │ 0       │ 5,000,000  │ Binance 7  │
├──────────┼────────────────────────────────────────────┼──────────────┼───────────────┼────────────────┼─────────┼────────────┼────────────┤
│ Binance  │ 0xF977814e90dA44bFA03b6295A0616a897441aceC │ 1,470,354.07 │ 30,000,270.89 │ 100,000,000    │ 0       │ 50,000,000 │ Binance 8  │
├──────────┼────────────────────────────────────────────┼──────────────┼───────────────┼────────────────┼─────────┼────────────┼────────────┤
│ Kraken   │ 0xDA9dfA130Df4dE4673b89022EE50ff26f6EA73Cf │ 1,690,839.97 │ 100           │ 0              │ 292,409 │ 9,500,000  │            │
├──────────┼────────────────────────────────────────────┼──────────────┼───────────────┼────────────────┼─────────┼────────────┼────────────┤
│ Coinbase │ 0x71660c4005BA85c37ccec55d0C4493E66Fe775d3 │ 19,519.51    │ 1.29          │ 490.99         │ 0.0002  │ 0          │ Coinbase 1 │
├──────────┼────────────────────────────────────────────┼──────────────┼───────────────┼────────────────┼─────────┼────────────┼────────────┤
│          │ Total                                      │ 5,176,721.9  │ 30,000,533.18 │ 100,000,490.99 │ 292,409 │ 64,500,000 │            │
├──────────┼────────────────────────────────────────────┼──────────────┼───────────────┼────────────────┼─────────┼────────────┼────────────┤
│          │                                            │ ETH          │ USDT          │ USDC           │ DAI     │ LINK       │            │
└──────────┴────────────────────────────────────────────┴──────────────┴───────────────┴────────────────┴─────────┴────────────┴────────────┘

Ledgers
‾‾‾‾‾‾‾
┌──────────┬──────────────┬───────────────┬────────────────┬─────────┬────────────┐
│ Ledger   │ ETH          │ USDT          │ USDC           │ DAI     │ LINK       │
├──────────┼──────────────┼───────────────┼────────────────┼─────────┼────────────┤
│ Binance  │ 3,466,362.43 │ 30,000,431.89 │ 100,000,000    │ 0       │ 55,000,000 │
├──────────┼──────────────┼───────────────┼────────────────┼─────────┼────────────┤
│ Kraken   │ 1,690,839.97 │ 100           │ 0              │ 292,409 │ 9,500,000  │
├──────────┼──────────────┼───────────────┼────────────────┼─────────┼────────────┤
│ Coinbase │ 19,519.51    │ 1.29          │ 490.99         │ 0.0002  │ 0          │
├──────────┼──────────────┼───────────────┼────────────────┼─────────┼────────────┤
│ Total    │ 5,176,721.9  │ 30,000,533.18 │ 100,000,490.99 │ 292,409 │ 64,500,000 │
├──────────┼──────────────┼───────────────┼────────────────┼─────────┼────────────┤
│          │ ETH          │ USDT          │ USDC           │ DAI     │ LINK       │
└──────────┴──────────────┴───────────────┴────────────────┴─────────┴────────────┘

Total Amounts
‾‾‾‾‾‾‾‾‾‾‾‾‾
┌──────┬────────────────┐
│ Name │ Amount         │
├──────┼────────────────┤
│ ETH  │ 5,176,721.9    │
├──────┼────────────────┤
│ USDT │ 30,000,533.18  │
├──────┼────────────────┤
│ USDC │ 100,000,490.99 │
├──────┼────────────────┤
│ DAI  │ 292,409        │
├──────┼────────────────┤
│ LINK │ 64,500,000     │
└──────┴────────────────┘
```

#### Showing USD Values

If you are interested in showing the USD values of the balances, you can pass the optional `-p/--price` flag which will query the prices using [https://www.coingecko.com/](CoinGecko API):

```sh
crypto-scanner scan -p

Querying prices. This operation may take a long time...

Finished | ████████████████████████████████████████ 100% | ETA: 0s | 4/4

Scanning all addresses and tokens...

Finished | ████████████████████████████████████████ 100% | ETA: 0s | 4/4
Finished | ████████████████████████████████████████ 100% | ETA: 0s | 4/4

Prices
‾‾‾‾‾‾
┌────────┬───────────┐
│ Symbol │ Price     │
├────────┼───────────┤
│ ETH    │ $1,827.66 │
├────────┼───────────┤
│ USDT   │ $1.001    │
├────────┼───────────┤
│ USDC   │ $0.999    │
├────────┼───────────┤
│ DAI    │ $1.001    │
├────────┼───────────┤
│ LINK   │ $6.41     │
└────────┴───────────┘

Total Amounts
‾‾‾‾‾‾‾‾‾‾‾‾‾
┌──────┬────────────────┬────────────────────┬──────────────────┐
│ Name │ Amount         │ Value              │ % of Total Value │
├──────┼────────────────┼────────────────────┼──────────────────┤
│ ETH  │ 5,176,721.64   │ $9,461,287,078.04  │ 94.5658          │
├──────┼────────────────┼────────────────────┼──────────────────┤
│ USDT │ 30,000,533.18  │ $30,030,533.71     │ 0.300156         │
├──────┼────────────────┼────────────────────┼──────────────────┤
│ USDC │ 100,000,490.99 │ $99,924,590.62     │ 0.998749         │
├──────┼────────────────┼────────────────────┼──────────────────┤
│ DAI  │ 292,409        │ $292,701.41        │ 0.00292556       │
├──────┼────────────────┼────────────────────┼──────────────────┤
│ LINK │ 64,500,000     │ $413,445,000       │ 4.13239          │
├──────┼────────────────┼────────────────────┼──────────────────┤
│      │ Total Value    │ $10,004,979,903.77 │                  │
└──────┴────────────────┴────────────────────┴──────────────────┘
```

You can also combine both the `-p/--price` and the `-v/--verbose` flags for the full output with an aggregated total $ values and holding percentages:

```sh
crypto-scanner scan -v -p

Querying prices. This operation may take a long time...

Finished | ████████████████████████████████████████ 100% | ETA: 0s | 4/4

Scanning all addresses and tokens...

Finished | ████████████████████████████████████████ 100% | ETA: 0s | 4/4
Finished | ████████████████████████████████████████ 100% | ETA: 0s | 4/4

Prices
‾‾‾‾‾‾
┌────────┬───────────┐
│ Symbol │ Price     │
├────────┼───────────┤
│ ETH    │ $1,827.66 │
├────────┼───────────┤
│ USDT   │ $1.001    │
├────────┼───────────┤
│ USDC   │ $0.999    │
├────────┼───────────┤
│ DAI    │ $1.001    │
├────────┼───────────┤
│ LINK   │ $6.41     │
└────────┴───────────┘

Addresses
‾‾‾‾‾‾‾‾‾
┌──────────┬────────────────────────────────────────────┬───────────────────┬────────────────┬────────────────┬─────────────┬──────────────┬────────────┐
│ Ledger   │ Address                                    │ ETH               │ USDT           │ USDC           │ DAI         │ LINK         │ Note       │
├──────────┼────────────────────────────────────────────┼───────────────────┼────────────────┼────────────────┼─────────────┼──────────────┼────────────┤
│ Binance  │ 0xBE0eB53F46cd790Cd13851d5EFf43D12404d33E8 │ 1,996,008.36      │ 161            │ 0              │ 0           │ 5,000,000    │ Binance 7  │
├──────────┼────────────────────────────────────────────┼───────────────────┼────────────────┼────────────────┼─────────────┼──────────────┼────────────┤
│ Binance  │ 0xF977814e90dA44bFA03b6295A0616a897441aceC │ 1,470,354.07      │ 30,000,270.89  │ 100,000,000    │ 0           │ 50,000,000   │ Binance 8  │
├──────────┼────────────────────────────────────────────┼───────────────────┼────────────────┼────────────────┼─────────────┼──────────────┼────────────┤
│ Kraken   │ 0xDA9dfA130Df4dE4673b89022EE50ff26f6EA73Cf │ 1,690,839.97      │ 100            │ 0              │ 292,409     │ 9,500,000    │            │
├──────────┼────────────────────────────────────────────┼───────────────────┼────────────────┼────────────────┼─────────────┼──────────────┼────────────┤
│ Coinbase │ 0x71660c4005BA85c37ccec55d0C4493E66Fe775d3 │ 19,519.15         │ 1.29           │ 490.99         │ 0.0002      │ 0            │ Coinbase 1 │
├──────────┼────────────────────────────────────────────┼───────────────────┼────────────────┼────────────────┼─────────────┼──────────────┼────────────┤
│          │ Total                                      │ 5,176,721.54      │ 30,000,533.18  │ 100,000,490.99 │ 292,409     │ 64,500,000   │            │
├──────────┼────────────────────────────────────────────┼───────────────────┼────────────────┼────────────────┼─────────────┼──────────────┼────────────┤
│          │                                            │ ETH               │ USDT           │ USDC           │ DAI         │ LINK         │            │
├──────────┼────────────────────────────────────────────┼───────────────────┼────────────────┼────────────────┼─────────────┼──────────────┼────────────┤
│          │ Total Value                                │ $9,461,286,887.63 │ $30,030,533.71 │ $99,924,590.62 │ $292,701.41 │ $413,445,000 │            │
└──────────┴────────────────────────────────────────────┴───────────────────┴────────────────┴────────────────┴─────────────┴──────────────┴────────────┘

Ledgers
‾‾‾‾‾‾‾
┌─────────────┬───────────────────┬────────────────┬────────────────┬─────────────┬──────────────┐
│ Ledger      │ ETH               │ USDT           │ USDC           │ DAI         │ LINK         │
├─────────────┼───────────────────┼────────────────┼────────────────┼─────────────┼──────────────┤
│ Binance     │ 3,466,362.43      │ 30,000,431.89  │ 100,000,000    │ 0           │ 55,000,000   │
├─────────────┼───────────────────┼────────────────┼────────────────┼─────────────┼──────────────┤
│ Kraken      │ 1,690,839.97      │ 100            │ 0              │ 292,409     │ 9,500,000    │
├─────────────┼───────────────────┼────────────────┼────────────────┼─────────────┼──────────────┤
│ Coinbase    │ 19,519.15         │ 1.29           │ 490.99         │ 0.0002      │ 0            │
├─────────────┼───────────────────┼────────────────┼────────────────┼─────────────┼──────────────┤
│ Total       │ 5,176,721.54      │ 30,000,533.18  │ 100,000,490.99 │ 292,409     │ 64,500,000   │
├─────────────┼───────────────────┼────────────────┼────────────────┼─────────────┼──────────────┤
│             │ ETH               │ USDT           │ USDC           │ DAI         │ LINK         │
├─────────────┼───────────────────┼────────────────┼────────────────┼─────────────┼──────────────┤
│ Total Value │ $9,461,286,887.63 │ $30,030,533.71 │ $99,924,590.62 │ $292,701.41 │ $413,445,000 │
└─────────────┴───────────────────┴────────────────┴────────────────┴─────────────┴──────────────┘

Total Amounts
‾‾‾‾‾‾‾‾‾‾‾‾‾
┌──────┬────────────────┬────────────────────┬──────────────────┐
│ Name │ Amount         │ Value              │ % of Total Value │
├──────┼────────────────┼────────────────────┼──────────────────┤
│ ETH  │ 5,176,721.54   │ $9,461,286,887.63  │ 94.5658          │
├──────┼────────────────┼────────────────────┼──────────────────┤
│ USDT │ 30,000,533.18  │ $30,030,533.71     │ 0.300156         │
├──────┼────────────────┼────────────────────┼──────────────────┤
│ USDC │ 100,000,490.99 │ $99,924,590.62     │ 0.998749         │
├──────┼────────────────┼────────────────────┼──────────────────┤
│ DAI  │ 292,409        │ $292,701.41        │ 0.00292556       │
├──────┼────────────────┼────────────────────┼──────────────────┤
│ LINK │ 64,500,000     │ $413,445,000       │ 4.13239          │
├──────┼────────────────┼────────────────────┼──────────────────┤
│      │ Total Value    │ $10,004,979,713.36 │                  │
└──────┴────────────────┴────────────────────┴──────────────────┘
```

#### Adding Assets

In addition to ETH and token amounts, you can also add static assets, by specifying their name, quantity, and unit prices. For example:

```sh
crypto-scanner add-asset --name Gold --quantity 100 --unit-price 2018.25

? Enter password [hidden]

Added 100 units of Gold at the price of 2018.25 USD per unit
```

```sh
crypto-scanner add-asset --name "Real Estate" --quantity 1 --unit-price 1000000

? Enter password [hidden]

Added 1 units of Real Estate at the price of 1000000 USD per unit
```

You can check and verify that the assets are now part of the DB:

```sh
crypto-scanner show

? Enter password [hidden]

DB
‾‾

Version: 1

Ledgers
‾‾‾‾‾‾‾
┌──────────┬────────────────────────────────────────────┬────────────┐
│ Ledger   │ Address                                    │ Note       │
├──────────┼────────────────────────────────────────────┼────────────┤
│ Binance  │ 0xBE0eB53F46cd790Cd13851d5EFf43D12404d33E8 │ Binance 7  │
├──────────┼────────────────────────────────────────────┼────────────┤
│ Binance  │ 0xF977814e90dA44bFA03b6295A0616a897441aceC │ Binance 8  │
├──────────┼────────────────────────────────────────────┼────────────┤
│ Kraken   │ 0xDA9dfA130Df4dE4673b89022EE50ff26f6EA73Cf │            │
├──────────┼────────────────────────────────────────────┼────────────┤
│ Coinbase │ 0x71660c4005BA85c37ccec55d0C4493E66Fe775d3 │ Coinbase 1 │
└──────────┴────────────────────────────────────────────┴────────────┘

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

Assets
‾‾‾‾‾‾
┌─────────────┬──────────┬────────────┐
│ Name        │ Quantity │ Price      │
├─────────────┼──────────┼────────────┤
│ Gold        │ 100      │ $2,018.25  │
├─────────────┼──────────┼────────────┤
│ Real Estate │ 1        │ $1,000,000 │
└─────────────┴──────────┴────────────┘
```

You can also see that asset amounts are aggregated as well:

```sh
crypto-scanner scan -p -v

? Enter password [hidden]

Querying prices. This operation may take a long time...

Finished | ████████████████████████████████████████ 100% | ETA: 0s | 4/4

Scanning all addresses and tokens...

Finished | ████████████████████████████████████████ 100% | ETA: 0s | 4/4
Finished | ████████████████████████████████████████ 100% | ETA: 0s | 4/4

Prices
‾‾‾‾‾‾
┌─────────────┬────────────┐
│ Symbol      │ Price      │
├─────────────┼────────────┤
│ ETH         │ $1,827.66  │
├─────────────┼────────────┤
│ USDT        │ $1.001     │
├─────────────┼────────────┤
│ USDC        │ $0.999     │
├─────────────┼────────────┤
│ DAI         │ $1.001     │
├─────────────┼────────────┤
│ LINK        │ $6.41      │
├─────────────┼────────────┤
│ Gold        │ $2,018.25  │
├─────────────┼────────────┤
│ Real Estate │ $1,000,000 │
└─────────────┴────────────┘

Addresses
‾‾‾‾‾‾‾‾‾
┌──────────┬────────────────────────────────────────────┬───────────────────┬────────────────┬────────────────┬─────────────┬──────────────┬────────────┐
│ Ledger   │ Address                                    │ ETH               │ USDT           │ USDC           │ DAI         │ LINK         │ Note       │
├──────────┼────────────────────────────────────────────┼───────────────────┼────────────────┼────────────────┼─────────────┼──────────────┼────────────┤
│ Binance  │ 0xBE0eB53F46cd790Cd13851d5EFf43D12404d33E8 │ 1,996,008.36      │ 161            │ 0              │ 0           │ 5,000,000    │ Binance 7  │
├──────────┼────────────────────────────────────────────┼───────────────────┼────────────────┼────────────────┼─────────────┼──────────────┼────────────┤
│ Binance  │ 0xF977814e90dA44bFA03b6295A0616a897441aceC │ 1,470,354.07      │ 30,000,270.89  │ 100,000,000    │ 0           │ 50,000,000   │ Binance 8  │
├──────────┼────────────────────────────────────────────┼───────────────────┼────────────────┼────────────────┼─────────────┼──────────────┼────────────┤
│ Kraken   │ 0xDA9dfA130Df4dE4673b89022EE50ff26f6EA73Cf │ 1,690,839.97      │ 100            │ 0              │ 292,409     │ 9,500,000    │            │
├──────────┼────────────────────────────────────────────┼───────────────────┼────────────────┼────────────────┼─────────────┼──────────────┼────────────┤
│ Coinbase │ 0x71660c4005BA85c37ccec55d0C4493E66Fe775d3 │ 19,519.15         │ 1.29           │ 490.99         │ 0.0002      │ 0            │ Coinbase 1 │
├──────────┼────────────────────────────────────────────┼───────────────────┼────────────────┼────────────────┼─────────────┼──────────────┼────────────┤
│          │ Total                                      │ 5,176,721.54      │ 30,000,533.18  │ 100,000,490.99 │ 292,409     │ 64,500,000   │            │
├──────────┼────────────────────────────────────────────┼───────────────────┼────────────────┼────────────────┼─────────────┼──────────────┼────────────┤
│          │                                            │ ETH               │ USDT           │ USDC           │ DAI         │ LINK         │            │
├──────────┼────────────────────────────────────────────┼───────────────────┼────────────────┼────────────────┼─────────────┼──────────────┼────────────┤
│          │ Total Value                                │ $9,461,286,887.63 │ $30,030,533.71 │ $99,924,590.62 │ $292,701.41 │ $413,445,000 │            │
└──────────┴────────────────────────────────────────────┴───────────────────┴────────────────┴────────────────┴─────────────┴──────────────┴────────────┘

Ledgers
‾‾‾‾‾‾‾
┌─────────────┬───────────────────┬────────────────┬────────────────┬─────────────┬──────────────┐
│ Ledger      │ ETH               │ USDT           │ USDC           │ DAI         │ LINK         │
├─────────────┼───────────────────┼────────────────┼────────────────┼─────────────┼──────────────┤
│ Binance     │ 3,466,362.43      │ 30,000,431.89  │ 100,000,000    │ 0           │ 55,000,000   │
├─────────────┼───────────────────┼────────────────┼────────────────┼─────────────┼──────────────┤
│ Kraken      │ 1,690,839.97      │ 100            │ 0              │ 292,409     │ 9,500,000    │
├─────────────┼───────────────────┼────────────────┼────────────────┼─────────────┼──────────────┤
│ Coinbase    │ 19,519.15         │ 1.29           │ 490.99         │ 0.0002      │ 0            │
├─────────────┼───────────────────┼────────────────┼────────────────┼─────────────┼──────────────┤
│ Total       │ 5,176,721.54      │ 30,000,533.18  │ 100,000,490.99 │ 292,409     │ 64,500,000   │
├─────────────┼───────────────────┼────────────────┼────────────────┼─────────────┼──────────────┤
│             │ ETH               │ USDT           │ USDC           │ DAI         │ LINK         │
├─────────────┼───────────────────┼────────────────┼────────────────┼─────────────┼──────────────┤
│ Total Value │ $9,461,286,887.63 │ $30,030,533.71 │ $99,924,590.62 │ $292,701.41 │ $413,445,000 │
└─────────────┴───────────────────┴────────────────┴────────────────┴─────────────┴──────────────┘

Assets
‾‾‾‾‾‾
┌─────────────┬──────────┬────────────┬────────────┐
│ Name        │ Quantity │ Price      │ Value      │
├─────────────┼──────────┼────────────┼────────────┤
│ Gold        │ 100      │ $2,018.25  │ $201,825   │
├─────────────┼──────────┼────────────┼────────────┤
│ Real Estate │ 1        │ $1,000,000 │ $1,000,000 │
└─────────────┴──────────┴────────────┴────────────┘

Total Amounts
‾‾‾‾‾‾‾‾‾‾‾‾‾
┌─────────────┬────────────────┬────────────────────┬──────────────────┐
│ Name        │ Amount         │ Value              │ % of Total Value │
├─────────────┼────────────────┼────────────────────┼──────────────────┤
│ ETH         │ 5,176,721.54   │ $9,461,286,887.63  │ 94.5544          │
├─────────────┼────────────────┼────────────────────┼──────────────────┤
│ USDT        │ 30,000,533.18  │ $30,030,533.71     │ 0.300120         │
├─────────────┼────────────────┼────────────────────┼──────────────────┤
│ USDC        │ 100,000,490.99 │ $99,924,590.62     │ 0.998629         │
├─────────────┼────────────────┼────────────────────┼──────────────────┤
│ DAI         │ 292,409        │ $292,701.41        │ 0.00292521       │
├─────────────┼────────────────┼────────────────────┼──────────────────┤
│ LINK        │ 64,500,000     │ $413,445,000       │ 4.13190          │
├─────────────┼────────────────┼────────────────────┼──────────────────┤
│ Gold        │ 100            │ $201,825           │ 0.00201700       │
├─────────────┼────────────────┼────────────────────┼──────────────────┤
│ Real Estate │ 1              │ $1,000,000         │ 0.00999382       │
├─────────────┼────────────────┼────────────────────┼──────────────────┤
│             │ Total Value    │ $10,006,181,538.36 │                  │
└─────────────┴────────────────┴────────────────────┴──────────────────┘
```

#### Custom Pricing

You can also add assets priced in other tokens/assets. Please note that the token should have been added via the `add-token` command (or appear in the global token list, if you have explicitly specified to use it):

```sh
crypto-scanner add-asset --name CDP --quantity 123 --unit-price 1 --symbol ETH

? Enter password [hidden]

Added 123 units of CDP at the price of 1 ETH per unit
```

```sh
crypto-scanner add-asset --name wwUSDC --quantity 1000 --unit-price 2 --symbol USDC

? Enter password [hidden]

Added 1000 units of wwUSDC at the price of 2 USDC per unit
```

You can check and verify that the new assets are now part of the DB:

```sh
crypto-scanner show

? Enter password [hidden]

DB
‾‾

Version: 1

Ledgers
‾‾‾‾‾‾‾
┌──────────┬────────────────────────────────────────────┬────────────┐
│ Ledger   │ Address                                    │ Note       │
├──────────┼────────────────────────────────────────────┼────────────┤
│ Binance  │ 0xBE0eB53F46cd790Cd13851d5EFf43D12404d33E8 │ Binance 7  │
├──────────┼────────────────────────────────────────────┼────────────┤
│ Binance  │ 0xF977814e90dA44bFA03b6295A0616a897441aceC │ Binance 8  │
├──────────┼────────────────────────────────────────────┼────────────┤
│ Kraken   │ 0xDA9dfA130Df4dE4673b89022EE50ff26f6EA73Cf │            │
├──────────┼────────────────────────────────────────────┼────────────┤
│ Coinbase │ 0x71660c4005BA85c37ccec55d0C4493E66Fe775d3 │ Coinbase 1 │
└──────────┴────────────────────────────────────────────┴────────────┘

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

Assets
‾‾‾‾‾‾
┌─────────────┬──────────┬────────────┐
│ Name        │ Quantity │ Price      │
├─────────────┼──────────┼────────────┤
│ Gold        │ 100      │ $2,018.25  │
├─────────────┼──────────┼────────────┤
│ Real Estate │ 1        │ $1,000,000 │
├─────────────┼──────────┼────────────┤
│ CDP         │ 123      │ 1 ETH      │
├─────────────┼──────────┼────────────┤
│ wwUSDC      │ 1,000    │ 2 USDC     │
└─────────────┴──────────┴────────────┘
```

You can also see that asset amounts are aggregated as well:

```sh
crypto-scanner scan -p -v

? Enter password [hidden]

Querying prices. This operation may take a long time...

Finished | ████████████████████████████████████████ 100% | ETA: 0s | 4/4

Scanning all addresses and tokens...

Finished | ████████████████████████████████████████ 100% | ETA: 0s | 4/4
Finished | ████████████████████████████████████████ 100% | ETA: 0s | 4/4

Prices
‾‾‾‾‾‾
┌─────────────┬────────────┐
│ Symbol      │ Price      │
├─────────────┼────────────┤
│ ETH         │ $1,827.66  │
├─────────────┼────────────┤
│ USDT        │ $1.001     │
├─────────────┼────────────┤
│ USDC        │ $0.999     │
├─────────────┼────────────┤
│ DAI         │ $1.001     │
├─────────────┼────────────┤
│ LINK        │ $6.41      │
├─────────────┼────────────┤
│ Gold        │ $2,018.25  │
├─────────────┼────────────┤
│ Real Estate │ $1,000,000 │
├─────────────┼────────────┤
│ CDP         │ $1,827.66  │
├─────────────┼────────────┤
│ wwUSDC      │ $1.998     │
└─────────────┴────────────┘

Addresses
‾‾‾‾‾‾‾‾‾
┌──────────┬────────────────────────────────────────────┬───────────────────┬────────────────┬────────────────┬─────────────┬──────────────┬────────────┐
│ Ledger   │ Address                                    │ ETH               │ USDT           │ USDC           │ DAI         │ LINK         │ Note       │
├──────────┼────────────────────────────────────────────┼───────────────────┼────────────────┼────────────────┼─────────────┼──────────────┼────────────┤
│ Binance  │ 0xBE0eB53F46cd790Cd13851d5EFf43D12404d33E8 │ 1,996,008.36      │ 161            │ 0              │ 0           │ 5,000,000    │ Binance 7  │
├──────────┼────────────────────────────────────────────┼───────────────────┼────────────────┼────────────────┼─────────────┼──────────────┼────────────┤
│ Binance  │ 0xF977814e90dA44bFA03b6295A0616a897441aceC │ 1,470,354.07      │ 30,000,270.89  │ 100,000,000    │ 0           │ 50,000,000   │ Binance 8  │
├──────────┼────────────────────────────────────────────┼───────────────────┼────────────────┼────────────────┼─────────────┼──────────────┼────────────┤
│ Kraken   │ 0xDA9dfA130Df4dE4673b89022EE50ff26f6EA73Cf │ 1,690,839.97      │ 100            │ 0              │ 292,409     │ 9,500,000    │            │
├──────────┼────────────────────────────────────────────┼───────────────────┼────────────────┼────────────────┼─────────────┼──────────────┼────────────┤
│ Coinbase │ 0x71660c4005BA85c37ccec55d0C4493E66Fe775d3 │ 19,519.06         │ 1.29           │ 490.99         │ 0.0002      │ 0            │ Coinbase 1 │
├──────────┼────────────────────────────────────────────┼───────────────────┼────────────────┼────────────────┼─────────────┼──────────────┼────────────┤
│          │ Total                                      │ 5,176,721.46      │ 30,000,533.18  │ 100,000,490.99 │ 292,409     │ 64,500,000   │            │
├──────────┼────────────────────────────────────────────┼───────────────────┼────────────────┼────────────────┼─────────────┼──────────────┼────────────┤
│          │                                            │ ETH               │ USDT           │ USDC           │ DAI         │ LINK         │            │
├──────────┼────────────────────────────────────────────┼───────────────────┼────────────────┼────────────────┼─────────────┼──────────────┼────────────┤
│          │ Total Value                                │ $9,461,286,739.16 │ $30,030,533.71 │ $99,924,590.62 │ $292,701.41 │ $413,445,000 │            │
└──────────┴────────────────────────────────────────────┴───────────────────┴────────────────┴────────────────┴─────────────┴──────────────┴────────────┘

Ledgers
‾‾‾‾‾‾‾
┌─────────────┬───────────────────┬────────────────┬────────────────┬─────────────┬──────────────┐
│ Ledger      │ ETH               │ USDT           │ USDC           │ DAI         │ LINK         │
├─────────────┼───────────────────┼────────────────┼────────────────┼─────────────┼──────────────┤
│ Binance     │ 3,466,362.43      │ 30,000,431.89  │ 100,000,000    │ 0           │ 55,000,000   │
├─────────────┼───────────────────┼────────────────┼────────────────┼─────────────┼──────────────┤
│ Kraken      │ 1,690,839.97      │ 100            │ 0              │ 292,409     │ 9,500,000    │
├─────────────┼───────────────────┼────────────────┼────────────────┼─────────────┼──────────────┤
│ Coinbase    │ 19,519.06         │ 1.29           │ 490.99         │ 0.0002      │ 0            │
├─────────────┼───────────────────┼────────────────┼────────────────┼─────────────┼──────────────┤
│ Total       │ 5,176,721.46      │ 30,000,533.18  │ 100,000,490.99 │ 292,409     │ 64,500,000   │
├─────────────┼───────────────────┼────────────────┼────────────────┼─────────────┼──────────────┤
│             │ ETH               │ USDT           │ USDC           │ DAI         │ LINK         │
├─────────────┼───────────────────┼────────────────┼────────────────┼─────────────┼──────────────┤
│ Total Value │ $9,461,286,739.16 │ $30,030,533.71 │ $99,924,590.62 │ $292,701.41 │ $413,445,000 │
└─────────────┴───────────────────┴────────────────┴────────────────┴─────────────┴──────────────┘

Assets
‾‾‾‾‾‾
┌─────────────┬──────────┬────────────┬─────────────┐
│ Name        │ Quantity │ Price      │ Value       │
├─────────────┼──────────┼────────────┼─────────────┤
│ Gold        │ 100      │ $2,018.25  │ $201,825    │
├─────────────┼──────────┼────────────┼─────────────┤
│ Real Estate │ 1        │ $1,000,000 │ $1,000,000  │
├─────────────┼──────────┼────────────┼─────────────┤
│ CDP         │ 123      │ 1 ETH      │ $224,802.18 │
├─────────────┼──────────┼────────────┼─────────────┤
│ wwUSDC      │ 1,000    │ 2 USDC     │ $1,998.48   │
└─────────────┴──────────┴────────────┴─────────────┘

Total Amounts
‾‾‾‾‾‾‾‾‾‾‾‾‾
┌─────────────┬────────────────┬────────────────────┬──────────────────┐
│ Name        │ Amount         │ Value              │ % of Total Value │
├─────────────┼────────────────┼────────────────────┼──────────────────┤
│ ETH         │ 5,176,721.46   │ $9,461,286,739.16  │ 94.5523          │
├─────────────┼────────────────┼────────────────────┼──────────────────┤
│ USDT        │ 30,000,533.18  │ $30,030,533.71     │ 0.300113         │
├─────────────┼────────────────┼────────────────────┼──────────────────┤
│ USDC        │ 100,000,490.99 │ $99,924,590.62     │ 0.998606         │
├─────────────┼────────────────┼────────────────────┼──────────────────┤
│ DAI         │ 292,409        │ $292,701.41        │ 0.00292514       │
├─────────────┼────────────────┼────────────────────┼──────────────────┤
│ LINK        │ 64,500,000     │ $413,445,000       │ 4.13180          │
├─────────────┼────────────────┼────────────────────┼──────────────────┤
│ Gold        │ 100            │ $201,825           │ 0.00201696       │
├─────────────┼────────────────┼────────────────────┼──────────────────┤
│ Real Estate │ 1              │ $1,000,000         │ 0.00999360       │
├─────────────┼────────────────┼────────────────────┼──────────────────┤
│ CDP         │ 123            │ $224,802.18        │ 0.00224658       │
├─────────────┼────────────────┼────────────────────┼──────────────────┤
│ wwUSDC      │ 1,000          │ $1,998.48          │ 0.0000199720     │
├─────────────┼────────────────┼────────────────────┼──────────────────┤
│             │ Total Value    │ $10,006,408,190.56 │                  │
└─────────────┴────────────────┴────────────────────┴──────────────────┘
```

#### Using Global Token List

You can also scan using the global token list (derived from [CoinGecko's Token List](https://tokens.coingecko.com/ethereum/all.json)), in addition to the tokens you've explicitly added above, by providing the  `-g/--global-token-list` flag.

Please note that when the global token list is used, the `-v/--verbose` flag is not recommended, since most terminals won't be able to show its output properly. Therefore, we'd recommend using the global token list with the `-r/--csv` report instead.

```sh
crypto-scanner scan -g -p -r ~/reports

Querying prices. This operation may take a long time...

Finished | ████████████████████████████████████████ 100% | ETA: 0s | 3748/3748

Scanning all addresses and tokens...

Finished | ████████████████████████████████████████ 100% | ETA: 0s | 4/4
Finished | ████████████████████████████████████████ 100% | ETA: 0s | 3748/3748

Prices
‾‾‾‾‾‾
┌─────────────────────┬─────────────────────┐
│ Symbol              │ Price               │
├─────────────────────┼─────────────────────┤
│                     │ $0                  │
├─────────────────────┼─────────────────────┤
│ 00                  │ $0.109              │
├─────────────────────┼─────────────────────┤
│ 0NE                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ 0X0                 │ $0.063              │
├─────────────────────┼─────────────────────┤
│ 0XBTC               │ $0.112              │
├─────────────────────┼─────────────────────┤
│ 0XENCRYPT           │ $7.68               │
├─────────────────────┼─────────────────────┤
│ 0XMR                │ $0.108              │
├─────────────────────┼─────────────────────┤
│ 1ART                │ $0.01               │
├─────────────────────┼─────────────────────┤
│ 1EARTH              │ $0.002              │
├─────────────────────┼─────────────────────┤
│ 1ECO                │ $0.63               │
├─────────────────────┼─────────────────────┤
│ 1INCH               │ $0.398              │
├─────────────────────┼─────────────────────┤
│ 1MIL                │ $0.23               │
├─────────────────────┼─────────────────────┤
│ 1PECO               │ $0.188              │
├─────────────────────┼─────────────────────┤
│ 1SOL                │ $0.003              │
├─────────────────────┼─────────────────────┤
│ 1WO                 │ $0.102              │
├─────────────────────┼─────────────────────┤
│ 2CRZ                │ $0.001              │
├─────────────────────┼─────────────────────┤
│ 3CRV                │ $1.026              │
├─────────────────────┼─────────────────────┤
│ 4ART                │ $0.003              │
├─────────────────────┼─────────────────────┤
│ 4SHIBA              │ $0                  │
├─────────────────────┼─────────────────────┤
│ 8PAY                │ $0.013              │
├─────────────────────┼─────────────────────┤
│ A4                  │ $0.005              │
├─────────────────────┼─────────────────────┤
│ A5T                 │ $0.013              │
├─────────────────────┼─────────────────────┤
│ AAA                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ AAAVE               │ $64.88              │
├─────────────────────┼─────────────────────┤
│ AAC                 │ $0.002              │
├─────────────────────┼─────────────────────┤
│ AAG                 │ $0.005              │
├─────────────────────┼─────────────────────┤

.                     .                     .

├─────────────────────┼─────────────────────┤
│ ZEFU                │ $0.005              │
├─────────────────────┼─────────────────────┤
│ ZENI                │ $0.003              │
├─────────────────────┼─────────────────────┤
│ ZENIQ               │ $0.041              │
├─────────────────────┼─────────────────────┤
│ ZENITH              │ $0.002              │
├─────────────────────┼─────────────────────┤
│ ZEON                │ $0.001              │
├─────────────────────┼─────────────────────┤
│ ZERO                │ $0.637              │
├─────────────────────┼─────────────────────┤
│ ZEUM                │ $0.004              │
├─────────────────────┼─────────────────────┤
│ ZEUS                │ $0.001              │
├─────────────────────┼─────────────────────┤
│ ZEUS10000           │ $45.99              │
├─────────────────────┼─────────────────────┤
│ ZIG                 │ $0.006              │
├─────────────────────┼─────────────────────┤
│ ZIK                 │ $0.007              │
├─────────────────────┼─────────────────────┤
│ ZIN                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ ZINU                │ $0                  │
├─────────────────────┼─────────────────────┤
│ ZIOT                │ $0.016              │
├─────────────────────┼─────────────────────┤
│ ZIP                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ ZKP                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ ZKS                 │ $0.049              │
├─────────────────────┼─────────────────────┤
│ ZKT                 │ $0.358              │
├─────────────────────┼─────────────────────┤
│ ZLW                 │ $0.013              │
├─────────────────────┼─────────────────────┤
│ ZMT                 │ $0.025              │
├─────────────────────┼─────────────────────┤
│ ZNX                 │ $0.468              │
├─────────────────────┼─────────────────────┤
│ ZOGI                │ $0.32               │
├─────────────────────┼─────────────────────┤
│ ZONE                │ $0                  │
├─────────────────────┼─────────────────────┤
│ ZOO                 │ $0.07               │
├─────────────────────┼─────────────────────┤
│ ZOOT                │ $0                  │
├─────────────────────┼─────────────────────┤
│ ZORA                │ $21.34              │
├─────────────────────┼─────────────────────┤
│ ZPTC                │ $0.017              │
├─────────────────────┼─────────────────────┤
│ ZRO                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ ZRX                 │ $0.22               │
├─────────────────────┼─────────────────────┤
│ ZSC                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ ZUM                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ ZURR                │ $7.17               │
├─────────────────────┼─────────────────────┤
│ ZUSD                │ $1.004              │
├─────────────────────┼─────────────────────┤
│ ZYX                 │ $0.008              │
├─────────────────────┼─────────────────────┤
│ ZZ                  │ $0.219              │
├─────────────────────┼─────────────────────┤
│ ZZC                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ wwUSDC              │ $2                  │
└─────────────────────┴─────────────────────┘

Total Amounts
‾‾‾‾‾‾‾‾‾‾‾‾‾
┌──────────────────┬─────────────────────────┬────────────────────┬──────────────────┐
│ Name             │ Amount                  │ Value              │ % of Total Value │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ ETH              │ 5,169,701.41            │ $9,464,068,971.08  │ 53.5686          │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ USDT             │ 30,000,533.18           │ $30,000,533.18     │ 0.169809         │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ USDC             │ 100,000,490.99          │ $100,000,490.99    │ 0.566024         │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ DAI              │ 292,409                 │ $292,317.77        │ 0.00165458       │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ LINK             │ 64,500,000              │ $414,735,000       │ 2.34749          │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ 0XBTC            │ 2                       │ $0.2235            │ 1.26495e-9       │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ 1INCH            │ 59,708,578.16           │ $23,739,712.72     │ 0.134372         │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ AAVE             │ 1,038,453.08            │ $68,049,830.17     │ 0.385176         │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ ACH              │ 1,061,482,229.53        │ $30,559,553.26     │ 0.172973         │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ ADX              │ 37,534,438.16           │ $6,037,714.65      │ 0.0341747        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ AE               │ 13,150                  │ $681.41            │ 0.00000385690    │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ AERGO            │ 25,204,064.57           │ $2,806,321.37      │ 0.0158844        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ AGIX             │ 280,000,000             │ $87,172,120        │ 0.493412         │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ AGLD             │ 26,332,322.06           │ $11,278,028.21     │ 0.0638360        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ AKRO             │ 1,862,205,869.01        │ $7,299,511.81      │ 0.0413168        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ ALCX             │ 84,033.69               │ $1,424,371.01      │ 0.00806224       │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ ALICE            │ 15,300,000              │ $20,196,000        │ 0.114314         │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ ALPHA            │ 38,835,993.65           │ $4,288,930.63      │ 0.0242762        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ AMP              │ 2,109,114,411.84        │ $5,509,639.58      │ 0.0311857        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ ANB              │ 245,554                 │ $0.4297            │ 2.43230e-9       │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ ANKR             │ 453,480,869.48          │ $11,584,536.13     │ 0.0655709        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ ANT              │ 3,700,000               │ $12,913,000        │ 0.0730903        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ APE              │ 7,400,002.11            │ $24,050,006.84     │ 0.136128         │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ API3             │ 3,712,417.64            │ $4,492,025.34      │ 0.0254258        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ APPC             │ 20,000,000              │ $28,001.6          │ 0.000158495      │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ ARPA             │ 281,833,819.78          │ $24,017,596.29     │ 0.135945         │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ ART              │ 157,000                 │ $0                 │ 0.00000          │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ AST              │ 59,541,479.89           │ $7,600,529.45      │ 0.0430206        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ ATA              │ 161,756,933.68          │ $20,009,009.18     │ 0.113255         │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ ATRI             │ 3                       │ $0.0062            │ 3.52231e-11      │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ AUCTION          │ 663,719.15              │ $3,199,126.29      │ 0.0181077        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ AUDIO            │ 59,557,198.02           │ $14,642,792.26     │ 0.0828812        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ AXS              │ 1,337,508.95            │ $9,375,937.75      │ 0.0530698        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ BADGER           │ 1,968,285.51            │ $4,802,616.64      │ 0.0271838        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ BAL              │ 1,202,400.56            │ $6,276,530.94      │ 0.0355265        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ BAND             │ 1,681,369.33            │ $2,421,171.84      │ 0.0137043        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ BAT              │ 75,800,000              │ $16,712,687.2      │ 0.0945973        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ BBTC             │ 1,200                   │ $32,060,400        │ 0.181469         │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ BCPT             │ 11,875,644.64           │ $15,052.5          │ 0.0000852003     │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ BDOT             │ 107,028                 │ $512,664.12        │ 0.00290179       │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ BEL              │ 12,227,197.91           │ $9,766,339.83      │ 0.0552795        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ BEND             │ 7                       │ $0.0449            │ 2.54161e-10      │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ BICO             │ 20,492,314.18           │ $6,039,802.22      │ 0.0341865        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ BLUESPARROW      │ 100.01                  │ $3.04              │ 1.72097e-8       │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ BLZ              │ 185,074,430.12          │ $11,759,814.36     │ 0.0665630        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ BNT              │ 4,000,000               │ $1,662,076         │ 0.00940769       │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ BOBA             │ 5,462,341.48            │ $921,606.25        │ 0.00521648       │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ BOND             │ 1,250,140.36            │ $4,613,017.94      │ 0.0261106        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ BRD              │ 21,000,000              │ $129,397.17        │ 0.000732415      │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ BTB              │ 20                      │ $0.0036            │ 2.06224e-11      │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ BUSD             │ 2,900,000,000           │ $2,900,000,000     │ 16.4146          │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ C98              │ 107,850,854.29          │ $20,788,467.87     │ 0.117667         │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ CBK              │ 28,000                  │ $15,714.72         │ 0.0000889486     │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ CBM              │ 300,000,000             │ $1,056             │ 0.00000597718    │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ CBX              │ 120                     │ $2.91              │ 1.64981e-8       │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ CDAI             │ 20,540,897.37           │ $457,124.52        │ 0.00258742       │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ CEL              │ 2,230.13                │ $492.68            │ 0.00000278865    │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ CELR             │ 1,356,696,774.56        │ $27,282,425.95     │ 0.154424         │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ CERE             │ 2,400                   │ $10.59             │ 5.99618e-8       │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ CFI              │ 1                       │ $0.3435            │ 1.94431e-9       │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ CHAT             │ 25,156,470.39           │ $1,803.72          │ 0.0000102094     │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ CHR              │ 280,688,434.03          │ $42,358,410.89     │ 0.239757         │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ CHZ              │ 2,376,511,860.02        │ $240,557,660.01    │ 1.36161          │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ CLV              │ 206,641,209.37          │ $9,880,981.31      │ 0.0559284        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ CND              │ 390,000,000             │ $894,246.6         │ 0.00506162       │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ COMP             │ 533,336.46              │ $18,730,776.37     │ 0.106020         │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ COTI             │ 467,503,535.27          │ $31,725,724.91     │ 0.179574         │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ CPT              │ 250,000                 │ $17.99             │ 1.01799e-7       │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ CQT              │ 10                      │ $1.2               │ 6.81727e-9       │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ CREAM            │ 400,000                 │ $9,816,000         │ 0.0555606        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ CRV              │ 62,000,000              │ $53,082,230        │ 0.300456         │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ CTSI             │ 67,016,128.89           │ $11,604,780.94     │ 0.0656855        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ CULT             │ 697,308.13              │ $2.25              │ 1.27090e-8       │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ CVC              │ 30,000,000              │ $2,624,640         │ 0.0148560        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ CVP              │ 12,186,954.58           │ $4,650,822.17      │ 0.0263246        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ CVX              │ 1,488,947.92            │ $6,700,265.64      │ 0.0379249        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ DAR              │ 61,113,909.71           │ $8,335,631.72      │ 0.0471814        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ DATA             │ 258,272,713.01          │ $7,154,097.33      │ 0.0404937        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ DENT             │ 44,264,582,651.89       │ $37,987,864.83     │ 0.215019         │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ DEXE             │ 1,305,892.05            │ $3,264,730.13      │ 0.0184790        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ DF               │ 175,563,733.35          │ $8,419,727.66      │ 0.0476574        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ DIE              │ 55,343,888              │ $2.15              │ 1.21541e-8       │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ DINGO            │ 73,522,461,487.56       │ $360.04            │ 0.00000203790    │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ DLT              │ 40,000,000              │ $32,186.8          │ 0.000182184      │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ DMTR             │ 1                       │ $0.0428            │ 2.42477e-10      │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ DNT              │ 31,000,000              │ $834,600.91        │ 0.00472401       │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ DODO             │ 113,710,661.37          │ $14,900,417.64     │ 0.0843395        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ DOE              │ 3,200,000               │ $394.34            │ 0.00000223202    │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ DREP             │ 15,667,977.87           │ $5,491,767.25      │ 0.0310845        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ DTH              │ 69,420                  │ $1.64              │ 9.30069e-9       │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ DUSK             │ 64,845,859.75           │ $9,566,709.69      │ 0.0541496        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ DYDX             │ 41,022,929.76           │ $84,097,006        │ 0.476006         │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ ELF              │ 47,341,020.32           │ $13,500,049.4      │ 0.0764131        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ ELON             │ 632,206,458,069.41      │ $131,327.62        │ 0.000743342      │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ ENG              │ 93,266.58               │ $913.11            │ 0.00000516841    │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ ENJ              │ 174,186,416.08          │ $58,877,621.43     │ 0.333260         │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ ENS              │ 2,076,497.53            │ $21,720,164.18     │ 0.122941         │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ ERN              │ 7,716,434.02            │ $14,352,567.28     │ 0.0812385        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ ETHM             │ 2,157,534,007.9         │ $0.0731            │ 4.13721e-10      │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ EVX              │ 2,500,000               │ $26,369.18         │ 0.000149255      │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ EZ               │ 728,966.95              │ $41,379.08         │ 0.000234214      │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ FARM             │ 206,100.79              │ $5,643,039.66      │ 0.0319408        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ FBX              │ 0.03                    │ $<0.0001           │ 2.37800e-13      │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ FET              │ 150,000,000.01          │ $38,568,450        │ 0.218305         │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ FIS              │ 27,112,861.97           │ $9,411,064.18      │ 0.0532686        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ FOR              │ 220,000,000             │ $4,452,067.4       │ 0.0251996        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ FORTH            │ 2,564,806.18            │ $7,258,401.48      │ 0.0410841        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ FOX              │ 400                     │ $9.56              │ 5.40958e-8       │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ FREE             │ 550,000                 │ $0.0777            │ 4.39955e-10      │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ FRONT            │ 13,141,145.21           │ $2,303,287.94      │ 0.0130371        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ FTT              │ 39,000,000              │ $39,390,000        │ 0.222956         │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ FUEL             │ 219,660,357.47          │ $66,798.71         │ 0.000378095      │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ FUN              │ 2,465,285,537.17        │ $12,624,036.96     │ 0.0714547        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ FXS              │ 2,100,000               │ $14,637,000        │ 0.0828485        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ GAL              │ 18,780,474.75           │ $25,353,640.91     │ 0.143507         │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ GALA             │ 4,591,208,353.23        │ $0                 │ 0.00000          │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ GEC              │ 1,000                   │ $107.65            │ 6.09304e-7       │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ GF               │ 569,396.89              │ $42,479.29         │ 0.000240442      │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ GHST             │ 7,507,350.22            │ $7,298,435.68      │ 0.0413107        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ GLM              │ 31,361,094              │ $6,514,169.64      │ 0.0368716        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ GMT              │ 26,392,399.1            │ $7,047,219.23      │ 0.0398887        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ GNO              │ 19,288.75               │ $2,200,460.71      │ 0.0124551        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ GRT              │ 694,916,314.64          │ $83,123,804.81     │ 0.470498         │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ GVT              │ 300,000                 │ $38,034.6          │ 0.000215284      │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ GYEN             │ 14,144,026.8            │ $98,860.52         │ 0.000559571      │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ HBTC             │ 56                      │ $1,588,328         │ 0.00899027       │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ HDRN             │ 14,658,610.39           │ $6.14              │ 3.47774e-8       │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ HEGIC            │ 20,460,000              │ $245,414.63        │ 0.00138910       │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ HEX              │ 2,200                   │ $31.51             │ 1.78369e-7       │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ HFT              │ 74,000,000              │ $32,435,384        │ 0.183591         │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ HIFI             │ 15,920,864              │ $5,392,348.87      │ 0.0305218        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ HIGH             │ 17,791,945.42           │ $38,964,360.47     │ 0.220546         │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ HOT              │ 43,695,275,508.86       │ $70,509,318.28     │ 0.399097         │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ HSF              │ 1                       │ $0.4744            │ 2.68506e-9       │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ ID               │ 169,359,748.89          │ $80,644,031.63     │ 0.456462         │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ IDEX             │ 215,464,921.06          │ $16,624,626.91     │ 0.0940988        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ IDRT             │ 3,000,000,000           │ $200,580           │ 0.00113532       │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ ILV              │ 364,296.39              │ $17,351,437.06     │ 0.0982127        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ IMX              │ 42,123,788.62           │ $30,776,903.68     │ 0.174204         │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ INJ              │ 3,391.24                │ $21,670.05         │ 0.000122657      │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ IQ               │ 451,848,008.32          │ $2,202,329.78      │ 0.0124656        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ JASMY            │ 10,094,222,103.03       │ $47,521,376.93     │ 0.268981         │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ KEY              │ 3,375,420,389.23        │ $24,915,496.83     │ 0.141027         │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ KISHU            │ 25,940,474.87           │ $0.0094            │ 5.31613e-11      │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ KNC              │ 9,364,327.12            │ $5,755,671.29      │ 0.0325783        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ KP3R             │ 148,294.74              │ $9,468,618.89      │ 0.0535943        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ LBA              │ 14,000,000              │ $3,826.76          │ 0.0000216603     │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ LCX              │ 0.0343                  │ $0.0017            │ 9.77380e-12      │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ LDO              │ 4,000,000               │ $7,880,000         │ 0.0446024        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ LEVER            │ 10,788,791,291.87       │ $16,527,888.82     │ 0.0935513        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ LINA             │ 1,343,433,490.65        │ $16,737,837.86     │ 0.0947396        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ LINU             │ 10                      │ $0                 │ 2.31350e-17      │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ LIT              │ 31,191,343.39           │ $27,503,746.82     │ 0.155677         │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ LOKA             │ 46,311,390.47           │ $16,558,637.66     │ 0.0937253        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ LOOKS            │ 17,171.49               │ $1,498.14          │ 0.00000847980    │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ LPT              │ 1,977,525.58            │ $9,551,448.57      │ 0.0540632        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ LQTY             │ 8,000,000               │ $9,920,000         │ 0.0561493        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ LRC              │ 130,574,286.43          │ $37,552,120.18     │ 0.212553         │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ LTO              │ 24,014,574.32           │ $2,058,145.08      │ 0.0116495        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ LUN              │ 310,488.42              │ $5,805.3           │ 0.0000328592     │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ LUNC             │ 369,862.43              │ $31.1              │ 1.76021e-7       │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ MANA             │ 176,977,667.46          │ $84,207,390        │ 0.476631         │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ MASK             │ 7,709,266.44            │ $31,299,621.76     │ 0.177162         │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ MATIC            │ 505,938,656.06          │ $466,024,649.54    │ 2.63780          │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ MC               │ 24,079,410.21           │ $5,319,117.64      │ 0.0301073        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ MCO              │ 442,076.7               │ $1,025,617.94      │ 0.00580521       │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ MDA              │ 1,040,425.58            │ $49,865.68         │ 0.000282250      │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ MDT              │ 267,290,546.42          │ $13,345,798.27     │ 0.0755400        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ MDX              │ 148,000,000             │ $1,024,022.36      │ 0.00579618       │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ MITH             │ 181,000,000             │ $368,061.69        │ 0.00208331       │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ MKR              │ 35,780.87               │ $22,702,963.28     │ 0.128503         │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ MLN              │ 80,251.29               │ $1,488,661.48      │ 0.00842613       │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ MONGOOSE         │ 212,022,490,024,796,400 │ $2.97              │ 1.68013e-8       │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ MOPS             │ 160,000,000             │ $14.9              │ 8.43588e-8       │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ MTH              │ 29,000,000              │ $161,617.87        │ 0.000914791      │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ MTL              │ 10,563,043.55           │ $11,260,204.43     │ 0.0637351        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ MUSE             │ 2.5                     │ $14.69             │ 8.31547e-8       │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ MXC              │ 0.8                     │ $0.0122            │ 6.88384e-11      │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ NCASH            │ 770,000,000             │ $15,654.1          │ 0.0000886055     │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ NEXO             │ 7,000,000               │ $4,651,367         │ 0.0263277        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ NKN              │ 138,244,319.97          │ $15,813,767.76     │ 0.0895092        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ NMR              │ 400,826.91              │ $6,172,734.44      │ 0.0349390        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ NUTS             │ 8.89                    │ $0.3704            │ 2.09655e-9       │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ OAX              │ 34,900,001              │ $8,263,796.74      │ 0.0467748        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ OCEAN            │ 117,577,514             │ $41,358,360.86     │ 0.234097         │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ OGN              │ 134,770,000             │ $12,420,133.66     │ 0.0703005        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ OGV              │ 78,000,000              │ $691,913.04        │ 0.00391637       │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ OM               │ 177,116,853.2           │ $4,868,217.89      │ 0.0275551        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ OMG              │ 21,115,750.37           │ $16,035,849.84     │ 0.0907662        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ ONX              │ 90,471                  │ $2,254.02          │ 0.0000127582     │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ OOKI             │ 2,782,754,971.39        │ $8,525,721.2       │ 0.0482573        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ OOKS             │ 148                     │ $36.68             │ 2.07596e-7       │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ OPENAIERC        │ 4                       │ $0.0237            │ 1.34330e-10      │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ OPTI             │ 37                      │ $6.46              │ 3.65585e-8       │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ ORBS             │ 70                      │ $1.74              │ 9.83275e-9       │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ ORN              │ 10,235,354.31           │ $8,999,117.98      │ 0.0509369        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ OST              │ 137,885,647.54          │ $61,389.45         │ 0.000347477      │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ OXT              │ 77,000,000.09           │ $5,147,912.01      │ 0.0291382        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ PAXG             │ 32,919.52               │ $64,682,580.76     │ 0.366117         │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ PEOPLE           │ 1,470,000,000           │ $25,655,895.3      │ 0.145218         │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ PEPE             │ 70,156,631,106,200.61   │ $107,339,645.59    │ 0.607565         │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ PERL             │ 438,892,467.19          │ $8,645,005.37      │ 0.0489325        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ PERP             │ 21,560,175.86           │ $12,610,288.14     │ 0.0713768        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ PHA              │ 80,392,196.21           │ $9,839,120.5       │ 0.0556915        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ PHCR             │ 1,333,333               │ $46.67             │ 2.64143e-7       │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ PLA              │ 9,056,485.25            │ $1,604,655.23      │ 0.00908268       │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ PNT              │ 27,561,106.11           │ $3,289,225.09      │ 0.0186177        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ POLS             │ 14,900,000              │ $5,147,771.2       │ 0.0291375        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ POND             │ 745,146,090.72          │ $6,300,023.91      │ 0.0356594        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ POWR             │ 45,387,352.92           │ $6,950,210.74      │ 0.0393396        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ PPT              │ 1,000,000               │ $34,900.65         │ 0.000197545      │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ PROM             │ 1,700,000               │ $7,344,000         │ 0.0415686        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ PROS             │ 14,000,010              │ $5,738,548.1       │ 0.0324814        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ PSTAKE           │ 423,319.33              │ $19,142.47         │ 0.000108350      │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ PUNDIX           │ 22,043,329.47           │ $8,506,586.97      │ 0.0481490        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ PYR              │ 5,923,605.05            │ $21,621,158.42     │ 0.122380         │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ QKC              │ 379,374,275.58          │ $3,408,548.88      │ 0.0192931        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ QNT              │ 622,469.08              │ $63,242,858.12     │ 0.357968         │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ QSP              │ 65,918,989.36           │ $858,610.66        │ 0.00485991       │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ QUICK            │ 5,000                   │ $292,000           │ 0.00165278       │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ RAD              │ 6,273,554.77            │ $11,794,282.97     │ 0.0667581        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ RCN              │ 30,000,000              │ $60,180.9          │ 0.000340636      │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ REEF             │ 184,562,485.21          │ $408,571.51        │ 0.00231260       │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ REN              │ 173,400,000             │ $12,900,786.6      │ 0.0730211        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ REP              │ 220,000                 │ $1,447,600         │ 0.00819372       │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ REQ              │ 124,167,792.47          │ $10,459,149.83     │ 0.0592010        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ RLC              │ 14,306,743.23           │ $22,604,654.3      │ 0.127947         │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ RNDR             │ 47,000,000              │ $123,610,000       │ 0.699658         │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ RPL              │ 202,654.44              │ $9,587,581.65      │ 0.0542677        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ RSR              │ 7,901,502,896.93        │ $23,433,487.14     │ 0.132638         │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ RYOSHI           │ 264,457,420.2           │ $0.9087            │ 5.14329e-9       │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ S4F              │ 3,337                   │ $0.6003            │ 3.39759e-9       │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ SALT             │ 4,041,865.61            │ $124,005.57        │ 0.000701897      │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ SAND             │ 272,545,978             │ $144,043,002.29    │ 0.815313         │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ SHEESHA          │ 0.03                    │ $0.1818            │ 1.02903e-9       │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ SHIB             │ 31,100,228,229,298.63   │ $269,638,978.75    │ 1.52621          │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ SHIBGUN          │ 51,618                  │ $0.0491            │ 2.78160e-10      │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ SHIBMERICAN      │ 9,167,015,579,905,010   │ $1,754.48          │ 0.00000993069    │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ SHIK             │ 7                       │ $0                 │ 6.12548e-17      │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ SKL              │ 420,000,000.42          │ $13,342,946.41     │ 0.0755238        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ SKRT             │ 1,666.67                │ $1.95              │ 1.10137e-8       │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ SLP              │ 650,000,000             │ $1,424,098         │ 0.00806069       │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ SNGLS            │ 364,500,000             │ $48,223.35         │ 0.000272954      │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ SNM              │ 27,822,467.6            │ $11,180,319.49     │ 0.0632829        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ SNT              │ 180,000,000             │ $4,166,080.2       │ 0.0235809        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ SNX              │ 2,231,445.89            │ $5,377,784.6       │ 0.0304394        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ SPELL            │ 12,064,978,842.38       │ $6,979,228.31      │ 0.0395039        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ SSV              │ 2,799,187.65            │ $63,821,478.44     │ 0.361243         │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ STAKE            │ 0.0009                  │ $0.0002            │ 9.78311e-13      │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ STG              │ 23,796,913.1            │ $15,810,431.1      │ 0.0894903        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ STMX             │ 1,438,405,756.32        │ $6,195,788.95      │ 0.0350695        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ STORJ            │ 29,567,668.98           │ $8,807,498.96      │ 0.0498523        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ STPT             │ 308,882,978.33          │ $13,076,573.24     │ 0.0740161        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ SUB              │ 10,035,296.77           │ $11,910.49         │ 0.0000674159     │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ SUPER            │ 62,450,449.29           │ $8,150,408.14      │ 0.0461330        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ SUSD             │ 1,500,000               │ $1,497,957         │ 0.00847875       │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ SUSHI            │ 42,359,565.41           │ $35,741,942.3      │ 0.202307         │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ SWAPP            │ 5                       │ $0.0021            │ 1.16258e-11      │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ SWFTC            │ 10,000                  │ $11.99             │ 6.78438e-8       │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ SWRV             │ 1,100,000               │ $36,944.83         │ 0.000209115      │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ SXP              │ 0                       │ $0                 │ 5.56371e-19      │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ SYN              │ 11,196,520              │ $6,838,644.08      │ 0.0387081        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ TCT              │ 128,888,545             │ $133,317.16        │ 0.000754603      │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ TEXAN            │ 2,200,000               │ $12.91             │ 7.30959e-8       │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ TLM              │ 703,228,351.11          │ $11,125,241.29     │ 0.0629712        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ TOMOE            │ 22,015,640              │ $27,959,862.8      │ 0.158259         │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ TORN             │ 2,049,728.4             │ $8,793,334.85      │ 0.0497721        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ TRAC             │ 59                      │ $16.27             │ 9.20851e-8       │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ TRB              │ 597,995.67              │ $7,265,647.39      │ 0.0411251        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ TRIBE            │ 5,800,000               │ $1,589,037.6       │ 0.00899428       │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ TSUKA            │ 6                       │ $0.2445            │ 1.38414e-9       │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ TUSD             │ 340,000,000             │ $340,000,000       │ 1.92447          │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ TVK              │ 472,826,368.58          │ $16,547,892.14     │ 0.0936645        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ UFT              │ 12,636,580.75           │ $4,113,181.76      │ 0.0232815        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ UMA              │ 3,066,316.93            │ $6,132,633.87      │ 0.0347120        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ UNFI             │ 2,380,267.5             │ $10,496,979.67     │ 0.0594151        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ UTK              │ 109,000,068             │ $9,942,332.2       │ 0.0562757        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ VAB              │ 33,852,452              │ $41,358.89         │ 0.000234100      │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ VGX              │ 120,000,000             │ $17,108,160        │ 0.0968357        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ VIB              │ 139,031,622             │ $8,432,545.94      │ 0.0477300        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ VIBE             │ 18,333,332              │ $27,814.78         │ 0.000157437      │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ VIDT             │ 360,770,125.83          │ $10,755,401.65     │ 0.0608778        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ WABI             │ 26,700,000              │ $28,684.34         │ 0.000162359      │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ WCFG             │ 0.167                   │ $0.0373            │ 2.11250e-10      │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ WFTM             │ 453,094,587.14          │ $150,056,771.56    │ 0.849352         │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ WINGS            │ 2,617,585.64            │ $2,821.18          │ 0.0000159685     │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ WJXN             │ 10                      │ $0.931             │ 5.26988e-9       │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ WNXM             │ 277,436.6               │ $7,510,208.68      │ 0.0425093        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ WOO              │ 123,145,824.19          │ $26,989,993.43     │ 0.152769         │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ WPR              │ 118,104,767             │ $42,913.37         │ 0.000242899      │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ WTC              │ 15,432,824.66           │ $2,784,513.69      │ 0.0157609        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ WXRP             │ 1,495,557.05            │ $700,821.02        │ 0.00396679       │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ XDATA            │ 323.39                  │ $9.1               │ 5.15214e-8       │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ XMON             │ 0.0005                  │ $1.05              │ 5.95590e-9       │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ XOT              │ 0.0001                  │ $0.0022            │ 1.25091e-11      │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ XPR              │ 4,800,000               │ $5,051.18          │ 0.0000285907     │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ XYO              │ 0.3775                  │ $0.0015            │ 8.57085e-12      │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ YCURVE           │ 46,246.75               │ $507.78            │ 0.00000287416    │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ YFI              │ 3,696.31                │ $24,149,095.59     │ 0.136689         │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ YFII             │ 11,869.83               │ $10,448,534.8      │ 0.0591409        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ YFL              │ 0.0001                  │ $0.001             │ 5.70209e-12      │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ YGG              │ 64,000,000              │ $12,538,944        │ 0.0709730        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ YVAULT-LP-YCURVE │ 0.0001                  │ $0                 │ 5.53367e-15      │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ ZRX              │ 50,067,948.41           │ $11,020,305.92     │ 0.0623772        │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ ZUM              │ 15,682,407.29           │ $104.44            │ 5.91179e-7       │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ Gold             │ 100                     │ $201,825           │ 0.00114237       │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ Real Estate      │ 1                       │ $1,000,000         │ 0.00566021       │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ CDP              │ 123                     │ $225,173.64        │ 0.00127453       │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│ wwUSDC           │ 1,000                   │ $2,000             │ 0.0000113204     │
├──────────────────┼─────────────────────────┼────────────────────┼──────────────────┤
│                  │ Total Value             │ $17,667,197,353.88 │                  │
└──────────────────┴─────────────────────────┴────────────────────┴──────────────────┘

Exported address data to: ~/reports/addresses.csv
Exported price data to: ~/reports/prices.csv
Exported totals data to: ~/reports/totals.csv
```

If you can't find your token in [data/tokens.json](/data/tokens.json), feel free to open a PR/issue and we'll add it.
