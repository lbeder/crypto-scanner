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

Querying token prices. This operation may take a long time...

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

Querying token prices. This operation may take a long time...

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

Querying token prices. This operation may take a long time...

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

Querying token prices. This operation may take a long time...

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

Querying token prices. This operation may take a long time...

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
│ AAMMBPTBALWETH      │ $216.11             │
├─────────────────────┼─────────────────────┤
│ AAMMBPTWBTCWETH     │ $108,663            │
├─────────────────────┼─────────────────────┤
│ AAMMDAI             │ $1.004              │
├─────────────────────┼─────────────────────┤
│ AAMMUNIAAVEWETH     │ $934.56             │
├─────────────────────┼─────────────────────┤
│ AAMMUNIBATWETH      │ $55.87              │
├─────────────────────┼─────────────────────┤
│ AAMMUNICRVWETH      │ $570.16             │
├─────────────────────┼─────────────────────┤
│ AAMMUNIDAIUSDC      │ $2,263,732          │
├─────────────────────┼─────────────────────┤
│ AAMMUNIDAIWETH      │ $156.41             │
├─────────────────────┼─────────────────────┤
│ AAMMUNILINKWETH     │ $351.89             │
├─────────────────────┼─────────────────────┤
│ AAMMUNIMKRWETH      │ $2,996.47           │
├─────────────────────┼─────────────────────┤
│ AAMMUNIRENWETH      │ $45.66              │
├─────────────────────┼─────────────────────┤
│ AAMMUNISNXWETH      │ $283.87             │
├─────────────────────┼─────────────────────┤
│ AAMMUNIUNIWETH      │ $439.65             │
├─────────────────────┼─────────────────────┤
│ AAMMUNIUSDCWETH     │ $186,603,344        │
├─────────────────────┼─────────────────────┤
│ AAMMUNIWBTCUSDC     │ $54,599,013,000,461 │
├─────────────────────┼─────────────────────┤
│ AAMMUNIWBTCWETH     │ $1,741,388,292      │
├─────────────────────┼─────────────────────┤
│ AAMMUNIYFIWETH      │ $17,525.33          │
├─────────────────────┼─────────────────────┤
│ AAMMUSDC            │ $1.003              │
├─────────────────────┼─────────────────────┤
│ AAMMUSDT            │ $1.004              │
├─────────────────────┼─────────────────────┤
│ AAMMWBTC            │ $26,789             │
├─────────────────────┼─────────────────────┤
│ AAMMWETH            │ $1,831.1            │
├─────────────────────┼─────────────────────┤
│ AAPX                │ $0.074              │
├─────────────────────┼─────────────────────┤
│ AAVE                │ $65.53              │
├─────────────────────┼─────────────────────┤
│ ABAL                │ $5.2                │
├─────────────────────┼─────────────────────┤
│ ABAT                │ $0.22               │
├─────────────────────┼─────────────────────┤
│ ABI                 │ $2.14               │
├─────────────────────┼─────────────────────┤
│ ABL                 │ $0.005              │
├─────────────────────┼─────────────────────┤
│ ABLOCK              │ $0.077              │
├─────────────────────┼─────────────────────┤
│ ABPT                │ $0.095              │
├─────────────────────┼─────────────────────┤
│ ABR                 │ $0.158              │
├─────────────────────┼─────────────────────┤
│ ABT                 │ $0.092              │
├─────────────────────┼─────────────────────┤
│ ABUSD               │ $1.003              │
├─────────────────────┼─────────────────────┤
│ ABYSS               │ $0.014              │
├─────────────────────┼─────────────────────┤
│ AC                  │ $0.078              │
├─────────────────────┼─────────────────────┤
│ ACAP                │ $0                  │
├─────────────────────┼─────────────────────┤
│ ACE                 │ $0.004              │
├─────────────────────┼─────────────────────┤
│ ACH                 │ $0.029              │
├─────────────────────┼─────────────────────┤
│ ACOIN               │ $0.035              │
├─────────────────────┼─────────────────────┤
│ ACQ                 │ $0.014              │
├─────────────────────┼─────────────────────┤
│ ACR                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ ACRE                │ $0                  │
├─────────────────────┼─────────────────────┤
│ ACRIA               │ $0.017              │
├─────────────────────┼─────────────────────┤
│ ACRV                │ $0.672              │
├─────────────────────┼─────────────────────┤
│ ACX                 │ $0.041              │
├─────────────────────┼─────────────────────┤
│ ACXT                │ $0                  │
├─────────────────────┼─────────────────────┤
│ ACY                 │ $0.007              │
├─────────────────────┼─────────────────────┤
│ ACYC                │ $0                  │
├─────────────────────┼─────────────────────┤
│ AD                  │ $0.001              │
├─────────────────────┼─────────────────────┤
│ ADAI                │ $1.004              │
├─────────────────────┼─────────────────────┤
│ ADAPAD              │ $0.008              │
├─────────────────────┼─────────────────────┤
│ ADCO                │ $0.403              │
├─────────────────────┼─────────────────────┤
│ ADD                 │ $0.008              │
├─────────────────────┼─────────────────────┤
│ ADEL                │ $0.003              │
├─────────────────────┼─────────────────────┤
│ ADF                 │ $0.368              │
├─────────────────────┼─────────────────────┤
│ ADI                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ ADP                 │ $0.003              │
├─────────────────────┼─────────────────────┤
│ ADS                 │ $0.09               │
├─────────────────────┼─────────────────────┤
│ ADT                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ ADVT                │ $0                  │
├─────────────────────┼─────────────────────┤
│ ADX                 │ $0.161              │
├─────────────────────┼─────────────────────┤
│ AE                  │ $0.052              │
├─────────────────────┼─────────────────────┤
│ AEGIS               │ $0.001              │
├─────────────────────┼─────────────────────┤
│ AEL                 │ $6.68               │
├─────────────────────┼─────────────────────┤
│ AENJ                │ $0.332              │
├─────────────────────┼─────────────────────┤
│ AERGO               │ $0.111              │
├─────────────────────┼─────────────────────┤
│ AETH                │ $1,831.1            │
├─────────────────────┼─────────────────────┤
│ AFIN                │ $0.001              │
├─────────────────────┼─────────────────────┤
│ AFY                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ AGA                 │ $0.042              │
├─────────────────────┼─────────────────────┤
│ AGEUR               │ $1.075              │
├─────────────────────┼─────────────────────┤
│ AGF                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ AGI                 │ $0.137              │
├─────────────────────┼─────────────────────┤
│ AGIX                │ $0.311              │
├─────────────────────┼─────────────────────┤
│ AGLD                │ $0.428              │
├─────────────────────┼─────────────────────┤
│ AGN                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ AGOV                │ $0.005              │
├─────────────────────┼─────────────────────┤
│ AGRS                │ $0.447              │
├─────────────────────┼─────────────────────┤
│ AGS                 │ $0.016              │
├─────────────────────┼─────────────────────┤
│ AGUSD               │ $1                  │
├─────────────────────┼─────────────────────┤
│ AGV                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ AGVC                │ $0.003              │
├─────────────────────┼─────────────────────┤
│ AI                  │ $0.002              │
├─────────────────────┼─────────────────────┤
│ AID                 │ $0.005              │
├─────────────────────┼─────────────────────┤
│ AIN                 │ $0.018              │
├─────────────────────┼─────────────────────┤
│ AIOZ                │ $0.018              │
├─────────────────────┼─────────────────────┤
│ AIPAD               │ $0.103              │
├─────────────────────┼─────────────────────┤
│ AIPRO               │ $15.99              │
├─────────────────────┼─────────────────────┤
│ AIR                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ AIRX                │ $0                  │
├─────────────────────┼─────────────────────┤
│ AISC                │ $0                  │
├─────────────────────┼─────────────────────┤
│ AIT                 │ $0.002              │
├─────────────────────┼─────────────────────┤
│ AIWALLET            │ $0                  │
├─────────────────────┼─────────────────────┤
│ AKI                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ AKITA               │ $0                  │
├─────────────────────┼─────────────────────┤
│ AKNC                │ $0.605              │
├─────────────────────┼─────────────────────┤
│ AKRO                │ $0.004              │
├─────────────────────┼─────────────────────┤
│ ALBT                │ $0.004              │
├─────────────────────┼─────────────────────┤
│ ALCA                │ $0.023              │
├─────────────────────┼─────────────────────┤
│ ALCX                │ $16.95              │
├─────────────────────┼─────────────────────┤
│ ALD                 │ $0.055              │
├─────────────────────┼─────────────────────┤
│ ALEPH               │ $0.09               │
├─────────────────────┼─────────────────────┤
│ ALERT               │ $0                  │
├─────────────────────┼─────────────────────┤
│ ALETH               │ $1,814.8            │
├─────────────────────┼─────────────────────┤
│ ALG                 │ $0.034              │
├─────────────────────┼─────────────────────┤
│ ALI                 │ $0.021              │
├─────────────────────┼─────────────────────┤
│ ALICE               │ $1.32               │
├─────────────────────┼─────────────────────┤
│ ALIEN               │ $0                  │
├─────────────────────┼─────────────────────┤
│ ALINK               │ $6.44               │
├─────────────────────┼─────────────────────┤
│ ALLIN               │ $2.16               │
├─────────────────────┼─────────────────────┤
│ ALLUO               │ $0.036              │
├─────────────────────┼─────────────────────┤
│ ALN                 │ $0.003              │
├─────────────────────┼─────────────────────┤
│ ALOHA               │ $0.001              │
├─────────────────────┼─────────────────────┤
│ ALPA                │ $0.023              │
├─────────────────────┼─────────────────────┤
│ ALPHA               │ $0.11               │
├─────────────────────┼─────────────────────┤
│ ALPHR               │ $0.011              │
├─────────────────────┼─────────────────────┤
│ ALUSD               │ $0.996              │
├─────────────────────┼─────────────────────┤
│ ALY                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ AMANA               │ $0.467              │
├─────────────────────┼─────────────────────┤
│ AMAS                │ $0.007              │
├─────────────────────┼─────────────────────┤
│ AMDG                │ $0.005              │
├─────────────────────┼─────────────────────┤
│ AMKR                │ $634.47             │
├─────────────────────┼─────────────────────┤
│ AMKT                │ $89.66              │
├─────────────────────┼─────────────────────┤
│ AMLT                │ $0.003              │
├─────────────────────┼─────────────────────┤
│ AMM                 │ $0.002              │
├─────────────────────┼─────────────────────┤
│ AMO                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ AMON                │ $0.001              │
├─────────────────────┼─────────────────────┤
│ AMP                 │ $0.003              │
├─────────────────────┼─────────────────────┤
│ AMPL                │ $1.15               │
├─────────────────────┼─────────────────────┤
│ ANARCHY             │ $0.019              │
├─────────────────────┼─────────────────────┤
│ ANB                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ ANC                 │ $0.007              │
├─────────────────────┼─────────────────────┤
│ ANG                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ ANGEL               │ $0.003              │
├─────────────────────┼─────────────────────┤
│ ANGLE               │ $0.031              │
├─────────────────────┼─────────────────────┤
│ ANKR                │ $0.026              │
├─────────────────────┼─────────────────────┤
│ ANKRETH             │ $2,040.1            │
├─────────────────────┼─────────────────────┤
│ ANKRMATIC           │ $1.028              │
├─────────────────────┼─────────────────────┤
│ ANOM                │ $0                  │
├─────────────────────┼─────────────────────┤
│ ANONUSD             │ $0.999              │
├─────────────────────┼─────────────────────┤
│ ANRX                │ $0                  │
├─────────────────────┼─────────────────────┤
│ ANT                 │ $3.49               │
├─────────────────────┼─────────────────────┤
│ ANTE                │ $0.576              │
├─────────────────────┼─────────────────────┤
│ ANV                 │ $0.031              │
├─────────────────────┼─────────────────────┤
│ ANY                 │ $5.26               │
├─────────────────────┼─────────────────────┤
│ AOA                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ AOG                 │ $0.043              │
├─────────────────────┼─────────────────────┤
│ APCG                │ $0.015              │
├─────────────────────┼─────────────────────┤
│ APE                 │ $3.25               │
├─────────────────────┼─────────────────────┤
│ APED                │ $0.82               │
├─────────────────────┼─────────────────────┤
│ APEFI               │ $0.001              │
├─────────────────────┼─────────────────────┤
│ APEIN               │ $0.113              │
├─────────────────────┼─────────────────────┤
│ APEX                │ $0.328              │
├─────────────────────┼─────────────────────┤
│ API                 │ $0.002              │
├─────────────────────┼─────────────────────┤
│ API3                │ $1.21               │
├─────────────────────┼─────────────────────┤
│ APIX                │ $0.007              │
├─────────────────────┼─────────────────────┤
│ APM                 │ $0.011              │
├─────────────────────┼─────────────────────┤
│ APN                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ APOLLO              │ $0                  │
├─────────────────────┼─────────────────────┤
│ APPC                │ $0.001              │
├─────────────────────┼─────────────────────┤
│ APW                 │ $0.263              │
├─────────────────────┼─────────────────────┤
│ APY                 │ $0.005              │
├─────────────────────┼─────────────────────┤
│ APYS                │ $0.009              │
├─────────────────────┼─────────────────────┤
│ AQT                 │ $0.92               │
├─────────────────────┼─────────────────────┤
│ AQTIS               │ $0.001              │
├─────────────────────┼─────────────────────┤
│ ARA                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ ARAI                │ $2.78               │
├─────────────────────┼─────────────────────┤
│ ARB                 │ $1.18               │
├─────────────────────┼─────────────────────┤
│ ARC                 │ $0.005              │
├─────────────────────┼─────────────────────┤
│ ARCAI               │ $0.037              │
├─────────────────────┼─────────────────────┤
│ ARCH                │ $0.082              │
├─────────────────────┼─────────────────────┤
│ ARCHA               │ $0                  │
├─────────────────────┼─────────────────────┤
│ ARCONA              │ $0.115              │
├─────────────────────┼─────────────────────┤
│ ARDX                │ $0.008              │
├─────────────────────┼─────────────────────┤
│ AREN                │ $0.074              │
├─────────────────────┼─────────────────────┤
│ ARES                │ $0.001              │
├─────────────────────┼─────────────────────┤
│ ARGO                │ $0.006              │
├─────────────────────┼─────────────────────┤
│ ARIA20              │ $0.296              │
├─────────────────────┼─────────────────────┤
│ ARMOR               │ $0.005              │
├─────────────────────┼─────────────────────┤
│ ARNC                │ $0.004              │
├─────────────────────┼─────────────────────┤
│ ARNX                │ $0                  │
├─────────────────────┼─────────────────────┤
│ ARPA                │ $0.085              │
├─────────────────────┼─────────────────────┤
│ ARTE                │ $1.024              │
├─────────────────────┼─────────────────────┤
│ ARTEM               │ $0.001              │
├─────────────────────┼─────────────────────┤
│ ARTEQ               │ $0                  │
├─────────────────────┼─────────────────────┤
│ ARTH                │ $1.97               │
├─────────────────────┼─────────────────────┤
│ ARTI                │ $0.027              │
├─────────────────────┼─────────────────────┤
│ ARTIC               │ $0.028              │
├─────────────────────┼─────────────────────┤
│ ARTM                │ $0                  │
├─────────────────────┼─────────────────────┤
│ ARTX                │ $0.026              │
├─────────────────────┼─────────────────────┤
│ ARV                 │ $0.023              │
├─────────────────────┼─────────────────────┤
│ ARW                 │ $0.145              │
├─────────────────────┼─────────────────────┤
│ ARX                 │ $0.002              │
├─────────────────────┼─────────────────────┤
│ ASAN                │ $0                  │
├─────────────────────┼─────────────────────┤
│ ASD                 │ $0.07               │
├─────────────────────┼─────────────────────┤
│ ASH                 │ $1.094              │
├─────────────────────┼─────────────────────┤
│ ASIA                │ $0.112              │
├─────────────────────┼─────────────────────┤
│ ASIC                │ $0.028              │
├─────────────────────┼─────────────────────┤
│ ASKO                │ $0                  │
├─────────────────────┼─────────────────────┤
│ ASM                 │ $0.01               │
├─────────────────────┼─────────────────────┤
│ ASNX                │ $2.43               │
├─────────────────────┼─────────────────────┤
│ AST                 │ $0.128              │
├─────────────────────┼─────────────────────┤
│ ASTA                │ $0.003              │
├─────────────────────┼─────────────────────┤
│ ASTETH              │ $1,830.49           │
├─────────────────────┼─────────────────────┤
│ ASTO                │ $0.032              │
├─────────────────────┼─────────────────────┤
│ ASTRA               │ $0.073              │
├─────────────────────┼─────────────────────┤
│ ASTRAFER            │ $1.054              │
├─────────────────────┼─────────────────────┤
│ ASTRAL              │ $0                  │
├─────────────────────┼─────────────────────┤
│ ASTRO               │ $0.039              │
├─────────────────────┼─────────────────────┤
│ ASUSD               │ $1.003              │
├─────────────────────┼─────────────────────┤
│ ASW                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ ASX                 │ $0.34               │
├─────────────────────┼─────────────────────┤
│ ATA                 │ $0.124              │
├─────────────────────┼─────────────────────┤
│ ATC                 │ $0.01               │
├─────────────────────┼─────────────────────┤
│ ATD                 │ $0.075              │
├─────────────────────┼─────────────────────┤
│ ATF                 │ $0.115              │
├─────────────────────┼─────────────────────┤
│ ATH                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ ATNT                │ $0.003              │
├─────────────────────┼─────────────────────┤
│ ATOR                │ $0.173              │
├─────────────────────┼─────────────────────┤
│ ATRI                │ $0.002              │
├─────────────────────┼─────────────────────┤
│ ATT                 │ $0.002              │
├─────────────────────┼─────────────────────┤
│ ATUSD               │ $1.003              │
├─────────────────────┼─────────────────────┤
│ AUC                 │ $0.002              │
├─────────────────────┼─────────────────────┤
│ AUCTION             │ $4.82               │
├─────────────────────┼─────────────────────┤
│ AUDIO               │ $0.246              │
├─────────────────────┼─────────────────────┤
│ AUDT                │ $0.019              │
├─────────────────────┼─────────────────────┤
│ AUNI                │ $5.02               │
├─────────────────────┼─────────────────────┤
│ AUR                 │ $0.934              │
├─────────────────────┼─────────────────────┤
│ AURA                │ $1.75               │
├─────────────────────┼─────────────────────┤
│ AURABAL             │ $13.65              │
├─────────────────────┼─────────────────────┤
│ AURORA              │ $0.107              │
├─────────────────────┼─────────────────────┤
│ AUSDC               │ $1.003              │
├─────────────────────┼─────────────────────┤
│ AUSDT               │ $1.004              │
├─────────────────────┼─────────────────────┤
│ AUTH                │ $0.058              │
├─────────────────────┼─────────────────────┤
│ AUTO                │ $0.001              │
├─────────────────────┼─────────────────────┤
│ AUTUMN              │ $0.005              │
├─────────────────────┼─────────────────────┤
│ AVG                 │ $0.037              │
├─────────────────────┼─────────────────────┤
│ AVINOC              │ $0.488              │
├─────────────────────┼─────────────────────┤
│ AVT                 │ $1.04               │
├─────────────────────┼─────────────────────┤
│ AWBTC               │ $26,789             │
├─────────────────────┼─────────────────────┤
│ AWC                 │ $0.314              │
├─────────────────────┼─────────────────────┤
│ AWETH               │ $1,831.1            │
├─────────────────────┼─────────────────────┤
│ AWO                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ AWRT                │ $0                  │
├─────────────────────┼─────────────────────┤
│ AX                  │ $1.15               │
├─────────────────────┼─────────────────────┤
│ AXI                 │ $0.01               │
├─────────────────────┼─────────────────────┤
│ AXIAV3              │ $0.009              │
├─────────────────────┼─────────────────────┤
│ AXIS                │ $0.043              │
├─────────────────────┼─────────────────────┤
│ AXL                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ AXPR                │ $0                  │
├─────────────────────┼─────────────────────┤
│ AXS                 │ $7.01               │
├─────────────────────┼─────────────────────┤
│ AXSUSHI             │ $1.14               │
├─────────────────────┼─────────────────────┤
│ AYFI                │ $6,531.17           │
├─────────────────────┼─────────────────────┤
│ AZK                 │ $0.017              │
├─────────────────────┼─────────────────────┤
│ AZRX                │ $0.22               │
├─────────────────────┼─────────────────────┤
│ AZUKI               │ $0.006              │
├─────────────────────┼─────────────────────┤
│ AZUM                │ $0                  │
├─────────────────────┼─────────────────────┤
│ B-80BAL-20WETH      │ $13.79              │
├─────────────────────┼─────────────────────┤
│ B20                 │ $0.088              │
├─────────────────────┼─────────────────────┤
│ B2M                 │ $0.008              │
├─────────────────────┼─────────────────────┤
│ BAAS                │ $0.001              │
├─────────────────────┼─────────────────────┤
│ BABIL               │ $0.33               │
├─────────────────────┼─────────────────────┤
│ BABL                │ $0.009              │
├─────────────────────┼─────────────────────┤
│ BABY                │ $0.011              │
├─────────────────────┼─────────────────────┤
│ BABYDOGE            │ $0                  │
├─────────────────────┼─────────────────────┤
│ BABYFD              │ $0                  │
├─────────────────────┼─────────────────────┤
│ BABYFLOKI           │ $0                  │
├─────────────────────┼─────────────────────┤
│ BABYPEPE            │ $0                  │
├─────────────────────┼─────────────────────┤
│ BABYSAITAMA         │ $0                  │
├─────────────────────┼─────────────────────┤
│ BABYSHIBA           │ $0.001              │
├─────────────────────┼─────────────────────┤
│ BABYTRUMP           │ $0                  │
├─────────────────────┼─────────────────────┤
│ BAC                 │ $0.004              │
├─────────────────────┼─────────────────────┤
│ BACON               │ $0                  │
├─────────────────────┼─────────────────────┤
│ BADGER              │ $2.44               │
├─────────────────────┼─────────────────────┤
│ BAG                 │ $0.002              │
├─────────────────────┼─────────────────────┤
│ BAKED               │ $0.002              │
├─────────────────────┼─────────────────────┤
│ BAKT                │ $0.001              │
├─────────────────────┼─────────────────────┤
│ BAL                 │ $5.22               │
├─────────────────────┼─────────────────────┤
│ BALPHA              │ $28.1               │
├─────────────────────┼─────────────────────┤
│ BALTO               │ $0                  │
├─────────────────────┼─────────────────────┤
│ BAMBOO              │ $0.022              │
├─────────────────────┼─────────────────────┤
│ BAN                 │ $0.005              │
├─────────────────────┼─────────────────────┤
│ BANANA              │ $0.025              │
├─────────────────────┼─────────────────────┤
│ BANCA               │ $0                  │
├─────────────────────┼─────────────────────┤
│ BAND                │ $1.44               │
├─────────────────────┼─────────────────────┤
│ BANK                │ $1.1                │
├─────────────────────┼─────────────────────┤
│ BAO                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ BAOUSD              │ $1.007              │
├─────────────────────┼─────────────────────┤
│ BARK                │ $0                  │
├─────────────────────┼─────────────────────┤
│ BAS                 │ $0.16               │
├─────────────────────┼─────────────────────┤
│ BASAN               │ $0.001              │
├─────────────────────┼─────────────────────┤
│ BASE                │ $0.408              │
├─────────────────────┼─────────────────────┤
│ BASIC               │ $0                  │
├─────────────────────┼─────────────────────┤
│ BAT                 │ $0.22               │
├─────────────────────┼─────────────────────┤
│ BAX                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ BAXS                │ $3.34               │
├─────────────────────┼─────────────────────┤
│ BAYC                │ $71,919             │
├─────────────────────┼─────────────────────┤
│ BB-A-DAI            │ $1.005              │
├─────────────────────┼─────────────────────┤
│ BB-A-USDC           │ $1.003              │
├─────────────────────┼─────────────────────┤
│ BB-A-USDT           │ $1.009              │
├─────────────────────┼─────────────────────┤
│ BBADGER             │ $3.17               │
├─────────────────────┼─────────────────────┤
│ BBANK               │ $0.002              │
├─────────────────────┼─────────────────────┤
│ BBF                 │ $0.361              │
├─────────────────────┼─────────────────────┤
│ BBS                 │ $0.013              │
├─────────────────────┼─────────────────────┤
│ BBT                 │ $0.005              │
├─────────────────────┼─────────────────────┤
│ BBTC                │ $26,717             │
├─────────────────────┼─────────────────────┤
│ BBW                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ BC                  │ $0.008              │
├─────────────────────┼─────────────────────┤
│ BCB                 │ $0.007              │
├─────────────────────┼─────────────────────┤
│ BCDN                │ $0                  │
├─────────────────────┼─────────────────────┤
│ BCDT                │ $0.049              │
├─────────────────────┼─────────────────────┤
│ BCMC                │ $0.005              │
├─────────────────────┼─────────────────────┤
│ BCNT                │ $0.004              │
├─────────────────────┼─────────────────────┤
│ BCP                 │ $0.038              │
├─────────────────────┼─────────────────────┤
│ BCPT                │ $0.001              │
├─────────────────────┼─────────────────────┤
│ BCT                 │ $0.004              │
├─────────────────────┼─────────────────────┤
│ BCUBE               │ $0.098              │
├─────────────────────┼─────────────────────┤
│ BCUG                │ $0.083              │
├─────────────────────┼─────────────────────┤
│ BDOT                │ $4.79               │
├─────────────────────┼─────────────────────┤
│ BDP                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ BDS                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ BDT                 │ $2.62               │
├─────────────────────┼─────────────────────┤
│ BEAN                │ $0.91               │
├─────────────────────┼─────────────────────┤
│ BEAR                │ $0                  │
├─────────────────────┼─────────────────────┤
│ BECOIN              │ $0.002              │
├─────────────────────┼─────────────────────┤
│ BED                 │ $58.17              │
├─────────────────────┼─────────────────────┤
│ BEL                 │ $0.799              │
├─────────────────────┼─────────────────────┤
│ BEND                │ $0.006              │
├─────────────────────┼─────────────────────┤
│ BENT                │ $0.041              │
├─────────────────────┼─────────────────────┤
│ BEPRO               │ $0.001              │
├─────────────────────┼─────────────────────┤
│ BERRY               │ $0.001              │
├─────────────────────┼─────────────────────┤
│ BES                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ BEST                │ $0.406              │
├─────────────────────┼─────────────────────┤
│ BETA                │ $36.34              │
├─────────────────────┼─────────────────────┤
│ BETT                │ $0.004              │
├─────────────────────┼─────────────────────┤
│ BEZOGE              │ $0                  │
├─────────────────────┼─────────────────────┤
│ BF                  │ $0.001              │
├─────────────────────┼─────────────────────┤
│ BFC                 │ $0.051              │
├─────────────────────┼─────────────────────┤
│ BFLY                │ $0.02               │
├─────────────────────┼─────────────────────┤
│ BFT                 │ $0.004              │
├─────────────────────┼─────────────────────┤
│ BGAN                │ $237.53             │
├─────────────────────┼─────────────────────┤
│ BGB                 │ $0.453              │
├─────────────────────┼─────────────────────┤
│ BGC                 │ $0.021              │
├─────────────────────┼─────────────────────┤
│ BHIG                │ $0.031              │
├─────────────────────┼─────────────────────┤
│ BHNY                │ $1.98               │
├─────────────────────┼─────────────────────┤
│ BICO                │ $0.295              │
├─────────────────────┼─────────────────────┤
│ BID                 │ $0.123              │
├─────────────────────┼─────────────────────┤
│ BIFI                │ $0.006              │
├─────────────────────┼─────────────────────┤
│ BIGCAP              │ $0.001              │
├─────────────────────┼─────────────────────┤
│ BIGSB               │ $1.44               │
├─────────────────────┼─────────────────────┤
│ BIOS                │ $0.025              │
├─────────────────────┼─────────────────────┤
│ BIOT                │ $0.001              │
├─────────────────────┼─────────────────────┤
│ BIP                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ BIPS                │ $13.63              │
├─────────────────────┼─────────────────────┤
│ BIRD                │ $11.24              │
├─────────────────────┼─────────────────────┤
│ BISC                │ $0                  │
├─────────────────────┼─────────────────────┤
│ BIST                │ $0.023              │
├─────────────────────┼─────────────────────┤
│ BIT                 │ $0.516              │
├─────────────────────┼─────────────────────┤
│ BITANT              │ $0                  │
├─────────────────────┼─────────────────────┤
│ BITCCA              │ $0                  │
├─────────────────────┼─────────────────────┤
│ BITE                │ $0                  │
├─────────────────────┼─────────────────────┤
│ BITH                │ $0                  │
├─────────────────────┼─────────────────────┤
│ BITO                │ $0.055              │
├─────────────────────┼─────────────────────┤
│ BITT                │ $0.022              │
├─────────────────────┼─────────────────────┤
│ BIX                 │ $0.005              │
├─────────────────────┼─────────────────────┤
│ BIZZ                │ $0.002              │
├─────────────────────┼─────────────────────┤
│ BKC                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ BKING               │ $0                  │
├─────────────────────┼─────────────────────┤
│ BKK                 │ $0.195              │
├─────────────────────┼─────────────────────┤
│ BKR                 │ $0.03               │
├─────────────────────┼─────────────────────┤
│ BLACK               │ $0.003              │
├─────────────────────┼─────────────────────┤
│ BLANK               │ $0.075              │
├─────────────────────┼─────────────────────┤
│ BLAST               │ $0                  │
├─────────────────────┼─────────────────────┤
│ BLES                │ $0.005              │
├─────────────────────┼─────────────────────┤
│ BLEYD               │ $0                  │
├─────────────────────┼─────────────────────┤
│ BLID                │ $0.025              │
├─────────────────────┼─────────────────────┤
│ BLKC                │ $0.056              │
├─────────────────────┼─────────────────────┤
│ BLOCK-E             │ $0.045              │
├─────────────────────┼─────────────────────┤
│ BLOCKS              │ $0.001              │
├─────────────────────┼─────────────────────┤
│ BLOOD               │ $0.014              │
├─────────────────────┼─────────────────────┤
│ BLT                 │ $0.022              │
├─────────────────────┼─────────────────────┤
│ BLU                 │ $0.727              │
├─────────────────────┼─────────────────────┤
│ BLUESPARROW         │ $0.03               │
├─────────────────────┼─────────────────────┤
│ BLUR                │ $0.51               │
├─────────────────────┼─────────────────────┤
│ BLUSD               │ $1.2                │
├─────────────────────┼─────────────────────┤
│ BLUSGD              │ $0.75               │
├─────────────────────┼─────────────────────┤
│ BLXM                │ $0.16               │
├─────────────────────┼─────────────────────┤
│ BLY                 │ $0.004              │
├─────────────────────┼─────────────────────┤
│ BLZ                 │ $0.064              │
├─────────────────────┼─────────────────────┤
│ BLZN                │ $0.183              │
├─────────────────────┼─────────────────────┤
│ BMAX                │ $0.081              │
├─────────────────────┼─────────────────────┤
│ BMC                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ BMDA                │ $0.076              │
├─────────────────────┼─────────────────────┤
│ BMEX                │ $0.423              │
├─────────────────────┼─────────────────────┤
│ BMI                 │ $0.009              │
├─────────────────────┼─────────────────────┤
│ BMP                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ BMT                 │ $4.08               │
├─────────────────────┼─────────────────────┤
│ BMX                 │ $0.132              │
├─────────────────────┼─────────────────────┤
│ BNA                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ BNANA               │ $0.102              │
├─────────────────────┼─────────────────────┤
│ BNB                 │ $307.03             │
├─────────────────────┼─────────────────────┤
│ BNF                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ BNK                 │ $0.237              │
├─────────────────────┼─────────────────────┤
│ BNPL                │ $0                  │
├─────────────────────┼─────────────────────┤
│ BNS                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ BNSD                │ $0.001              │
├─────────────────────┼─────────────────────┤
│ BNT                 │ $0.416              │
├─────────────────────┼─────────────────────┤
│ BNTX                │ $0.06               │
├─────────────────────┼─────────────────────┤
│ BNTY                │ $0                  │
├─────────────────────┼─────────────────────┤
│ BNV                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ BOA                 │ $0.017              │
├─────────────────────┼─────────────────────┤
│ BOB                 │ $1                  │
├─────────────────────┼─────────────────────┤
│ BOBA                │ $0.169              │
├─────────────────────┼─────────────────────┤
│ BOBC                │ $0.864              │
├─────────────────────┼─────────────────────┤
│ BOBO                │ $0                  │
├─────────────────────┼─────────────────────┤
│ BOG                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ BOLLY               │ $0.01               │
├─────────────────────┼─────────────────────┤
│ BOLT                │ $0.004              │
├─────────────────────┼─────────────────────┤
│ BOMB                │ $0.093              │
├─────────────────────┼─────────────────────┤
│ BOND                │ $3.69               │
├─────────────────────┼─────────────────────┤
│ BONDLY              │ $0.006              │
├─────────────────────┼─────────────────────┤
│ BONE                │ $0.889              │
├─────────────────────┼─────────────────────┤
│ BONK                │ $0                  │
├─────────────────────┼─────────────────────┤
│ BOO                 │ $1.061              │
├─────────────────────┼─────────────────────┤
│ BOOP                │ $0.297              │
├─────────────────────┼─────────────────────┤
│ BOR                 │ $29.16              │
├─────────────────────┼─────────────────────┤
│ BORA                │ $0.155              │
├─────────────────────┼─────────────────────┤
│ BORING              │ $0.003              │
├─────────────────────┼─────────────────────┤
│ BOSON               │ $0.18               │
├─────────────────────┼─────────────────────┤
│ BOTTO               │ $0.166              │
├─────────────────────┼─────────────────────┤
│ BOTX                │ $0.002              │
├─────────────────────┼─────────────────────┤
│ BOWL                │ $0                  │
├─────────────────────┼─────────────────────┤
│ BOX                 │ $0.004              │
├─────────────────────┼─────────────────────┤
│ BOXA                │ $0                  │
├─────────────────────┼─────────────────────┤
│ BOXETH              │ $1,802.82           │
├─────────────────────┼─────────────────────┤
│ BOXFEE              │ $164.25             │
├─────────────────────┼─────────────────────┤
│ BP                  │ $0.001              │
├─────────────────────┼─────────────────────┤
│ BPEG                │ $0                  │
├─────────────────────┼─────────────────────┤
│ BPLC                │ $0                  │
├─────────────────────┼─────────────────────┤
│ BPRO                │ $0.89               │
├─────────────────────┼─────────────────────┤
│ BPT                 │ $0.255              │
├─────────────────────┼─────────────────────┤
│ BPTL                │ $0                  │
├─────────────────────┼─────────────────────┤
│ BRCP                │ $0.02               │
├─────────────────────┼─────────────────────┤
│ BRD                 │ $0.006              │
├─────────────────────┼─────────────────────┤
│ BREED               │ $0.027              │
├─────────────────────┼─────────────────────┤
│ BREWLABS            │ $0.005              │
├─────────────────────┼─────────────────────┤
│ BRG                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ BRIDGE              │ $0.001              │
├─────────────────────┼─────────────────────┤
│ BRIGHT              │ $0.037              │
├─────────────────────┼─────────────────────┤
│ BRKL                │ $0.013              │
├─────────────────────┼─────────────────────┤
│ BRMV                │ $0.1                │
├─────────────────────┼─────────────────────┤
│ BRT                 │ $3.45               │
├─────────────────────┼─────────────────────┤
│ BRTR                │ $0.003              │
├─────────────────────┼─────────────────────┤
│ BRWL                │ $0.002              │
├─────────────────────┼─────────────────────┤
│ BRZ                 │ $0.191              │
├─────────────────────┼─────────────────────┤
│ BSCGIRL             │ $0.001              │
├─────────────────────┼─────────────────────┤
│ BSGG                │ $0.001              │
├─────────────────────┼─────────────────────┤
│ BSI                 │ $0.227              │
├─────────────────────┼─────────────────────┤
│ BSL                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ BSP                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ BSPT                │ $0.001              │
├─────────────────────┼─────────────────────┤
│ BST                 │ $0.269              │
├─────────────────────┼─────────────────────┤
│ BSY                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ BT                  │ $0.166              │
├─────────────────────┼─────────────────────┤
│ BTB                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ BTBS                │ $0.149              │
├─────────────────────┼─────────────────────┤
│ BTC2X-FLI           │ $6.52               │
├─────────────────────┼─────────────────────┤
│ BTCBR               │ $0                  │
├─────────────────────┼─────────────────────┤
│ BTCM                │ $0.001              │
├─────────────────────┼─────────────────────┤
│ BTCP                │ $54.52              │
├─────────────────────┼─────────────────────┤
│ BTCPX               │ $26,772             │
├─────────────────────┼─────────────────────┤
│ BTCRED              │ $0.001              │
├─────────────────────┼─────────────────────┤
│ BTE                 │ $0.005              │
├─────────────────────┼─────────────────────┤
│ BTFA                │ $0                  │
├─────────────────────┼─────────────────────┤
│ BTL                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ BTO                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ BTR                 │ $0.021              │
├─────────────────────┼─────────────────────┤
│ BTRFLY              │ $190.53             │
├─────────────────────┼─────────────────────┤
│ BTRST               │ $0.774              │
├─────────────────────┼─────────────────────┤
│ BTSE                │ $2.02               │
├─────────────────────┼─────────────────────┤
│ BTSG                │ $0.02               │
├─────────────────────┼─────────────────────┤
│ BTT                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ BTTY                │ $0                  │
├─────────────────────┼─────────────────────┤
│ BTU                 │ $0.137              │
├─────────────────────┼─────────────────────┤
│ BTZ                 │ $0.027              │
├─────────────────────┼─────────────────────┤
│ BUH                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ BUIDL               │ $0.001              │
├─────────────────────┼─────────────────────┤
│ BUILD               │ $0                  │
├─────────────────────┼─────────────────────┤
│ BULK                │ $0.003              │
├─────────────────────┼─────────────────────┤
│ BULL                │ $0                  │
├─────────────────────┼─────────────────────┤
│ BUMBLEC             │ $0                  │
├─────────────────────┼─────────────────────┤
│ BUMP                │ $0.063              │
├─────────────────────┼─────────────────────┤
│ BUP                 │ $0.01               │
├─────────────────────┼─────────────────────┤
│ BURP                │ $0.001              │
├─────────────────────┼─────────────────────┤
│ BUSD                │ $1                  │
├─────────────────────┼─────────────────────┤
│ BUSY                │ $0.001              │
├─────────────────────┼─────────────────────┤
│ BUY                 │ $0.022              │
├─────────────────────┼─────────────────────┤
│ BWT                 │ $0.006              │
├─────────────────────┼─────────────────────┤
│ BXB                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ BXR                 │ $0.009              │
├─────────────────────┼─────────────────────┤
│ BXX                 │ $0.014              │
├─────────────────────┼─────────────────────┤
│ BYN                 │ $0.006              │
├─────────────────────┼─────────────────────┤
│ BYTES               │ $3.86               │
├─────────────────────┼─────────────────────┤
│ BYTZ                │ $0                  │
├─────────────────────┼─────────────────────┤
│ BZN                 │ $0.139              │
├─────────────────────┼─────────────────────┤
│ BZR                 │ $1.098              │
├─────────────────────┼─────────────────────┤
│ BZRX                │ $0.03               │
├─────────────────────┼─────────────────────┤
│ BZZ                 │ $0.383              │
├─────────────────────┼─────────────────────┤
│ C98                 │ $0.193              │
├─────────────────────┼─────────────────────┤
│ CAAVE               │ $1.35               │
├─────────────────────┼─────────────────────┤
│ CADC                │ $0.722              │
├─────────────────────┼─────────────────────┤
│ CAG                 │ $0.015              │
├─────────────────────┼─────────────────────┤
│ CAH                 │ $0.554              │
├─────────────────────┼─────────────────────┤
│ CAI                 │ $0.009              │
├─────────────────────┼─────────────────────┤
│ CAJ                 │ $0.824              │
├─────────────────────┼─────────────────────┤
│ CAKE                │ $1.55               │
├─────────────────────┼─────────────────────┤
│ CALI                │ $0.015              │
├─────────────────────┼─────────────────────┤
│ CAMP                │ $0                  │
├─────────────────────┼─────────────────────┤
│ CAP                 │ $155.14             │
├─────────────────────┼─────────────────────┤
│ CAPP                │ $0                  │
├─────────────────────┼─────────────────────┤
│ CAPS                │ $0.018              │
├─────────────────────┼─────────────────────┤
│ CARD                │ $0.002              │
├─────────────────────┼─────────────────────┤
│ CARDS               │ $0.126              │
├─────────────────────┼─────────────────────┤
│ CARE                │ $0                  │
├─────────────────────┼─────────────────────┤
│ CARR                │ $0                  │
├─────────────────────┼─────────────────────┤
│ CART                │ $0.009              │
├─────────────────────┼─────────────────────┤
│ CAST                │ $0.108              │
├─────────────────────┼─────────────────────┤
│ CASTLE              │ $0                  │
├─────────────────────┼─────────────────────┤
│ CAT                 │ $0.054              │
├─────────────────────┼─────────────────────┤
│ CATAI               │ $0                  │
├─────────────────────┼─────────────────────┤
│ CATE                │ $0                  │
├─────────────────────┼─────────────────────┤
│ CATT                │ $0                  │
├─────────────────────┼─────────────────────┤
│ CAVA                │ $0                  │
├─────────────────────┼─────────────────────┤
│ CAW                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ CBANK               │ $0                  │
├─────────────────────┼─────────────────────┤
│ CBAT                │ $0.005              │
├─────────────────────┼─────────────────────┤
│ CBC                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ CBETH               │ $1,899.62           │
├─────────────────────┼─────────────────────┤
│ CBG                 │ $1.22               │
├─────────────────────┼─────────────────────┤
│ CBK                 │ $0.561              │
├─────────────────────┼─────────────────────┤
│ CBM                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ CBT                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ CBX                 │ $0.024              │
├─────────────────────┼─────────────────────┤
│ CCBCH               │ $179.1              │
├─────────────────────┼─────────────────────┤
│ CCO                 │ $0.007              │
├─────────────────────┼─────────────────────┤
│ CCOMP               │ $2.21               │
├─────────────────────┼─────────────────────┤
│ CCP                 │ $0.024              │
├─────────────────────┼─────────────────────┤
│ CCS                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ CCT                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ CCV2                │ $0.546              │
├─────────────────────┼─────────────────────┤
│ CCX                 │ $0.012              │
├─────────────────────┼─────────────────────┤
│ CDAI                │ $0.022              │
├─────────────────────┼─────────────────────┤
│ CDP                 │ $1,830.68           │
├─────────────────────┼─────────────────────┤
│ CDS                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ CDT                 │ $0.241              │
├─────────────────────┼─────────────────────┤
│ CE                  │ $0.296              │
├─────────────────────┼─────────────────────┤
│ CEEK                │ $0.07               │
├─────────────────────┼─────────────────────┤
│ CEJI                │ $0.004              │
├─────────────────────┼─────────────────────┤
│ CEL                 │ $0.221              │
├─────────────────────┼─────────────────────┤
│ CELL                │ $0.205              │
├─────────────────────┼─────────────────────┤
│ CELR                │ $0.02               │
├─────────────────────┼─────────────────────┤
│ CELT                │ $0                  │
├─────────────────────┼─────────────────────┤
│ CENNZ               │ $0.007              │
├─────────────────────┼─────────────────────┤
│ CENT                │ $0.001              │
├─────────────────────┼─────────────────────┤
│ CERE                │ $0.004              │
├─────────────────────┼─────────────────────┤
│ CERES               │ $21.65              │
├─────────────────────┼─────────────────────┤
│ CET                 │ $0.035              │
├─────────────────────┼─────────────────────┤
│ CETH                │ $36.7               │
├─────────────────────┼─────────────────────┤
│ CFI                 │ $0.344              │
├─────────────────────┼─────────────────────┤
│ CFL365              │ $0                  │
├─────────────────────┼─────────────────────┤
│ CFXQ                │ $0.003              │
├─────────────────────┼─────────────────────┤
│ CFXT                │ $0.001              │
├─────────────────────┼─────────────────────┤
│ CGG                 │ $0.081              │
├─────────────────────┼─────────────────────┤
│ CGT                 │ $46.36              │
├─────────────────────┼─────────────────────┤
│ CGU                 │ $0.02               │
├─────────────────────┼─────────────────────┤
│ CHAD                │ $0                  │
├─────────────────────┼─────────────────────┤
│ CHAIN               │ $0.016              │
├─────────────────────┼─────────────────────┤
│ CHAMP               │ $0.051              │
├─────────────────────┼─────────────────────┤
│ CHANGE              │ $0.01               │
├─────────────────────┼─────────────────────┤
│ CHART               │ $0.002              │
├─────────────────────┼─────────────────────┤
│ CHAT                │ $0                  │
├─────────────────────┼─────────────────────┤
│ CHB                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ CHEDDA              │ $0                  │
├─────────────────────┼─────────────────────┤
│ CHEQ                │ $0.055              │
├─────────────────────┼─────────────────────┤
│ CHER                │ $0.007              │
├─────────────────────┼─────────────────────┤
│ CHEW                │ $0                  │
├─────────────────────┼─────────────────────┤
│ CHEX                │ $0.007              │
├─────────────────────┼─────────────────────┤
│ CHFT                │ $0.384              │
├─────────────────────┼─────────────────────┤
│ CHI                 │ $0.052              │
├─────────────────────┼─────────────────────┤
│ CHIP                │ $0                  │
├─────────────────────┼─────────────────────┤
│ CHIRO               │ $0                  │
├─────────────────────┼─────────────────────┤
│ CHLT                │ $0.01               │
├─────────────────────┼─────────────────────┤
│ CHO                 │ $0.205              │
├─────────────────────┼─────────────────────┤
│ CHONK               │ $1.7                │
├─────────────────────┼─────────────────────┤
│ CHOO                │ $0.013              │
├─────────────────────┼─────────────────────┤
│ CHP                 │ $0.101              │
├─────────────────────┼─────────────────────┤
│ CHR                 │ $0.151              │
├─────────────────────┼─────────────────────┤
│ CHS                 │ $0.07               │
├─────────────────────┼─────────────────────┤
│ CHSB                │ $0.132              │
├─────────────────────┼─────────────────────┤
│ CHX                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ CHZ                 │ $0.101              │
├─────────────────────┼─────────────────────┤
│ CIA                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ CIG                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ CIMO                │ $0                  │
├─────────────────────┼─────────────────────┤
│ CIND                │ $0.001              │
├─────────────────────┼─────────────────────┤
│ CINO                │ $0                  │
├─────────────────────┼─────────────────────┤
│ CINU                │ $0                  │
├─────────────────────┼─────────────────────┤
│ CIRUS               │ $0.03               │
├─────────────────────┼─────────────────────┤
│ CITADEL             │ $0                  │
├─────────────────────┼─────────────────────┤
│ CIV                 │ $0.03               │
├─────────────────────┼─────────────────────┤
│ CIX                 │ $0.014              │
├─────────────────────┼─────────────────────┤
│ CIX100              │ $0.007              │
├─────────────────────┼─────────────────────┤
│ CKU                 │ $0.03               │
├─────────────────────┼─────────────────────┤
│ CLAW                │ $0                  │
├─────────────────────┼─────────────────────┤
│ CLB                 │ $0.192              │
├─────────────────────┼─────────────────────┤
│ CLEV                │ $10.51              │
├─────────────────────┼─────────────────────┤
│ CLH                 │ $0.004              │
├─────────────────────┼─────────────────────┤
│ CLINK               │ $0.13               │
├─────────────────────┼─────────────────────┤
│ CLIQ                │ $0.001              │
├─────────────────────┼─────────────────────┤
│ CLM                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ CLNY                │ $0.031              │
├─────────────────────┼─────────────────────┤
│ CLS                 │ $0.045              │
├─────────────────────┼─────────────────────┤
│ CLT                 │ $3.5                │
├─────────────────────┼─────────────────────┤
│ CLV                 │ $0.048              │
├─────────────────────┼─────────────────────┤
│ CMCX                │ $0.001              │
├─────────────────────┼─────────────────────┤
│ CMKR                │ $12.78              │
├─────────────────────┼─────────────────────┤
│ CMOS                │ $0                  │
├─────────────────────┼─────────────────────┤
│ CMS                 │ $0.105              │
├─────────────────────┼─────────────────────┤
│ CMT                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ CNB                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ CNC                 │ $4.73               │
├─────────────────────┼─────────────────────┤
│ CND                 │ $0.002              │
├─────────────────────┼─────────────────────┤
│ CNFI                │ $0.05               │
├─────────────────────┼─────────────────────┤
│ CNG                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ CNHT                │ $0.143              │
├─────────────────────┼─────────────────────┤
│ CNNS                │ $0                  │
├─────────────────────┼─────────────────────┤
│ CNT                 │ $0.003              │
├─────────────────────┼─────────────────────┤
│ CNTM                │ $0.001              │
├─────────────────────┼─────────────────────┤
│ CNTR                │ $0                  │
├─────────────────────┼─────────────────────┤
│ CNV                 │ $5.75               │
├─────────────────────┼─────────────────────┤
│ CNW                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ COC                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ COCOS               │ $1.61               │
├─────────────────────┼─────────────────────┤
│ CODE                │ $0.143              │
├─────────────────────┼─────────────────────┤
│ COFI                │ $0.019              │
├─────────────────────┼─────────────────────┤
│ COGE                │ $0                  │
├─────────────────────┼─────────────────────┤
│ COIL                │ $2.07               │
├─────────────────────┼─────────────────────┤
│ COIN                │ $0.048              │
├─────────────────────┼─────────────────────┤
│ COLI                │ $0.001              │
├─────────────────────┼─────────────────────┤
│ COLL                │ $0.013              │
├─────────────────────┼─────────────────────┤
│ COLLAR              │ $0                  │
├─────────────────────┼─────────────────────┤
│ COLLIE              │ $0                  │
├─────────────────────┼─────────────────────┤
│ COLR                │ $0.009              │
├─────────────────────┼─────────────────────┤
│ COM                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ COMBO               │ $0.049              │
├─────────────────────┼─────────────────────┤
│ COMFI               │ $0.011              │
├─────────────────────┼─────────────────────┤
│ COMP                │ $35.12              │
├─────────────────────┼─────────────────────┤
│ CON                 │ $0.034              │
├─────────────────────┼─────────────────────┤
│ CONI                │ $0.031              │
├─────────────────────┼─────────────────────┤
│ CONV                │ $0.001              │
├─────────────────────┼─────────────────────┤
│ COOK                │ $0                  │
├─────────────────────┼─────────────────────┤
│ COOL                │ $2,566.87           │
├─────────────────────┼─────────────────────┤
│ COPE                │ $0                  │
├─────────────────────┼─────────────────────┤
│ COPI                │ $0.035              │
├─────────────────────┼─────────────────────┤
│ COR                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ CORD                │ $0.001              │
├─────────────────────┼─────────────────────┤
│ CORE                │ $5,504.42           │
├─────────────────────┼─────────────────────┤
│ COREDAO             │ $1.043              │
├─────────────────────┼─────────────────────┤
│ CORN                │ $0.034              │
├─────────────────────┼─────────────────────┤
│ CORX                │ $0                  │
├─────────────────────┼─────────────────────┤
│ COSHI               │ $0                  │
├─────────────────────┼─────────────────────┤
│ COT                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ COTI                │ $0.068              │
├─────────────────────┼─────────────────────┤
│ COV                 │ $0.146              │
├─────────────────────┼─────────────────────┤
│ COVA                │ $0                  │
├─────────────────────┼─────────────────────┤
│ COVAL               │ $0.009              │
├─────────────────────┼─────────────────────┤
│ COVER               │ $19.01              │
├─────────────────────┼─────────────────────┤
│ COVN                │ $0.393              │
├─────────────────────┼─────────────────────┤
│ COW                 │ $0.164              │
├─────────────────────┼─────────────────────┤
│ CP                  │ $0                  │
├─────────────────────┼─────────────────────┤
│ CPAY                │ $0                  │
├─────────────────────┼─────────────────────┤
│ CPC                 │ $0.002              │
├─────────────────────┼─────────────────────┤
│ CPD                 │ $0.016              │
├─────────────────────┼─────────────────────┤
│ CPOOL               │ $0.028              │
├─────────────────────┼─────────────────────┤
│ CPRX                │ $0.002              │
├─────────────────────┼─────────────────────┤
│ CPT                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ CPTINU              │ $0                  │
├─────────────────────┼─────────────────────┤
│ CPU                 │ $0.007              │
├─────────────────────┼─────────────────────┤
│ CQT                 │ $0.12               │
├─────────────────────┼─────────────────────┤
│ CRAB                │ $0                  │
├─────────────────────┼─────────────────────┤
│ CRAMER              │ $0.001              │
├─────────────────────┼─────────────────────┤
│ CRB                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ CRBN                │ $0.014              │
├─────────────────────┼─────────────────────┤
│ CRDC                │ $0.001              │
├─────────────────────┼─────────────────────┤
│ CRE                 │ $0.004              │
├─────────────────────┼─────────────────────┤
│ CRE8                │ $0.012              │
├─────────────────────┼─────────────────────┤
│ CRE8R               │ $0.002              │
├─────────────────────┼─────────────────────┤
│ CREAM               │ $24.54              │
├─────────────────────┼─────────────────────┤
│ CREDI               │ $0.004              │
├─────────────────────┼─────────────────────┤
│ CREDIT              │ $0.007              │
├─────────────────────┼─────────────────────┤
│ CREDS               │ $0.012              │
├─────────────────────┼─────────────────────┤
│ CREMAT              │ $0                  │
├─────────────────────┼─────────────────────┤
│ CRETH2              │ $0.325              │
├─────────────────────┼─────────────────────┤
│ CRF                 │ $0.002              │
├─────────────────────┼─────────────────────┤
│ CRFI                │ $0.007              │
├─────────────────────┼─────────────────────┤
│ CRI                 │ $0.355              │
├─────────────────────┼─────────────────────┤
│ CRNO                │ $0                  │
├─────────────────────┼─────────────────────┤
│ CRO                 │ $0.06               │
├─────────────────────┼─────────────────────┤
│ CRPT                │ $0.064              │
├─────────────────────┼─────────────────────┤
│ CRT                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ CRTS                │ $0                  │
├─────────────────────┼─────────────────────┤
│ CRU                 │ $0.827              │
├─────────────────────┼─────────────────────┤
│ CRV                 │ $0.856              │
├─────────────────────┼─────────────────────┤
│ CRVFRAX             │ $0.999              │
├─────────────────────┼─────────────────────┤
│ CRVRENWSBTC         │ $27,352             │
├─────────────────────┼─────────────────────┤
│ CRYN                │ $16,092.61          │
├─────────────────────┼─────────────────────┤
│ CSM                 │ $0.008              │
├─────────────────────┼─────────────────────┤
│ CSMATIC             │ $0.953              │
├─────────────────────┼─────────────────────┤
│ CSR                 │ $0.005              │
├─────────────────────┼─────────────────────┤
│ CSUSHI              │ $0.017              │
├─────────────────────┼─────────────────────┤
│ CSWAP               │ $0.006              │
├─────────────────────┼─────────────────────┤
│ CSX                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ CTASK               │ $0.079              │
├─────────────────────┼─────────────────────┤
│ CTC                 │ $0.309              │
├─────────────────────┼─────────────────────┤
│ CTCN                │ $0.057              │
├─────────────────────┼─────────────────────┤
│ CTI                 │ $0.028              │
├─────────────────────┼─────────────────────┤
│ CTK                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ CTPL                │ $0.007              │
├─────────────────────┼─────────────────────┤
│ CTR                 │ $0.987              │
├─────────────────────┼─────────────────────┤
│ CTSI                │ $0.173              │
├─────────────────────┼─────────────────────┤
│ CTX                 │ $1.35               │
├─────────────────────┼─────────────────────┤
│ CUBE                │ $1.15               │
├─────────────────────┼─────────────────────┤
│ CUBT                │ $0                  │
├─────────────────────┼─────────────────────┤
│ CUDOS               │ $0.002              │
├─────────────────────┼─────────────────────┤
│ CULT                │ $0                  │
├─────────────────────┼─────────────────────┤
│ CUMINU              │ $0.001              │
├─────────────────────┼─────────────────────┤
│ CUNI                │ $0.103              │
├─────────────────────┼─────────────────────┤
│ CUP                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ CUSD                │ $0.999              │
├─────────────────────┼─────────────────────┤
│ CUSDC               │ $0.023              │
├─────────────────────┼─────────────────────┤
│ CUSDT               │ $0.012              │
├─────────────────────┼─────────────────────┤
│ CUT                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ CV                  │ $0                  │
├─────────────────────┼─────────────────────┤
│ CVA                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ CVAG                │ $0                  │
├─────────────────────┼─────────────────────┤
│ CVC                 │ $0.087              │
├─────────────────────┼─────────────────────┤
│ CVNT                │ $0.828              │
├─────────────────────┼─────────────────────┤
│ CVNX                │ $0.005              │
├─────────────────────┼─────────────────────┤
│ CVP                 │ $0.382              │
├─────────────────────┼─────────────────────┤
│ CVR                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ CVT                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ CVX                 │ $4.5                │
├─────────────────────┼─────────────────────┤
│ CVXCRV              │ $0.808              │
├─────────────────────┼─────────────────────┤
│ CVXFPIS             │ $2.27               │
├─────────────────────┼─────────────────────┤
│ CVXFXS              │ $6.61               │
├─────────────────────┼─────────────────────┤
│ CW                  │ $0.002              │
├─────────────────────┼─────────────────────┤
│ CWAP                │ $0.01               │
├─────────────────────┼─────────────────────┤
│ CWBTC               │ $538.25             │
├─────────────────────┼─────────────────────┤
│ CWD                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ CWEB                │ $0.029              │
├─────────────────────┼─────────────────────┤
│ CWS                 │ $0.287              │
├─────────────────────┼─────────────────────┤
│ CWT                 │ $2.01               │
├─────────────────────┼─────────────────────┤
│ CXD                 │ $0.014              │
├─────────────────────┼─────────────────────┤
│ CXO                 │ $0.157              │
├─────────────────────┼─────────────────────┤
│ CYC                 │ $17.13              │
├─────────────────────┼─────────────────────┤
│ CYCE                │ $0.557              │
├─────────────────────┼─────────────────────┤
│ CYCLUB              │ $0                  │
├─────────────────────┼─────────────────────┤
│ CYFI                │ $133.24             │
├─────────────────────┼─────────────────────┤
│ CYFM                │ $0                  │
├─────────────────────┼─────────────────────┤
│ CYL                 │ $0.002              │
├─────────────────────┼─────────────────────┤
│ CYMI                │ $0.851              │
├─────────────────────┼─────────────────────┤
│ CYOP                │ $0                  │
├─────────────────────┼─────────────────────┤
│ CZRX                │ $0.005              │
├─────────────────────┼─────────────────────┤
│ D11                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ D2D                 │ $0.025              │
├─────────────────────┼─────────────────────┤
│ D2O                 │ $1.003              │
├─────────────────────┼─────────────────────┤
│ D2T                 │ $0.011              │
├─────────────────────┼─────────────────────┤
│ DACT                │ $0                  │
├─────────────────────┼─────────────────────┤
│ DACXI               │ $0.002              │
├─────────────────────┼─────────────────────┤
│ DAD                 │ $0.017              │
├─────────────────────┼─────────────────────┤
│ DAF                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ DAFI                │ $0.011              │
├─────────────────────┼─────────────────────┤
│ DAI                 │ $1                  │
├─────────────────────┼─────────────────────┤
│ DAIN                │ $0.001              │
├─────────────────────┼─────────────────────┤
│ DAISY               │ $0.471              │
├─────────────────────┼─────────────────────┤
│ DALC                │ $0.005              │
├─────────────────────┼─────────────────────┤
│ DAM                 │ $0.043              │
├─────────────────────┼─────────────────────┤
│ DAMA                │ $0.004              │
├─────────────────────┼─────────────────────┤
│ DAMEX               │ $0.16               │
├─────────────────────┼─────────────────────┤
│ DAMM                │ $0.176              │
├─────────────────────┼─────────────────────┤
│ DAO                 │ $1.28               │
├─────────────────────┼─────────────────────┤
│ DAOVC               │ $0.007              │
├─────────────────────┼─────────────────────┤
│ DAPP                │ $0                  │
├─────────────────────┼─────────────────────┤
│ DAPPT               │ $0                  │
├─────────────────────┼─────────────────────┤
│ DAPPX               │ $0.002              │
├─────────────────────┼─────────────────────┤
│ DAR                 │ $0.136              │
├─────────────────────┼─────────────────────┤
│ DARUMA              │ $0                  │
├─────────────────────┼─────────────────────┤
│ DATA                │ $0.028              │
├─────────────────────┼─────────────────────┤
│ DAV                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ DAWGS               │ $0                  │
├─────────────────────┼─────────────────────┤
│ DAWN                │ $0.564              │
├─────────────────────┼─────────────────────┤
│ DAX                 │ $0.004              │
├─────────────────────┼─────────────────────┤
│ DBD                 │ $0.008              │
├─────────────────────┼─────────────────────┤
│ DBET                │ $0.003              │
├─────────────────────┼─────────────────────┤
│ DBI                 │ $0.003              │
├─────────────────────┼─────────────────────┤
│ DBNB                │ $0.001              │
├─────────────────────┼─────────────────────┤
│ DBOMB               │ $0.002              │
├─────────────────────┼─────────────────────┤
│ DBOX                │ $0                  │
├─────────────────────┼─────────────────────┤
│ DBR                 │ $0.076              │
├─────────────────────┼─────────────────────┤
│ DBUY                │ $0.004              │
├─────────────────────┼─────────────────────┤
│ DBX                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ DC                  │ $0.001              │
├─────────────────────┼─────────────────────┤
│ DCHF                │ $1.14               │
├─────────────────────┼─────────────────────┤
│ DCN                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ DCNT                │ $0.068              │
├─────────────────────┼─────────────────────┤
│ DDD                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ DDDD                │ $0                  │
├─────────────────────┼─────────────────────┤
│ DDIM                │ $1.94               │
├─────────────────────┼─────────────────────┤
│ DDOS                │ $0.037              │
├─────────────────────┼─────────────────────┤
│ DDRT                │ $0                  │
├─────────────────────┼─────────────────────┤
│ DDX                 │ $0.318              │
├─────────────────────┼─────────────────────┤
│ DEB                 │ $0.004              │
├─────────────────────┼─────────────────────┤
│ DEC                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ DECI                │ $0.01               │
├─────────────────────┼─────────────────────┤
│ DED                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ DEFI++              │ $0.878              │
├─────────────────────┼─────────────────────┤
│ DEFIDO              │ $0.001              │
├─────────────────────┼─────────────────────┤
│ DEFO                │ $30.43              │
├─────────────────────┼─────────────────────┤
│ DEFX                │ $0.011              │
├─────────────────────┼─────────────────────┤
│ DEFY                │ $0.004              │
├─────────────────────┼─────────────────────┤
│ DEGAI               │ $0                  │
├─────────────────────┼─────────────────────┤
│ DEGEN               │ $0                  │
├─────────────────────┼─────────────────────┤
│ DEGO                │ $1.84               │
├─────────────────────┼─────────────────────┤
│ DELREY              │ $0.021              │
├─────────────────────┼─────────────────────┤
│ DELTA               │ $1.089              │
├─────────────────────┼─────────────────────┤
│ DENA                │ $0.245              │
├─────────────────────┼─────────────────────┤
│ DENT                │ $0.001              │
├─────────────────────┼─────────────────────┤
│ DEO                 │ $0.054              │
├─────────────────────┼─────────────────────┤
│ DEP                 │ $0.002              │
├─────────────────────┼─────────────────────┤
│ DEPAY               │ $0.226              │
├─────────────────────┼─────────────────────┤
│ DERC                │ $0.149              │
├─────────────────────┼─────────────────────┤
│ DERI                │ $0.014              │
├─────────────────────┼─────────────────────┤
│ DES                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ DETO                │ $0.037              │
├─────────────────────┼─────────────────────┤
│ DEUS                │ $39.47              │
├─────────────────────┼─────────────────────┤
│ DEV                 │ $0.158              │
├─────────────────────┼─────────────────────┤
│ DEVT                │ $0.003              │
├─────────────────────┼─────────────────────┤
│ DEXE                │ $2.5                │
├─────────────────────┼─────────────────────┤
│ DEXT                │ $0.563              │
├─────────────────────┼─────────────────────┤
│ DEXTF               │ $0.048              │
├─────────────────────┼─────────────────────┤
│ DF                  │ $0.048              │
├─────────────────────┼─────────────────────┤
│ DFA                 │ $0.028              │
├─────────────────────┼─────────────────────┤
│ DFCH                │ $0.027              │
├─────────────────────┼─────────────────────┤
│ DFD                 │ $0.002              │
├─────────────────────┼─────────────────────┤
│ DFE                 │ $11.16              │
├─────────────────────┼─────────────────────┤
│ DFGL                │ $0                  │
├─────────────────────┼─────────────────────┤
│ DFI                 │ $0.35               │
├─────────────────────┼─────────────────────┤
│ DFIAT               │ $0.002              │
├─────────────────────┼─────────────────────┤
│ DFL                 │ $0.002              │
├─────────────────────┼─────────────────────┤
│ DFND                │ $0                  │
├─────────────────────┼─────────────────────┤
│ DFP2                │ $0.034              │
├─────────────────────┼─────────────────────┤
│ DFT                 │ $0.035              │
├─────────────────────┼─────────────────────┤
│ DFX                 │ $0.068              │
├─────────────────────┼─────────────────────┤
│ DFYN                │ $0.036              │
├─────────────────────┼─────────────────────┤
│ DG                  │ $0.025              │
├─────────────────────┼─────────────────────┤
│ DGD                 │ $219.71             │
├─────────────────────┼─────────────────────┤
│ DGMV                │ $0.007              │
├─────────────────────┼─────────────────────┤
│ DGP                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ DGRN                │ $0.002              │
├─────────────────────┼─────────────────────┤
│ DGTV                │ $0.011              │
├─────────────────────┼─────────────────────┤
│ DGTX                │ $0                  │
├─────────────────────┼─────────────────────┤
│ DGVC                │ $0.056              │
├─────────────────────┼─────────────────────┤
│ DGX                 │ $43.44              │
├─────────────────────┼─────────────────────┤
│ DHN                 │ $0.01               │
├─────────────────────┼─────────────────────┤
│ DHP                 │ $0.003              │
├─────────────────────┼─────────────────────┤
│ DHT                 │ $0.133              │
├─────────────────────┼─────────────────────┤
│ DHV                 │ $0.057              │
├─────────────────────┼─────────────────────┤
│ DIA                 │ $0.668              │
├─────────────────────┼─────────────────────┤
│ DIE                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ DIGG                │ $2,718.57           │
├─────────────────────┼─────────────────────┤
│ DIGI                │ $0.004              │
├─────────────────────┼─────────────────────┤
│ DIGITS              │ $0.007              │
├─────────────────────┼─────────────────────┤
│ DILI                │ $0                  │
├─────────────────────┼─────────────────────┤
│ DIMO                │ $0.185              │
├─────────────────────┼─────────────────────┤
│ DINERO              │ $0                  │
├─────────────────────┼─────────────────────┤
│ DINGER              │ $0                  │
├─────────────────────┼─────────────────────┤
│ DINGO               │ $0                  │
├─────────────────────┼─────────────────────┤
│ DINO                │ $0.037              │
├─────────────────────┼─────────────────────┤
│ DINU                │ $0                  │
├─────────────────────┼─────────────────────┤
│ DIONE               │ $0.002              │
├─────────────────────┼─────────────────────┤
│ DIP                 │ $0.018              │
├─────────────────────┼─────────────────────┤
│ DIS                 │ $3.22               │
├─────────────────────┼─────────────────────┤
│ DIVER               │ $0.009              │
├─────────────────────┼─────────────────────┤
│ DIVI                │ $0.005              │
├─────────────────────┼─────────────────────┤
│ DKA                 │ $0.031              │
├─────────────────────┼─────────────────────┤
│ DKUMA               │ $0                  │
├─────────────────────┼─────────────────────┤
│ DKYC                │ $0.018              │
├─────────────────────┼─────────────────────┤
│ DLT                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ DLTA                │ $0.006              │
├─────────────────────┼─────────────────────┤
│ DMG                 │ $0.002              │
├─────────────────────┼─────────────────────┤
│ DMOD                │ $0.004              │
├─────────────────────┼─────────────────────┤
│ DMR                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ DMT                 │ $0.008              │
├─────────────────────┼─────────────────────┤
│ DMTR                │ $0.043              │
├─────────────────────┼─────────────────────┤
│ DMX                 │ $0.004              │
├─────────────────────┼─────────────────────┤
│ DNA                 │ $0.01               │
├─────────────────────┼─────────────────────┤
│ DNC                 │ $0.228              │
├─────────────────────┼─────────────────────┤
│ DNS                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ DNT                 │ $0.027              │
├─────────────────────┼─────────────────────┤
│ DNXC                │ $0.006              │
├─────────────────────┼─────────────────────┤
│ DOBE                │ $0                  │
├─────────────────────┼─────────────────────┤
│ DODI                │ $0                  │
├─────────────────────┼─────────────────────┤
│ DODO                │ $0.131              │
├─────────────────────┼─────────────────────┤
│ DOE                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ DOG                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ DOGEGF              │ $0                  │
├─────────────────────┼─────────────────────┤
│ DOGENS              │ $0.177              │
├─────────────────────┼─────────────────────┤
│ DOGEP               │ $0                  │
├─────────────────────┼─────────────────────┤
│ DOGES               │ $2.28               │
├─────────────────────┼─────────────────────┤
│ DOGEZ               │ $0                  │
├─────────────────────┼─────────────────────┤
│ DOGGER              │ $0                  │
├─────────────────────┼─────────────────────┤
│ DOGIRA              │ $0.001              │
├─────────────────────┼─────────────────────┤
│ DOGPAD              │ $0                  │
├─────────────────────┼─────────────────────┤
│ DOGS                │ $0                  │
├─────────────────────┼─────────────────────┤
│ DOGTIC              │ $0                  │
├─────────────────────┼─────────────────────┤
│ DOGU                │ $0                  │
├─────────────────────┼─────────────────────┤
│ DOGY                │ $0                  │
├─────────────────────┼─────────────────────┤
│ DOGZ                │ $0                  │
├─────────────────────┼─────────────────────┤
│ DOJO                │ $0                  │
├─────────────────────┼─────────────────────┤
│ DOKE                │ $0                  │
├─────────────────────┼─────────────────────┤
│ DOKI                │ $0.001              │
├─────────────────────┼─────────────────────┤
│ DOLA                │ $0.995              │
├─────────────────────┼─────────────────────┤
│ DOMI                │ $0.005              │
├─────────────────────┼─────────────────────┤
│ DON                 │ $0.007              │
├─────────────────────┼─────────────────────┤
│ DONUT               │ $0.001              │
├─────────────────────┼─────────────────────┤
│ DOOMER              │ $0                  │
├─────────────────────┼─────────────────────┤
│ DOP                 │ $0.619              │
├─────────────────────┼─────────────────────┤
│ DORA                │ $2.49               │
├─────────────────────┼─────────────────────┤
│ DOS                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ DOSE                │ $0.004              │
├─────────────────────┼─────────────────────┤
│ DOTR                │ $0.001              │
├─────────────────────┼─────────────────────┤
│ DOUGH               │ $0.051              │
├─────────────────────┼─────────────────────┤
│ DOV                 │ $0.007              │
├─────────────────────┼─────────────────────┤
│ DOWS                │ $0.006              │
├─────────────────────┼─────────────────────┤
│ DPAY                │ $0.003              │
├─────────────────────┼─────────────────────┤
│ DPET                │ $0.031              │
├─────────────────────┼─────────────────────┤
│ DPI                 │ $65.39              │
├─────────────────────┼─────────────────────┤
│ DPR                 │ $0.007              │
├─────────────────────┼─────────────────────┤
│ DPX                 │ $150.13             │
├─────────────────────┼─────────────────────┤
│ DPY                 │ $0.003              │
├─────────────────────┼─────────────────────┤
│ DRC                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ DRCT                │ $0.001              │
├─────────────────────┼─────────────────────┤
│ DRE                 │ $0.068              │
├─────────────────────┼─────────────────────┤
│ DREAM               │ $0.049              │
├─────────────────────┼─────────────────────┤
│ DREP                │ $0.351              │
├─────────────────────┼─────────────────────┤
│ DRGN                │ $0.006              │
├─────────────────────┼─────────────────────┤
│ DRM                 │ $0.006              │
├─────────────────────┼─────────────────────┤
│ DRT                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ DS                  │ $0                  │
├─────────────────────┼─────────────────────┤
│ DSD                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ DSETH               │ $1,856.85           │
├─────────────────────┼─────────────────────┤
│ DSLA                │ $0.002              │
├─────────────────────┼─────────────────────┤
│ DSP                 │ $0.025              │
├─────────────────────┼─────────────────────┤
│ DSS                 │ $0.02               │
├─────────────────────┼─────────────────────┤
│ DST                 │ $0.018              │
├─────────────────────┼─────────────────────┤
│ DTA                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ DTH                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ DTO                 │ $0.006              │
├─────────────────────┼─────────────────────┤
│ DTUBE               │ $0.043              │
├─────────────────────┼─────────────────────┤
│ DTX                 │ $0.008              │
├─────────────────────┼─────────────────────┤
│ DUBBZ               │ $0.178              │
├─────────────────────┼─────────────────────┤
│ DUCK                │ $0.006              │
├─────────────────────┼─────────────────────┤
│ DUCKER              │ $0.003              │
├─────────────────────┼─────────────────────┤
│ DUCKYAI             │ $0                  │
├─────────────────────┼─────────────────────┤
│ DUSK                │ $0.148              │
├─────────────────────┼─────────────────────┤
│ DV                  │ $0.001              │
├─────────────────────┼─────────────────────┤
│ DVC                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ DVF                 │ $0.751              │
├─────────────────────┼─────────────────────┤
│ DVI                 │ $0.013              │
├─────────────────────┼─────────────────────┤
│ DVP                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ DVPN                │ $0.001              │
├─────────────────────┼─────────────────────┤
│ DWAGON              │ $0                  │
├─────────────────────┼─────────────────────┤
│ DWEB                │ $0.082              │
├─────────────────────┼─────────────────────┤
│ DX                  │ $0                  │
├─────────────────────┼─────────────────────┤
│ DXC                 │ $0.122              │
├─────────────────────┼─────────────────────┤
│ DXD                 │ $751.11             │
├─────────────────────┼─────────────────────┤
│ DXF                 │ $0.014              │
├─────────────────────┼─────────────────────┤
│ DXGM                │ $0.008              │
├─────────────────────┼─────────────────────┤
│ DXN                 │ $13.53              │
├─────────────────────┼─────────────────────┤
│ DXP                 │ $2.51               │
├─────────────────────┼─────────────────────┤
│ DXY                 │ $2.72               │
├─────────────────────┼─────────────────────┤
│ DYDX                │ $2.05               │
├─────────────────────┼─────────────────────┤
│ DYNMT               │ $0.002              │
├─────────────────────┼─────────────────────┤
│ DYP                 │ $0.189              │
├─────────────────────┼─────────────────────┤
│ DZAR                │ $0.06               │
├─────────────────────┼─────────────────────┤
│ DZOO                │ $0.014              │
├─────────────────────┼─────────────────────┤
│ EAC                 │ $0.004              │
├─────────────────────┼─────────────────────┤
│ EAGON               │ $0                  │
├─────────────────────┼─────────────────────┤
│ EARN                │ $0                  │
├─────────────────────┼─────────────────────┤
│ EASE                │ $0.004              │
├─────────────────────┼─────────────────────┤
│ EBOX                │ $0.005              │
├─────────────────────┼─────────────────────┤
│ EBSO                │ $0.017              │
├─────────────────────┼─────────────────────┤
│ EC                  │ $0                  │
├─────────────────────┼─────────────────────┤
│ ECASH               │ $0.001              │
├─────────────────────┼─────────────────────┤
│ ECC                 │ $0.011              │
├─────────────────────┼─────────────────────┤
│ ECELL               │ $0.002              │
├─────────────────────┼─────────────────────┤
│ ECO                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ ECOP                │ $0.001              │
├─────────────────────┼─────────────────────┤
│ ECOREAL             │ $0.156              │
├─────────────────────┼─────────────────────┤
│ ECOX                │ $0.388              │
├─────────────────────┼─────────────────────┤
│ ECT                 │ $0.004              │
├─────────────────────┼─────────────────────┤
│ ECTE                │ $0.072              │
├─────────────────────┼─────────────────────┤
│ ECTR                │ $0.005              │
├─────────────────────┼─────────────────────┤
│ ECU                 │ $0.002              │
├─────────────────────┼─────────────────────┤
│ EDC                 │ $0.056              │
├─────────────────────┼─────────────────────┤
│ EDDA                │ $81.79              │
├─────────────────────┼─────────────────────┤
│ EDEN                │ $0.04               │
├─────────────────────┼─────────────────────┤
│ EDG                 │ $0.011              │
├─────────────────────┼─────────────────────┤
│ EDGE                │ $0.095              │
├─────────────────────┼─────────────────────┤
│ EDR                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ EFI                 │ $0.061              │
├─────────────────────┼─────────────────────┤
│ EGAME               │ $0                  │
├─────────────────────┼─────────────────────┤
│ EGC                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ EGG                 │ $2.37               │
├─────────────────────┼─────────────────────┤
│ EGGS                │ $0                  │
├─────────────────────┼─────────────────────┤
│ EGS                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ EGT                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ EHASH               │ $0.026              │
├─────────────────────┼─────────────────────┤
│ EHIVE               │ $0                  │
├─────────────────────┼─────────────────────┤
│ EJS                 │ $0.005              │
├─────────────────────┼─────────────────────┤
│ EKO                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ EKTA                │ $0.017              │
├─────────────────────┼─────────────────────┤
│ EL                  │ $0.002              │
├─────────────────────┼─────────────────────┤
│ ELA                 │ $1.82               │
├─────────────────────┼─────────────────────┤
│ ELAN                │ $4.13               │
├─────────────────────┼─────────────────────┤
│ ELAND               │ $0.01               │
├─────────────────────┼─────────────────────┤
│ ELEC                │ $0.001              │
├─────────────────────┼─────────────────────┤
│ ELEV                │ $0                  │
├─────────────────────┼─────────────────────┤
│ ELF                 │ $0.285              │
├─────────────────────┼─────────────────────┤
│ ELFI                │ $0.012              │
├─────────────────────┼─────────────────────┤
│ ELG                 │ $2.86               │
├─────────────────────┼─────────────────────┤
│ ELK                 │ $0.137              │
├─────────────────────┼─────────────────────┤
│ ELON                │ $0                  │
├─────────────────────┼─────────────────────┤
│ ELONGD              │ $0                  │
├─────────────────────┼─────────────────────┤
│ ELONONE             │ $0                  │
├─────────────────────┼─────────────────────┤
│ ELT                 │ $0.024              │
├─────────────────────┼─────────────────────┤
│ ELTCOIN             │ $0                  │
├─────────────────────┼─────────────────────┤
│ EM                  │ $0.001              │
├─────────────────────┼─────────────────────┤
│ EMAID               │ $0.167              │
├─────────────────────┼─────────────────────┤
│ EMAX                │ $0                  │
├─────────────────────┼─────────────────────┤
│ EMON                │ $0.004              │
├─────────────────────┼─────────────────────┤
│ EMP                 │ $0.053              │
├─────────────────────┼─────────────────────┤
│ EMPIRE              │ $1.44               │
├─────────────────────┼─────────────────────┤
│ EMS                 │ $0.118              │
├─────────────────────┼─────────────────────┤
│ EMT                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ EMTRG               │ $2.39               │
├─────────────────────┼─────────────────────┤
│ ENG                 │ $0.01               │
├─────────────────────┼─────────────────────┤
│ ENJ                 │ $0.338              │
├─────────────────────┼─────────────────────┤
│ ENS                 │ $10.46              │
├─────────────────────┼─────────────────────┤
│ ENT                 │ $5.07               │
├─────────────────────┼─────────────────────┤
│ ENTC                │ $5.05               │
├─────────────────────┼─────────────────────┤
│ ENTR                │ $0.01               │
├─────────────────────┼─────────────────────┤
│ ENV                 │ $0.002              │
├─────────────────────┼─────────────────────┤
│ ENXS                │ $0                  │
├─────────────────────┼─────────────────────┤
│ EOSDAC              │ $0                  │
├─────────────────────┼─────────────────────┤
│ EPAN                │ $0.007              │
├─────────────────────┼─────────────────────┤
│ EPHIAT              │ $0.162              │
├─────────────────────┼─────────────────────┤
│ EPIK                │ $0.005              │
├─────────────────────┼─────────────────────┤
│ EPK                 │ $0.01               │
├─────────────────────┼─────────────────────┤
│ EQUAD               │ $0.013              │
├─────────────────────┼─────────────────────┤
│ EQX                 │ $0.006              │
├─────────────────────┼─────────────────────┤
│ EQZ                 │ $0.019              │
├─────────────────────┼─────────────────────┤
│ ERN                 │ $1.86               │
├─────────────────────┼─────────────────────┤
│ EROWAN              │ $0                  │
├─────────────────────┼─────────────────────┤
│ ERSDL               │ $0.002              │
├─────────────────────┼─────────────────────┤
│ ES                  │ $0.007              │
├─────────────────────┼─────────────────────┤
│ ESG                 │ $0.529              │
├─────────────────────┼─────────────────────┤
│ ESGC                │ $0.013              │
├─────────────────────┼─────────────────────┤
│ ESPRO               │ $0.026              │
├─────────────────────┼─────────────────────┤
│ ESS                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ EST                 │ $0.041              │
├─────────────────────┼─────────────────────┤
│ ETH                 │ $1,830.68           │
├─────────────────────┼─────────────────────┤
│ ETH20               │ $0                  │
├─────────────────────┼─────────────────────┤
│ ETH2X-FLI           │ $11.91              │
├─────────────────────┼─────────────────────┤
│ ETHA                │ $0.016              │
├─────────────────────┼─────────────────────┤
│ ETHER               │ $0                  │
├─────────────────────┼─────────────────────┤
│ ETHIX               │ $0.243              │
├─────────────────────┼─────────────────────┤
│ ETHM                │ $0                  │
├─────────────────────┼─────────────────────┤
│ ETHMAXY             │ $1,952.16           │
├─────────────────────┼─────────────────────┤
│ ETHO                │ $0.006              │
├─────────────────────┼─────────────────────┤
│ ETHPAD              │ $0.004              │
├─────────────────────┼─────────────────────┤
│ ETHV                │ $102.97             │
├─────────────────────┼─────────────────────┤
│ ETHY                │ $2.06               │
├─────────────────────┼─────────────────────┤
│ EUBC                │ $0.001              │
├─────────────────────┼─────────────────────┤
│ EUL                 │ $1.9                │
├─────────────────────┼─────────────────────┤
│ EUM                 │ $0.678              │
├─────────────────────┼─────────────────────┤
│ EURE                │ $1.071              │
├─────────────────────┼─────────────────────┤
│ EUROC               │ $1.074              │
├─────────────────────┼─────────────────────┤
│ EUROE               │ $1.078              │
├─────────────────────┼─────────────────────┤
│ EURS                │ $1.073              │
├─────────────────────┼─────────────────────┤
│ EURT                │ $1.074              │
├─────────────────────┼─────────────────────┤
│ EUSD                │ $0.998              │
├─────────────────────┼─────────────────────┤
│ EVA                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ EVC                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ EVCOIN              │ $0                  │
├─────────────────────┼─────────────────────┤
│ EVEAI               │ $0.035              │
├─────────────────────┼─────────────────────┤
│ EVED                │ $0.009              │
├─────────────────────┼─────────────────────┤
│ EVER                │ $0.043              │
├─────────────────────┼─────────────────────┤
│ EVMOS               │ $0.149              │
├─────────────────────┼─────────────────────┤
│ EVN                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ EVOAI               │ $0.006              │
├─────────────────────┼─────────────────────┤
│ EVRY                │ $0.007              │
├─────────────────────┼─────────────────────┤
│ EVX                 │ $0.011              │
├─────────────────────┼─────────────────────┤
│ EVY                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ EVZ                 │ $0.01               │
├─────────────────────┼─────────────────────┤
│ EWC                 │ $0.068              │
├─────────────────────┼─────────────────────┤
│ EWW                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ EXD                 │ $0.138              │
├─────────────────────┼─────────────────────┤
│ EXE                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ EXM                 │ $0.013              │
├─────────────────────┼─────────────────────┤
│ EXN                 │ $0.11               │
├─────────────────────┼─────────────────────┤
│ EXP                 │ $0.007              │
├─────────────────────┼─────────────────────┤
│ EXRD                │ $0.065              │
├─────────────────────┼─────────────────────┤
│ EXRN                │ $0                  │
├─────────────────────┼─────────────────────┤
│ EXRT                │ $0                  │
├─────────────────────┼─────────────────────┤
│ EYE                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ EYES                │ $0.001              │
├─────────────────────┼─────────────────────┤
│ EZ                  │ $0.057              │
├─────────────────────┼─────────────────────┤
│ EZY                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ F9                  │ $0.004              │
├─────────────────────┼─────────────────────┤
│ FABRIC              │ $0.001              │
├─────────────────────┼─────────────────────┤
│ FACTR               │ $0.046              │
├─────────────────────┼─────────────────────┤
│ FAI                 │ $0.099              │
├─────────────────────┼─────────────────────┤
│ FAKT                │ $0.013              │
├─────────────────────┼─────────────────────┤
│ FAME                │ $0.002              │
├─────────────────────┼─────────────────────┤
│ FANC                │ $0.037              │
├─────────────────────┼─────────────────────┤
│ FANS                │ $0.026              │
├─────────────────────┼─────────────────────┤
│ FAR                 │ $0.006              │
├─────────────────────┼─────────────────────┤
│ FARM                │ $27.38              │
├─────────────────────┼─────────────────────┤
│ FB                  │ $1.11               │
├─────────────────────┼─────────────────────┤
│ FBX                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ FCC                 │ $0.079              │
├─────────────────────┼─────────────────────┤
│ FCL                 │ $0.033              │
├─────────────────────┼─────────────────────┤
│ FCP                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ FCT                 │ $0.054              │
├─────────────────────┼─────────────────────┤
│ FDT                 │ $0.005              │
├─────────────────────┼─────────────────────┤
│ FDZ                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ FEAR                │ $0.109              │
├─────────────────────┼─────────────────────┤
│ FEG                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ FEI                 │ $0.793              │
├─────────────────────┼─────────────────────┤
│ FEN                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ FER                 │ $0.021              │
├─────────────────────┼─────────────────────┤
│ FET                 │ $0.257              │
├─────────────────────┼─────────────────────┤
│ FETCH               │ $0                  │
├─────────────────────┼─────────────────────┤
│ FEVR                │ $0.001              │
├─────────────────────┼─────────────────────┤
│ FEY                 │ $0.005              │
├─────────────────────┼─────────────────────┤
│ FF                  │ $0.126              │
├─────────────────────┼─────────────────────┤
│ FFRAX               │ $0.957              │
├─────────────────────┼─────────────────────┤
│ FGHT                │ $0.007              │
├─────────────────────┼─────────────────────┤
│ FIDU                │ $0.939              │
├─────────────────────┼─────────────────────┤
│ FIEF                │ $0.162              │
├─────────────────────┼─────────────────────┤
│ FIFTY               │ $0                  │
├─────────────────────┼─────────────────────┤
│ FIN                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ FINT                │ $0.005              │
├─────────────────────┼─────────────────────┤
│ FINU                │ $0.001              │
├─────────────────────┼─────────────────────┤
│ FIRE                │ $0.003              │
├─────────────────────┼─────────────────────┤
│ FIS                 │ $0.347              │
├─────────────────────┼─────────────────────┤
│ FIT                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ FIWT                │ $0.1                │
├─────────────────────┼─────────────────────┤
│ FKPEPE              │ $0                  │
├─────────────────────┼─────────────────────┤
│ FKX                 │ $0.014              │
├─────────────────────┼─────────────────────┤
│ FLAG                │ $0.797              │
├─────────────────────┼─────────────────────┤
│ FLASH               │ $0.001              │
├─────────────────────┼─────────────────────┤
│ FLC                 │ $0.005              │
├─────────────────────┼─────────────────────┤
│ FLETA               │ $0.017              │
├─────────────────────┼─────────────────────┤
│ FLEX                │ $0                  │
├─────────────────────┼─────────────────────┤
│ FLEXUSD             │ $0.219              │
├─────────────────────┼─────────────────────┤
│ FLIKS               │ $0                  │
├─────────────────────┼─────────────────────┤
│ FLOKI               │ $0                  │
├─────────────────────┼─────────────────────┤
│ FLONA               │ $0                  │
├─────────────────────┼─────────────────────┤
│ FLOOR               │ $3.96               │
├─────────────────────┼─────────────────────┤
│ FLOT                │ $0.001              │
├─────────────────────┼─────────────────────┤
│ FLP                 │ $0.008              │
├─────────────────────┼─────────────────────┤
│ FLUFFY              │ $0.027              │
├─────────────────────┼─────────────────────┤
│ FLURRY              │ $0                  │
├─────────────────────┼─────────────────────┤
│ FLUT                │ $0                  │
├─────────────────────┼─────────────────────┤
│ FLUX                │ $0.011              │
├─────────────────────┼─────────────────────┤
│ FLX                 │ $0.033              │
├─────────────────────┼─────────────────────┤
│ FLY                 │ $0.016              │
├─────────────────────┼─────────────────────┤
│ FLZ                 │ $2.38               │
├─────────────────────┼─────────────────────┤
│ FMT                 │ $0.018              │
├─────────────────────┼─────────────────────┤
│ FNB                 │ $0.768              │
├─────────────────────┼─────────────────────┤
│ FNC                 │ $0.002              │
├─────────────────────┼─────────────────────┤
│ FNCT                │ $0.001              │
├─────────────────────┼─────────────────────┤
│ FND                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ FNF                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ FNK                 │ $0.412              │
├─────────────────────┼─────────────────────┤
│ FNT                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ FOAM                │ $0.008              │
├─────────────────────┼─────────────────────┤
│ FODL                │ $0.003              │
├─────────────────────┼─────────────────────┤
│ FOHO                │ $0.014              │
├─────────────────────┼─────────────────────┤
│ FOL                 │ $0.006              │
├─────────────────────┼─────────────────────┤
│ FOLD                │ $15.66              │
├─────────────────────┼─────────────────────┤
│ FOLO                │ $0.002              │
├─────────────────────┼─────────────────────┤
│ FONT                │ $0.134              │
├─────────────────────┼─────────────────────┤
│ FOR                 │ $0.02               │
├─────────────────────┼─────────────────────┤
│ FOREX               │ $0.011              │
├─────────────────────┼─────────────────────┤
│ FORM                │ $0.001              │
├─────────────────────┼─────────────────────┤
│ FORT                │ $0.191              │
├─────────────────────┼─────────────────────┤
│ FORTH               │ $2.83               │
├─────────────────────┼─────────────────────┤
│ FORTUNE             │ $0                  │
├─────────────────────┼─────────────────────┤
│ FOUR                │ $0.001              │
├─────────────────────┼─────────────────────┤
│ FOX                 │ $0.024              │
├─────────────────────┼─────────────────────┤
│ FOXT                │ $0.001              │
├─────────────────────┼─────────────────────┤
│ FOY                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ FPI                 │ $1.075              │
├─────────────────────┼─────────────────────┤
│ FPIS                │ $2.28               │
├─────────────────────┼─────────────────────┤
│ FR                  │ $0                  │
├─────────────────────┼─────────────────────┤
│ FRANK               │ $0                  │
├─────────────────────┼─────────────────────┤
│ FRAX                │ $1                  │
├─────────────────────┼─────────────────────┤
│ FREE                │ $0                  │
├─────────────────────┼─────────────────────┤
│ FREL                │ $0                  │
├─────────────────────┼─────────────────────┤
│ FREN                │ $0                  │
├─────────────────────┼─────────────────────┤
│ FREQAI              │ $0                  │
├─────────────────────┼─────────────────────┤
│ FRIN                │ $0.002              │
├─────────────────────┼─────────────────────┤
│ FRM                 │ $0.034              │
├─────────────────────┼─────────────────────┤
│ FROG                │ $0.045              │
├─────────────────────┼─────────────────────┤
│ FROGEX              │ $0                  │
├─────────────────────┼─────────────────────┤
│ FRONT               │ $0.175              │
├─────────────────────┼─────────────────────┤
│ FRR                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ FRXETH              │ $1,829.96           │
├─────────────────────┼─────────────────────┤
│ FRZ                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ FSC                 │ $1.96               │
├─────────────────────┼─────────────────────┤
│ FSCC                │ $1.28               │
├─────────────────────┼─────────────────────┤
│ FSN                 │ $0.324              │
├─────────────────────┼─────────────────────┤
│ FST                 │ $0.044              │
├─────────────────────┼─────────────────────┤
│ FSW                 │ $0.009              │
├─────────────────────┼─────────────────────┤
│ FT                  │ $4.15               │
├─────────────────────┼─────────────────────┤
│ FTG                 │ $0.002              │
├─────────────────────┼─────────────────────┤
│ FTI                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ FTN                 │ $0.856              │
├─────────────────────┼─────────────────────┤
│ FTRB                │ $0.006              │
├─────────────────────┼─────────────────────┤
│ FTT                 │ $1.01               │
├─────────────────────┼─────────────────────┤
│ FTX                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ FUC                 │ $2.1                │
├─────────────────────┼─────────────────────┤
│ FUEL                │ $0                  │
├─────────────────────┼─────────────────────┤
│ FUN                 │ $0.005              │
├─────────────────────┼─────────────────────┤
│ FUND                │ $0.02               │
├─────────────────────┼─────────────────────┤
│ FUNEX               │ $0.07               │
├─────────────────────┼─────────────────────┤
│ FUSDC               │ $1                  │
├─────────────────────┼─────────────────────┤
│ FUSE                │ $0.066              │
├─────────────────────┼─────────────────────┤
│ FUTURE-AI           │ $0.002              │
├─────────────────────┼─────────────────────┤
│ FUZE                │ $7.41               │
├─────────────────────┼─────────────────────┤
│ FVT                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ FWB                 │ $4.52               │
├─────────────────────┼─────────────────────┤
│ FWT                 │ $0.002              │
├─────────────────────┼─────────────────────┤
│ FX                  │ $0.167              │
├─────────────────────┼─────────────────────┤
│ FX1                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ FXF                 │ $0.003              │
├─────────────────────┼─────────────────────┤
│ FXS                 │ $6.97               │
├─────────────────────┼─────────────────────┤
│ FXUSD               │ $0.982              │
├─────────────────────┼─────────────────────┤
│ FYP                 │ $0.023              │
├─────────────────────┼─────────────────────┤
│ FYT                 │ $0.772              │
├─────────────────────┼─────────────────────┤
│ FYZ                 │ $0.002              │
├─────────────────────┼─────────────────────┤
│ G                   │ $0.004              │
├─────────────────────┼─────────────────────┤
│ GAI                 │ $0.147              │
├─────────────────────┼─────────────────────┤
│ GAINS               │ $0.101              │
├─────────────────────┼─────────────────────┤
│ GAJ                 │ $0.004              │
├─────────────────────┼─────────────────────┤
│ GAL                 │ $1.35               │
├─────────────────────┼─────────────────────┤
│ GAME                │ $0.036              │
├─────────────────────┼─────────────────────┤
│ GAMMA               │ $0.201              │
├─────────────────────┼─────────────────────┤
│ GAS                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ GATE                │ $0.009              │
├─────────────────────┼─────────────────────┤
│ GAZE                │ $0                  │
├─────────────────────┼─────────────────────┤
│ GBPT                │ $1.24               │
├─────────────────────┼─────────────────────┤
│ GBYTE               │ $11.39              │
├─────────────────────┼─────────────────────┤
│ GCAKE               │ $0                  │
├─────────────────────┼─────────────────────┤
│ GCR                 │ $0.405              │
├─────────────────────┼─────────────────────┤
│ GDAO                │ $0.068              │
├─────────────────────┼─────────────────────┤
│ GDC                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ GDG                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ GDO                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ GDR                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ GDT                 │ $0.009              │
├─────────────────────┼─────────────────────┤
│ GEAR                │ $0.001              │
├─────────────────────┼─────────────────────┤
│ GEC                 │ $0.108              │
├─────────────────────┼─────────────────────┤
│ GEEQ                │ $0.069              │
├─────────────────────┼─────────────────────┤
│ GEL                 │ $0.299              │
├─────────────────────┼─────────────────────┤
│ GEM                 │ $0.007              │
├─────────────────────┼─────────────────────┤
│ GEMX                │ $0.002              │
├─────────────────────┼─────────────────────┤
│ GEN                 │ $0.007              │
├─────────────────────┼─────────────────────┤
│ GENE                │ $0.005              │
├─────────────────────┼─────────────────────┤
│ GENI                │ $0                  │
├─────────────────────┼─────────────────────┤
│ GENSLR              │ $0                  │
├─────────────────────┼─────────────────────┤
│ GEO                 │ $0.002              │
├─────────────────────┼─────────────────────┤
│ GERA                │ $0.005              │
├─────────────────────┼─────────────────────┤
│ GET                 │ $1.27               │
├─────────────────────┼─────────────────────┤
│ GETH                │ $0.121              │
├─────────────────────┼─────────────────────┤
│ GF                  │ $0.075              │
├─────────────────────┼─────────────────────┤
│ GFARM2              │ $4,739.85           │
├─────────────────────┼─────────────────────┤
│ GFI                 │ $0.405              │
├─────────────────────┼─────────────────────┤
│ GFX                 │ $0.038              │
├─────────────────────┼─────────────────────┤
│ GGTK                │ $0.026              │
├─────────────────────┼─────────────────────┤
│ GHD                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ GHOUL               │ $0                  │
├─────────────────────┼─────────────────────┤
│ GHST                │ $0.972              │
├─────────────────────┼─────────────────────┤
│ GHT                 │ $36.95              │
├─────────────────────┼─────────────────────┤
│ GHX                 │ $0.006              │
├─────────────────────┼─────────────────────┤
│ GIGA                │ $0                  │
├─────────────────────┼─────────────────────┤
│ GINU                │ $0                  │
├─────────────────────┼─────────────────────┤
│ GIV                 │ $0.011              │
├─────────────────────┼─────────────────────┤
│ GIX                 │ $0.002              │
├─────────────────────┼─────────────────────┤
│ GLCH                │ $0.072              │
├─────────────────────┼─────────────────────┤
│ GLDN                │ $0.501              │
├─────────────────────┼─────────────────────┤
│ GLDX                │ $0.16               │
├─────────────────────┼─────────────────────┤
│ GLM                 │ $0.208              │
├─────────────────────┼─────────────────────┤
│ GLO                 │ $506.89             │
├─────────────────────┼─────────────────────┤
│ GLQ                 │ $0.006              │
├─────────────────────┼─────────────────────┤
│ GLR                 │ $0.463              │
├─────────────────────┼─────────────────────┤
│ GM                  │ $0.015              │
├─────────────────────┼─────────────────────┤
│ GMAT                │ $0                  │
├─────────────────────┼─────────────────────┤
│ GMEE                │ $0.01               │
├─────────────────────┼─────────────────────┤
│ GMI                 │ $13.23              │
├─────────────────────┼─────────────────────┤
│ GMM                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ GMR                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ GMT                 │ $0.267              │
├─────────────────────┼─────────────────────┤
│ GN                  │ $0                  │
├─────────────────────┼─────────────────────┤
│ GNFT                │ $2.81               │
├─────────────────────┼─────────────────────┤
│ GNO                 │ $114.08             │
├─────────────────────┼─────────────────────┤
│ GNX                 │ $0.002              │
├─────────────────────┼─────────────────────┤
│ GNY                 │ $0.022              │
├─────────────────────┼─────────────────────┤
│ GOB                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ GODS                │ $0.162              │
├─────────────────────┼─────────────────────┤
│ GOF                 │ $0.021              │
├─────────────────────┼─────────────────────┤
│ GOG                 │ $0.039              │
├─────────────────────┼─────────────────────┤
│ GOGO                │ $53.42              │
├─────────────────────┼─────────────────────┤
│ GOHM                │ $2,845.03           │
├─────────────────────┼─────────────────────┤
│ GOKU                │ $0                  │
├─────────────────────┼─────────────────────┤
│ GOL                 │ $0.023              │
├─────────────────────┼─────────────────────┤
│ GOLC                │ $0.195              │
├─────────────────────┼─────────────────────┤
│ GOLD                │ $0.012              │
├─────────────────────┼─────────────────────┤
│ GOLD1               │ $0                  │
├─────────────────────┼─────────────────────┤
│ GOM2                │ $0.004              │
├─────────────────────┼─────────────────────┤
│ GOTG                │ $0.056              │
├─────────────────────┼─────────────────────┤
│ GOV                 │ $0.005              │
├─────────────────────┼─────────────────────┤
│ GOVI                │ $0.318              │
├─────────────────────┼─────────────────────┤
│ GPOOL               │ $0                  │
├─────────────────────┼─────────────────────┤
│ GPT                 │ $0.018              │
├─────────────────────┼─────────────────────┤
│ GPX                 │ $0.272              │
├─────────────────────┼─────────────────────┤
│ GR                  │ $0.001              │
├─────────────────────┼─────────────────────┤
│ GRAIN               │ $0.034              │
├─────────────────────┼─────────────────────┤
│ GRG                 │ $2.11               │
├─────────────────────┼─────────────────────┤
│ GRLC                │ $0.012              │
├─────────────────────┼─────────────────────┤
│ GRNC                │ $0.01               │
├─────────────────────┼─────────────────────┤
│ GRO                 │ $0.056              │
├─────────────────────┼─────────────────────┤
│ GRT                 │ $0.12               │
├─────────────────────┼─────────────────────┤
│ GRV                 │ $0.316              │
├─────────────────────┼─────────────────────┤
│ GS                  │ $0.009              │
├─────────────────────┼─────────────────────┤
│ GSBL                │ $18.59              │
├─────────────────────┼─────────────────────┤
│ GSC                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ GSE                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ GSHIBA              │ $0                  │
├─────────────────────┼─────────────────────┤
│ GST                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ GST-ETH             │ $0.053              │
├─────────────────────┼─────────────────────┤
│ GSWAP               │ $0.388              │
├─────────────────────┼─────────────────────┤
│ GT                  │ $4.72               │
├─────────────────────┼─────────────────────┤
│ GTC                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ GTCETH              │ $1,842.61           │
├─────────────────────┼─────────────────────┤
│ GTCOIN              │ $0.017              │
├─────────────────────┼─────────────────────┤
│ GTH                 │ $0.003              │
├─────────────────────┼─────────────────────┤
│ GTON                │ $0.13               │
├─────────────────────┼─────────────────────┤
│ GTR                 │ $0.016              │
├─────────────────────┼─────────────────────┤
│ GUESS               │ $0                  │
├─────────────────────┼─────────────────────┤
│ GUILD               │ $0.005              │
├─────────────────────┼─────────────────────┤
│ GUM                 │ $0.013              │
├─────────────────────┼─────────────────────┤
│ GUNTHY              │ $0.036              │
├─────────────────────┼─────────────────────┤
│ GUP                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ GUSD                │ $0.999              │
├─────────────────────┼─────────────────────┤
│ GVC                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ GVT                 │ $0.127              │
├─────────────────────┼─────────────────────┤
│ GWD                 │ $0.009              │
├─────────────────────┼─────────────────────┤
│ GXE                 │ $0.095              │
├─────────────────────┼─────────────────────┤
│ GXT                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ GYEN                │ $0.007              │
├─────────────────────┼─────────────────────┤
│ GYOKUTO             │ $0                  │
├─────────────────────┼─────────────────────┤
│ GYOSHI              │ $0                  │
├─────────────────────┼─────────────────────┤
│ GYSR                │ $0.065              │
├─────────────────────┼─────────────────────┤
│ GZLR                │ $0                  │
├─────────────────────┼─────────────────────┤
│ Gold                │ $2,018.25           │
├─────────────────────┼─────────────────────┤
│ H                   │ $0                  │
├─────────────────────┼─────────────────────┤
│ H2O                 │ $1.44               │
├─────────────────────┼─────────────────────┤
│ HACHI               │ $0                  │
├─────────────────────┼─────────────────────┤
│ HAHA                │ $0                  │
├─────────────────────┼─────────────────────┤
│ HAI                 │ $0.019              │
├─────────────────────┼─────────────────────┤
│ HAIR                │ $5.88               │
├─────────────────────┼─────────────────────┤
│ HAKA                │ $0.011              │
├─────────────────────┼─────────────────────┤
│ HAKI                │ $21.37              │
├─────────────────────┼─────────────────────┤
│ HAKKA               │ $0.002              │
├─────────────────────┼─────────────────────┤
│ HAN                 │ $0.029              │
├─────────────────────┼─────────────────────┤
│ HANDY               │ $0.001              │
├─────────────────────┼─────────────────────┤
│ HANU                │ $0                  │
├─────────────────────┼─────────────────────┤
│ HAO                 │ $0.003              │
├─────────────────────┼─────────────────────┤
│ HAPI                │ $9.13               │
├─────────────────────┼─────────────────────┤
│ HAPPY               │ $0                  │
├─────────────────────┼─────────────────────┤
│ HARAMBE             │ $0                  │
├─────────────────────┼─────────────────────┤
│ HART                │ $0.002              │
├─────────────────────┼─────────────────────┤
│ HATI                │ $0                  │
├─────────────────────┼─────────────────────┤
│ HAUS                │ $1.39               │
├─────────────────────┼─────────────────────┤
│ HBCH                │ $116.41             │
├─────────────────────┼─────────────────────┤
│ HBDC                │ $0.004              │
├─────────────────────┼─────────────────────┤
│ HBOT                │ $0.004              │
├─────────────────────┼─────────────────────┤
│ HBTC                │ $28,363             │
├─────────────────────┼─────────────────────┤
│ HDAO                │ $0.01               │
├─────────────────────┼─────────────────────┤
│ HDOT                │ $5.64               │
├─────────────────────┼─────────────────────┤
│ HDP                 │ $0.108              │
├─────────────────────┼─────────────────────┤
│ HDRN                │ $0                  │
├─────────────────────┼─────────────────────┤
│ HEAL                │ $0                  │
├─────────────────────┼─────────────────────┤
│ HEART               │ $0.021              │
├─────────────────────┼─────────────────────┤
│ HEDG                │ $0.034              │
├─────────────────────┼─────────────────────┤
│ HEEL                │ $0.341              │
├─────────────────────┼─────────────────────┤
│ HEGIC               │ $0.012              │
├─────────────────────┼─────────────────────┤
│ HELIOS              │ $0                  │
├─────────────────────┼─────────────────────┤
│ HELLSING            │ $0                  │
├─────────────────────┼─────────────────────┤
│ HERB                │ $0                  │
├─────────────────────┼─────────────────────┤
│ HERO                │ $0                  │
├─────────────────────┼─────────────────────┤
│ HEROS               │ $0                  │
├─────────────────────┼─────────────────────┤
│ HEX                 │ $0.014              │
├─────────────────────┼─────────────────────┤
│ HEY                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ HEZ                 │ $4.9                │
├─────────────────────┼─────────────────────┤
│ HFIL                │ $4.46               │
├─────────────────────┼─────────────────────┤
│ HFT                 │ $0.438              │
├─────────────────────┼─────────────────────┤
│ HGET                │ $0.241              │
├─────────────────────┼─────────────────────┤
│ HGOLD               │ $0.072              │
├─────────────────────┼─────────────────────┤
│ HI                  │ $0.004              │
├─────────────────────┼─────────────────────┤
│ HIAZUKI             │ $0.029              │
├─────────────────────┼─────────────────────┤
│ HIBAYC              │ $0.194              │
├─────────────────────┼─────────────────────┤
│ HIBEANZ             │ $0.003              │
├─────────────────────┼─────────────────────┤
│ HICLONEX            │ $0.006              │
├─────────────────────┼─────────────────────┤
│ HICOOLCATS          │ $0.002              │
├─────────────────────┼─────────────────────┤
│ HID                 │ $0.015              │
├─────────────────────┼─────────────────────┤
│ HIDOODLES           │ $0.004              │
├─────────────────────┼─────────────────────┤
│ HIENS3              │ $0.014              │
├─────────────────────┼─────────────────────┤
│ HIENS4              │ $0.002              │
├─────────────────────┼─────────────────────┤
│ HIFI                │ $0.339              │
├─────────────────────┼─────────────────────┤
│ HIFIDENZA           │ $0.128              │
├─────────────────────┼─────────────────────┤
│ HIFLUF              │ $0.002              │
├─────────────────────┼─────────────────────┤
│ HIFRIENDS           │ $0.005              │
├─────────────────────┼─────────────────────┤
│ HIGAZERS            │ $0.034              │
├─────────────────────┼─────────────────────┤
│ HIGH                │ $2.19               │
├─────────────────────┼─────────────────────┤
│ HIKARI              │ $0.001              │
├─────────────────────┼─────────────────────┤
│ HILO                │ $0.006              │
├─────────────────────┼─────────────────────┤
│ HIMAYC              │ $0.102              │
├─────────────────────┼─────────────────────┤
│ HIMEEBITS           │ $0.003              │
├─────────────────────┼─────────────────────┤
│ HIMFERS             │ $0.002              │
├─────────────────────┼─────────────────────┤
│ HIMOONBIRDS         │ $0.049              │
├─────────────────────┼─────────────────────┤
│ HINA                │ $0                  │
├─────────────────────┼─────────────────────┤
│ HIOD                │ $0.003              │
├─────────────────────┼─────────────────────┤
│ HIODBS              │ $0.006              │
├─────────────────────┼─────────────────────┤
│ HIPENGUINS          │ $0.009              │
├─────────────────────┼─────────────────────┤
│ HIPUNKS             │ $0.112              │
├─────────────────────┼─────────────────────┤
│ HIRENGA             │ $0.001              │
├─────────────────────┼─────────────────────┤
│ HISAND33            │ $0.014              │
├─────────────────────┼─────────────────────┤
│ HISEALS             │ $0.003              │
├─────────────────────┼─────────────────────┤
│ HISQUIGGLE          │ $0.02               │
├─────────────────────┼─────────────────────┤
│ HIT                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ HITOP               │ $0                  │
├─────────────────────┼─────────────────────┤
│ HIVALHALLA          │ $0.001              │
├─────────────────────┼─────────────────────┤
│ HKBY                │ $0                  │
├─────────────────────┼─────────────────────┤
│ HLD                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ HLP                 │ $0.16               │
├─────────────────────┼─────────────────────┤
│ HLTC                │ $96.67              │
├─────────────────────┼─────────────────────┤
│ HMQ                 │ $0.002              │
├─────────────────────┼─────────────────────┤
│ HMR                 │ $0.004              │
├─────────────────────┼─────────────────────┤
│ HMT                 │ $0.045              │
├─────────────────────┼─────────────────────┤
│ HMX                 │ $0.005              │
├─────────────────────┼─────────────────────┤
│ HNB                 │ $0.01               │
├─────────────────────┼─────────────────────┤
│ HND                 │ $0.016              │
├─────────────────────┼─────────────────────┤
│ HNS                 │ $0.019              │
├─────────────────────┼─────────────────────┤
│ HNY                 │ $10.05              │
├─────────────────────┼─────────────────────┤
│ HOBBES              │ $0                  │
├─────────────────────┼─────────────────────┤
│ HOGE                │ $0                  │
├─────────────────────┼─────────────────────┤
│ HOICHI              │ $0                  │
├─────────────────────┼─────────────────────┤
│ HOKK                │ $0                  │
├─────────────────────┼─────────────────────┤
│ HOME                │ $0.959              │
├─────────────────────┼─────────────────────┤
│ HONK                │ $0                  │
├─────────────────────┼─────────────────────┤
│ HONR                │ $0.014              │
├─────────────────────┼─────────────────────┤
│ HOODIE              │ $34.33              │
├─────────────────────┼─────────────────────┤
│ HOOT                │ $0                  │
├─────────────────────┼─────────────────────┤
│ HOP                 │ $0.085              │
├─────────────────────┼─────────────────────┤
│ HOPR                │ $0.051              │
├─────────────────────┼─────────────────────┤
│ HORD                │ $0.022              │
├─────────────────────┼─────────────────────┤
│ HOT                 │ $0.002              │
├─────────────────────┼─────────────────────┤
│ HOTCROSS            │ $0.003              │
├─────────────────────┼─────────────────────┤
│ HPO                 │ $0.003              │
├─────────────────────┼─────────────────────┤
│ HPT                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ HRD                 │ $0.007              │
├─────────────────────┼─────────────────────┤
│ HRDG                │ $0.002              │
├─────────────────────┼─────────────────────┤
│ HRP                 │ $0.003              │
├─────────────────────┼─────────────────────┤
│ HRTS                │ $0.004              │
├─────────────────────┼─────────────────────┤
│ HSC                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ HSF                 │ $0.474              │
├─────────────────────┼─────────────────────┤
│ HT                  │ $3.28               │
├─────────────────────┼─────────────────────┤
│ HTB                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ HTL                 │ $3.35               │
├─────────────────────┼─────────────────────┤
│ HUB                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ HUH                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ HULK                │ $0                  │
├─────────────────────┼─────────────────────┤
│ HUM                 │ $0.094              │
├─────────────────────┼─────────────────────┤
│ HUNT                │ $0.304              │
├─────────────────────┼─────────────────────┤
│ HUSD                │ $0.057              │
├─────────────────────┼─────────────────────┤
│ HUSKY               │ $0                  │
├─────────────────────┼─────────────────────┤
│ HUSL                │ $0.031              │
├─────────────────────┼─────────────────────┤
│ HVE2                │ $0.001              │
├─────────────────────┼─────────────────────┤
│ HVH                 │ $0.039              │
├─────────────────────┼─────────────────────┤
│ HVN                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ HXRO                │ $0.099              │
├─────────────────────┼─────────────────────┤
│ HYDRO               │ $0.003              │
├─────────────────────┼─────────────────────┤
│ HYVE                │ $0.051              │
├─────────────────────┼─────────────────────┤
│ HZM                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ IAI                 │ $0.192              │
├─────────────────────┼─────────────────────┤
│ IBCHF               │ $1.24               │
├─────────────────────┼─────────────────────┤
│ IBETH               │ $1,896.47           │
├─────────────────────┼─────────────────────┤
│ IBEUR               │ $1.068              │
├─────────────────────┼─────────────────────┤
│ IBEX                │ $0.055              │
├─────────────────────┼─────────────────────┤
│ IBY                 │ $0.002              │
├─────────────────────┼─────────────────────┤
│ IBZ                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ IC                  │ $0                  │
├─────────────────────┼─────────────────────┤
│ ICB                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ ICE                 │ $1.31               │
├─────────────────────┼─────────────────────┤
│ ICETH               │ $1,950.05           │
├─────────────────────┼─────────────────────┤
│ ICH                 │ $0.002              │
├─────────────────────┼─────────────────────┤
│ ICHI                │ $2.62               │
├─────────────────────┼─────────────────────┤
│ ICHIGO              │ $0                  │
├─────────────────────┼─────────────────────┤
│ ICNQ                │ $0.05               │
├─────────────────────┼─────────────────────┤
│ ICOM                │ $0.011              │
├─────────────────────┼─────────────────────┤
│ ICONS               │ $0.026              │
├─────────────────────┼─────────────────────┤
│ ICSA                │ $0.106              │
├─────────────────────┼─────────────────────┤
│ ID                  │ $0.476              │
├─────────────────────┼─────────────────────┤
│ IDAI                │ $1.062              │
├─────────────────────┼─────────────────────┤
│ IDEA                │ $0.004              │
├─────────────────────┼─────────────────────┤
│ IDEAS               │ $0.001              │
├─────────────────────┼─────────────────────┤
│ IDEX                │ $0.077              │
├─────────────────────┼─────────────────────┤
│ IDH                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ IDK                 │ $0.067              │
├─────────────────────┼─────────────────────┤
│ IDLE                │ $0.293              │
├─────────────────────┼─────────────────────┤
│ IDLEDAISAFE         │ $1.087              │
├─────────────────────┼─────────────────────┤
│ IDLEDAIYIELD        │ $1.098              │
├─────────────────────┼─────────────────────┤
│ IDLESUSDYIELD       │ $1.18               │
├─────────────────────┼─────────────────────┤
│ IDLETUSDYIELD       │ $1.084              │
├─────────────────────┼─────────────────────┤
│ IDLEUSDCSAFE        │ $1.087              │
├─────────────────────┼─────────────────────┤
│ IDLEUSDCYIELD       │ $1.099              │
├─────────────────────┼─────────────────────┤
│ IDLEUSDTSAFE        │ $1.11               │
├─────────────────────┼─────────────────────┤
│ IDLEUSDTYIELD       │ $1.13               │
├─────────────────────┼─────────────────────┤
│ IDLEWBTCYIELD       │ $26,940             │
├─────────────────────┼─────────────────────┤
│ IDO                 │ $0.01               │
├─────────────────────┼─────────────────────┤
│ IDRT                │ $0                  │
├─────────────────────┼─────────────────────┤
│ IDTT                │ $0                  │
├─────────────────────┼─────────────────────┤
│ IDV                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ IDYP                │ $0.001              │
├─────────────────────┼─────────────────────┤
│ IETH                │ $0.02               │
├─────────────────────┼─────────────────────┤
│ IETHV               │ $145.92             │
├─────────────────────┼─────────────────────┤
│ IFARM               │ $38.07              │
├─────────────────────┼─────────────────────┤
│ IFEX                │ $0                  │
├─────────────────────┼─────────────────────┤
│ IFT                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ IFV                 │ $0.007              │
├─────────────────────┼─────────────────────┤
│ IGG                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ IHF                 │ $0.025              │
├─────────────────────┼─────────────────────┤
│ IHT                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ IJC                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ IJZ                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ ILSI                │ $44.34              │
├─────────────────────┼─────────────────────┤
│ ILV                 │ $47.63              │
├─────────────────────┼─────────────────────┤
│ IM                  │ $0                  │
├─────────────────────┼─────────────────────┤
│ IMBTC               │ $26,495             │
├─────────────────────┼─────────────────────┤
│ IMC                 │ $0.002              │
├─────────────────────┼─────────────────────┤
│ IMGNAI              │ $0.025              │
├─────────────────────┼─────────────────────┤
│ IMP                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ IMPACTXP            │ $0                  │
├─────────────────────┼─────────────────────┤
│ IMPT                │ $0.006              │
├─────────────────────┼─────────────────────┤
│ IMX                 │ $0.731              │
├─────────────────────┼─────────────────────┤
│ IND                 │ $0.002              │
├─────────────────────┼─────────────────────┤
│ INDEX               │ $1.5                │
├─────────────────────┼─────────────────────┤
│ INDI                │ $0.018              │
├─────────────────────┼─────────────────────┤
│ INFI                │ $0.002              │
├─────────────────────┼─────────────────────┤
│ INFS                │ $0.007              │
├─────────────────────┼─────────────────────┤
│ INJ                 │ $6.39               │
├─────────────────────┼─────────────────────┤
│ INNBC               │ $0                  │
├─────────────────────┼─────────────────────┤
│ INNIT               │ $0                  │
├─────────────────────┼─────────────────────┤
│ INSAI               │ $0.008              │
├─────────────────────┼─────────────────────┤
│ INST                │ $1.39               │
├─────────────────────┼─────────────────────┤
│ INSUR               │ $0.087              │
├─────────────────────┼─────────────────────┤
│ INSURE              │ $0.004              │
├─────────────────────┼─────────────────────┤
│ INTX                │ $0                  │
├─────────────────────┼─────────────────────┤
│ INU                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ INUINU              │ $0                  │
├─────────────────────┼─────────────────────┤
│ INUS                │ $0                  │
├─────────────────────┼─────────────────────┤
│ INUSANITY           │ $0                  │
├─────────────────────┼─────────────────────┤
│ INV                 │ $39.45              │
├─────────────────────┼─────────────────────┤
│ INVECTAI            │ $0                  │
├─────────────────────┼─────────────────────┤
│ INVI                │ $1.32               │
├─────────────────────┼─────────────────────┤
│ INVOX               │ $-0.022             │
├─────────────────────┼─────────────────────┤
│ INX                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ INXT                │ $0.33               │
├─────────────────────┼─────────────────────┤
│ IOEN                │ $0.003              │
├─────────────────────┼─────────────────────┤
│ IOI                 │ $0.071              │
├─────────────────────┼─────────────────────┤
│ IONX                │ $0.043              │
├─────────────────────┼─────────────────────┤
│ IOTX                │ $0.022              │
├─────────────────────┼─────────────────────┤
│ IPISTR              │ $0.105              │
├─────────────────────┼─────────────────────┤
│ IPL                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ IPOR                │ $0.815              │
├─────────────────────┼─────────────────────┤
│ IQ                  │ $0.005              │
├─────────────────────┼─────────────────────┤
│ IQN                 │ $0.239              │
├─────────────────────┼─────────────────────┤
│ IQQ                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ ISDT                │ $0                  │
├─────────────────────┼─────────────────────┤
│ ISHND               │ $0.02               │
├─────────────────────┼─────────────────────┤
│ ISIKC               │ $0.339              │
├─────────────────────┼─────────────────────┤
│ ISK                 │ $0.312              │
├─────────────────────┼─────────────────────┤
│ ISLA                │ $0.052              │
├─────────────────────┼─────────────────────┤
│ ISP                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ ISR                 │ $0.005              │
├─────────────────────┼─────────────────────┤
│ ITAMCUBE            │ $0.032              │
├─────────────────────┼─────────────────────┤
│ ITGR                │ $0.015              │
├─────────────────────┼─────────────────────┤
│ ITP                 │ $1.65               │
├─────────────────────┼─────────────────────┤
│ ITS                 │ $3.57               │
├─────────────────────┼─────────────────────┤
│ IUSD                │ $1.019              │
├─────────────────────┼─────────────────────┤
│ IUSDC               │ $1.095              │
├─────────────────────┼─────────────────────┤
│ IVI                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ IWBTC               │ $28,779             │
├─────────────────────┼─────────────────────┤
│ IXI                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ IXP                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ IXS                 │ $0.022              │
├─────────────────────┼─────────────────────┤
│ IXT                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ IYKYK               │ $0                  │
├─────────────────────┼─────────────────────┤
│ IZE                 │ $0.004              │
├─────────────────────┼─────────────────────┤
│ IZI                 │ $0.025              │
├─────────────────────┼─────────────────────┤
│ JACK                │ $0.965              │
├─────────────────────┼─────────────────────┤
│ JACY                │ $0                  │
├─────────────────────┼─────────────────────┤
│ JAI                 │ $0.013              │
├─────────────────────┼─────────────────────┤
│ JAM                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ JAR                 │ $0.002              │
├─────────────────────┼─────────────────────┤
│ JASMY               │ $0.005              │
├─────────────────────┼─────────────────────┤
│ JAY                 │ $3.47               │
├─────────────────────┼─────────────────────┤
│ JBX                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ JCC                 │ $0.067              │
├─────────────────────┼─────────────────────┤
│ JCG                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ JCHF                │ $1.15               │
├─────────────────────┼─────────────────────┤
│ JDB                 │ $0.024              │
├─────────────────────┼─────────────────────┤
│ JDC                 │ $0.022              │
├─────────────────────┼─────────────────────┤
│ JEJUDOGE            │ $0                  │
├─────────────────────┼─────────────────────┤
│ JEM                 │ $2.26               │
├─────────────────────┼─────────────────────┤
│ JENNY               │ $2.35               │
├─────────────────────┼─────────────────────┤
│ JESUS               │ $0                  │
├─────────────────────┼─────────────────────┤
│ JET                 │ $0.002              │
├─────────────────────┼─────────────────────┤
│ JEUR                │ $1.074              │
├─────────────────────┼─────────────────────┤
│ JFIN                │ $0.249              │
├─────────────────────┼─────────────────────┤
│ JGBP                │ $1.29               │
├─────────────────────┼─────────────────────┤
│ JGN                 │ $0.024              │
├─────────────────────┼─────────────────────┤
│ JIG                 │ $0.002              │
├─────────────────────┼─────────────────────┤
│ JIYUU               │ $0.012              │
├─────────────────────┼─────────────────────┤
│ JIZZ                │ $0                  │
├─────────────────────┼─────────────────────┤
│ JM                  │ $0                  │
├─────────────────────┼─────────────────────┤
│ JMPT                │ $1.96               │
├─────────────────────┼─────────────────────┤
│ JOB                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ JOY                 │ $0.045              │
├─────────────────────┼─────────────────────┤
│ JPEG                │ $0.001              │
├─────────────────────┼─────────────────────┤
│ JPG                 │ $28.33              │
├─────────────────────┼─────────────────────┤
│ JPGC                │ $0.003              │
├─────────────────────┼─────────────────────┤
│ JPYC                │ $0.007              │
├─────────────────────┼─────────────────────┤
│ JRT                 │ $0.01               │
├─────────────────────┼─────────────────────┤
│ JS                  │ $0.001              │
├─────────────────────┼─────────────────────┤
│ JSHIBA              │ $0                  │
├─────────────────────┼─────────────────────┤
│ JT                  │ $0.05               │
├─────────────────────┼─────────────────────┤
│ JUP                 │ $0.007              │
├─────────────────────┼─────────────────────┤
│ JUSTICE             │ $0                  │
├─────────────────────┼─────────────────────┤
│ K21                 │ $0.327              │
├─────────────────────┼─────────────────────┤
│ K9                  │ $0                  │
├─────────────────────┼─────────────────────┤
│ KABOSUINU           │ $0                  │
├─────────────────────┼─────────────────────┤
│ KAE                 │ $0.038              │
├─────────────────────┼─────────────────────┤
│ KAERI               │ $0                  │
├─────────────────────┼─────────────────────┤
│ KAINET              │ $0.002              │
├─────────────────────┼─────────────────────┤
│ KALE                │ $0.001              │
├─────────────────────┼─────────────────────┤
│ KALLY               │ $0.003              │
├─────────────────────┼─────────────────────┤
│ KAN                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ KANGAL              │ $0                  │
├─────────────────────┼─────────────────────┤
│ KAP                 │ $0.131              │
├─────────────────────┼─────────────────────┤
│ KARMA               │ $0.023              │
├─────────────────────┼─────────────────────┤
│ KAT                 │ $0.003              │
├─────────────────────┼─────────────────────┤
│ KATA                │ $0                  │
├─────────────────────┼─────────────────────┤
│ KAWA                │ $0                  │
├─────────────────────┼─────────────────────┤
│ KCAL                │ $0.007              │
├─────────────────────┼─────────────────────┤
│ KCT                 │ $0.06               │
├─────────────────────┼─────────────────────┤
│ KDAG                │ $0.146              │
├─────────────────────┼─────────────────────┤
│ KDOE                │ $0.01               │
├─────────────────────┼─────────────────────┤
│ KEEP                │ $0.129              │
├─────────────────────┼─────────────────────┤
│ KEES                │ $0.109              │
├─────────────────────┼─────────────────────┤
│ KEI                 │ $0.039              │
├─────────────────────┼─────────────────────┤
│ KEK                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ KEKO                │ $0.005              │
├─────────────────────┼─────────────────────┤
│ KEL                 │ $0.01               │
├─────────────────────┼─────────────────────┤
│ KENNEL              │ $0                  │
├─────────────────────┼─────────────────────┤
│ KERMIT              │ $0                  │
├─────────────────────┼─────────────────────┤
│ KEX                 │ $0.033              │
├─────────────────────┼─────────────────────┤
│ KEY                 │ $0.007              │
├─────────────────────┼─────────────────────┤
│ KEYFI               │ $0.044              │
├─────────────────────┼─────────────────────┤
│ KEYS                │ $0.002              │
├─────────────────────┼─────────────────────┤
│ KFC                 │ $9.47               │
├─────────────────────┼─────────────────────┤
│ KFT                 │ $0.006              │
├─────────────────────┼─────────────────────┤
│ KGC                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ KIBA                │ $0                  │
├─────────────────────┼─────────────────────┤
│ KIBSHI              │ $0                  │
├─────────────────────┼─────────────────────┤
│ KIF                 │ $5.38               │
├─────────────────────┼─────────────────────┤
│ KIMCHI              │ $0                  │
├─────────────────────┼─────────────────────┤
│ KINE                │ $0.087              │
├─────────────────────┼─────────────────────┤
│ KING                │ $0.004              │
├─────────────────────┼─────────────────────┤
│ KIRA                │ $0.001              │
├─────────────────────┼─────────────────────┤
│ KIRO                │ $0.007              │
├─────────────────────┼─────────────────────┤
│ KISHIMOTO           │ $0                  │
├─────────────────────┼─────────────────────┤
│ KISHU               │ $0                  │
├─────────────────────┼─────────────────────┤
│ KISHUTAMA           │ $0                  │
├─────────────────────┼─────────────────────┤
│ KIT                 │ $0.245              │
├─────────────────────┼─────────────────────┤
│ KITTYDINGER         │ $0                  │
├─────────────────────┼─────────────────────┤
│ KKO                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ KLEE                │ $0                  │
├─────────────────────┼─────────────────────┤
│ KLTR                │ $0.012              │
├─────────────────────┼─────────────────────┤
│ KMASK               │ $0                  │
├─────────────────────┼─────────────────────┤
│ KMT                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ KNC                 │ $0.615              │
├─────────────────────┼─────────────────────┤
│ KNCL                │ $0.612              │
├─────────────────────┼─────────────────────┤
│ KNDX                │ $0.005              │
├─────────────────────┼─────────────────────┤
│ KNG                 │ $1.98               │
├─────────────────────┼─────────────────────┤
│ KNIGHT              │ $0.006              │
├─────────────────────┼─────────────────────┤
│ KOACOMBAT           │ $0                  │
├─────────────────────┼─────────────────────┤
│ KODACHI             │ $0                  │
├─────────────────────┼─────────────────────┤
│ KOI                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ KOK                 │ $0.027              │
├─────────────────────┼─────────────────────┤
│ KOL                 │ $0.004              │
├─────────────────────┼─────────────────────┤
│ KOMPETE             │ $0.01               │
├─────────────────────┼─────────────────────┤
│ KONO                │ $0.023              │
├─────────────────────┼─────────────────────┤
│ KORI                │ $0                  │
├─────────────────────┼─────────────────────┤
│ KOROMARU            │ $0                  │
├─────────────────────┼─────────────────────┤
│ KOY                 │ $0.004              │
├─────────────────────┼─────────────────────┤
│ KOYO                │ $0                  │
├─────────────────────┼─────────────────────┤
│ KP3R                │ $63.85              │
├─────────────────────┼─────────────────────┤
│ KP4R                │ $1.89               │
├─────────────────────┼─────────────────────┤
│ KPOP                │ $0                  │
├─────────────────────┼─────────────────────┤
│ KRL                 │ $0.256              │
├─────────────────────┼─────────────────────┤
│ KROM                │ $0.031              │
├─────────────────────┼─────────────────────┤
│ KRW                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ KRX                 │ $0.006              │
├─────────────────────┼─────────────────────┤
│ KSC                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ KST                 │ $0.002              │
├─────────────────────┼─────────────────────┤
│ KTLYO               │ $0.023              │
├─────────────────────┼─────────────────────┤
│ KTN                 │ $0.238              │
├─────────────────────┼─────────────────────┤
│ KTO                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ KTON                │ $6.73               │
├─────────────────────┼─────────────────────┤
│ KTT                 │ $0.004              │
├─────────────────────┼─────────────────────┤
│ KUJI                │ $0.907              │
├─────────────────────┼─────────────────────┤
│ KUKY                │ $0                  │
├─────────────────────┼─────────────────────┤
│ KUMA                │ $0                  │
├─────────────────────┼─────────────────────┤
│ KUSUNOKI            │ $0                  │
├─────────────────────┼─────────────────────┤
│ KVERSE              │ $0.001              │
├─────────────────────┼─────────────────────┤
│ KXA                 │ $0.01               │
├─────────────────────┼─────────────────────┤
│ KYL                 │ $0.01               │
├─────────────────────┼─────────────────────┤
│ KYOKO               │ $0.006              │
├─────────────────────┼─────────────────────┤
│ KZEN                │ $0.002              │
├─────────────────────┼─────────────────────┤
│ L2                  │ $0.002              │
├─────────────────────┼─────────────────────┤
│ LA                  │ $0.037              │
├─────────────────────┼─────────────────────┤
│ LAIKA               │ $0                  │
├─────────────────────┼─────────────────────┤
│ LAKE                │ $0.006              │
├─────────────────────┼─────────────────────┤
│ LAMB                │ $0.002              │
├─────────────────────┼─────────────────────┤
│ LAND                │ $0                  │
├─────────────────────┼─────────────────────┤
│ LAYER               │ $0.06               │
├─────────────────────┼─────────────────────┤
│ LBA                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ LBK                 │ $0.013              │
├─────────────────────┼─────────────────────┤
│ LBL                 │ $0.003              │
├─────────────────────┼─────────────────────┤
│ LBLOCK              │ $0                  │
├─────────────────────┼─────────────────────┤
│ LBP                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ LBR                 │ $2.63               │
├─────────────────────┼─────────────────────┤
│ LBXC                │ $0                  │
├─────────────────────┼─────────────────────┤
│ LCE                 │ $3.39               │
├─────────────────────┼─────────────────────┤
│ LCMS                │ $0                  │
├─────────────────────┼─────────────────────┤
│ LCS                 │ $0.05               │
├─────────────────────┼─────────────────────┤
│ LCX                 │ $0.05               │
├─────────────────────┼─────────────────────┤
│ LDN                 │ $0.132              │
├─────────────────────┼─────────────────────┤
│ LDO                 │ $1.97               │
├─────────────────────┼─────────────────────┤
│ LEAD                │ $0                  │
├─────────────────────┼─────────────────────┤
│ LEAG                │ $0                  │
├─────────────────────┼─────────────────────┤
│ LEAN                │ $0.159              │
├─────────────────────┼─────────────────────┤
│ LEAP                │ $0.004              │
├─────────────────────┼─────────────────────┤
│ LEASH               │ $301.81             │
├─────────────────────┼─────────────────────┤
│ LED                 │ $0.003              │
├─────────────────────┼─────────────────────┤
│ LEMD                │ $0                  │
├─────────────────────┼─────────────────────┤
│ LEMO                │ $0                  │
├─────────────────────┼─────────────────────┤
│ LEND                │ $0.147              │
├─────────────────────┼─────────────────────┤
│ LEO                 │ $3.51               │
├─────────────────────┼─────────────────────┤
│ LEOX                │ $0.386              │
├─────────────────────┼─────────────────────┤
│ LEPA                │ $0.023              │
├─────────────────────┼─────────────────────┤
│ LET                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ LETSGO              │ $0                  │
├─────────────────────┼─────────────────────┤
│ LEV                 │ $0.006              │
├─────────────────────┼─────────────────────┤
│ LEVER               │ $0.002              │
├─────────────────────┼─────────────────────┤
│ LEVL                │ $0.007              │
├─────────────────────┼─────────────────────┤
│ LEVX                │ $0.014              │
├─────────────────────┼─────────────────────┤
│ LEXE                │ $0.004              │
├─────────────────────┼─────────────────────┤
│ LFG                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ LFI                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ LFT                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ LGCY                │ $0                  │
├─────────────────────┼─────────────────────┤
│ LGOLD               │ $55.44              │
├─────────────────────┼─────────────────────┤
│ LHC                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ LHCOIN              │ $0.001              │
├─────────────────────┼─────────────────────┤
│ LIBFX               │ $0.002              │
├─────────────────────┼─────────────────────┤
│ LIEN                │ $0.489              │
├─────────────────────┼─────────────────────┤
│ LIFE                │ $0                  │
├─────────────────────┼─────────────────────┤
│ LIFT                │ $0.027              │
├─────────────────────┼─────────────────────┤
│ LIME                │ $0.007              │
├─────────────────────┼─────────────────────┤
│ LIMEX               │ $0                  │
├─────────────────────┼─────────────────────┤
│ LIMIT               │ $6.61               │
├─────────────────────┼─────────────────────┤
│ LINA                │ $0.012              │
├─────────────────────┼─────────────────────┤
│ LINK                │ $6.43               │
├─────────────────────┼─────────────────────┤
│ LINU                │ $0                  │
├─────────────────────┼─────────────────────┤
│ LIT                 │ $0.882              │
├─────────────────────┼─────────────────────┤
│ LITH                │ $0.001              │
├─────────────────────┼─────────────────────┤
│ LITX                │ $0                  │
├─────────────────────┼─────────────────────┤
│ LKN                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ LKR                 │ $0.009              │
├─────────────────────┼─────────────────────┤
│ LKT                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ LM                  │ $0.052              │
├─────────────────────┼─────────────────────┤
│ LML                 │ $0.003              │
├─────────────────────┼─────────────────────┤
│ LMR                 │ $0.005              │
├─────────────────────┼─────────────────────┤
│ LMT                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ LMY                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ LNKO                │ $0                  │
├─────────────────────┼─────────────────────┤
│ LOA                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ LOC                 │ $0.542              │
├─────────────────────┼─────────────────────┤
│ LOCG                │ $0.012              │
├─────────────────────┼─────────────────────┤
│ LOCK                │ $0                  │
├─────────────────────┼─────────────────────┤
│ LOCUS               │ $0.04               │
├─────────────────────┼─────────────────────┤
│ LOGT                │ $0.8                │
├─────────────────────┼─────────────────────┤
│ LOKA                │ $0.358              │
├─────────────────────┼─────────────────────┤
│ LOL                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ LON                 │ $0.526              │
├─────────────────────┼─────────────────────┤
│ LOOKS               │ $0.087              │
├─────────────────────┼─────────────────────┤
│ LOOM                │ $0.048              │
├─────────────────────┼─────────────────────┤
│ LOOMI               │ $0                  │
├─────────────────────┼─────────────────────┤
│ LOOMOLD             │ $0.049              │
├─────────────────────┼─────────────────────┤
│ LOON                │ $0.005              │
├─────────────────────┼─────────────────────┤
│ LOOT                │ $0.105              │
├─────────────────────┼─────────────────────┤
│ LORDS               │ $0.08               │
├─────────────────────┼─────────────────────┤
│ LOTT                │ $0.022              │
├─────────────────────┼─────────────────────┤
│ LOVE                │ $0.111              │
├─────────────────────┼─────────────────────┤
│ LPL                 │ $0.17               │
├─────────────────────┼─────────────────────┤
│ LPNT                │ $0.17               │
├─────────────────────┼─────────────────────┤
│ LPOOL               │ $0.226              │
├─────────────────────┼─────────────────────┤
│ LPT                 │ $4.83               │
├─────────────────────┼─────────────────────┤
│ LQTY                │ $1.24               │
├─────────────────────┼─────────────────────┤
│ LRC                 │ $0.288              │
├─────────────────────┼─────────────────────┤
│ LSD                 │ $0.024              │
├─────────────────────┼─────────────────────┤
│ LSETH               │ $1,807.01           │
├─────────────────────┼─────────────────────┤
│ LSILVER             │ $0.686              │
├─────────────────────┼─────────────────────┤
│ LSS                 │ $0.137              │
├─────────────────────┼─────────────────────┤
│ LSVR                │ $0                  │
├─────────────────────┼─────────────────────┤
│ LTO                 │ $0.086              │
├─────────────────────┼─────────────────────┤
│ LTX                 │ $0.127              │
├─────────────────────┼─────────────────────┤
│ LTY                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ LUA                 │ $0.016              │
├─────────────────────┼─────────────────────┤
│ LUCHOW              │ $0                  │
├─────────────────────┼─────────────────────┤
│ LUCKY               │ $0.018              │
├─────────────────────┼─────────────────────┤
│ LUD                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ LUFFY               │ $0                  │
├─────────────────────┼─────────────────────┤
│ LUN                 │ $0.019              │
├─────────────────────┼─────────────────────┤
│ LUNC                │ $0                  │
├─────────────────────┼─────────────────────┤
│ LUNCH               │ $0                  │
├─────────────────────┼─────────────────────┤
│ LUNR                │ $0.136              │
├─────────────────────┼─────────────────────┤
│ LUSD                │ $1.008              │
├─────────────────────┼─────────────────────┤
│ LUSD3CRV            │ $1.023              │
├─────────────────────┼─────────────────────┤
│ LUXO                │ $0.061              │
├─────────────────────┼─────────────────────┤
│ LVL                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ LWC                 │ $0.021              │
├─────────────────────┼─────────────────────┤
│ LWD                 │ $0.007              │
├─────────────────────┼─────────────────────┤
│ LY                  │ $0                  │
├─────────────────────┼─────────────────────┤
│ LYFE                │ $3.43               │
├─────────────────────┼─────────────────────┤
│ LYM                 │ $0.002              │
├─────────────────────┼─────────────────────┤
│ LYNK                │ $0.001              │
├─────────────────────┼─────────────────────┤
│ LYRA                │ $0.082              │
├─────────────────────┼─────────────────────┤
│ LYXE                │ $11.09              │
├─────────────────────┼─────────────────────┤
│ M                   │ $0                  │
├─────────────────────┼─────────────────────┤
│ M2                  │ $0.001              │
├─────────────────────┼─────────────────────┤
│ M87                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ MAD                 │ $0.038              │
├─────────────────────┼─────────────────────┤
│ MADHAT              │ $0.831              │
├─────────────────────┼─────────────────────┤
│ MAGE                │ $0.036              │
├─────────────────────┼─────────────────────┤
│ MAGIC               │ $0.93               │
├─────────────────────┼─────────────────────┤
│ MAHA                │ $0.466              │
├─────────────────────┼─────────────────────┤
│ MAI                 │ $0.009              │
├─────────────────────┼─────────────────────┤
│ MAID                │ $0.951              │
├─────────────────────┼─────────────────────┤
│ MAIN                │ $0.009              │
├─────────────────────┼─────────────────────┤
│ MANA                │ $0.476              │
├─────────────────────┼─────────────────────┤
│ MANC                │ $0.819              │
├─────────────────────┼─────────────────────┤
│ MANDOX              │ $0                  │
├─────────────────────┼─────────────────────┤
│ MAP                 │ $0.012              │
├─────────────────────┼─────────────────────┤
│ MARAN               │ $0                  │
├─────────────────────┼─────────────────────┤
│ MARBLEX7            │ $0                  │
├─────────────────────┼─────────────────────┤
│ MARK                │ $0.506              │
├─────────────────────┼─────────────────────┤
│ MARS                │ $0                  │
├─────────────────────┼─────────────────────┤
│ MARS4               │ $0.001              │
├─────────────────────┼─────────────────────┤
│ MARSH               │ $0.112              │
├─────────────────────┼─────────────────────┤
│ MARU                │ $0                  │
├─────────────────────┼─────────────────────┤
│ MARVIN              │ $0.008              │
├─────────────────────┼─────────────────────┤
│ MARX                │ $0.004              │
├─────────────────────┼─────────────────────┤
│ MASK                │ $4.06               │
├─────────────────────┼─────────────────────┤
│ MASK20              │ $3.22               │
├─────────────────────┼─────────────────────┤
│ MASQ                │ $0.19               │
├─────────────────────┼─────────────────────┤
│ MASTERMIND          │ $0                  │
├─────────────────────┼─────────────────────┤
│ MATH                │ $0.094              │
├─────────────────────┼─────────────────────┤
│ MATIC               │ $0.921              │
├─────────────────────┼─────────────────────┤
│ MATICX              │ $0.979              │
├─────────────────────┼─────────────────────┤
│ MATRIX              │ $0.001              │
├─────────────────────┼─────────────────────┤
│ MATSUSWAP           │ $0                  │
├─────────────────────┼─────────────────────┤
│ MATTER              │ $0.046              │
├─────────────────────┼─────────────────────┤
│ MAV                 │ $1.11               │
├─────────────────────┼─────────────────────┤
│ MAX                 │ $0.261              │
├─────────────────────┼─────────────────────┤
│ MAXI                │ $0.012              │
├─────────────────────┼─────────────────────┤
│ MAXR                │ $0                  │
├─────────────────────┼─────────────────────┤
│ MAYC                │ $12,771.24          │
├─────────────────────┼─────────────────────┤
│ MAYP                │ $540,230            │
├─────────────────────┼─────────────────────┤
│ MBASE               │ $0.163              │
├─────────────────────┼─────────────────────┤
│ MBET                │ $0.013              │
├─────────────────────┼─────────────────────┤
│ MBX                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ MC                  │ $0.221              │
├─────────────────────┼─────────────────────┤
│ MCADE               │ $0.022              │
├─────────────────────┼─────────────────────┤
│ MCB                 │ $13.29              │
├─────────────────────┼─────────────────────┤
│ MCC                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ MCD                 │ $1.18               │
├─────────────────────┼─────────────────────┤
│ MCF                 │ $0.005              │
├─────────────────────┼─────────────────────┤
│ MCG                 │ $0.012              │
├─────────────────────┼─────────────────────┤
│ MCHC                │ $0.077              │
├─────────────────────┼─────────────────────┤
│ MCO                 │ $2.32               │
├─────────────────────┼─────────────────────┤
│ MCO2                │ $1.18               │
├─────────────────────┼─────────────────────┤
│ MCONTENT            │ $0                  │
├─────────────────────┼─────────────────────┤
│ MCRT                │ $0.003              │
├─────────────────────┼─────────────────────┤
│ MDA                 │ $0.048              │
├─────────────────────┼─────────────────────┤
│ MDAI                │ $0                  │
├─────────────────────┼─────────────────────┤
│ MDCY                │ $0.064              │
├─────────────────────┼─────────────────────┤
│ MDF                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ MDM                 │ $0.022              │
├─────────────────────┼─────────────────────┤
│ MDS                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ MDT                 │ $0.05               │
├─────────────────────┼─────────────────────┤
│ MDX                 │ $0.007              │
├─────────────────────┼─────────────────────┤
│ MEAN                │ $0.024              │
├─────────────────────┼─────────────────────┤
│ MECHA               │ $0.135              │
├─────────────────────┼─────────────────────┤
│ MEDIA               │ $8.86               │
├─────────────────────┼─────────────────────┤
│ MEEB                │ $3,647.69           │
├─────────────────────┼─────────────────────┤
│ MEED                │ $0.288              │
├─────────────────────┼─────────────────────┤
│ MEF                 │ $0.611              │
├─────────────────────┼─────────────────────┤
│ MEGA                │ $0.111              │
├─────────────────────┼─────────────────────┤
│ MEISHU              │ $0.001              │
├─────────────────────┼─────────────────────┤
│ MEL                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ MELON               │ $0                  │
├─────────────────────┼─────────────────────┤
│ MELOS               │ $0.004              │
├─────────────────────┼─────────────────────┤
│ MEM                 │ $0.027              │
├─────────────────────┼─────────────────────┤
│ MEMAG               │ $0.003              │
├─────────────────────┼─────────────────────┤
│ MEME                │ $0                  │
├─────────────────────┼─────────────────────┤
│ MEMEME              │ $0                  │
├─────────────────────┼─────────────────────┤
│ MEMEX               │ $0                  │
├─────────────────────┼─────────────────────┤
│ MERC                │ $0.008              │
├─────────────────────┼─────────────────────┤
│ MESA                │ $0.001              │
├─────────────────────┼─────────────────────┤
│ MET                 │ $1.49               │
├─────────────────────┼─────────────────────┤
│ META                │ $0.025              │
├─────────────────────┼─────────────────────┤
│ METADOGE            │ $0                  │
├─────────────────────┼─────────────────────┤
│ METAL               │ $0.081              │
├─────────────────────┼─────────────────────┤
│ METANO              │ $0.001              │
├─────────────────────┼─────────────────────┤
│ METIS               │ $21.32              │
├─────────────────────┼─────────────────────┤
│ METR                │ $7.83               │
├─────────────────────┼─────────────────────┤
│ MEV                 │ $0.006              │
├─────────────────────┼─────────────────────┤
│ MEVFREE             │ $0.025              │
├─────────────────────┼─────────────────────┤
│ MEZZ                │ $0.964              │
├─────────────────────┼─────────────────────┤
│ MF1                 │ $0.023              │
├─────────────────────┼─────────────────────┤
│ MFC                 │ $0.002              │
├─────────────────────┼─────────────────────┤
│ MFG                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ MFI                 │ $0.024              │
├─────────────────────┼─────────────────────┤
│ MFT                 │ $0.003              │
├─────────────────────┼─────────────────────┤
│ MFTU                │ $0                  │
├─────────────────────┼─────────────────────┤
│ MG                  │ $0                  │
├─────────────────────┼─────────────────────┤
│ MGG                 │ $0.002              │
├─────────────────────┼─────────────────────┤
│ MGH                 │ $0.003              │
├─────────────────────┼─────────────────────┤
│ MIB                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ MIDA                │ $0.015              │
├─────────────────────┼─────────────────────┤
│ MIDAS               │ $1.28               │
├─────────────────────┼─────────────────────┤
│ MIKAWA              │ $0                  │
├─────────────────────┼─────────────────────┤
│ MILADY              │ $5,633.21           │
├─────────────────────┼─────────────────────┤
│ MILK2               │ $0.005              │
├─────────────────────┼─────────────────────┤
│ MILKAI              │ $0                  │
├─────────────────────┼─────────────────────┤
│ MIM                 │ $1.001              │
├─────────────────────┼─────────────────────┤
│ MIMATIC             │ $0.992              │
├─────────────────────┼─────────────────────┤
│ MIMIR               │ $0.003              │
├─────────────────────┼─────────────────────┤
│ MIMO                │ $0.023              │
├─────────────────────┼─────────────────────┤
│ MIN                 │ $0.004              │
├─────────────────────┼─────────────────────┤
│ MINDS               │ $0.083              │
├─────────────────────┼─────────────────────┤
│ MINI                │ $0.011              │
├─────────────────────┼─────────────────────┤
│ MINT                │ $0.009              │
├─────────────────────┼─────────────────────┤
│ MINTME              │ $0.009              │
├─────────────────────┼─────────────────────┤
│ MIR                 │ $0.038              │
├─────────────────────┼─────────────────────┤
│ MIRL                │ $0.001              │
├─────────────────────┼─────────────────────┤
│ MIRO                │ $0.002              │
├─────────────────────┼─────────────────────┤
│ MIS                 │ $0.218              │
├─────────────────────┼─────────────────────┤
│ MIST                │ $1.38               │
├─────────────────────┼─────────────────────┤
│ MITH                │ $0.002              │
├─────────────────────┼─────────────────────┤
│ MITX                │ $0.008              │
├─────────────────────┼─────────────────────┤
│ MIX                 │ $0.002              │
├─────────────────────┼─────────────────────┤
│ MIYAZAKI            │ $0                  │
├─────────────────────┼─────────────────────┤
│ MKONG               │ $0.025              │
├─────────────────────┼─────────────────────┤
│ MKR                 │ $634.5              │
├─────────────────────┼─────────────────────┤
│ MLC                 │ $0.003              │
├─────────────────────┼─────────────────────┤
│ MLN                 │ $18.55              │
├─────────────────────┼─────────────────────┤
│ MLP                 │ $0.002              │
├─────────────────────┼─────────────────────┤
│ MLT                 │ $0.13               │
├─────────────────────┼─────────────────────┤
│ MM                  │ $0                  │
├─────────────────────┼─────────────────────┤
│ MMAI                │ $0                  │
├─────────────────────┼─────────────────────┤
│ MNB                 │ $0.005              │
├─────────────────────┼─────────────────────┤
│ MNDCC               │ $0.06               │
├─────────────────────┼─────────────────────┤
│ MNMC                │ $0                  │
├─────────────────────┼─────────────────────┤
│ MNS                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ MNTL                │ $0.004              │
├─────────────────────┼─────────────────────┤
│ MNTO                │ $1.81               │
├─────────────────────┼─────────────────────┤
│ MNTP                │ $0.122              │
├─────────────────────┼─────────────────────┤
│ MNW                 │ $1.43               │
├─────────────────────┼─────────────────────┤
│ MNY                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ MO                  │ $0.04               │
├─────────────────────┼─────────────────────┤
│ MOAR                │ $0.014              │
├─────────────────────┼─────────────────────┤
│ MOC                 │ $0.079              │
├─────────────────────┼─────────────────────┤
│ MOCA                │ $0.179              │
├─────────────────────┼─────────────────────┤
│ MOCHI               │ $0                  │
├─────────────────────┼─────────────────────┤
│ MOD                 │ $0.246              │
├─────────────────────┼─────────────────────┤
│ MODA                │ $0.386              │
├─────────────────────┼─────────────────────┤
│ MODEX               │ $0.016              │
├─────────────────────┼─────────────────────┤
│ MODS                │ $0                  │
├─────────────────────┼─────────────────────┤
│ MOETA               │ $0.044              │
├─────────────────────┼─────────────────────┤
│ MOF                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ MOFI                │ $0.003              │
├─────────────────────┼─────────────────────┤
│ MOH                 │ $0.044              │
├─────────────────────┼─────────────────────┤
│ MOMA                │ $0.004              │
├─────────────────────┼─────────────────────┤
│ MON                 │ $0.088              │
├─────────────────────┼─────────────────────┤
│ MONA                │ $351.26             │
├─────────────────────┼─────────────────────┤
│ MONDAY              │ $0.103              │
├─────────────────────┼─────────────────────┤
│ MONG                │ $0                  │
├─────────────────────┼─────────────────────┤
│ MONGOOSE            │ $0                  │
├─────────────────────┼─────────────────────┤
│ MONKED              │ $0.008              │
├─────────────────────┼─────────────────────┤
│ MONKEYS             │ $0                  │
├─────────────────────┼─────────────────────┤
│ MONO                │ $0.064              │
├─────────────────────┼─────────────────────┤
│ MONONOKE-INU        │ $0                  │
├─────────────────────┼─────────────────────┤
│ MOOI                │ $0.047              │
├─────────────────────┼─────────────────────┤
│ MOON                │ $0.017              │
├─────────────────────┼─────────────────────┤
│ MOONCAT             │ $357.24             │
├─────────────────────┼─────────────────────┤
│ MOONEY              │ $0.001              │
├─────────────────────┼─────────────────────┤
│ MOOV                │ $0.005              │
├─────────────────────┼─────────────────────┤
│ MOPS                │ $0                  │
├─────────────────────┼─────────────────────┤
│ MORE                │ $0.365              │
├─────────────────────┼─────────────────────┤
│ MORK                │ $0.091              │
├─────────────────────┼─────────────────────┤
│ MOSOLID             │ $0.013              │
├─────────────────────┼─────────────────────┤
│ MOTG                │ $0.018              │
├─────────────────────┼─────────────────────┤
│ MOUSEWORM           │ $1.31               │
├─────────────────────┼─────────────────────┤
│ MOV                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ MOVD                │ $0                  │
├─────────────────────┼─────────────────────┤
│ MOVE                │ $0.36               │
├─────────────────────┼─────────────────────┤
│ MP3                 │ $0.005              │
├─────────────────────┼─────────────────────┤
│ MPAY                │ $0.001              │
├─────────────────────┼─────────────────────┤
│ MPH                 │ $0.02               │
├─────────────────────┼─────────────────────┤
│ MPL                 │ $6.71               │
├─────────────────────┼─────────────────────┤
│ MPM                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ MPS                 │ $8.24               │
├─────────────────────┼─────────────────────┤
│ MPT                 │ $0.005              │
├─────────────────────┼─────────────────────┤
│ MPWR                │ $0.022              │
├─────────────────────┼─────────────────────┤
│ MQL                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ MR                  │ $0                  │
├─────────────────────┼─────────────────────┤
│ MRCH                │ $0.01               │
├─────────────────────┼─────────────────────┤
│ MRG                 │ $-0.001             │
├─────────────────────┼─────────────────────┤
│ MRI                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ MS                  │ $0                  │
├─────────────────────┼─────────────────────┤
│ MSB                 │ $0.008              │
├─────────────────────┼─────────────────────┤
│ MSG                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ MSHIBA              │ $0                  │
├─────────────────────┼─────────────────────┤
│ MSI                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ MSOT                │ $0.064              │
├─────────────────────┼─────────────────────┤
│ MSTO                │ $0.165              │
├─────────────────────┼─────────────────────┤
│ MT                  │ $0                  │
├─────────────────────┼─────────────────────┤
│ MTA                 │ $0.037              │
├─────────────────────┼─────────────────────┤
│ MTAO                │ $0                  │
├─────────────────────┼─────────────────────┤
│ MTC                 │ $0.005              │
├─────────────────────┼─────────────────────┤
│ MTD                 │ $0.129              │
├─────────────────────┼─────────────────────┤
│ MTH                 │ $0.006              │
├─────────────────────┼─────────────────────┤
│ MTHD                │ $0.002              │
├─────────────────────┼─────────────────────┤
│ MTL                 │ $1.066              │
├─────────────────────┼─────────────────────┤
│ MTLX                │ $0.157              │
├─────────────────────┼─────────────────────┤
│ MTN                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ MTO                 │ $0.035              │
├─────────────────────┼─────────────────────┤
│ MTRA                │ $0.214              │
├─────────────────────┼─────────────────────┤
│ MTRL                │ $0.001              │
├─────────────────────┼─────────────────────┤
│ MTRM                │ $0.137              │
├─────────────────────┼─────────────────────┤
│ MTS                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ MTU                 │ $0.054              │
├─────────────────────┼─────────────────────┤
│ MTV                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ MTX                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ MU                  │ $0.754              │
├─────────────────────┼─────────────────────┤
│ MULTI               │ $3.38               │
├─────────────────────┼─────────────────────┤
│ MULTIBTC            │ $26,817             │
├─────────────────────┼─────────────────────┤
│ MUMU                │ $0                  │
├─────────────────────┼─────────────────────┤
│ MUNCH               │ $0                  │
├─────────────────────┼─────────────────────┤
│ MUNI                │ $0                  │
├─────────────────────┼─────────────────────┤
│ MUSD                │ $1.001              │
├─────────────────────┼─────────────────────┤
│ MUSE                │ $5.87               │
├─────────────────────┼─────────────────────┤
│ MUSK                │ $0.007              │
├─────────────────────┼─────────────────────┤
│ MUST                │ $11.62              │
├─────────────────────┼─────────────────────┤
│ MUTE                │ $0.613              │
├─────────────────────┼─────────────────────┤
│ MUU                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ MV                  │ $0.109              │
├─────────────────────┼─────────────────────┤
│ MVC                 │ $0.003              │
├─────────────────────┼─────────────────────┤
│ MVD                 │ $6.65               │
├─────────────────────┼─────────────────────┤
│ MVEDA               │ $0.001              │
├─────────────────────┼─────────────────────┤
│ MVI                 │ $19.28              │
├─────────────────────┼─────────────────────┤
│ MVL                 │ $0.003              │
├─────────────────────┼─────────────────────┤
│ MVRC                │ $0.003              │
├─────────────────────┼─────────────────────┤
│ MVRS                │ $0                  │
├─────────────────────┼─────────────────────┤
│ MX                  │ $2.94               │
├─────────────────────┼─────────────────────┤
│ MXC                 │ $0.015              │
├─────────────────────┼─────────────────────┤
│ MXNT                │ $0.057              │
├─────────────────────┼─────────────────────┤
│ MXT                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ MYB                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ MYC                 │ $0.008              │
├─────────────────────┼─────────────────────┤
│ MYCE                │ $0                  │
├─────────────────────┼─────────────────────┤
│ MYOBU               │ $0                  │
├─────────────────────┼─────────────────────┤
│ MYST                │ $0.249              │
├─────────────────────┼─────────────────────┤
│ MYTH                │ $0.529              │
├─────────────────────┼─────────────────────┤
│ N                   │ $0                  │
├─────────────────────┼─────────────────────┤
│ N1                  │ $0.009              │
├─────────────────────┼─────────────────────┤
│ NAAL                │ $0.055              │
├─────────────────────┼─────────────────────┤
│ NABOX               │ $0                  │
├─────────────────────┼─────────────────────┤
│ NAME                │ $0.035              │
├─────────────────────┼─────────────────────┤
│ NAMI                │ $0.011              │
├─────────────────────┼─────────────────────┤
│ NAO                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ NAOS                │ $0.016              │
├─────────────────────┼─────────────────────┤
│ NARUTO              │ $0                  │
├─────────────────────┼─────────────────────┤
│ NAS                 │ $0.011              │
├─────────────────────┼─────────────────────┤
│ NATION              │ $419.62             │
├─────────────────────┼─────────────────────┤
│ NAVI                │ $0.054              │
├─────────────────────┼─────────────────────┤
│ NBC                 │ $0.002              │
├─────────────────────┼─────────────────────┤
│ NBT                 │ $0.003              │
├─────────────────────┼─────────────────────┤
│ NCASH               │ $0                  │
├─────────────────────┼─────────────────────┤
│ NCDT                │ $0.073              │
├─────────────────────┼─────────────────────┤
│ NCR                 │ $0.091              │
├─────────────────────┼─────────────────────┤
│ NCT                 │ $0.009              │
├─────────────────────┼─────────────────────┤
│ NDS                 │ $3.44               │
├─────────────────────┼─────────────────────┤
│ NDX                 │ $0.018              │
├─────────────────────┼─────────────────────┤
│ NEBO                │ $1.54               │
├─────────────────────┼─────────────────────┤
│ NEEO                │ $0                  │
├─────────────────────┼─────────────────────┤
│ NEKO                │ $0                  │
├─────────────────────┼─────────────────────┤
│ NEPT                │ $0                  │
├─────────────────────┼─────────────────────┤
│ NERF                │ $2.08               │
├─────────────────────┼─────────────────────┤
│ NEST                │ $0.013              │
├─────────────────────┼─────────────────────┤
│ NET                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ NEU                 │ $0.006              │
├─────────────────────┼─────────────────────┤
│ NEURONI             │ $0.05               │
├─────────────────────┼─────────────────────┤
│ NEWO                │ $0.022              │
├─────────────────────┼─────────────────────┤
│ NEWS                │ $0.004              │
├─────────────────────┼─────────────────────┤
│ NEX                 │ $0.116              │
├─────────────────────┼─────────────────────┤
│ NEXM                │ $0.029              │
├─────────────────────┼─────────────────────┤
│ NEXO                │ $0.664              │
├─────────────────────┼─────────────────────┤
│ NEXT                │ $0.03               │
├─────────────────────┼─────────────────────┤
│ NEZUKO              │ $0                  │
├─────────────────────┼─────────────────────┤
│ NFAI                │ $0.085              │
├─────────────────────┼─────────────────────┤
│ NFD                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ NFP                 │ $0.007              │
├─────────────────────┼─────────────────────┤
│ NFT                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ NFTD                │ $0.021              │
├─────────────────────┼─────────────────────┤
│ NFTE                │ $0.001              │
├─────────────────────┼─────────────────────┤
│ NFTFY               │ $0.008              │
├─────────────────────┼─────────────────────┤
│ NFTI                │ $3.98               │
├─────────────────────┼─────────────────────┤
│ NFTL                │ $0.004              │
├─────────────────────┼─────────────────────┤
│ NFTS                │ $0.061              │
├─────────────────────┼─────────────────────┤
│ NFTX                │ $14.77              │
├─────────────────────┼─────────────────────┤
│ NFTY                │ $0.002              │
├─────────────────────┼─────────────────────┤
│ NFUP                │ $0.001              │
├─────────────────────┼─────────────────────┤
│ NFY                 │ $0.886              │
├─────────────────────┼─────────────────────┤
│ NGC                 │ $0.117              │
├─────────────────────┼─────────────────────┤
│ NGL                 │ $0.156              │
├─────────────────────┼─────────────────────┤
│ NGM                 │ $0.014              │
├─────────────────────┼─────────────────────┤
│ NHT                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ NIFT                │ $0.002              │
├─────────────────────┼─────────────────────┤
│ NII                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ NIIFI               │ $0.001              │
├─────────────────────┼─────────────────────┤
│ NINEFI              │ $0                  │
├─────────────────────┼─────────────────────┤
│ NIOX                │ $0.002              │
├─────────────────────┼─────────────────────┤
│ NITRO               │ $0.004              │
├─────────────────────┼─────────────────────┤
│ NKCLC               │ $1.051              │
├─────────────────────┼─────────────────────┤
│ NKN                 │ $0.114              │
├─────────────────────┼─────────────────────┤
│ NKPL                │ $1.2                │
├─────────────────────┼─────────────────────┤
│ NMR                 │ $15.4               │
├─────────────────────┼─────────────────────┤
│ NMS                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ NMT                 │ $0.003              │
├─────────────────────┼─────────────────────┤
│ NNT                 │ $0.005              │
├─────────────────────┼─────────────────────┤
│ NOA                 │ $0.003              │
├─────────────────────┼─────────────────────┤
│ NOBI                │ $0                  │
├─────────────────────┼─────────────────────┤
│ NODE                │ $0                  │
├─────────────────────┼─────────────────────┤
│ NOIA                │ $0.041              │
├─────────────────────┼─────────────────────┤
│ NOISEGPT            │ $0.002              │
├─────────────────────┼─────────────────────┤
│ NOKU                │ $0.27               │
├─────────────────────┼─────────────────────┤
│ NOONE               │ $0                  │
├─────────────────────┼─────────────────────┤
│ NORD                │ $0.131              │
├─────────────────────┼─────────────────────┤
│ NOTE                │ $0.173              │
├─────────────────────┼─────────────────────┤
│ NOW                 │ $0.063              │
├─────────────────────┼─────────────────────┤
│ NOWAI               │ $0                  │
├─────────────────────┼─────────────────────┤
│ NPAS                │ $0.015              │
├─────────────────────┼─────────────────────┤
│ NPICK               │ $0                  │
├─────────────────────┼─────────────────────┤
│ NPX                 │ $0.014              │
├─────────────────────┼─────────────────────┤
│ NPXS                │ $0                  │
├─────────────────────┼─────────────────────┤
│ NRCH                │ $1.67               │
├─────────────────────┼─────────────────────┤
│ NRFB                │ $0.002              │
├─────────────────────┼─────────────────────┤
│ NRFX                │ $0.066              │
├─────────────────────┼─────────────────────┤
│ NSBT                │ $1.24               │
├─────────────────────┼─────────────────────┤
│ NSFW                │ $0                  │
├─────────────────────┼─────────────────────┤
│ NST                 │ $0.089              │
├─────────────────────┼─────────────────────┤
│ NSURE               │ $0.008              │
├─────────────────────┼─────────────────────┤
│ NTB                 │ $0.138              │
├─────────────────────┼─────────────────────┤
│ NTK                 │ $0.002              │
├─────────────────────┼─────────────────────┤
│ NTO                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ NTRS                │ $0                  │
├─────────────────────┼─────────────────────┤
│ NTVRK               │ $0.125              │
├─────────────────────┼─────────────────────┤
│ NTX                 │ $0.041              │
├─────────────────────┼─────────────────────┤
│ NU                  │ $0.08               │
├─────────────────────┼─────────────────────┤
│ NUM                 │ $0.045              │
├─────────────────────┼─────────────────────┤
│ NUTS                │ $0.042              │
├─────────────────────┼─────────────────────┤
│ NUX                 │ $0.008              │
├─────────────────────┼─────────────────────┤
│ NVG                 │ $0.019              │
├─────────────────────┼─────────────────────┤
│ NVIR                │ $0.032              │
├─────────────────────┼─────────────────────┤
│ NWC                 │ $0.085              │
├─────────────────────┼─────────────────────┤
│ NXL                 │ $0.296              │
├─────────────────────┼─────────────────────┤
│ NXM                 │ $51.76              │
├─────────────────────┼─────────────────────┤
│ NXRA                │ $0.054              │
├─────────────────────┼─────────────────────┤
│ NYM                 │ $0.189              │
├─────────────────────┼─────────────────────┤
│ O                   │ $0                  │
├─────────────────────┼─────────────────────┤
│ O3                  │ $0.05               │
├─────────────────────┼─────────────────────┤
│ OAP                 │ $0.007              │
├─────────────────────┼─────────────────────┤
│ OATH                │ $0.088              │
├─────────────────────┼─────────────────────┤
│ OAX                 │ $0.237              │
├─────────────────────┼─────────────────────┤
│ OBOT                │ $0.012              │
├─────────────────────┼─────────────────────┤
│ OBT                 │ $0.064              │
├─────────────────────┼─────────────────────┤
│ OBTC                │ $0.008              │
├─────────────────────┼─────────────────────┤
│ OBX                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ OCB                 │ $0.016              │
├─────────────────────┼─────────────────────┤
│ OCC                 │ $0.151              │
├─────────────────────┼─────────────────────┤
│ OCCT                │ $0                  │
├─────────────────────┼─────────────────────┤
│ OCEAN               │ $0.352              │
├─────────────────────┼─────────────────────┤
│ OCN                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ OCT                 │ $0.192              │
├─────────────────────┼─────────────────────┤
│ OCTO                │ $1.3                │
├─────────────────────┼─────────────────────┤
│ OCTSMM              │ $0.02               │
├─────────────────────┼─────────────────────┤
│ ODA                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ ODDZ                │ $0.014              │
├─────────────────────┼─────────────────────┤
│ ODE                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ ODOGE               │ $0                  │
├─────────────────────┼─────────────────────┤
│ OETH                │ $1,830.33           │
├─────────────────────┼─────────────────────┤
│ OFI                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ OG                  │ $0                  │
├─────────────────────┼─────────────────────┤
│ OGN                 │ $0.092              │
├─────────────────────┼─────────────────────┤
│ OGV                 │ $0.009              │
├─────────────────────┼─────────────────────┤
│ OH                  │ $0.003              │
├─────────────────────┼─────────────────────┤
│ OHM                 │ $56.92              │
├─────────────────────┼─────────────────────┤
│ OHMI                │ $0.003              │
├─────────────────────┼─────────────────────┤
│ OIL                 │ $0.026              │
├─────────────────────┼─────────────────────┤
│ OIN                 │ $0.006              │
├─────────────────────┼─────────────────────┤
│ OJA                 │ $0.012              │
├─────────────────────┼─────────────────────┤
│ OK                  │ $0.006              │
├─────────────────────┼─────────────────────┤
│ OKAGE               │ $0                  │
├─────────────────────┼─────────────────────┤
│ OKB                 │ $46.65              │
├─────────────────────┼─────────────────────┤
│ OKINAMI             │ $0.001              │
├─────────────────────┼─────────────────────┤
│ OKINU               │ $0.005              │
├─────────────────────┼─────────────────────┤
│ OKLG                │ $0                  │
├─────────────────────┼─────────────────────┤
│ OLE                 │ $0.015              │
├─────────────────────┼─────────────────────┤
│ OLEA                │ $0.798              │
├─────────────────────┼─────────────────────┤
│ OLT                 │ $0.006              │
├─────────────────────┼─────────────────────┤
│ OLY                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ OM                  │ $0.027              │
├─────────────────────┼─────────────────────┤
│ OMC                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ OMG                 │ $0.759              │
├─────────────────────┼─────────────────────┤
│ OMI                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ ONC                 │ $0.087              │
├─────────────────────┼─────────────────────┤
│ ONE                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ ONEBTC              │ $0.993              │
├─────────────────────┼─────────────────────┤
│ ONEICHI             │ $0.992              │
├─────────────────────┼─────────────────────┤
│ ONEPIECE            │ $0                  │
├─────────────────────┼─────────────────────┤
│ ONES                │ $0.143              │
├─────────────────────┼─────────────────────┤
│ ONIGI               │ $0.003              │
├─────────────────────┼─────────────────────┤
│ ONIGIRI             │ $0.007              │
├─────────────────────┼─────────────────────┤
│ ONIT                │ $0.033              │
├─────────────────────┼─────────────────────┤
│ ONS                 │ $1.67               │
├─────────────────────┼─────────────────────┤
│ ONSTON              │ $0.004              │
├─────────────────────┼─────────────────────┤
│ ONUS                │ $0.402              │
├─────────────────────┼─────────────────────┤
│ ONX                 │ $0.025              │
├─────────────────────┼─────────────────────┤
│ OOE                 │ $0.017              │
├─────────────────────┼─────────────────────┤
│ OOKI                │ $0.003              │
├─────────────────────┼─────────────────────┤
│ OOKS                │ $0.248              │
├─────────────────────┼─────────────────────┤
│ OPCT                │ $0.009              │
├─────────────────────┼─────────────────────┤
│ OPEN                │ $0.002              │
├─────────────────────┼─────────────────────┤
│ OPENAIERC           │ $0.006              │
├─────────────────────┼─────────────────────┤
│ OPENX               │ $0.001              │
├─────────────────────┼─────────────────────┤
│ OPIUM               │ $0.125              │
├─────────────────────┼─────────────────────┤
│ OPP                 │ $0.005              │
├─────────────────────┼─────────────────────┤
│ OPTI                │ $0.175              │
├─────────────────────┼─────────────────────┤
│ OPTIG               │ $0                  │
├─────────────────────┼─────────────────────┤
│ OPUL                │ $0.115              │
├─────────────────────┼─────────────────────┤
│ ORAI                │ $3.98               │
├─────────────────────┼─────────────────────┤
│ ORAO                │ $0.002              │
├─────────────────────┼─────────────────────┤
│ ORB                 │ $0.085              │
├─────────────────────┼─────────────────────┤
│ ORBN                │ $0.003              │
├─────────────────────┼─────────────────────┤
│ ORBR                │ $1.33               │
├─────────────────────┼─────────────────────┤
│ ORBS                │ $0.025              │
├─────────────────────┼─────────────────────┤
│ ORC                 │ $0.076              │
├─────────────────────┼─────────────────────┤
│ ORD                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ ORE                 │ $0.003              │
├─────────────────────┼─────────────────────┤
│ ORION               │ $0.001              │
├─────────────────────┼─────────────────────┤
│ ORME                │ $0.001              │
├─────────────────────┼─────────────────────┤
│ ORN                 │ $0.879              │
├─────────────────────┼─────────────────────┤
│ ORO                 │ $0.005              │
├─────────────────────┼─────────────────────┤
│ ORS                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ ORT                 │ $0.008              │
├─────────────────────┼─────────────────────┤
│ OSEA                │ $0.015              │
├─────────────────────┼─────────────────────┤
│ OSQTH               │ $104.12             │
├─────────────────────┼─────────────────────┤
│ OST                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ OSWAP               │ $0.003              │
├─────────────────────┼─────────────────────┤
│ OTB                 │ $0.002              │
├─────────────────────┼─────────────────────┤
│ OTHR                │ $0.142              │
├─────────────────────┼─────────────────────┤
│ OUSD                │ $0.999              │
├─────────────────────┼─────────────────────┤
│ OUSG                │ $96.83              │
├─────────────────────┼─────────────────────┤
│ OVO                 │ $0.083              │
├─────────────────────┼─────────────────────┤
│ OVR                 │ $0.711              │
├─────────────────────┼─────────────────────┤
│ OWN                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ OXAI                │ $0                  │
├─────────────────────┼─────────────────────┤
│ OXT                 │ $0.067              │
├─────────────────────┼─────────────────────┤
│ P2PS                │ $93.31              │
├─────────────────────┼─────────────────────┤
│ PAA                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ PACHA               │ $0                  │
├─────────────────────┼─────────────────────┤
│ PACK                │ $0                  │
├─────────────────────┼─────────────────────┤
│ PAD                 │ $0.011              │
├─────────────────────┼─────────────────────┤
│ PAF                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ PAID                │ $0.016              │
├─────────────────────┼─────────────────────┤
│ PAINT               │ $0.001              │
├─────────────────────┼─────────────────────┤
│ PAL                 │ $0.155              │
├─────────────────────┼─────────────────────┤
│ PAN                 │ $0.07               │
├─────────────────────┼─────────────────────┤
│ PANDA               │ $0                  │
├─────────────────────┼─────────────────────┤
│ PANDO               │ $0.006              │
├─────────────────────┼─────────────────────┤
│ PANTO               │ $0.043              │
├─────────────────────┼─────────────────────┤
│ PAPA                │ $0                  │
├─────────────────────┼─────────────────────┤
│ PAPER               │ $0.003              │
├─────────────────────┼─────────────────────┤
│ PAR                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ PARA                │ $0.001              │
├─────────────────────┼─────────────────────┤
│ PARTY               │ $0.003              │
├─────────────────────┼─────────────────────┤
│ PAT                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ PATH                │ $0.007              │
├─────────────────────┼─────────────────────┤
│ PAW                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ PAWTH               │ $0.001              │
├─────────────────────┼─────────────────────┤
│ PAXG                │ $1,964.87           │
├─────────────────────┼─────────────────────┤
│ PAY                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ PAYB                │ $0.428              │
├─────────────────────┼─────────────────────┤
│ PAYT                │ $0.127              │
├─────────────────────┼─────────────────────┤
│ PBR                 │ $0.051              │
├─────────────────────┼─────────────────────┤
│ PBTC                │ $26,820             │
├─────────────────────┼─────────────────────┤
│ PBTC35A             │ $1.92               │
├─────────────────────┼─────────────────────┤
│ PBX                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ PC                  │ $0.001              │
├─────────────────────┼─────────────────────┤
│ PCNT                │ $0.004              │
├─────────────────────┼─────────────────────┤
│ PDEX                │ $1.33               │
├─────────────────────┼─────────────────────┤
│ PDF                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ PDI                 │ $80.21              │
├─────────────────────┼─────────────────────┤
│ PDT                 │ $0.063              │
├─────────────────────┼─────────────────────┤
│ PDX                 │ $48.43              │
├─────────────────────┼─────────────────────┤
│ PEAK                │ $0.002              │
├─────────────────────┼─────────────────────┤
│ PEBBLE              │ $0                  │
├─────────────────────┼─────────────────────┤
│ PEEP                │ $0.01               │
├─────────────────────┼─────────────────────┤
│ PEEPO               │ $0                  │
├─────────────────────┼─────────────────────┤
│ PENDLE              │ $0.419              │
├─────────────────────┼─────────────────────┤
│ PEOPLE              │ $0.017              │
├─────────────────────┼─────────────────────┤
│ PEPA                │ $0                  │
├─────────────────────┼─────────────────────┤
│ PEPE                │ $0                  │
├─────────────────────┼─────────────────────┤
│ PEPEBET             │ $0                  │
├─────────────────────┼─────────────────────┤
│ PEPEDOGE            │ $0                  │
├─────────────────────┼─────────────────────┤
│ PEPEG               │ $0                  │
├─────────────────────┼─────────────────────┤
│ PEPEGPT             │ $0                  │
├─────────────────────┼─────────────────────┤
│ PEPES               │ $0                  │
├─────────────────────┼─────────────────────┤
│ PERC                │ $0.151              │
├─────────────────────┼─────────────────────┤
│ PERI                │ $0.061              │
├─────────────────────┼─────────────────────┤
│ PERL                │ $0.02               │
├─────────────────────┼─────────────────────┤
│ PERP                │ $0.585              │
├─────────────────────┼─────────────────────┤
│ PERX                │ $0                  │
├─────────────────────┼─────────────────────┤
│ PET                 │ $0.151              │
├─────────────────────┼─────────────────────┤
│ PETH                │ $1,897.16           │
├─────────────────────┼─────────────────────┤
│ PETS                │ $0.004              │
├─────────────────────┼─────────────────────┤
│ PGEN                │ $0                  │
├─────────────────────┼─────────────────────┤
│ PGPAY               │ $0.003              │
├─────────────────────┼─────────────────────┤
│ PHA                 │ $0.122              │
├─────────────────────┼─────────────────────┤
│ PHCR                │ $0                  │
├─────────────────────┼─────────────────────┤
│ PHL                 │ $0.012              │
├─────────────────────┼─────────────────────┤
│ PHM                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ PHNX                │ $0.007              │
├─────────────────────┼─────────────────────┤
│ PHONON              │ $0.001              │
├─────────────────────┼─────────────────────┤
│ PHTK                │ $0.001              │
├─────────────────────┼─────────────────────┤
│ PHTR                │ $0.022              │
├─────────────────────┼─────────────────────┤
│ PHUNK               │ $306.6              │
├─────────────────────┼─────────────────────┤
│ PHX                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ PIB                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ PICKLE              │ $1.15               │
├─────────────────────┼─────────────────────┤
│ PIE                 │ $0.002              │
├─────────────────────┼─────────────────────┤
│ PIF                 │ $0.005              │
├─────────────────────┼─────────────────────┤
│ PIGE                │ $0                  │
├─────────────────────┼─────────────────────┤
│ PIKA                │ $0                  │
├─────────────────────┼─────────────────────┤
│ PILOT               │ $1.89               │
├─────────────────────┼─────────────────────┤
│ PIN                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ PINA                │ $0.036              │
├─────────────────────┼─────────────────────┤
│ PINE                │ $0.041              │
├─────────────────────┼─────────────────────┤
│ PING                │ $0.001              │
├─────────────────────┼─────────────────────┤
│ PINU                │ $0                  │
├─────────────────────┼─────────────────────┤
│ PIP                 │ $0.429              │
├─────────────────────┼─────────────────────┤
│ PIPT                │ $0.762              │
├─────────────────────┼─────────────────────┤
│ PIRATE              │ $0.012              │
├─────────────────────┼─────────────────────┤
│ PITCHFXS            │ $4.25               │
├─────────────────────┼─────────────────────┤
│ PIXEL               │ $0                  │
├─────────────────────┼─────────────────────┤
│ PIXIA               │ $0.006              │
├─────────────────────┼─────────────────────┤
│ PIXIU               │ $0.003              │
├─────────────────────┼─────────────────────┤
│ PKEX                │ $0.004              │
├─────────────────────┼─────────────────────┤
│ PKF                 │ $0.168              │
├─────────────────────┼─────────────────────┤
│ PKN                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ PKR                 │ $0.002              │
├─────────────────────┼─────────────────────┤
│ PKT                 │ $0.005              │
├─────────────────────┼─────────────────────┤
│ PLA                 │ $0.177              │
├─────────────────────┼─────────────────────┤
│ PLANB               │ $0.008              │
├─────────────────────┼─────────────────────┤
│ PLAQ                │ $0.003              │
├─────────────────────┼─────────────────────┤
│ PLAY                │ $0.318              │
├─────────────────────┼─────────────────────┤
│ PLBT                │ $0.217              │
├─────────────────────┼─────────────────────┤
│ PLEB                │ $0                  │
├─────────────────────┼─────────────────────┤
│ PLOT                │ $0.007              │
├─────────────────────┼─────────────────────┤
│ PLQ                 │ $0.025              │
├─────────────────────┼─────────────────────┤
│ PLR                 │ $0.005              │
├─────────────────────┼─────────────────────┤
│ PLSB                │ $0.054              │
├─────────────────────┼─────────────────────┤
│ PLSCX               │ $0.003              │
├─────────────────────┼─────────────────────┤
│ PLSD                │ $0.208              │
├─────────────────────┼─────────────────────┤
│ PLT                 │ $0.061              │
├─────────────────────┼─────────────────────┤
│ PLU                 │ $9.77               │
├─────────────────────┼─────────────────────┤
│ PLUG                │ $0.001              │
├─────────────────────┼─────────────────────┤
│ PLUMS               │ $0                  │
├─────────────────────┼─────────────────────┤
│ PLY                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ PMA                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ PMD                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ PMGT                │ $1,940              │
├─────────────────────┼─────────────────────┤
│ PMON                │ $0.396              │
├─────────────────────┼─────────────────────┤
│ PMT                 │ $0.015              │
├─────────────────────┼─────────────────────┤
│ PNK                 │ $0.025              │
├─────────────────────┼─────────────────────┤
│ PNL                 │ $0.019              │
├─────────────────────┼─────────────────────┤
│ PNODE               │ $0.001              │
├─────────────────────┼─────────────────────┤
│ PNT                 │ $0.119              │
├─────────────────────┼─────────────────────┤
│ POA                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ POC                 │ $0.048              │
├─────────────────────┼─────────────────────┤
│ POCHI               │ $0                  │
├─────────────────────┼─────────────────────┤
│ POE                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ POINT               │ $0                  │
├─────────────────────┼─────────────────────┤
│ POL                 │ $0.002              │
├─────────────────────┼─────────────────────┤
│ POLA                │ $0.011              │
├─────────────────────┼─────────────────────┤
│ POLAR               │ $0.019              │
├─────────────────────┼─────────────────────┤
│ POLC                │ $0.016              │
├─────────────────────┼─────────────────────┤
│ POLI                │ $0.001              │
├─────────────────────┼─────────────────────┤
│ POLK                │ $0.038              │
├─────────────────────┼─────────────────────┤
│ POLL                │ $0.001              │
├─────────────────────┼─────────────────────┤
│ POLS                │ $0.345              │
├─────────────────────┼─────────────────────┤
│ POLY                │ $0                  │
├─────────────────────┼─────────────────────┤
│ POM                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ POMI                │ $0                  │
├─────────────────────┼─────────────────────┤
│ POND                │ $0.008              │
├─────────────────────┼─────────────────────┤
│ POOF                │ $0.151              │
├─────────────────────┼─────────────────────┤
│ POOH                │ $0                  │
├─────────────────────┼─────────────────────┤
│ POOL                │ $0.755              │
├─────────────────────┼─────────────────────┤
│ POOLZ               │ $0.009              │
├─────────────────────┼─────────────────────┤
│ POP                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ PORTX               │ $0.014              │
├─────────────────────┼─────────────────────┤
│ POS32               │ $0.001              │
├─────────────────────┼─────────────────────┤
│ POW                 │ $0.02               │
├─────────────────────┼─────────────────────┤
│ POWER               │ $0.17               │
├─────────────────────┼─────────────────────┤
│ POWR                │ $0.153              │
├─────────────────────┼─────────────────────┤
│ PP                  │ $0                  │
├─────────────────────┼─────────────────────┤
│ PPAI                │ $0.005              │
├─────────────────────┼─────────────────────┤
│ PPAY                │ $0.003              │
├─────────────────────┼─────────────────────┤
│ PPC                 │ $0.374              │
├─────────────────────┼─────────────────────┤
│ PPDEX               │ $0.554              │
├─────────────────────┼─────────────────────┤
│ PPIZZA              │ $0                  │
├─────────────────────┼─────────────────────┤
│ PPT                 │ $0.035              │
├─────────────────────┼─────────────────────┤
│ PRARE               │ $0.004              │
├─────────────────────┼─────────────────────┤
│ PRBLY               │ $0.002              │
├─────────────────────┼─────────────────────┤
│ PRCY                │ $0.017              │
├─────────────────────┼─────────────────────┤
│ PRE                 │ $0.043              │
├─────────────────────┼─────────────────────┤
│ PREMIA              │ $0.633              │
├─────────────────────┼─────────────────────┤
│ PRIMAL              │ $0.002              │
├─────────────────────┼─────────────────────┤
│ PRIMATE             │ $0.006              │
├─────────────────────┼─────────────────────┤
│ PRIME               │ $1.23               │
├─────────────────────┼─────────────────────┤
│ PRINTS              │ $1.58               │
├─────────────────────┼─────────────────────┤
│ PRIX                │ $0.045              │
├─────────────────────┼─────────────────────┤
│ PRMX                │ $0                  │
├─────────────────────┼─────────────────────┤
│ PRNT                │ $0.693              │
├─────────────────────┼─────────────────────┤
│ PRO                 │ $0.34               │
├─────────────────────┼─────────────────────┤
│ PROB                │ $0.085              │
├─────────────────────┼─────────────────────┤
│ PROM                │ $4.32               │
├─────────────────────┼─────────────────────┤
│ PROP                │ $0.133              │
├─────────────────────┼─────────────────────┤
│ PROPS               │ $0.001              │
├─────────────────────┼─────────────────────┤
│ PROS                │ $0.41               │
├─────────────────────┼─────────────────────┤
│ PROT                │ $0                  │
├─────────────────────┼─────────────────────┤
│ PROXY               │ $0                  │
├─────────────────────┼─────────────────────┤
│ PRQ                 │ $0.092              │
├─────────────────────┼─────────────────────┤
│ PRT                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ PRTG                │ $5.47               │
├─────────────────────┼─────────────────────┤
│ PRUF                │ $0                  │
├─────────────────────┼─────────────────────┤
│ PRV                 │ $0.154              │
├─────────────────────┼─────────────────────┤
│ PRVG                │ $0.014              │
├─────────────────────┼─────────────────────┤
│ PS1                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ PSDN                │ $3.07               │
├─────────────────────┼─────────────────────┤
│ PSL                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ PSP                 │ $0.033              │
├─────────────────────┼─────────────────────┤
│ PST                 │ $0.002              │
├─────────────────────┼─────────────────────┤
│ PSTAKE              │ $0.045              │
├─────────────────────┼─────────────────────┤
│ PSWAP               │ $0.001              │
├─────────────────────┼─────────────────────┤
│ PTF                 │ $0.011              │
├─────────────────────┼─────────────────────┤
│ PTM                 │ $0.011              │
├─────────────────────┼─────────────────────┤
│ PTOY                │ $0.013              │
├─────────────────────┼─────────────────────┤
│ PTU                 │ $0.333              │
├─────────────────────┼─────────────────────┤
│ PUBLX               │ $0.001              │
├─────────────────────┼─────────────────────┤
│ PUDGY               │ $10,612.83          │
├─────────────────────┼─────────────────────┤
│ PUGL                │ $0                  │
├─────────────────────┼─────────────────────┤
│ PULSE               │ $0.024              │
├─────────────────────┼─────────────────────┤
│ PUMLX               │ $0.022              │
├─────────────────────┼─────────────────────┤
│ PUNDIX              │ $0.386              │
├─────────────────────┼─────────────────────┤
│ PUNK                │ $94,035             │
├─────────────────────┼─────────────────────┤
│ PURE                │ $0                  │
├─────────────────────┼─────────────────────┤
│ PUSH                │ $0.299              │
├─────────────────────┼─────────────────────┤
│ PUSSY               │ $0                  │
├─────────────────────┼─────────────────────┤
│ PUSUKE              │ $0                  │
├─────────────────────┼─────────────────────┤
│ PVT                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ PWRC                │ $0.001              │
├─────────────────────┼─────────────────────┤
│ PXG                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ PXP                 │ $0.015              │
├─────────────────────┼─────────────────────┤
│ PYR                 │ $3.65               │
├─────────────────────┼─────────────────────┤
│ PYRO                │ $0.098              │
├─────────────────────┼─────────────────────┤
│ PZ                  │ $0                  │
├─────────────────────┼─────────────────────┤
│ QANX                │ $0.008              │
├─────────────────────┼─────────────────────┤
│ QASH                │ $0.048              │
├─────────────────────┼─────────────────────┤
│ QCX                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ QDT                 │ $0.074              │
├─────────────────────┼─────────────────────┤
│ QETH                │ $1,875.05           │
├─────────────────────┼─────────────────────┤
│ QKC                 │ $0.009              │
├─────────────────────┼─────────────────────┤
│ QLINDO              │ $0.04               │
├─────────────────────┼─────────────────────┤
│ QLT                 │ $29.12              │
├─────────────────────┼─────────────────────┤
│ QMALL               │ $0.133              │
├─────────────────────┼─────────────────────┤
│ QNT                 │ $101.6              │
├─────────────────────┼─────────────────────┤
│ QOM                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ QQQ                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ QR                  │ $0                  │
├─────────────────────┼─────────────────────┤
│ QRDO                │ $0.105              │
├─────────────────────┼─────────────────────┤
│ QRX                 │ $0.004              │
├─────────────────────┼─────────────────────┤
│ QSP                 │ $0.013              │
├─────────────────────┼─────────────────────┤
│ QTCON               │ $0.001              │
├─────────────────────┼─────────────────────┤
│ QTF                 │ $8.07               │
├─────────────────────┼─────────────────────┤
│ QTO                 │ $0.008              │
├─────────────────────┼─────────────────────┤
│ QUA                 │ $0.006              │
├─────────────────────┼─────────────────────┤
│ QUAD                │ $0.018              │
├─────────────────────┼─────────────────────┤
│ QUARTZ              │ $0.256              │
├─────────────────────┼─────────────────────┤
│ QUICK               │ $58.4               │
├─────────────────────┼─────────────────────┤
│ QUID                │ $0.001              │
├─────────────────────┼─────────────────────┤
│ QUIDD               │ $0.012              │
├─────────────────────┼─────────────────────┤
│ QWLA                │ $0.795              │
├─────────────────────┼─────────────────────┤
│ R34P                │ $40.46              │
├─────────────────────┼─────────────────────┤
│ RABBIT              │ $0                  │
├─────────────────────┼─────────────────────┤
│ RAC                 │ $0.335              │
├─────────────────────┼─────────────────────┤
│ RACA                │ $0                  │
├─────────────────────┼─────────────────────┤
│ RAD                 │ $1.88               │
├─────────────────────┼─────────────────────┤
│ RADAR               │ $0.007              │
├─────────────────────┼─────────────────────┤
│ RADIO               │ $0.001              │
├─────────────────────┼─────────────────────┤
│ RAE                 │ $1.085              │
├─────────────────────┼─────────────────────┤
│ RAGE                │ $0.001              │
├─────────────────────┼─────────────────────┤
│ RAI                 │ $2.78               │
├─────────────────────┼─────────────────────┤
│ RAID                │ $0.003              │
├─────────────────────┼─────────────────────┤
│ RAIL                │ $0.538              │
├─────────────────────┼─────────────────────┤
│ RAIN                │ $0.002              │
├─────────────────────┼─────────────────────┤
│ RAINI               │ $0.016              │
├─────────────────────┼─────────────────────┤
│ RAK                 │ $19.86              │
├─────────────────────┼─────────────────────┤
│ RAMP                │ $0.053              │
├─────────────────────┼─────────────────────┤
│ RANKER              │ $0.002              │
├─────────────────────┼─────────────────────┤
│ RARE                │ $0.014              │
├─────────────────────┼─────────────────────┤
│ RARI                │ $1.19               │
├─────────────────────┼─────────────────────┤
│ RATING              │ $0                  │
├─────────────────────┼─────────────────────┤
│ RAZE                │ $0.004              │
├─────────────────────┼─────────────────────┤
│ RAZOR               │ $0.006              │
├─────────────────────┼─────────────────────┤
│ RBC                 │ $0.011              │
├─────────────────────┼─────────────────────┤
│ RBIF                │ $0                  │
├─────────────────────┼─────────────────────┤
│ RBIS                │ $0.049              │
├─────────────────────┼─────────────────────┤
│ RBN                 │ $0.159              │
├─────────────────────┼─────────────────────┤
│ RBX                 │ $0.063              │
├─────────────────────┼─────────────────────┤
│ RBXS                │ $0.003              │
├─────────────────────┼─────────────────────┤
│ RCG                 │ $0.244              │
├─────────────────────┼─────────────────────┤
│ RCN                 │ $0.002              │
├─────────────────────┼─────────────────────┤
│ RDN                 │ $0.008              │
├─────────────────────┼─────────────────────┤
│ RDPX                │ $25.43              │
├─────────────────────┼─────────────────────┤
│ RDT                 │ $0.017              │
├─────────────────────┼─────────────────────┤
│ REALM               │ $0.007              │
├─────────────────────┼─────────────────────┤
│ REALT-S-12405-SANTA │ $51.21              │
├─────────────────────┼─────────────────────┤
│ REALT-S-14066-SANTA │ $59.24              │
├─────────────────────┼─────────────────────┤
│ REALT-S-1617-SAVERS │ $55.72              │
├─────────────────────┼─────────────────────┤
│ REALT-S-4852-4854-W │ $54.44              │
├─────────────────────┼─────────────────────┤
│ REAP                │ $0.005              │
├─────────────────────┼─────────────────────┤
│ RED                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ REDPANDA            │ $0.703              │
├─────────────────────┼─────────────────────┤
│ REEF                │ $0.002              │
├─────────────────────┼─────────────────────┤
│ REF                 │ $0.049              │
├─────────────────────┼─────────────────────┤
│ REKT                │ $0.003              │
├─────────────────────┼─────────────────────┤
│ REL                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ RELAX               │ $0                  │
├─────────────────────┼─────────────────────┤
│ RELAY               │ $0.275              │
├─────────────────────┼─────────────────────┤
│ RELIC               │ $0                  │
├─────────────────────┼─────────────────────┤
│ REM                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ REN                 │ $0.074              │
├─────────────────────┼─────────────────────┤
│ RENA                │ $0.077              │
├─────────────────────┼─────────────────────┤
│ RENBTC              │ $28,158             │
├─────────────────────┼─────────────────────┤
│ RENBTCCURVE         │ $27,477             │
├─────────────────────┼─────────────────────┤
│ RENDOGE             │ $0.034              │
├─────────────────────┼─────────────────────┤
│ RENQ                │ $0.024              │
├─────────────────────┼─────────────────────┤
│ REP                 │ $6.58               │
├─────────────────────┼─────────────────────┤
│ REQ                 │ $0.084              │
├─────────────────────┼─────────────────────┤
│ RESET               │ $0.001              │
├─────────────────────┼─────────────────────┤
│ RET                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ RETH                │ $1,964.25           │
├─────────────────────┼─────────────────────┤
│ RETH2               │ $1,814.12           │
├─────────────────────┼─────────────────────┤
│ REUNI               │ $2.13               │
├─────────────────────┼─────────────────────┤
│ REV                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ REVO                │ $0.038              │
├─────────────────────┼─────────────────────┤
│ REVOAI              │ $0.001              │
├─────────────────────┼─────────────────────┤
│ REVV                │ $0.009              │
├─────────────────────┼─────────────────────┤
│ RFI                 │ $0.006              │
├─────────────────────┼─────────────────────┤
│ RFOX                │ $0.009              │
├─────────────────────┼─────────────────────┤
│ RFR                 │ $0.005              │
├─────────────────────┼─────────────────────┤
│ RFUEL               │ $0.005              │
├─────────────────────┼─────────────────────┤
│ RFX                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ RGP                 │ $0.024              │
├─────────────────────┼─────────────────────┤
│ RGT                 │ $0.478              │
├─────────────────────┼─────────────────────┤
│ RHEGIC2             │ $0.019              │
├─────────────────────┼─────────────────────┤
│ RHLLOR              │ $0                  │
├─────────────────────┼─────────────────────┤
│ RHO                 │ $36.94              │
├─────────────────────┼─────────────────────┤
│ RI                  │ $0.007              │
├─────────────────────┼─────────────────────┤
│ RIA                 │ $0.002              │
├─────────────────────┼─────────────────────┤
│ RICE                │ $0.001              │
├─────────────────────┼─────────────────────┤
│ RIFI                │ $0.005              │
├─────────────────────┼─────────────────────┤
│ RING                │ $0.004              │
├─────────────────────┼─────────────────────┤
│ RINIA               │ $0.005              │
├─────────────────────┼─────────────────────┤
│ RIO                 │ $0.138              │
├─────────────────────┼─────────────────────┤
│ RIOT                │ $0.001              │
├─────────────────────┼─────────────────────┤
│ RISE                │ $0                  │
├─────────────────────┼─────────────────────┤
│ RISU                │ $0                  │
├─────────────────────┼─────────────────────┤
│ RJV                 │ $0.038              │
├─────────────────────┼─────────────────────┤
│ RLC                 │ $1.58               │
├─────────────────────┼─────────────────────┤
│ RLTM                │ $0.024              │
├─────────────────────┼─────────────────────┤
│ RLY                 │ $0.008              │
├─────────────────────┼─────────────────────┤
│ RMATIC              │ $1.033              │
├─────────────────────┼─────────────────────┤
│ RMRK                │ $1.8                │
├─────────────────────┼─────────────────────┤
│ RNB                 │ $0.012              │
├─────────────────────┼─────────────────────┤
│ RNBW                │ $0                  │
├─────────────────────┼─────────────────────┤
│ RND                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ RNDR                │ $2.63               │
├─────────────────────┼─────────────────────┤
│ RNT                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ ROBO                │ $0.01               │
├─────────────────────┼─────────────────────┤
│ ROBOT               │ $2.11               │
├─────────────────────┼─────────────────────┤
│ ROCK                │ $0.001              │
├─────────────────────┼─────────────────────┤
│ ROCKI               │ $0.011              │
├─────────────────────┼─────────────────────┤
│ ROG                 │ $0.271              │
├─────────────────────┼─────────────────────┤
│ ROGE                │ $0                  │
├─────────────────────┼─────────────────────┤
│ ROKO                │ $0                  │
├─────────────────────┼─────────────────────┤
│ ROO                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ ROOBEE              │ $0.001              │
├─────────────────────┼─────────────────────┤
│ ROOK                │ $53.57              │
├─────────────────────┼─────────────────────┤
│ ROOT                │ $0.922              │
├─────────────────────┼─────────────────────┤
│ ROUTE               │ $2.64               │
├─────────────────────┼─────────────────────┤
│ ROVI                │ $0.054              │
├─────────────────────┼─────────────────────┤
│ ROYA                │ $0.007              │
├─────────────────────┼─────────────────────┤
│ RPG                 │ $0.811              │
├─────────────────────┼─────────────────────┤
│ RPL                 │ $47.31              │
├─────────────────────┼─────────────────────┤
│ RR                  │ $0                  │
├─────────────────────┼─────────────────────┤
│ RSC                 │ $0.009              │
├─────────────────────┼─────────────────────┤
│ RSFT                │ $0.284              │
├─────────────────────┼─────────────────────┤
│ RSR                 │ $0.003              │
├─────────────────────┼─────────────────────┤
│ RSS3                │ $0.108              │
├─────────────────────┼─────────────────────┤
│ RSV                 │ $0.997              │
├─────────────────────┼─────────────────────┤
│ RTH                 │ $0.495              │
├─────────────────────┼─────────────────────┤
│ RUFF                │ $0                  │
├─────────────────────┼─────────────────────┤
│ RUG                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ RUN                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ RUNE                │ $0.245              │
├─────────────────────┼─────────────────────┤
│ RUSH                │ $0                  │
├─────────────────────┼─────────────────────┤
│ RUSHAI              │ $0.001              │
├─────────────────────┼─────────────────────┤
│ RVF                 │ $0.079              │
├─────────────────────┼─────────────────────┤
│ RVP                 │ $0.012              │
├─────────────────────┼─────────────────────┤
│ RVST                │ $0.039              │
├─────────────────────┼─────────────────────┤
│ RVUSD               │ $0.175              │
├─────────────────────┼─────────────────────┤
│ RWS                 │ $4,270.12           │
├─────────────────────┼─────────────────────┤
│ RYOSHI              │ $0                  │
├─────────────────────┼─────────────────────┤
│ Real Estate         │ $1,000,000          │
├─────────────────────┼─────────────────────┤
│ S4F                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ SAFEEARTH           │ $0                  │
├─────────────────────┼─────────────────────┤
│ SAI                 │ $9.29               │
├─────────────────────┼─────────────────────┤
│ SAIKO               │ $0                  │
├─────────────────────┼─────────────────────┤
│ SAITAMA             │ $0.001              │
├─────────────────────┼─────────────────────┤
│ SAITANOBI           │ $0                  │
├─────────────────────┼─────────────────────┤
│ SAITO               │ $0.011              │
├─────────────────────┼─────────────────────┤
│ SAITOKI             │ $0                  │
├─────────────────────┼─────────────────────┤
│ SAK                 │ $0.002              │
├─────────────────────┼─────────────────────┤
│ SAK3                │ $689.15             │
├─────────────────────┼─────────────────────┤
│ SAKE                │ $0.001              │
├─────────────────────┼─────────────────────┤
│ SAKURA              │ $0.096              │
├─────────────────────┼─────────────────────┤
│ SALE                │ $0.116              │
├─────────────────────┼─────────────────────┤
│ SALT                │ $0.031              │
├─────────────────────┼─────────────────────┤
│ SAN                 │ $0.06               │
├─────────────────────┼─────────────────────┤
│ SAND                │ $0.529              │
├─────────────────────┼─────────────────────┤
│ SANI                │ $0                  │
├─────────────────────┼─────────────────────┤
│ SANSHU              │ $0                  │
├─────────────────────┼─────────────────────┤
│ SAO                 │ $0.004              │
├─────────────────────┼─────────────────────┤
│ SARCO               │ $0.112              │
├─────────────────────┼─────────────────────┤
│ SASHIMI             │ $0.005              │
├─────────────────────┼─────────────────────┤
│ SAT                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ SATA                │ $0.011              │
├─────────────────────┼─────────────────────┤
│ SATOZ               │ $0.017              │
├─────────────────────┼─────────────────────┤
│ SATS                │ $0.005              │
├─────────────────────┼─────────────────────┤
│ SATT                │ $0                  │
├─────────────────────┼─────────────────────┤
│ SAUDISHIB           │ $0                  │
├─────────────────────┼─────────────────────┤
│ SBET                │ $0                  │
├─────────────────────┼─────────────────────┤
│ SBLX                │ $0                  │
├─────────────────────┼─────────────────────┤
│ SBTC                │ $26,741             │
├─────────────────────┼─────────────────────┤
│ SCA                 │ $0.018              │
├─────────────────────┼─────────────────────┤
│ SCAN                │ $0.003              │
├─────────────────────┼─────────────────────┤
│ SCCN                │ $0.002              │
├─────────────────────┼─────────────────────┤
│ SCURVE              │ $1.064              │
├─────────────────────┼─────────────────────┤
│ SCX                 │ $127.75             │
├─────────────────────┼─────────────────────┤
│ SD                  │ $0.972              │
├─────────────────────┼─────────────────────┤
│ SDAO                │ $0.404              │
├─────────────────────┼─────────────────────┤
│ SDCRV               │ $0.85               │
├─────────────────────┼─────────────────────┤
│ SDEX                │ $0.005              │
├─────────────────────┼─────────────────────┤
│ SDG                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ SDL                 │ $0.006              │
├─────────────────────┼─────────────────────┤
│ SDT                 │ $0.401              │
├─────────────────────┼─────────────────────┤
│ SEAN                │ $0.003              │
├─────────────────────┼─────────────────────┤
│ SEDO                │ $0.02               │
├─────────────────────┼─────────────────────┤
│ SEED                │ $3.08               │
├─────────────────────┼─────────────────────┤
│ SEELE               │ $0                  │
├─────────────────────┼─────────────────────┤
│ SEFI                │ $0.001              │
├─────────────────────┼─────────────────────┤
│ SELECT              │ $0                  │
├─────────────────────┼─────────────────────┤
│ SENATE              │ $0.028              │
├─────────────────────┼─────────────────────┤
│ SENC                │ $0                  │
├─────────────────────┼─────────────────────┤
│ SENSO               │ $0.099              │
├─────────────────────┼─────────────────────┤
│ SENT                │ $0.001              │
├─────────────────────┼─────────────────────┤
│ SER                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ SEREN               │ $0                  │
├─────────────────────┼─────────────────────┤
│ SERP                │ $0.001              │
├─────────────────────┼─────────────────────┤
│ SETH                │ $1,825.74           │
├─────────────────────┼─────────────────────┤
│ SETH2               │ $1,817.45           │
├─────────────────────┼─────────────────────┤
│ SETS                │ $0.01               │
├─────────────────────┼─────────────────────┤
│ SEUR                │ $1.075              │
├─────────────────────┼─────────────────────┤
│ SEURO               │ $0.813              │
├─────────────────────┼─────────────────────┤
│ SFCP                │ $0                  │
├─────────────────────┼─────────────────────┤
│ SFG                 │ $0.004              │
├─────────────────────┼─────────────────────┤
│ SFI                 │ $26.77              │
├─────────────────────┼─────────────────────┤
│ SFIL                │ $0.648              │
├─────────────────────┼─────────────────────┤
│ SFRXETH             │ $1,905.64           │
├─────────────────────┼─────────────────────┤
│ SG                  │ $0.018              │
├─────────────────────┼─────────────────────┤
│ SGTV2               │ $0.523              │
├─────────────────────┼─────────────────────┤
│ SHA                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ SHACK               │ $0                  │
├─────────────────────┼─────────────────────┤
│ SHADOWCATS          │ $0.05               │
├─────────────────────┼─────────────────────┤
│ SHAKE               │ $49.45              │
├─────────────────────┼─────────────────────┤
│ SHAMAN              │ $0                  │
├─────────────────────┼─────────────────────┤
│ SHANG               │ $0                  │
├─────────────────────┼─────────────────────┤
│ SHARBI              │ $0                  │
├─────────────────────┼─────────────────────┤
│ SHARE               │ $0.005              │
├─────────────────────┼─────────────────────┤
│ SHEESHA             │ $6.06               │
├─────────────────────┼─────────────────────┤
│ SHFT                │ $0.006              │
├─────────────────────┼─────────────────────┤
│ SHI                 │ $0.002              │
├─────────────────────┼─────────────────────┤
│ SHIB                │ $0                  │
├─────────────────────┼─────────────────────┤
│ SHIB05              │ $0.177              │
├─────────────────────┼─────────────────────┤
│ SHIBAKEN            │ $0                  │
├─────────────────────┼─────────────────────┤
│ SHIBAMON            │ $0                  │
├─────────────────────┼─────────────────────┤
│ SHIBDAO             │ $0.001              │
├─────────────────────┼─────────────────────┤
│ SHIBDOGE            │ $0                  │
├─────────────────────┼─────────────────────┤
│ SHIBELON            │ $0                  │
├─────────────────────┼─────────────────────┤
│ SHIBGF              │ $0                  │
├─────────────────────┼─────────────────────┤
│ SHIBGUN             │ $0                  │
├─────────────────────┼─────────────────────┤
│ SHIBMERICAN         │ $0                  │
├─────────────────────┼─────────────────────┤
│ SHIBN               │ $0                  │
├─────────────────────┼─────────────────────┤
│ SHIBO               │ $0                  │
├─────────────────────┼─────────────────────┤
│ SHIBP               │ $0.05               │
├─────────────────────┼─────────────────────┤
│ SHIBTAMA            │ $0                  │
├─────────────────────┼─────────────────────┤
│ SHIBU               │ $0                  │
├─────────────────────┼─────────────────────┤
│ SHIDO               │ $0                  │
├─────────────────────┼─────────────────────┤
│ SHIELD              │ $0                  │
├─────────────────────┼─────────────────────┤
│ SHIH                │ $0                  │
├─────────────────────┼─────────────────────┤
│ SHIK                │ $0                  │
├─────────────────────┼─────────────────────┤
│ SHIL                │ $0                  │
├─────────────────────┼─────────────────────┤
│ SHIN                │ $0.004              │
├─────────────────────┼─────────────────────┤
│ SHINJA              │ $0                  │
├─────────────────────┼─────────────────────┤
│ SHINJI              │ $0                  │
├─────────────────────┼─────────────────────┤
│ SHINO               │ $0                  │
├─────────────────────┼─────────────────────┤
│ SHINSHU             │ $0                  │
├─────────────────────┼─────────────────────┤
│ SHINTAMA            │ $0                  │
├─────────────────────┼─────────────────────┤
│ SHINU               │ $0                  │
├─────────────────────┼─────────────────────┤
│ SHIRD               │ $0                  │
├─────────────────────┼─────────────────────┤
│ SHIRYO-INU          │ $0                  │
├─────────────────────┼─────────────────────┤
│ SHIT                │ $0                  │
├─────────────────────┼─────────────────────┤
│ SHIWA               │ $0                  │
├─────────────────────┼─────────────────────┤
│ SHKOOBY             │ $0                  │
├─────────────────────┼─────────────────────┤
│ SHOE                │ $0.005              │
├─────────────────────┼─────────────────────┤
│ SHOP                │ $0.02               │
├─────────────────────┼─────────────────────┤
│ SHOPX               │ $0.01               │
├─────────────────────┼─────────────────────┤
│ SHPING              │ $0.004              │
├─────────────────────┼─────────────────────┤
│ SHR                 │ $0.002              │
├─────────────────────┼─────────────────────┤
│ SHROOM              │ $0.033              │
├─────────────────────┼─────────────────────┤
│ SHUEY               │ $0                  │
├─────────────────────┼─────────────────────┤
│ SI                  │ $0.066              │
├─────────────────────┼─────────────────────┤
│ SIDUS               │ $0.001              │
├─────────────────────┼─────────────────────┤
│ SIFU                │ $57.99              │
├─────────────────────┼─────────────────────┤
│ SIG                 │ $0.005              │
├─────────────────────┼─────────────────────┤
│ SIGIL               │ $0                  │
├─────────────────────┼─────────────────────┤
│ SIGN                │ $0.014              │
├─────────────────────┼─────────────────────┤
│ SILK                │ $0.366              │
├─────────────────────┼─────────────────────┤
│ SILO                │ $0.071              │
├─────────────────────┼─────────────────────┤
│ SILV                │ $0.757              │
├─────────────────────┼─────────────────────┤
│ SILV2               │ $42.33              │
├─────────────────────┼─────────────────────┤
│ SIMP                │ $0.005              │
├─────────────────────┼─────────────────────┤
│ SIPHER              │ $0.055              │
├─────────────────────┼─────────────────────┤
│ SIS                 │ $0.199              │
├─────────────────────┼─────────────────────┤
│ SJM                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ SKEB                │ $0.001              │
├─────────────────────┼─────────────────────┤
│ SKEY                │ $0.013              │
├─────────────────────┼─────────────────────┤
│ SKI                 │ $0.004              │
├─────────────────────┼─────────────────────┤
│ SKIN                │ $0                  │
├─────────────────────┼─────────────────────┤
│ SKL                 │ $0.032              │
├─────────────────────┼─────────────────────┤
│ SKM                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ SKRIMP              │ $0                  │
├─────────────────────┼─────────────────────┤
│ SKRT                │ $0.001              │
├─────────────────────┼─────────────────────┤
│ SKT                 │ $0.002              │
├─────────────────────┼─────────────────────┤
│ SKULL               │ $0.011              │
├─────────────────────┼─────────────────────┤
│ SKY                 │ $0.048              │
├─────────────────────┼─────────────────────┤
│ SKYRIM              │ $0.003              │
├─────────────────────┼─────────────────────┤
│ SLD                 │ $0.019              │
├─────────────────────┼─────────────────────┤
│ SLEEPEE             │ $0.001              │
├─────────────────────┼─────────────────────┤
│ SLICE               │ $0.052              │
├─────────────────────┼─────────────────────┤
│ SLOCK               │ $0                  │
├─────────────────────┼─────────────────────┤
│ SLP                 │ $0.002              │
├─────────────────────┼─────────────────────┤
│ SMART               │ $0.238              │
├─────────────────────┼─────────────────────┤
│ SMARTCREDIT         │ $0.695              │
├─────────────────────┼─────────────────────┤
│ SMBR                │ $0.024              │
├─────────────────────┼─────────────────────┤
│ SMBSWAP             │ $0                  │
├─────────────────────┼─────────────────────┤
│ SMC                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ SMETA               │ $0                  │
├─────────────────────┼─────────────────────┤
│ SMI                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ SML                 │ $1.7                │
├─────────────────────┼─────────────────────┤
│ SMOL                │ $0.441              │
├─────────────────────┼─────────────────────┤
│ SMS                 │ $0.22               │
├─────────────────────┼─────────────────────┤
│ SMSCT               │ $0.016              │
├─────────────────────┼─────────────────────┤
│ SMT                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ SMTX                │ $0.006              │
├─────────────────────┼─────────────────────┤
│ SMTY                │ $0.006              │
├─────────────────────┼─────────────────────┤
│ SNAIL               │ $0                  │
├─────────────────────┼─────────────────────┤
│ SNAP                │ $0                  │
├─────────────────────┼─────────────────────┤
│ SNC                 │ $0.032              │
├─────────────────────┼─────────────────────┤
│ SNET                │ $0.002              │
├─────────────────────┼─────────────────────┤
│ SNFT                │ $0.021              │
├─────────────────────┼─────────────────────┤
│ SNGLS               │ $0                  │
├─────────────────────┼─────────────────────┤
│ SNM                 │ $0.402              │
├─────────────────────┼─────────────────────┤
│ SNN                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ SNOV                │ $0                  │
├─────────────────────┼─────────────────────┤
│ SNOW                │ $0.325              │
├─────────────────────┼─────────────────────┤
│ SNP                 │ $0.01               │
├─────────────────────┼─────────────────────┤
│ SNS                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ SNT                 │ $0.023              │
├─────────────────────┼─────────────────────┤
│ SNTVT               │ $0.001              │
├─────────────────────┼─────────────────────┤
│ SNX                 │ $2.41               │
├─────────────────────┼─────────────────────┤
│ SOBA                │ $0                  │
├─────────────────────┼─────────────────────┤
│ SOC                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ SOCKS               │ $41,142             │
├─────────────────────┼─────────────────────┤
│ SODATSU             │ $0.006              │
├─────────────────────┼─────────────────────┤
│ SOFI                │ $0.072              │
├─────────────────────┼─────────────────────┤
│ SOKU                │ $0.002              │
├─────────────────────┼─────────────────────┤
│ SOL                 │ $20.43              │
├─────────────────────┼─────────────────────┤
│ SOLID               │ $0.389              │
├─────────────────────┼─────────────────────┤
│ SOLVE               │ $0.024              │
├─────────────────────┼─────────────────────┤
│ SOMEE               │ $0.005              │
├─────────────────────┼─────────────────────┤
│ SOMM                │ $0.14               │
├─────────────────────┼─────────────────────┤
│ SONIC               │ $0.001              │
├─────────────────────┼─────────────────────┤
│ SONO                │ $0.001              │
├─────────────────────┼─────────────────────┤
│ SOON                │ $3.41               │
├─────────────────────┼─────────────────────┤
│ SOP                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ SOS                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ SOUL                │ $0.336              │
├─────────────────────┼─────────────────────┤
│ SOURCE              │ $0.032              │
├─────────────────────┼─────────────────────┤
│ SOV                 │ $0.429              │
├─────────────────────┼─────────────────────┤
│ SPA                 │ $0.006              │
├─────────────────────┼─────────────────────┤
│ SPACE               │ $0.002              │
├─────────────────────┼─────────────────────┤
│ SPANK               │ $0.007              │
├─────────────────────┼─────────────────────┤
│ SPAY                │ $0.043              │
├─────────────────────┼─────────────────────┤
│ SPC                 │ $0.016              │
├─────────────────────┼─────────────────────┤
│ SPD                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ SPDR                │ $0                  │
├─────────────────────┼─────────────────────┤
│ SPELL               │ $0.001              │
├─────────────────────┼─────────────────────┤
│ SPELLFIRE           │ $0.001              │
├─────────────────────┼─────────────────────┤
│ SPGBB               │ $0                  │
├─────────────────────┼─────────────────────┤
│ SPH                 │ $0.013              │
├─────────────────────┼─────────────────────┤
│ SPHRI               │ $0.016              │
├─────────────────────┼─────────────────────┤
│ SPICE               │ $0                  │
├─────────────────────┼─────────────────────┤
│ SPILLWAYS           │ $0.009              │
├─────────────────────┼─────────────────────┤
│ SPIRAL              │ $0.013              │
├─────────────────────┼─────────────────────┤
│ SPIZ                │ $0.002              │
├─────────────────────┼─────────────────────┤
│ SPLC                │ $0.863              │
├─────────────────────┼─────────────────────┤
│ SPN                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ SPO                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ SPOOL               │ $0.599              │
├─────────────────────┼─────────────────────┤
│ SPORK               │ $0.011              │
├─────────────────────┼─────────────────────┤
│ SPOT                │ $1.12               │
├─────────────────────┼─────────────────────┤
│ SPRING              │ $0.006              │
├─────────────────────┼─────────────────────┤
│ SPROUT              │ $0                  │
├─────────────────────┼─────────────────────┤
│ SPUME               │ $0.011              │
├─────────────────────┼─────────────────────┤
│ SPWN                │ $0                  │
├─────────────────────┼─────────────────────┤
│ SQGL                │ $19,929             │
├─────────────────────┼─────────────────────┤
│ SQUEEZE             │ $0                  │
├─────────────────────┼─────────────────────┤
│ SRC                 │ $0.011              │
├─────────────────────┼─────────────────────┤
│ SRK                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ SRLTY               │ $0                  │
├─────────────────────┼─────────────────────┤
│ SRM                 │ $0.035              │
├─────────────────────┼─────────────────────┤
│ SRN                 │ $0.002              │
├─────────────────────┼─────────────────────┤
│ SRT                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ SRUNE               │ $1.14               │
├─────────────────────┼─────────────────────┤
│ SSP                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ SST                 │ $0.012              │
├─────────────────────┼─────────────────────┤
│ SSV                 │ $22.8               │
├─────────────────────┼─────────────────────┤
│ ST-YCRV             │ $1                  │
├─────────────────────┼─────────────────────┤
│ STA                 │ $0.628              │
├─────────────────────┼─────────────────────┤
│ STABLZ              │ $0.014              │
├─────────────────────┼─────────────────────┤
│ STACK               │ $0.004              │
├─────────────────────┼─────────────────────┤
│ STACY               │ $0                  │
├─────────────────────┼─────────────────────┤
│ STAK                │ $0                  │
├─────────────────────┼─────────────────────┤
│ STAKE               │ $0.194              │
├─────────────────────┼─────────────────────┤
│ STANDARD            │ $0.247              │
├─────────────────────┼─────────────────────┤
│ STARL               │ $0                  │
├─────────────────────┼─────────────────────┤
│ STARS               │ $0.002              │
├─────────────────────┼─────────────────────┤
│ START               │ $0.011              │
├─────────────────────┼─────────────────────┤
│ STARX               │ $0.073              │
├─────────────────────┼─────────────────────┤
│ STAT                │ $0.087              │
├─────────────────────┼─────────────────────┤
│ STATE               │ $0                  │
├─────────────────────┼─────────────────────┤
│ STATS               │ $0.041              │
├─────────────────────┼─────────────────────┤
│ STBT                │ $1.002              │
├─────────────────────┼─────────────────────┤
│ STBU                │ $0.034              │
├─────────────────────┼─────────────────────┤
│ STC                 │ $0.003              │
├─────────────────────┼─────────────────────┤
│ STETH               │ $1,827.4            │
├─────────────────────┼─────────────────────┤
│ STF                 │ $0.005              │
├─────────────────────┼─────────────────────┤
│ STFX                │ $0.016              │
├─────────────────────┼─────────────────────┤
│ STG                 │ $0.664              │
├─────────────────────┼─────────────────────┤
│ STILT               │ $0                  │
├─────────────────────┼─────────────────────┤
│ STIMA               │ $1.005              │
├─────────────────────┼─────────────────────┤
│ STKABPT             │ $0.095              │
├─────────────────────┼─────────────────────┤
│ STKR                │ $0                  │
├─────────────────────┼─────────────────────┤
│ STMATIC             │ $0.987              │
├─────────────────────┼─────────────────────┤
│ STMX                │ $0.004              │
├─────────────────────┼─────────────────────┤
│ STN                 │ $0.02               │
├─────────────────────┼─────────────────────┤
│ STND                │ $0.011              │
├─────────────────────┼─────────────────────┤
│ STON                │ $0.002              │
├─────────────────────┼─────────────────────┤
│ STONKS              │ $0                  │
├─────────────────────┼─────────────────────┤
│ STORE               │ $0.02               │
├─────────────────────┼─────────────────────┤
│ STORJ               │ $0.298              │
├─────────────────────┼─────────────────────┤
│ STOS                │ $0.491              │
├─────────────────────┼─────────────────────┤
│ STPT                │ $0.042              │
├─────────────────────┼─────────────────────┤
│ STQ                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ STREAMERINU         │ $0.001              │
├─────────────────────┼─────────────────────┤
│ STREETH             │ $0.001              │
├─────────────────────┼─────────────────────┤
│ STRK                │ $11.79              │
├─────────────────────┼─────────────────────┤
│ STRM                │ $0.025              │
├─────────────────────┼─────────────────────┤
│ STRNGR              │ $1.65               │
├─────────────────────┼─────────────────────┤
│ STRONG              │ $6.99               │
├─────────────────────┼─────────────────────┤
│ STRP                │ $0.519              │
├─────────────────────┼─────────────────────┤
│ STSR                │ $0.031              │
├─────────────────────┼─────────────────────┤
│ STSW                │ $0.038              │
├─────────────────────┼─────────────────────┤
│ STUB                │ $0.001              │
├─────────────────────┼─────────────────────┤
│ STX                 │ $0.005              │
├─────────────────────┼─────────────────────┤
│ STZ                 │ $0.058              │
├─────────────────────┼─────────────────────┤
│ SUB                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ SUDO                │ $0.689              │
├─────────────────────┼─────────────────────┤
│ SUKI                │ $0                  │
├─────────────────────┼─────────────────────┤
│ SUKO                │ $0                  │
├─────────────────────┼─────────────────────┤
│ SUKU                │ $0.06               │
├─────────────────────┼─────────────────────┤
│ SUMMER              │ $0.006              │
├─────────────────────┼─────────────────────┤
│ SUNC                │ $0                  │
├─────────────────────┼─────────────────────┤
│ SUNDER              │ $0.005              │
├─────────────────────┼─────────────────────┤
│ SUPER               │ $0.131              │
├─────────────────────┼─────────────────────┤
│ SUPERBID            │ $0.009              │
├─────────────────────┼─────────────────────┤
│ SURE                │ $0.004              │
├─────────────────────┼─────────────────────┤
│ SURF                │ $0.038              │
├─────────────────────┼─────────────────────┤
│ SUSD                │ $0.999              │
├─────────────────────┼─────────────────────┤
│ SUSHI               │ $0.844              │
├─────────────────────┼─────────────────────┤
│ SUTER               │ $0.001              │
├─────────────────────┼─────────────────────┤
│ SUZUME              │ $0                  │
├─────────────────────┼─────────────────────┤
│ SWAG                │ $0.008              │
├─────────────────────┼─────────────────────┤
│ SWAI                │ $0                  │
├─────────────────────┼─────────────────────┤
│ SWAP                │ $0.228              │
├─────────────────────┼─────────────────────┤
│ SWAPP               │ $0                  │
├─────────────────────┼─────────────────────┤
│ SWASH               │ $0.014              │
├─────────────────────┼─────────────────────┤
│ SWAT                │ $0                  │
├─────────────────────┼─────────────────────┤
│ SWEAT               │ $0.006              │
├─────────────────────┼─────────────────────┤
│ SWFL                │ $0.044              │
├─────────────────────┼─────────────────────┤
│ SWFTC               │ $0.001              │
├─────────────────────┼─────────────────────┤
│ SWIFY               │ $0                  │
├─────────────────────┼─────────────────────┤
│ SWINGBY             │ $0.002              │
├─────────────────────┼─────────────────────┤
│ SWISE               │ $0.094              │
├─────────────────────┼─────────────────────┤
│ SWISSNFTFUND        │ $0                  │
├─────────────────────┼─────────────────────┤
│ SWIV                │ $0.137              │
├─────────────────────┼─────────────────────┤
│ SWM                 │ $0.004              │
├─────────────────────┼─────────────────────┤
│ SWPR                │ $0.021              │
├─────────────────────┼─────────────────────┤
│ SWRV                │ $0.034              │
├─────────────────────┼─────────────────────┤
│ SWT                 │ $0.013              │
├─────────────────────┼─────────────────────┤
│ SWTH                │ $0.006              │
├─────────────────────┼─────────────────────┤
│ SWUSD               │ $1.047              │
├─────────────────────┼─────────────────────┤
│ SX                  │ $0.985              │
├─────────────────────┼─────────────────────┤
│ SXP                 │ $0.4                │
├─────────────────────┼─────────────────────┤
│ SYC                 │ $0.025              │
├─────────────────────┼─────────────────────┤
│ SYLO                │ $0.002              │
├─────────────────────┼─────────────────────┤
│ SYM                 │ $0.011              │
├─────────────────────┼─────────────────────┤
│ SYMM                │ $0.157              │
├─────────────────────┼─────────────────────┤
│ SYN                 │ $0.611              │
├─────────────────────┼─────────────────────┤
│ SYNC                │ $0.006              │
├─────────────────────┼─────────────────────┤
│ SYNR                │ $0.001              │
├─────────────────────┼─────────────────────┤
│ SYRANT              │ $0                  │
├─────────────────────┼─────────────────────┤
│ T                   │ $0                  │
├─────────────────────┼─────────────────────┤
│ TACO                │ $0.01               │
├─────────────────────┼─────────────────────┤
│ TAG                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ TAI                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ TAIL                │ $0.001              │
├─────────────────────┼─────────────────────┤
│ TAIRYO              │ $0                  │
├─────────────────────┼─────────────────────┤
│ TALK                │ $0.116              │
├─────────────────────┼─────────────────────┤
│ TAMA                │ $0.015              │
├─────────────────────┼─────────────────────┤
│ TAROT               │ $0.081              │
├─────────────────────┼─────────────────────┤
│ TATE                │ $0                  │
├─────────────────────┼─────────────────────┤
│ TB                  │ $0.002              │
├─────────────────────┼─────────────────────┤
│ TBC                 │ $0.006              │
├─────────────────────┼─────────────────────┤
│ TBT                 │ $0.999              │
├─────────────────────┼─────────────────────┤
│ TBTC                │ $25,562             │
├─────────────────────┼─────────────────────┤
│ TCAP                │ $121.06             │
├─────────────────────┼─────────────────────┤
│ TCH                 │ $0.005              │
├─────────────────────┼─────────────────────┤
│ TCP                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ TCR                 │ $0.04               │
├─────────────────────┼─────────────────────┤
│ TCT                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ TDP                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ TDS                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ TEAM                │ $0.01               │
├─────────────────────┼─────────────────────┤
│ TECH                │ $0.001              │
├─────────────────────┼─────────────────────┤
│ TEL                 │ $0.002              │
├─────────────────────┼─────────────────────┤
│ TELE                │ $0.001              │
├─────────────────────┼─────────────────────┤
│ TEM                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ TEMCO               │ $0.002              │
├─────────────────────┼─────────────────────┤
│ TEMP                │ $0.038              │
├─────────────────────┼─────────────────────┤
│ TEMPLE              │ $1.011              │
├─────────────────────┼─────────────────────┤
│ TEN                 │ $0.012              │
├─────────────────────┼─────────────────────┤
│ TENSHI              │ $0.001              │
├─────────────────────┼─────────────────────┤
│ TERA                │ $0                  │
├─────────────────────┼─────────────────────┤
│ TERA2               │ $0                  │
├─────────────────────┼─────────────────────┤
│ TERRAFORM           │ $0                  │
├─────────────────────┼─────────────────────┤
│ TEXAN               │ $0                  │
├─────────────────────┼─────────────────────┤
│ TFBX                │ $0                  │
├─────────────────────┼─────────────────────┤
│ TFS                 │ $0.006              │
├─────────────────────┼─────────────────────┤
│ TGL                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ TGR                 │ $0.139              │
├─────────────────────┼─────────────────────┤
│ TGT                 │ $0.008              │
├─────────────────────┼─────────────────────┤
│ THALES              │ $0.475              │
├─────────────────────┼─────────────────────┤
│ THE                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ THE9                │ $0.082              │
├─────────────────────┼─────────────────────┤
│ THEO                │ $0.295              │
├─────────────────────┼─────────────────────┤
│ THEOS               │ $0                  │
├─────────────────────┼─────────────────────┤
│ THERADIO            │ $0                  │
├─────────────────────┼─────────────────────┤
│ THN                 │ $0.038              │
├─────────────────────┼─────────────────────┤
│ THOL                │ $0.035              │
├─────────────────────┼─────────────────────┤
│ THOR                │ $0.102              │
├─────────────────────┼─────────────────────┤
│ THX                 │ $0.038              │
├─────────────────────┼─────────────────────┤
│ TIA                 │ $0.004              │
├─────────────────────┼─────────────────────┤
│ TIC                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ TICKR               │ $0                  │
├─────────────────────┼─────────────────────┤
│ TIDAL               │ $0                  │
├─────────────────────┼─────────────────────┤
│ TIGER               │ $0                  │
├─────────────────────┼─────────────────────┤
│ TIME                │ $23.35              │
├─────────────────────┼─────────────────────┤
│ TITAN               │ $0.03               │
├─────────────────────┼─────────────────────┤
│ TKB                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ TKING               │ $0                  │
├─────────────────────┼─────────────────────┤
│ TKINU               │ $0                  │
├─────────────────────┼─────────────────────┤
│ TKN                 │ $0.065              │
├─────────────────────┼─────────────────────┤
│ TKP                 │ $0.16               │
├─────────────────────┼─────────────────────┤
│ TKX                 │ $6.31               │
├─────────────────────┼─────────────────────┤
│ TLM                 │ $0.016              │
├─────────────────────┼─────────────────────┤
│ TLW                 │ $0.05               │
├─────────────────────┼─────────────────────┤
│ TMED                │ $0                  │
├─────────────────────┼─────────────────────┤
│ TMTG                │ $0                  │
├─────────────────────┼─────────────────────┤
│ TNB                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ TNGL                │ $0                  │
├─────────────────────┼─────────────────────┤
│ TNS                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ TNT                 │ $0.004              │
├─────────────────────┼─────────────────────┤
│ TOAD                │ $0                  │
├─────────────────────┼─────────────────────┤
│ TOC                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ TOK                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ TOKE                │ $0.734              │
├─────────────────────┼─────────────────────┤
│ TOKO                │ $0.002              │
├─────────────────────┼─────────────────────┤
│ TOKR                │ $0.064              │
├─────────────────────┼─────────────────────┤
│ TOKU                │ $0                  │
├─────────────────────┼─────────────────────┤
│ TOL                 │ $0.005              │
├─────────────────────┼─────────────────────┤
│ TOM                 │ $2.23               │
├─────────────────────┼─────────────────────┤
│ TOMI                │ $3.76               │
├─────────────────────┼─────────────────────┤
│ TOMOE               │ $1.27               │
├─────────────────────┼─────────────────────┤
│ TOMS                │ $0.002              │
├─────────────────────┼─────────────────────┤
│ TON                 │ $1.93               │
├─────────────────────┼─────────────────────┤
│ TONE                │ $0.011              │
├─────────────────────┼─────────────────────┤
│ TOON                │ $0.001              │
├─────────────────────┼─────────────────────┤
│ TOP                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ TOR                 │ $0.014              │
├─────────────────────┼─────────────────────┤
│ TORA                │ $0                  │
├─────────────────────┼─────────────────────┤
│ TORG                │ $0                  │
├─────────────────────┼─────────────────────┤
│ TORN                │ $4.29               │
├─────────────────────┼─────────────────────┤
│ TOSHI               │ $0                  │
├─────────────────────┼─────────────────────┤
│ TOTM                │ $0.008              │
├─────────────────────┼─────────────────────┤
│ TOTORO              │ $0                  │
├─────────────────────┼─────────────────────┤
│ TOWER               │ $0.003              │
├─────────────────────┼─────────────────────┤
│ TOWN                │ $0.024              │
├─────────────────────┼─────────────────────┤
│ TPRO                │ $0.002              │
├─────────────────────┼─────────────────────┤
│ TPT                 │ $0.011              │
├─────────────────────┼─────────────────────┤
│ TPY                 │ $0.745              │
├─────────────────────┼─────────────────────┤
│ TQUEEN              │ $0                  │
├─────────────────────┼─────────────────────┤
│ TR3                 │ $0.005              │
├─────────────────────┼─────────────────────┤
│ TRAC                │ $0.276              │
├─────────────────────┼─────────────────────┤
│ TRACE               │ $0.016              │
├─────────────────────┼─────────────────────┤
│ TRADE               │ $0.031              │
├─────────────────────┼─────────────────────┤
│ TRAXX               │ $0.026              │
├─────────────────────┼─────────────────────┤
│ TRB                 │ $12.15              │
├─────────────────────┼─────────────────────┤
│ TRDG                │ $0                  │
├─────────────────────┼─────────────────────┤
│ TRDL                │ $0.004              │
├─────────────────────┼─────────────────────┤
│ TRENDAI             │ $0.016              │
├─────────────────────┼─────────────────────┤
│ TRENDX              │ $0.008              │
├─────────────────────┼─────────────────────┤
│ TRG                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ TRIAS               │ $2.63               │
├─────────────────────┼─────────────────────┤
│ TRIBE               │ $0.274              │
├─────────────────────┼─────────────────────┤
│ TRIBL               │ $1.17               │
├─────────────────────┼─────────────────────┤
│ TRIO                │ $0.014              │
├─────────────────────┼─────────────────────┤
│ TRIPS               │ $0.003              │
├─────────────────────┼─────────────────────┤
│ TRISM               │ $0.029              │
├─────────────────────┼─────────────────────┤
│ TRIX                │ $0                  │
├─────────────────────┼─────────────────────┤
│ TRL                 │ $0.038              │
├─────────────────────┼─────────────────────┤
│ TRND                │ $0.583              │
├─────────────────────┼─────────────────────┤
│ TROLL               │ $0                  │
├─────────────────────┼─────────────────────┤
│ TROVE               │ $0                  │
├─────────────────────┼─────────────────────┤
│ TRR                 │ $0.14               │
├─────────────────────┼─────────────────────┤
│ TRU                 │ $0.097              │
├─────────────────────┼─────────────────────┤
│ TRUTH               │ $0                  │
├─────────────────────┼─────────────────────┤
│ TRV                 │ $0.003              │
├─────────────────────┼─────────────────────┤
│ TRVL                │ $0.041              │
├─────────────────────┼─────────────────────┤
│ TRXC                │ $0                  │
├─────────────────────┼─────────────────────┤
│ TRYB                │ $0.048              │
├─────────────────────┼─────────────────────┤
│ TRYC                │ $0.05               │
├─────────────────────┼─────────────────────┤
│ TRZ                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ TSA                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ TSANGNYON           │ $0                  │
├─────────────────────┼─────────────────────┤
│ TSCT                │ $0.001              │
├─────────────────────┼─────────────────────┤
│ TSHP                │ $0                  │
├─────────────────────┼─────────────────────┤
│ TSL                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ TST                 │ $0.015              │
├─────────────────────┼─────────────────────┤
│ TSUKA               │ $0.041              │
├─────────────────────┼─────────────────────┤
│ TSX                 │ $0.005              │
├─────────────────────┼─────────────────────┤
│ TT                  │ $0.004              │
├─────────────────────┼─────────────────────┤
│ TTX                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ TUF                 │ $0.002              │
├─────────────────────┼─────────────────────┤
│ TUP                 │ $0.027              │
├─────────────────────┼─────────────────────┤
│ TUSD                │ $1                  │
├─────────────────────┼─────────────────────┤
│ TUSHI               │ $0                  │
├─────────────────────┼─────────────────────┤
│ TVK                 │ $0.035              │
├─────────────────────┼─────────────────────┤
│ TVT                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ TWOPAW              │ $0.001              │
├─────────────────────┼─────────────────────┤
│ TWT                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ TX                  │ $0.006              │
├─────────────────────┼─────────────────────┤
│ TXA                 │ $0.319              │
├─────────────────────┼─────────────────────┤
│ TXAG                │ $0.762              │
├─────────────────────┼─────────────────────┤
│ TXAU                │ $60.95              │
├─────────────────────┼─────────────────────┤
│ TXL                 │ $0.009              │
├─────────────────────┼─────────────────────┤
│ TXT                 │ $0.002              │
├─────────────────────┼─────────────────────┤
│ TYC                 │ $0.011              │
├─────────────────────┼─────────────────────┤
│ TYP                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ TYPE                │ $0                  │
├─────────────────────┼─────────────────────┤
│ TYRANT              │ $0.101              │
├─────────────────────┼─────────────────────┤
│ TZKI                │ $0                  │
├─────────────────────┼─────────────────────┤
│ UAC                 │ $0.02               │
├─────────────────────┼─────────────────────┤
│ UBI                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ UBSN                │ $0                  │
├─────────────────────┼─────────────────────┤
│ UBT                 │ $0.096              │
├─────────────────────┼─────────────────────┤
│ UBX                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ UBXN                │ $0.002              │
├─────────────────────┼─────────────────────┤
│ UCASH               │ $0                  │
├─────────────────────┼─────────────────────┤
│ UCM                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ UCO                 │ $0.064              │
├─────────────────────┼─────────────────────┤
│ UCOIL               │ $0.008              │
├─────────────────────┼─────────────────────┤
│ UCT                 │ $0.003              │
├─────────────────────┼─────────────────────┤
│ UCX                 │ $0.07               │
├─────────────────────┼─────────────────────┤
│ UDAI                │ $1.073              │
├─────────────────────┼─────────────────────┤
│ UDO                 │ $0.006              │
├─────────────────────┼─────────────────────┤
│ UDOO                │ $0                  │
├─────────────────────┼─────────────────────┤
│ UDT                 │ $7.53               │
├─────────────────────┼─────────────────────┤
│ UETH                │ $2,013.84           │
├─────────────────────┼─────────────────────┤
│ UFARM               │ $0.001              │
├─────────────────────┼─────────────────────┤
│ UFEWO               │ $0.019              │
├─────────────────────┼─────────────────────┤
│ UFI                 │ $0.024              │
├─────────────────────┼─────────────────────┤
│ UFO                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ UFR                 │ $0.018              │
├─────────────────────┼─────────────────────┤
│ UFT                 │ $0.325              │
├─────────────────────┼─────────────────────┤
│ UGAS                │ $0.001              │
├─────────────────────┼─────────────────────┤
│ UGT                 │ $0.003              │
├─────────────────────┼─────────────────────┤
│ UIP                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ UJENNY              │ $0.258              │
├─────────────────────┼─────────────────────┤
│ ULT                 │ $0.16               │
├─────────────────────┼─────────────────────┤
│ ULU                 │ $25.73              │
├─────────────────────┼─────────────────────┤
│ ULX                 │ $0.078              │
├─────────────────────┼─────────────────────┤
│ UM                  │ $0.002              │
├─────────────────────┼─────────────────────┤
│ UMA                 │ $2                  │
├─────────────────────┼─────────────────────┤
│ UMAD                │ $0.001              │
├─────────────────────┼─────────────────────┤
│ UMB                 │ $0.009              │
├─────────────────────┼─────────────────────┤
│ UMBR                │ $0.469              │
├─────────────────────┼─────────────────────┤
│ UMC                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ UMEE                │ $0.006              │
├─────────────────────┼─────────────────────┤
│ UMI                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ UMINT               │ $0.019              │
├─────────────────────┼─────────────────────┤
│ UMOON               │ $0                  │
├─────────────────────┼─────────────────────┤
│ UMX                 │ $0.047              │
├─────────────────────┼─────────────────────┤
│ UNB                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ UNBNK               │ $0                  │
├─────────────────────┼─────────────────────┤
│ UNCL                │ $3.38               │
├─────────────────────┼─────────────────────┤
│ UNCX                │ $228.58             │
├─────────────────────┼─────────────────────┤
│ UNDEAD              │ $0.12               │
├─────────────────────┼─────────────────────┤
│ UNFI                │ $4.41               │
├─────────────────────┼─────────────────────┤
│ UNI                 │ $5.07               │
├─────────────────────┼─────────────────────┤
│ UNIC                │ $2.92               │
├─────────────────────┼─────────────────────┤
│ UNIDX               │ $4.43               │
├─────────────────────┼─────────────────────┤
│ UNIFI               │ $0.233              │
├─────────────────────┼─────────────────────┤
│ UNIQ                │ $0.06               │
├─────────────────────┼─────────────────────┤
│ UNISTAKE            │ $0.003              │
├─────────────────────┼─────────────────────┤
│ UNIX                │ $0.018              │
├─────────────────────┼─────────────────────┤
│ UNM                 │ $36.92              │
├─────────────────────┼─────────────────────┤
│ UNN                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ UNO                 │ $0.056              │
├─────────────────────┼─────────────────────┤
│ UNQT                │ $0.006              │
├─────────────────────┼─────────────────────┤
│ UNT                 │ $0.019              │
├─────────────────────┼─────────────────────┤
│ UNV                 │ $0.004              │
├─────────────────────┼─────────────────────┤
│ UOS                 │ $0.192              │
├─────────────────────┼─────────────────────┤
│ UPI                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ UPP                 │ $0.053              │
├─────────────────────┼─────────────────────┤
│ UPR                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ UPUNK               │ $0.031              │
├─────────────────────┼─────────────────────┤
│ UQC                 │ $3.9                │
├─────────────────────┼─────────────────────┤
│ URQA                │ $0.018              │
├─────────────────────┼─────────────────────┤
│ URUS                │ $15.76              │
├─────────────────────┼─────────────────────┤
│ USD1                │ $1.01               │
├─────────────────────┼─────────────────────┤
│ USDB                │ $0                  │
├─────────────────────┼─────────────────────┤
│ USDC                │ $1                  │
├─────────────────────┼─────────────────────┤
│ USDD                │ $1                  │
├─────────────────────┼─────────────────────┤
│ USDF                │ $1.001              │
├─────────────────────┼─────────────────────┤
│ USDGLO              │ $1.005              │
├─────────────────────┼─────────────────────┤
│ USDI                │ $1.033              │
├─────────────────────┼─────────────────────┤
│ USDK                │ $1.02               │
├─────────────────────┼─────────────────────┤
│ USDP                │ $1.001              │
├─────────────────────┼─────────────────────┤
│ USDS                │ $0.133              │
├─────────────────────┼─────────────────────┤
│ USDT                │ $1                  │
├─────────────────────┼─────────────────────┤
│ USDTSO              │ $1.001              │
├─────────────────────┼─────────────────────┤
│ USDX                │ $1.37               │
├─────────────────────┼─────────────────────┤
│ USDZ                │ $0                  │
├─────────────────────┼─────────────────────┤
│ USF                 │ $0.029              │
├─────────────────────┼─────────────────────┤
│ USH                 │ $0.292              │
├─────────────────────┼─────────────────────┤
│ USHI                │ $0                  │
├─────────────────────┼─────────────────────┤
│ USHIBA              │ $0                  │
├─────────────────────┼─────────────────────┤
│ USK                 │ $1.042              │
├─────────────────────┼─────────────────────┤
│ USPC                │ $1.016              │
├─────────────────────┼─────────────────────┤
│ UST                 │ $0.014              │
├─────────────────────┼─────────────────────┤
│ USTC                │ $0.014              │
├─────────────────────┼─────────────────────┤
│ USV                 │ $9.63               │
├─────────────────────┼─────────────────────┤
│ USX                 │ $1                  │
├─────────────────────┼─────────────────────┤
│ UTK                 │ $0.091              │
├─────────────────────┼─────────────────────┤
│ UTT                 │ $0.012              │
├─────────────────────┼─────────────────────┤
│ UTU                 │ $0.004              │
├─────────────────────┼─────────────────────┤
│ UUSDC               │ $1.075              │
├─────────────────────┼─────────────────────┤
│ UUSDT               │ $1.054              │
├─────────────────────┼─────────────────────┤
│ UUU                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ UWBTC               │ $26,661             │
├─────────────────────┼─────────────────────┤
│ UWL                 │ $0.37               │
├─────────────────────┼─────────────────────┤
│ UWU                 │ $14.79              │
├─────────────────────┼─────────────────────┤
│ UZUMAKI             │ $0                  │
├─────────────────────┼─────────────────────┤
│ VAB                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ VADER               │ $0                  │
├─────────────────────┼─────────────────────┤
│ VAI                 │ $0.064              │
├─────────────────────┼─────────────────────┤
│ VAL                 │ $0.274              │
├─────────────────────┼─────────────────────┤
│ VALOR               │ $0.17               │
├─────────────────────┼─────────────────────┤
│ VALUE               │ $0.181              │
├─────────────────────┼─────────────────────┤
│ VB                  │ $0.003              │
├─────────────────────┼─────────────────────┤
│ VBIT                │ $0.007              │
├─────────────────────┼─────────────────────┤
│ VBNT                │ $0.325              │
├─────────────────────┼─────────────────────┤
│ VCG                 │ $0.012              │
├─────────────────────┼─────────────────────┤
│ VCHF                │ $1.1                │
├─────────────────────┼─────────────────────┤
│ VCK                 │ $0.003              │
├─────────────────────┼─────────────────────┤
│ VDG                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ VDR                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ VEGA                │ $1.6                │
├─────────────────────┼─────────────────────┤
│ VEMP                │ $0.009              │
├─────────────────────┼─────────────────────┤
│ VEN                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ VENT                │ $0.009              │
├─────────────────────┼─────────────────────┤
│ VERA                │ $0                  │
├─────────────────────┼─────────────────────┤
│ VERI                │ $16.09              │
├─────────────────────┼─────────────────────┤
│ VERSE               │ $0.001              │
├─────────────────────┼─────────────────────┤
│ VEST                │ $0.006              │
├─────────────────────┼─────────────────────┤
│ VETH                │ $1,501.25           │
├─────────────────────┼─────────────────────┤
│ VETME               │ $0.001              │
├─────────────────────┼─────────────────────┤
│ VEUR                │ $1.081              │
├─────────────────────┼─────────────────────┤
│ VFY                 │ $0.285              │
├─────────────────────┼─────────────────────┤
│ VGX                 │ $0.143              │
├─────────────────────┼─────────────────────┤
│ VIB                 │ $0.061              │
├─────────────────────┼─────────────────────┤
│ VIBE                │ $0.002              │
├─────────────────────┼─────────────────────┤
│ VID                 │ $0.02               │
├─────────────────────┼─────────────────────┤
│ VIDA                │ $0.366              │
├─────────────────────┼─────────────────────┤
│ VIDT                │ $0.03               │
├─────────────────────┼─────────────────────┤
│ VIDY                │ $0                  │
├─────────────────────┼─────────────────────┤
│ VIDYA               │ $0.082              │
├─────────────────────┼─────────────────────┤
│ VINU                │ $0                  │
├─────────────────────┼─────────────────────┤
│ VIRTUE              │ $0.591              │
├─────────────────────┼─────────────────────┤
│ VIS                 │ $0.041              │
├─────────────────────┼─────────────────────┤
│ VISION              │ $0.42               │
├─────────────────────┼─────────────────────┤
│ VITA                │ $1.93               │
├─────────────────────┼─────────────────────┤
│ VITE                │ $0.019              │
├─────────────────────┼─────────────────────┤
│ VITO                │ $0                  │
├─────────────────────┼─────────────────────┤
│ VIX                 │ $0.014              │
├─────────────────────┼─────────────────────┤
│ VLT                 │ $0.151              │
├─────────────────────┼─────────────────────┤
│ VLX                 │ $0.016              │
├─────────────────────┼─────────────────────┤
│ VLXPAD              │ $0.007              │
├─────────────────────┼─────────────────────┤
│ VNDC                │ $0                  │
├─────────────────────┼─────────────────────┤
│ VNXAU               │ $62.04              │
├─────────────────────┼─────────────────────┤
│ VNXLU               │ $0.021              │
├─────────────────────┼─────────────────────┤
│ VOICE               │ $112.25             │
├─────────────────────┼─────────────────────┤
│ VOLT                │ $0                  │
├─────────────────────┼─────────────────────┤
│ VOW                 │ $0.466              │
├─────────────────────┼─────────────────────┤
│ VPAD                │ $0.025              │
├─────────────────────┼─────────────────────┤
│ VPP                 │ $0.007              │
├─────────────────────┼─────────────────────┤
│ VR                  │ $0.01               │
├─────────────────────┼─────────────────────┤
│ VRA                 │ $0.005              │
├─────────────────────┼─────────────────────┤
│ VRH                 │ $0.016              │
├─────────────────────┼─────────────────────┤
│ VRN                 │ $6.95               │
├─────────────────────┼─────────────────────┤
│ VRO                 │ $62.93              │
├─────────────────────┼─────────────────────┤
│ VRX                 │ $35.17              │
├─────────────────────┼─────────────────────┤
│ VSP                 │ $0.284              │
├─────────────────────┼─────────────────────┤
│ VST                 │ $0.002              │
├─────────────────────┼─────────────────────┤
│ VTX                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ VUSD                │ $0.969              │
├─────────────────────┼─────────────────────┤
│ VVS                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ VXL                 │ $0.007              │
├─────────────────────┼─────────────────────┤
│ VXON                │ $0.445              │
├─────────────────────┼─────────────────────┤
│ VXV                 │ $0.417              │
├─────────────────────┼─────────────────────┤
│ VYNC                │ $0                  │
├─────────────────────┼─────────────────────┤
│ WABI                │ $0.001              │
├─────────────────────┼─────────────────────┤
│ WACME               │ $0.032              │
├─────────────────────┼─────────────────────┤
│ WACO                │ $0.001              │
├─────────────────────┼─────────────────────┤
│ WAGIE               │ $0.013              │
├─────────────────────┼─────────────────────┤
│ WAGMIGAMES          │ $0                  │
├─────────────────────┼─────────────────────┤
│ WAIF                │ $0                  │
├─────────────────────┼─────────────────────┤
│ WAIT                │ $0.001              │
├─────────────────────┼─────────────────────┤
│ WAL                 │ $0.01               │
├─────────────────────┼─────────────────────┤
│ WALLET              │ $0.011              │
├─────────────────────┼─────────────────────┤
│ WALV                │ $0.034              │
├─────────────────────┼─────────────────────┤
│ WAMPL               │ $3.49               │
├─────────────────────┼─────────────────────┤
│ WANATHA             │ $0.002              │
├─────────────────────┼─────────────────────┤
│ WAR                 │ $6.57               │
├─────────────────────┼─────────────────────┤
│ WARP                │ $5.41               │
├─────────────────────┼─────────────────────┤
│ WAS                 │ $0.012              │
├─────────────────────┼─────────────────────┤
│ WASABI              │ $0.015              │
├─────────────────────┼─────────────────────┤
│ WATT                │ $0.003              │
├─────────────────────┼─────────────────────┤
│ WAVES               │ $1.79               │
├─────────────────────┼─────────────────────┤
│ WAXE                │ $53.81              │
├─────────────────────┼─────────────────────┤
│ WBESC               │ $1.033              │
├─────────────────────┼─────────────────────┤
│ WBETH               │ $1,832.41           │
├─────────────────────┼─────────────────────┤
│ WBI                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ WBT                 │ $4.69               │
├─────────────────────┼─────────────────────┤
│ WBTC                │ $26,857             │
├─────────────────────┼─────────────────────┤
│ WBX                 │ $0.004              │
├─────────────────────┼─────────────────────┤
│ WCA                 │ $1.19               │
├─────────────────────┼─────────────────────┤
│ WCFG                │ $0.223              │
├─────────────────────┼─────────────────────┤
│ WCHI                │ $0.068              │
├─────────────────────┼─────────────────────┤
│ WCSOV               │ $0.004              │
├─────────────────────┼─────────────────────┤
│ WCX                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ WEAPON              │ $0.442              │
├─────────────────────┼─────────────────────┤
│ WEB3                │ $1.46               │
├─────────────────────┼─────────────────────┤
│ WELD                │ $0.005              │
├─────────────────────┼─────────────────────┤
│ WETH                │ $1,831              │
├─────────────────────┼─────────────────────┤
│ WFAIR               │ $0                  │
├─────────────────────┼─────────────────────┤
│ WFIO                │ $0.025              │
├─────────────────────┼─────────────────────┤
│ WFLOW               │ $0.741              │
├─────────────────────┼─────────────────────┤
│ WFTM                │ $0.331              │
├─────────────────────┼─────────────────────┤
│ WFX                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ WG0                 │ $74.45              │
├─────────────────────┼─────────────────────┤
│ WGMI                │ $0                  │
├─────────────────────┼─────────────────────┤
│ WGR                 │ $0.004              │
├─────────────────────┼─────────────────────┤
│ WHALE               │ $0.589              │
├─────────────────────┼─────────────────────┤
│ WHIRL               │ $0.008              │
├─────────────────────┼─────────────────────┤
│ WHITE               │ $0                  │
├─────────────────────┼─────────────────────┤
│ WHL                 │ $0.488              │
├─────────────────────┼─────────────────────┤
│ WILD                │ $0.354              │
├─────────────────────┼─────────────────────┤
│ WINGS               │ $0.001              │
├─────────────────────┼─────────────────────┤
│ WINRY               │ $0                  │
├─────────────────────┼─────────────────────┤
│ WINTER              │ $0.006              │
├─────────────────────┼─────────────────────┤
│ WIS                 │ $0.007              │
├─────────────────────┼─────────────────────┤
│ WISE                │ $0.139              │
├─────────────────────┼─────────────────────┤
│ WITCH               │ $0.129              │
├─────────────────────┼─────────────────────┤
│ WIX                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ WIZ                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ WIZARD              │ $1,210.99           │
├─────────────────────┼─────────────────────┤
│ WJAURA              │ $1.73               │
├─────────────────────┼─────────────────────┤
│ WJXN                │ $0.093              │
├─────────────────────┼─────────────────────┤
│ WLEO                │ $0.05               │
├─────────────────────┼─────────────────────┤
│ WLITI               │ $0.003              │
├─────────────────────┼─────────────────────┤
│ WMEMO               │ $28,495             │
├─────────────────────┼─────────────────────┤
│ WMINIMA             │ $0.036              │
├─────────────────────┼─────────────────────┤
│ WMLX                │ $0.29               │
├─────────────────────┼─────────────────────┤
│ WNCG                │ $0.081              │
├─────────────────────┼─────────────────────┤
│ WNK                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ WNXM                │ $27.07              │
├─────────────────────┼─────────────────────┤
│ WOJAK               │ $0                  │
├─────────────────────┼─────────────────────┤
│ WOLFY               │ $0                  │
├─────────────────────┼─────────────────────┤
│ WOLVERINU           │ $0                  │
├─────────────────────┼─────────────────────┤
│ WOM                 │ $0.02               │
├─────────────────────┼─────────────────────┤
│ WOMBAT              │ $0.003              │
├─────────────────────┼─────────────────────┤
│ WOMI                │ $0.001              │
├─────────────────────┼─────────────────────┤
│ WOO                 │ $0.219              │
├─────────────────────┼─────────────────────┤
│ WOOF                │ $0                  │
├─────────────────────┼─────────────────────┤
│ WOOFY               │ $0.007              │
├─────────────────────┼─────────────────────┤
│ WOOL                │ $0.009              │
├─────────────────────┼─────────────────────┤
│ WOOP                │ $0.009              │
├─────────────────────┼─────────────────────┤
│ WOW                 │ $0.122              │
├─────────────────────┼─────────────────────┤
│ WOZX                │ $0.022              │
├─────────────────────┼─────────────────────┤
│ WPC                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ WPCI                │ $0.049              │
├─────────────────────┼─────────────────────┤
│ WPE                 │ $1,748.46           │
├─────────────────────┼─────────────────────┤
│ WPR                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ WPT                 │ $0.079              │
├─────────────────────┼─────────────────────┤
│ WQT                 │ $0.002              │
├─────────────────────┼─────────────────────┤
│ WRC                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ WRLD                │ $0.029              │
├─────────────────────┼─────────────────────┤
│ WSB                 │ $0.004              │
├─────────────────────┼─────────────────────┤
│ WSCRT               │ $0.459              │
├─────────────────────┼─────────────────────┤
│ WSIENNA             │ $0.295              │
├─────────────────────┼─────────────────────┤
│ WSTA                │ $0.004              │
├─────────────────────┼─────────────────────┤
│ WSTETH              │ $2,060.41           │
├─────────────────────┼─────────────────────┤
│ WSTR                │ $3,129.2            │
├─────────────────────┼─────────────────────┤
│ WSTRAX              │ $0.531              │
├─────────────────────┼─────────────────────┤
│ WTAO                │ $65.55              │
├─────────────────────┼─────────────────────┤
│ WTBT                │ $1.018              │
├─────────────────────┼─────────────────────┤
│ WTC                 │ $0.18               │
├─────────────────────┼─────────────────────┤
│ WTK                 │ $0.019              │
├─────────────────────┼─────────────────────┤
│ WTL                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ WTLOS               │ $0.189              │
├─────────────────────┼─────────────────────┤
│ WUKONG              │ $0                  │
├─────────────────────┼─────────────────────┤
│ WUSDR               │ $1.048              │
├─────────────────────┼─────────────────────┤
│ WVG0                │ $75.52              │
├─────────────────────┼─────────────────────┤
│ WWY                 │ $0.005              │
├─────────────────────┼─────────────────────┤
│ WXBTC               │ $0.108              │
├─────────────────────┼─────────────────────┤
│ WXMR                │ $157.11             │
├─────────────────────┼─────────────────────┤
│ WXRP                │ $0.469              │
├─────────────────────┼─────────────────────┤
│ WXT                 │ $0.003              │
├─────────────────────┼─────────────────────┤
│ WXTZ                │ $0                  │
├─────────────────────┼─────────────────────┤
│ WZM                 │ $0.005              │
├─────────────────────┼─────────────────────┤
│ X                   │ $0                  │
├─────────────────────┼─────────────────────┤
│ X1                  │ $1.53               │
├─────────────────────┼─────────────────────┤
│ X2Y2                │ $0.027              │
├─────────────────────┼─────────────────────┤
│ X7101               │ $0.01               │
├─────────────────────┼─────────────────────┤
│ X7102               │ $0.01               │
├─────────────────────┼─────────────────────┤
│ X7103               │ $0.01               │
├─────────────────────┼─────────────────────┤
│ X7104               │ $0.01               │
├─────────────────────┼─────────────────────┤
│ X7105               │ $0.01               │
├─────────────────────┼─────────────────────┤
│ X7DAO               │ $0.019              │
├─────────────────────┼─────────────────────┤
│ X7R                 │ $0.056              │
├─────────────────────┼─────────────────────┤
│ X8X                 │ $0.004              │
├─────────────────────┼─────────────────────┤
│ XAI                 │ $0.117              │
├─────────────────────┼─────────────────────┤
│ XAMP                │ $0.002              │
├─────────────────────┼─────────────────────┤
│ XAUR                │ $0.02               │
├─────────────────────┼─────────────────────┤
│ XAUT                │ $1,943.63           │
├─────────────────────┼─────────────────────┤
│ XBP                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ XCAD                │ $0.782              │
├─────────────────────┼─────────────────────┤
│ XCF                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ XCHF                │ $1.11               │
├─────────────────────┼─────────────────────┤
│ XCM                 │ $0.101              │
├─────────────────────┼─────────────────────┤
│ XCN                 │ $0.002              │
├─────────────────────┼─────────────────────┤
│ XCUR                │ $0.019              │
├─────────────────────┼─────────────────────┤
│ XDAO                │ $0.583              │
├─────────────────────┼─────────────────────┤
│ XDATA               │ $0.028              │
├─────────────────────┼─────────────────────┤
│ XDEFI               │ $0.106              │
├─────────────────────┼─────────────────────┤
│ XDEUS               │ $64.43              │
├─────────────────────┼─────────────────────┤
│ XDEX                │ $0.016              │
├─────────────────────┼─────────────────────┤
│ XDG                 │ $0.026              │
├─────────────────────┼─────────────────────┤
│ XDNA                │ $0                  │
├─────────────────────┼─────────────────────┤
│ XED                 │ $0.068              │
├─────────────────────┼─────────────────────┤
│ XELS                │ $0.395              │
├─────────────────────┼─────────────────────┤
│ XEN                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ XEND                │ $0.027              │
├─────────────────────┼─────────────────────┤
│ XERM                │ $0.05               │
├─────────────────────┼─────────────────────┤
│ XETA                │ $0.027              │
├─────────────────────┼─────────────────────┤
│ XFI                 │ $44.05              │
├─────────────────────┼─────────────────────┤
│ XFIT                │ $0.08               │
├─────────────────────┼─────────────────────┤
│ XFT                 │ $0.357              │
├─────────────────────┼─────────────────────┤
│ XFUND               │ $469.84             │
├─────────────────────┼─────────────────────┤
│ XGC                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ XHT                 │ $0.18               │
├─────────────────────┼─────────────────────┤
│ XI                  │ $0.012              │
├─────────────────────┼─────────────────────┤
│ XIDO                │ $2.38               │
├─────────────────────┼─────────────────────┤
│ XIDR                │ $0                  │
├─────────────────────┼─────────────────────┤
│ XIO                 │ $0.011              │
├─────────────────────┼─────────────────────┤
│ XIV                 │ $0.008              │
├─────────────────────┼─────────────────────┤
│ XJP                 │ $0.082              │
├─────────────────────┼─────────────────────┤
│ XLAB                │ $0                  │
├─────────────────────┼─────────────────────┤
│ XLON                │ $0                  │
├─────────────────────┼─────────────────────┤
│ XLS                 │ $0.146              │
├─────────────────────┼─────────────────────┤
│ XMETA               │ $0                  │
├─────────────────────┼─────────────────────┤
│ XMON                │ $2,197.02           │
├─────────────────────┼─────────────────────┤
│ XMT                 │ $0.018              │
├─────────────────────┼─────────────────────┤
│ XMU                 │ $0.002              │
├─────────────────────┼─────────────────────┤
│ XMX                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ XNL                 │ $0.012              │
├─────────────────────┼─────────────────────┤
│ XNO                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ XOLO                │ $0                  │
├─────────────────────┼─────────────────────┤
│ XOR                 │ $1.16               │
├─────────────────────┼─────────────────────┤
│ XOT                 │ $22.1               │
├─────────────────────┼─────────────────────┤
│ XOY                 │ $0.879              │
├─────────────────────┼─────────────────────┤
│ XP                  │ $0.05               │
├─────────────────────┼─────────────────────┤
│ XPN                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ XPR                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ XRT                 │ $3.84               │
├─────────────────────┼─────────────────────┤
│ XRUN                │ $0.344              │
├─────────────────────┼─────────────────────┤
│ XRUNE               │ $0.008              │
├─────────────────────┼─────────────────────┤
│ XSGD                │ $0.741              │
├─────────────────────┼─────────────────────┤
│ XSUSHI              │ $1.14               │
├─────────────────────┼─────────────────────┤
│ XT                  │ $2.77               │
├─────────────────────┼─────────────────────┤
│ XTK                 │ $0.004              │
├─────────────────────┼─────────────────────┤
│ XTM                 │ $0.015              │
├─────────────────────┼─────────────────────┤
│ XTN                 │ $0.037              │
├─────────────────────┼─────────────────────┤
│ XTP                 │ $0.004              │
├─────────────────────┼─────────────────────┤
│ XUC                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ XVC                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ XY                  │ $0.058              │
├─────────────────────┼─────────────────────┤
│ XYO                 │ $0.004              │
├─────────────────────┼─────────────────────┤
│ XYZ                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ Y2B                 │ $0.005              │
├─────────────────────┼─────────────────────┤
│ YAE                 │ $0.005              │
├─────────────────────┼─────────────────────┤
│ YAM                 │ $0.126              │
├─────────────────────┼─────────────────────┤
│ YASHA               │ $0                  │
├─────────────────────┼─────────────────────┤
│ YAXIS               │ $0.656              │
├─────────────────────┼─────────────────────┤
│ YCC                 │ $0.003              │
├─────────────────────┼─────────────────────┤
│ YCO                 │ $0.005              │
├─────────────────────┼─────────────────────┤
│ YCRV                │ $0.818              │
├─────────────────────┼─────────────────────┤
│ YCURVE              │ $0.011              │
├─────────────────────┼─────────────────────┤
│ YDF                 │ $0.007              │
├─────────────────────┼─────────────────────┤
│ YDR                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ YEET                │ $0                  │
├─────────────────────┼─────────────────────┤
│ YEL                 │ $0.003              │
├─────────────────────┼─────────────────────┤
│ YESP                │ $0.002              │
├─────────────────────┼─────────────────────┤
│ YETIC               │ $0                  │
├─────────────────────┼─────────────────────┤
│ YF-DAI              │ $110.6              │
├─────────────────────┼─────────────────────┤
│ YFFI                │ $0.422              │
├─────────────────────┼─────────────────────┤
│ YFI                 │ $6,533.3            │
├─────────────────────┼─────────────────────┤
│ YFII                │ $880.26             │
├─────────────────────┼─────────────────────┤
│ YFL                 │ $7.3                │
├─────────────────────┼─────────────────────┤
│ YFO                 │ $4.22               │
├─────────────────────┼─────────────────────┤
│ YFX                 │ $0.037              │
├─────────────────────┼─────────────────────┤
│ YGG                 │ $0.196              │
├─────────────────────┼─────────────────────┤
│ YIELD               │ $0.002              │
├─────────────────────┼─────────────────────┤
│ YIN                 │ $0.014              │
├─────────────────────┼─────────────────────┤
│ YLC                 │ $0.001              │
├─────────────────────┼─────────────────────┤
│ YLD                 │ $0.124              │
├─────────────────────┼─────────────────────┤
│ YMNT                │ $0                  │
├─────────────────────┼─────────────────────┤
│ YO                  │ $655.49             │
├─────────────────────┼─────────────────────┤
│ YOP                 │ $0.002              │
├─────────────────────┼─────────────────────┤
│ YOUC                │ $0.499              │
├─────────────────────┼─────────────────────┤
│ YOURWALLET          │ $0                  │
├─────────────────────┼─────────────────────┤
│ YSHORI              │ $0.001              │
├─────────────────────┼─────────────────────┤
│ YUNA                │ $0                  │
├─────────────────────┼─────────────────────┤
│ YUP                 │ $0.011              │
├─────────────────────┼─────────────────────┤
│ YVAAVE              │ $68.79              │
├─────────────────────┼─────────────────────┤
│ YVAULT-LP-YCURVE    │ $0.007              │
├─────────────────────┼─────────────────────┤
│ YVBOOST             │ $1.69               │
├─────────────────────┼─────────────────────┤
│ YVCOMP              │ $48.44              │
├─────────────────────┼─────────────────────┤
│ YVDAI               │ $1.056              │
├─────────────────────┼─────────────────────┤
│ YVE-CRVDAO          │ $0.864              │
├─────────────────────┼─────────────────────┤
│ YVHEGIC             │ $0.012              │
├─────────────────────┼─────────────────────┤
│ YVLINK              │ $6.56               │
├─────────────────────┼─────────────────────┤
│ YVLUSD              │ $1.091              │
├─────────────────────┼─────────────────────┤
│ YVRAI               │ $2.79               │
├─────────────────────┼─────────────────────┤
│ YVS                 │ $0.052              │
├─────────────────────┼─────────────────────┤
│ YVSNX               │ $2.76               │
├─────────────────────┼─────────────────────┤
│ YVSUSD              │ $1.04               │
├─────────────────────┼─────────────────────┤
│ YVSUSHI             │ $0.935              │
├─────────────────────┼─────────────────────┤
│ YVTUSD              │ $1.055              │
├─────────────────────┼─────────────────────┤
│ YVUNI               │ $5.13               │
├─────────────────────┼─────────────────────┤
│ YVUSDC              │ $1.035              │
├─────────────────────┼─────────────────────┤
│ YVUSDT              │ $1.019              │
├─────────────────────┼─────────────────────┤
│ YVWBTC              │ $27,430             │
├─────────────────────┼─────────────────────┤
│ YVWETH              │ $1,897.05           │
├─────────────────────┼─────────────────────┤
│ YVYFI               │ $6,624.9            │
├─────────────────────┼─────────────────────┤
│ Z                   │ $0                  │
├─────────────────────┼─────────────────────┤
│ Z3                  │ $0.995              │
├─────────────────────┼─────────────────────┤
│ ZAM                 │ $0.004              │
├─────────────────────┼─────────────────────┤
│ ZANO                │ $0.824              │
├─────────────────────┼─────────────────────┤
│ ZAP                 │ $0.002              │
├─────────────────────┼─────────────────────┤
│ ZB                  │ $0.261              │
├─────────────────────┼─────────────────────┤
│ ZCN                 │ $0.115              │
├─────────────────────┼─────────────────────┤
│ ZCO                 │ $0                  │
├─────────────────────┼─────────────────────┤
│ ZCX                 │ $0.069              │
├─────────────────────┼─────────────────────┤
│ ZDEX                │ $0.093              │
├─────────────────────┼─────────────────────┤
│ ZEDXION             │ $0.132              │
├─────────────────────┼─────────────────────┤
│ ZEE                 │ $0.021              │
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
```

If you can't find your token in [data/tokens.json](/data/tokens.json), feel free to open a PR/issue and we'll add it.
