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

pnpm install

# Or
yarn

# Or
npm install
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
  crypto-scanner scan      Scan all addresses and tokens
  crypto-scanner list      List all the ledgers, addresses, tokens, and assets
  crypto-scanner db        DB management functions
  crypto-scanner password  Password management functions
  crypto-scanner ledger    Ledger management functions
  crypto-scanner address   Address management functions
  crypto-scanner token     Token management functions
  crypto-scanner asset     Asset management functions

Options:
      --help               Show help                                                                           [boolean]
      --version            Show version number                                                                 [boolean]
      --path               DB URL                                             [string] [default: "~/.crypto-scanner/db"]
      --provider-url       Web3 provider's URL                               [string] [default: "http://localhost:8545"]
  -p, --price              Query prices using CoinGecko                                       [boolean] [default: false]
  -g, --global-token-list  Use global token list (derived from https://tokens.coingecko.com/ethereum/all.json)
                                                                                              [boolean] [default: false]
```

The tool uses the CoinGecko API free tier by default, but if you can provide you own API key via the `COINGECKO_API_KEY` or the `COINGECKO_DEMO_API_KEY` environment variables:

```sh
COINGECKO_API_KEY=[API_KEY] crypto-scanner scan

# or

COINGECKO_DEMO_API_KEY=[API_KEY] crypto-scanner scan
```

### Scan

```sh
crypto-scanner scan

Scan all addresses and tokens

Options:
      --help                  Show help                                                                        [boolean]
      --version               Show version number                                                              [boolean]
      --provider-url          Web3 provider's URL                            [string] [default: "http://localhost:8545"]
  -p, --price                 Query prices using CoinGecko                                    [boolean] [default: false]
  -g, --global-token-list     Use global token list (derived from https://tokens.coingecko.com/ethereum/all.json)
                                                                                              [boolean] [default: false]
  -r, --csv                   The CSV reports output directory (optional)                                       [string]
  -v, --verbose               Verbose mode                                                                     [boolean]
  -e, --show-empty-addresses  Show empty addresses                                            [boolean] [default: false]
  -a, --aggregate-assets      Aggregate custom-priced assets in totals (e.g., if an asset has a custom price of 3 ETH
                              per unit, then instead of showing it separately, we will aggregate its amount with the
                              total ETH amount)                                               [boolean] [default: false]
```

### List

```sh
crypto-scanner list

List all the ledgers, addresses, tokens, and assets

Options:
      --help               Show help                                                                           [boolean]
      --version            Show version number                                                                 [boolean]
      --path               DB URL                                             [string] [default: "~/.crypto-scanner/db"]
      --provider-url       Web3 provider's URL                               [string] [default: "http://localhost:8545"]
  -p, --price              Query prices using CoinGecko                                       [boolean] [default: false]
  -g, --global-token-list  Use global token list (derived from https://tokens.coingecko.com/ethereum/all.json)
                                                                                              [boolean] [default: false]
```

### DB

```sh
crypto-scanner db

DB management functions

Commands:
  crypto-scanner db show    Show the DB
  crypto-scanner db export  Export the DB to an external file. Note that the export is *not* encrypted
  crypto-scanner db import  Import the DB from an external file. Note that the import should not be *not* encrypted

Options:
      --help               Show help                                                                           [boolean]
      --version            Show version number                                                                 [boolean]
      --path               DB URL                                             [string] [default: "~/.crypto-scanner/db"]
      --provider-url       Web3 provider's URL                               [string] [default: "http://localhost:8545"]
  -p, --price              Query prices using CoinGecko                                       [boolean] [default: false]
  -g, --global-token-list  Use global token list (derived from https://tokens.coingecko.com/ethereum/all.json)
                                                                                              [boolean] [default: false]
```

#### Show the DB

```sh
crypto-scanner list

Show the DB

Options:
      --help               Show help                                                                           [boolean]
      --version            Show version number                                                                 [boolean]
      --path               DB URL                                             [string] [default: "~/.crypto-scanner/db"]
      --provider-url       Web3 provider's URL                               [string] [default: "http://localhost:8545"]
  -p, --price              Query prices using CoinGecko                                       [boolean] [default: false]
  -g, --global-token-list  Use global token list (derived from https://tokens.coingecko.com/ethereum/all.json)
                                                                                              [boolean] [default: false]
```

#### Export the DB

```sh
crypto-scanner db export

Export the DB to an external file. Note that the export is *not* encrypted

Options:
      --help               Show help                                                                           [boolean]
      --version            Show version number                                                                 [boolean]
      --path               DB URL                                             [string] [default: "~/.crypto-scanner/db"]
      --provider-url       Web3 provider's URL                               [string] [default: "http://localhost:8545"]
  -p, --price              Query prices using CoinGecko                                       [boolean] [default: false]
  -g, --global-token-list  Use global token list (derived from https://tokens.coingecko.com/ethereum/all.json)
                                                                                              [boolean] [default: false]
  -o, --output             The output file path                                                      [string] [required]
```

#### Import the DB

```sh
crypto-scanner db import

Import the DB from an external file. Note that the import should not be *not* encrypted

Options:
      --help               Show help                                                                           [boolean]
      --version            Show version number                                                                 [boolean]
      --path               DB URL                                             [string] [default: "~/.crypto-scanner/db"]
      --provider-url       Web3 provider's URL                               [string] [default: "http://localhost:8545"]
  -p, --price              Query prices using CoinGecko                                       [boolean] [default: false]
  -g, --global-token-list  Use global token list (derived from https://tokens.coingecko.com/ethereum/all.json)
                                                                                              [boolean] [default: false]
  -i, --input              The input file path                                                       [string] [required]
```

### Password Management

```sh
crypto-scanner password

Password management functions

Commands:
  crypto-scanner password set  Set/change the encryption password

Options:
      --help               Show help                                                                           [boolean]
      --version            Show version number                                                                 [boolean]
      --path               DB URL                                             [string] [default: "~/.crypto-scanner/db"]
      --provider-url       Web3 provider's URL                               [string] [default: "http://localhost:8545"]
  -p, --price              Query prices using CoinGecko                                       [boolean] [default: false]
  -g, --global-token-list  Use global token list (derived from https://tokens.coingecko.com/ethereum/all.json)
                                                                                              [boolean] [default: false]
```

#### Set the Password

```sh
crypto-scanner password set

Set/change the encryption password

Options:
      --help               Show help                                                                           [boolean]
      --version            Show version number                                                                 [boolean]
      --path               DB URL                                             [string] [default: "~/.crypto-scanner/db"]
      --provider-url       Web3 provider's URL                               [string] [default: "http://localhost:8545"]
  -p, --price              Query prices using CoinGecko                                       [boolean] [default: false]
  -g, --global-token-list  Use global token list (derived from https://tokens.coingecko.com/ethereum/all.json)
                                                                                              [boolean] [default: false]
```

### Ledger Management

```sh
crypto-scanner ledger

Ledger management functions

Commands:
  crypto-scanner ledger add     Add a new named ledger
  crypto-scanner ledger remove  Remove an existing ledger

Options:
      --help               Show help                                                                           [boolean]
      --version            Show version number                                                                 [boolean]
      --path               DB URL                                             [string] [default: "~/.crypto-scanner/db"]
      --provider-url       Web3 provider's URL                               [string] [default: "http://localhost:8545"]
  -p, --price              Query prices using CoinGecko                                       [boolean] [default: false]
  -g, --global-token-list  Use global token list (derived from https://tokens.coingecko.com/ethereum/all.json)
                                                                                              [boolean] [default: false]
```

#### Add Ledger

```sh
crypto-scanner ledger add

Add a new ledger

Options:
      --help               Show help                                                                           [boolean]
      --version            Show version number                                                                 [boolean]
      --path               DB URL                                             [string] [default: "~/.crypto-scanner/db"]
      --provider-url       Web3 provider's URL                               [string] [default: "http://localhost:8545"]
  -p, --price              Query prices using CoinGecko                                       [boolean] [default: false]
  -g, --global-token-list  Use global token list (derived from https://tokens.coingecko.com/ethereum/all.json)
                                                                                              [boolean] [default: false]
      --name               The name of the ledger                                                    [string] [required]
```

#### Remove Ledger

```sh
crypto-scanner ledger remove

Remove an existing ledger

Options:
      --help               Show help                                                                           [boolean]
      --version            Show version number                                                                 [boolean]
      --path               DB URL                                             [string] [default: "~/.crypto-scanner/db"]
      --provider-url       Web3 provider's URL                               [string] [default: "http://localhost:8545"]
  -p, --price              Query prices using CoinGecko                                       [boolean] [default: false]
  -g, --global-token-list  Use global token list (derived from https://tokens.coingecko.com/ethereum/all.json)
                                                                                              [boolean] [default: false]
      --name               The name of the ledger                                                    [string] [required]
```

### Address Management

```sh
crypto-scanner address

Address management functions

Commands:
  crypto-scanner address add     Add an address or a list of space-separated addresses to a named ledger
  crypto-scanner address remove  Remove an address or a list of space-separated addresses from a named ledger

Options:
      --help               Show help                                                                           [boolean]
      --version            Show version number                                                                 [boolean]
      --path               DB URL                                             [string] [default: "~/.crypto-scanner/db"]
      --provider-url       Web3 provider's URL                               [string] [default: "http://localhost:8545"]
  -p, --price              Query prices using CoinGecko                                       [boolean] [default: false]
  -g, --global-token-list  Use global token list (derived from https://tokens.coingecko.com/ethereum/all.json)
                                                                                              [boolean] [default: false]
```

#### Add Addresses

```sh
crypto-scanner address add

Add an address or a list of space-separated addresses to a named ledger

Options:
      --help               Show help                                                                           [boolean]
      --version            Show version number                                                                 [boolean]
      --path               DB URL                                             [string] [default: "~/.crypto-scanner/db"]
      --provider-url       Web3 provider's URL                               [string] [default: "http://localhost:8545"]
  -p, --price              Query prices using CoinGecko                                       [boolean] [default: false]
  -g, --global-token-list  Use global token list (derived from https://tokens.coingecko.com/ethereum/all.json)
                                                                                              [boolean] [default: false]
      --name               The name of the ledger                                                    [string] [required]
      --addresses          The address (or multiple addresses) to add                                 [array] [required]
      --notes              The address notes (or multiple notes) to add                                          [array]
```

#### Remove Addresses

```sh
crypto-scanner address remove

Remove an address or a list of space-separated addresses from a named ledger

Options:
      --help               Show help                                                                           [boolean]
      --version            Show version number                                                                 [boolean]
      --path               DB URL                                             [string] [default: "~/.crypto-scanner/db"]
      --provider-url       Web3 provider's URL                               [string] [default: "http://localhost:8545"]
  -p, --price              Query prices using CoinGecko                                       [boolean] [default: false]
  -g, --global-token-list  Use global token list (derived from https://tokens.coingecko.com/ethereum/all.json)
                                                                                              [boolean] [default: false]
      --name               The name of the ledger                                                    [string] [required]
      --addresses          The address (or multiple addresses) to remove                           [array] [default: []]
```

### Token Management

```sh
crypto-scanner token

Token management functions

Commands:
  crypto-scanner token add     Add a new token
  crypto-scanner token remove  Remove a token from

Options:
      --help               Show help                                                                           [boolean]
      --version            Show version number                                                                 [boolean]
      --path               DB URL                                             [string] [default: "~/.crypto-scanner/db"]
      --provider-url       Web3 provider's URL                               [string] [default: "http://localhost:8545"]
  -p, --price              Query prices using CoinGecko                                       [boolean] [default: false]
  -g, --global-token-list  Use global token list (derived from https://tokens.coingecko.com/ethereum/all.json)
                                                                                              [boolean] [default: false]
```

#### Add Tokens

```sh
crypto-scanner token add

Add a new token

Options:
      --help               Show help                                                                           [boolean]
      --version            Show version number                                                                 [boolean]
      --path               DB URL                                             [string] [default: "~/.crypto-scanner/db"]
      --provider-url       Web3 provider's URL                               [string] [default: "http://localhost:8545"]
  -p, --price              Query prices using CoinGecko                                       [boolean] [default: false]
  -g, --global-token-list  Use global token list (derived from https://tokens.coingecko.com/ethereum/all.json)
                                                                                              [boolean] [default: false]
      --symbol             The symbol of the token                                                   [string] [required]
      --address            The address of the token                                                  [string] [required]
      --decimals           The decimals of the token                                              [number] [default: 18]
```

#### Remove Tokens

```sh
crypto-scanner token remove

Remove a token from

Options:
      --help               Show help                                                                           [boolean]
      --version            Show version number                                                                 [boolean]
      --path               DB URL                                             [string] [default: "~/.crypto-scanner/db"]
      --provider-url       Web3 provider's URL                               [string] [default: "http://localhost:8545"]
  -p, --price              Query prices using CoinGecko                                       [boolean] [default: false]
  -g, --global-token-list  Use global token list (derived from https://tokens.coingecko.com/ethereum/all.json)
                                                                                              [boolean] [default: false]
      --symbol             The symbol of the token                                                   [string] [required]
```

### Asset Management

```sh
crypto-scanner asset

Asset management functions

Commands:
  crypto-scanner asset add     Add a new asset
  crypto-scanner asset update  Update an existing asset
  crypto-scanner asset remove  Remove an existing asset

Options:
      --help               Show help                                                                           [boolean]
      --version            Show version number                                                                 [boolean]
      --path               DB URL                                             [string] [default: "~/.crypto-scanner/db"]
      --provider-url       Web3 provider's URL                               [string] [default: "http://localhost:8545"]
  -p, --price              Query prices using CoinGecko                                       [boolean] [default: false]
  -g, --global-token-list  Use global token list (derived from https://tokens.coingecko.com/ethereum/all.json)
                                                                                              [boolean] [default: false]
```

#### Add Asset

```sh
crypto-scanner asset add

Add a new asset

Options:
      --help               Show help                                                                           [boolean]
      --version            Show version number                                                                 [boolean]
      --path               DB URL                                             [string] [default: "~/.crypto-scanner/db"]
      --provider-url       Web3 provider's URL                               [string] [default: "http://localhost:8545"]
  -p, --price              Query prices using CoinGecko                                       [boolean] [default: false]
  -g, --global-token-list  Use global token list (derived from https://tokens.coingecko.com/ethereum/all.json)
                                                                                              [boolean] [default: false]
      --name               The name of the asset                                                     [string] [required]
      --quantity           The quantity of the asset                                                 [number] [required]
      --unit-price         The unit price of the asset                                                          [number]
      --symbol             The symbol of the token the asset is priced in (optional)                            [string]
```

#### Update Asset

```sh
crypto-scanner asset update

Update an existing asset

Options:
      --help               Show help                                                                           [boolean]
      --version            Show version number                                                                 [boolean]
      --path               DB URL                                             [string] [default: "~/.crypto-scanner/db"]
      --provider-url       Web3 provider's URL                               [string] [default: "http://localhost:8545"]
  -p, --price              Query prices using CoinGecko                                       [boolean] [default: false]
  -g, --global-token-list  Use global token list (derived from https://tokens.coingecko.com/ethereum/all.json)
                                                                                              [boolean] [default: false]
      --name               The name of the asset                                                     [string] [required]
      --quantity           The new quantity of the asset                                             [number] [required]
      --unit-price         The new unit price of the asset                                                      [number]
      --symbol             The symbol of the token the asset is priced in                                       [string]
```

#### Remove Asset

```sh
crypto-scanner asset remove

Remove an existing asset

Options:
      --help               Show help                                                                           [boolean]
      --version            Show version number                                                                 [boolean]
      --path               DB URL                                             [string] [default: "~/.crypto-scanner/db"]
      --provider-url       Web3 provider's URL                               [string] [default: "http://localhost:8545"]
  -p, --price              Query prices using CoinGecko                                       [boolean] [default: false]
  -g, --global-token-list  Use global token list (derived from https://tokens.coingecko.com/ethereum/all.json)
                                                                                              [boolean] [default: false]
      --name               The name of the asset                                                     [string] [required]
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
crypto-scanner address add --name "Binance" --addresses 0xBE0eB53F46cd790Cd13851d5EFf43D12404d33E8 0xF977814e90dA44bFA03b6295A0616a897441aceC --notes "Binance 7" "Binance 8"

? Enter password [hidden]

Added 0xBE0eB53F46cd790Cd13851d5EFf43D12404d33E8 to Binance (with a note: "Binance 7")
Added 0xF977814e90dA44bFA03b6295A0616a897441aceC to Binance (with a note: "Binance 8")
```

```sh
crypto-scanner address add --name "Kraken" --addresses 0xDA9dfA130Df4dE4673b89022EE50ff26f6EA73Cf

? Enter password [hidden]

Added 0xDA9dfA130Df4dE4673b89022EE50ff26f6EA73Cf to Kraken
```

```sh
crypto-scanner address add --name "Coinbase" --addresses 0x71660c4005BA85c37ccec55d0C4493E66Fe775d3 --notes "Coinbase 1"

? Enter password [hidden]

Added 0x71660c4005BA85c37ccec55d0C4493E66Fe775d3 to Coinbase (with a note: "Coinbase 1")
```

We can see that the DB has been updated:

```sh
crypto-scanner list

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
│ ETH  │ 4,254,204.37 │
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
│ Binance  │ 0xBE0eB53F46cd790Cd13851d5EFf43D12404d33E8 │ 1,996,008.38 │ Binance 7  │
├──────────┼────────────────────────────────────────────┼──────────────┼────────────┤
│ Binance  │ 0xF977814e90dA44bFA03b6295A0616a897441aceC │ 647,701.18   │ Binance 8  │
├──────────┼────────────────────────────────────────────┼──────────────┼────────────┤
│ Kraken   │ 0xDA9dfA130Df4dE4673b89022EE50ff26f6EA73Cf │ 1,598,923.57 │            │
├──────────┼────────────────────────────────────────────┼──────────────┼────────────┤
│ Coinbase │ 0x71660c4005BA85c37ccec55d0C4493E66Fe775d3 │ 11,571.25    │ Coinbase 1 │
├──────────┼────────────────────────────────────────────┼──────────────┼────────────┤
│          │ Total                                      │ 4,254,204.37 │            │
├──────────┼────────────────────────────────────────────┼──────────────┼────────────┤
│          │                                            │ ETH          │            │
└──────────┴────────────────────────────────────────────┴──────────────┴────────────┘

Ledgers
‾‾‾‾‾‾‾
┌──────────┬──────────────┐
│ Ledger   │ ETH          │
├──────────┼──────────────┤
│ Binance  │ 2,643,709.56 │
├──────────┼──────────────┤
│ Kraken   │ 1,598,923.57 │
├──────────┼──────────────┤
│ Coinbase │ 11,571.25    │
├──────────┼──────────────┤
│ Total    │ 4,254,204.37 │
├──────────┼──────────────┤
│          │ ETH          │
└──────────┴──────────────┘

Total Amounts
‾‾‾‾‾‾‾‾‾‾‾‾‾
┌──────┬──────────────┐
│ Name │ Amount       │
├──────┼──────────────┤
│ ETH  │ 4,254,204.37 │
└──────┴──────────────┘
```

#### Adding Tokens

Let's add the `USDT`, `USDC`, `DAI`, and `LINK`tokens and try again:

```sh
crypto-scanner token add --symbol USDT --address 0xdAC17F958D2ee523a2206206994597C13D831ec7 --decimals 6

? Enter password [hidden]

Added USDT at 0xdAC17F958D2ee523a2206206994597C13D831ec7 with 6 decimals
```

```sh
crypto-scanner token add --symbol USDC --address 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48 --decimals 6

? Enter password [hidden]

Added USDC at 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48 with 6 decimals
```

```sh
crypto-scanner token add --symbol DAI --address 0x6B175474E89094C44Da98b954EedeAC495271d0F

? Enter password [hidden]

Added DAI at 0x6B175474E89094C44Da98b954EedeAC495271d0F with 18 decimals
```

```sh
crypto-scanner token add --symbol LINK --address 0x514910771AF9Ca656af840dff83E8264EcF986CA

? Enter password [hidden]

Added LINK at 0x514910771AF9Ca656af840dff83E8264EcF986CA with 18 decimals
```

You can check and verify that the tokens are now part of the DB:

```sh
crypto-scanner list

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
┌──────┬──────────────────┐
│ Name │ Amount           │
├──────┼──────────────────┤
│ ETH  │ 4,254,204.33     │
├──────┼──────────────────┤
│ USDT │ 5,325,198,659.87 │
├──────┼──────────────────┤
│ USDC │ 300,001,622.94   │
├──────┼──────────────────┤
│ DAI  │ 0.0002           │
├──────┼──────────────────┤
│ LINK │ 54,653,254.58    │
└──────┴──────────────────┘
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
┌──────────┬────────────────────────────────────────────┬──────────────┬──────────────────┬────────────────┬────────┬───────────────┬────────────┐
│ Ledger   │ Address                                    │ ETH          │ USDT             │ USDC           │ DAI    │ LINK          │ Note       │
├──────────┼────────────────────────────────────────────┼──────────────┼──────────────────┼────────────────┼────────┼───────────────┼────────────┤
│ Binance  │ 0xBE0eB53F46cd790Cd13851d5EFf43D12404d33E8 │ 1,996,008.38 │ 162              │ 0              │ 0      │ 5,000,000     │ Binance 7  │
├──────────┼────────────────────────────────────────────┼──────────────┼──────────────────┼────────────────┼────────┼───────────────┼────────────┤
│ Binance  │ 0xF977814e90dA44bFA03b6295A0616a897441aceC │ 647,701.18   │ 5,325,198,345.11 │ 300,000,000    │ 0      │ 40,153,254.58 │ Binance 8  │
├──────────┼────────────────────────────────────────────┼──────────────┼──────────────────┼────────────────┼────────┼───────────────┼────────────┤
│ Kraken   │ 0xDA9dfA130Df4dE4673b89022EE50ff26f6EA73Cf │ 1,598,923.57 │ 142              │ 0              │ 0      │ 9,500,000     │            │
├──────────┼────────────────────────────────────────────┼──────────────┼──────────────────┼────────────────┼────────┼───────────────┼────────────┤
│ Coinbase │ 0x71660c4005BA85c37ccec55d0C4493E66Fe775d3 │ 11,571.2     │ 10.76            │ 1,622.94       │ 0.0002 │ 0             │ Coinbase 1 │
├──────────┼────────────────────────────────────────────┼──────────────┼──────────────────┼────────────────┼────────┼───────────────┼────────────┤
│          │ Total                                      │ 4,254,204.33 │ 5,325,198,659.87 │ 300,001,622.94 │ 0.0002 │ 54,653,254.58 │            │
├──────────┼────────────────────────────────────────────┼──────────────┼──────────────────┼────────────────┼────────┼───────────────┼────────────┤
│          │                                            │ ETH          │ USDT             │ USDC           │ DAI    │ LINK          │            │
└──────────┴────────────────────────────────────────────┴──────────────┴──────────────────┴────────────────┴────────┴───────────────┴────────────┘

Ledgers
‾‾‾‾‾‾‾
┌──────────┬──────────────┬──────────────────┬────────────────┬────────┬───────────────┐
│ Ledger   │ ETH          │ USDT             │ USDC           │ DAI    │ LINK          │
├──────────┼──────────────┼──────────────────┼────────────────┼────────┼───────────────┤
│ Binance  │ 2,643,709.56 │ 5,325,198,507.11 │ 300,000,000    │ 0      │ 45,153,254.58 │
├──────────┼──────────────┼──────────────────┼────────────────┼────────┼───────────────┤
│ Kraken   │ 1,598,923.57 │ 142              │ 0              │ 0      │ 9,500,000     │
├──────────┼──────────────┼──────────────────┼────────────────┼────────┼───────────────┤
│ Coinbase │ 11,571.2     │ 10.76            │ 1,622.94       │ 0.0002 │ 0             │
├──────────┼──────────────┼──────────────────┼────────────────┼────────┼───────────────┤
│ Total    │ 4,254,204.33 │ 5,325,198,659.87 │ 300,001,622.94 │ 0.0002 │ 54,653,254.58 │
├──────────┼──────────────┼──────────────────┼────────────────┼────────┼───────────────┤
│          │ ETH          │ USDT             │ USDC           │ DAI    │ LINK          │
└──────────┴──────────────┴──────────────────┴────────────────┴────────┴───────────────┘

Total Amounts
‾‾‾‾‾‾‾‾‾‾‾‾‾
┌──────┬──────────────────┐
│ Name │ Amount           │
├──────┼──────────────────┤
│ ETH  │ 4,254,204.33     │
├──────┼──────────────────┤
│ USDT │ 5,325,198,659.87 │
├──────┼──────────────────┤
│ USDC │ 300,001,622.94   │
├──────┼──────────────────┤
│ DAI  │ 0.0002           │
├──────┼──────────────────┤
│ LINK │ 54,653,254.58    │
└──────┴──────────────────┘
```

#### Showing USD Values

If you are interested in showing the USD values of the balances, you can pass the optional `-p/--price` flag which will query the prices using [https://www.coingecko.com/](CoinGecko API):

```sh
crypto-scanner scan -p

Querying prices. This operation may take a very long time...

Finished | ████████████████████████████████████████ 100% | ETA: 0s | 4/4

Scanning all addresses and tokens...

Finished | ████████████████████████████████████████ 100% | ETA: 0s | 4/4
Finished | ████████████████████████████████████████ 100% | ETA: 0s | 4/4

Prices
‾‾‾‾‾‾
┌────────┬───────────┐
│ Symbol │ Price     │
├────────┼───────────┤
│ DAI    │ $0.999    │
├────────┼───────────┤
│ ETH    │ $2,635.77 │
├────────┼───────────┤
│ LINK   │ $19.82    │
├────────┼───────────┤
│ USDC   │ $1        │
├────────┼───────────┤
│ USDT   │ $1        │
└────────┴───────────┘

Total Amounts
‾‾‾‾‾‾‾‾‾‾‾‾‾
┌──────┬──────────────────┬────────────────────┬──────────────────┐
│ Name │ Amount           │ Value              │ % of Total Value │
├──────┼──────────────────┼────────────────────┼──────────────────┤
│ ETH  │ 4,254,204.32     │ $11,213,104,126.64 │ 62.5678          │
├──────┼──────────────────┼────────────────────┼──────────────────┤
│ USDT │ 5,325,198,659.87 │ $5,325,198,659.87  │ 29.7140          │
├──────┼──────────────────┼────────────────────┼──────────────────┤
│ USDC │ 300,001,622.94   │ $300,001,622.94    │ 1.67397          │
├──────┼──────────────────┼────────────────────┼──────────────────┤
│ DAI  │ 0.0002           │ $0.0002            │ 9.95097e-13      │
├──────┼──────────────────┼────────────────────┼──────────────────┤
│ LINK │ 54,653,254.58    │ $1,083,227,505.76  │ 6.04428          │
├──────┼──────────────────┼────────────────────┼──────────────────┤
│      │ Total Value      │ $17,921,531,915.21 │                  │
└──────┴──────────────────┴────────────────────┴──────────────────┘
```

You can also combine both the `-p/--price` and the `-v/--verbose` flags for the full output with an aggregated total $ values and holding percentages:

```sh
crypto-scanner scan -v -p

Querying prices. This operation may take a very long time...

Finished | ████████████████████████████████████████ 100% | ETA: 0s | 4/4

Scanning all addresses and tokens...

Finished | ████████████████████████████████████████ 100% | ETA: 0s | 4/4
Finished | ████████████████████████████████████████ 100% | ETA: 0s | 4/4

Prices
‾‾‾‾‾‾
┌────────┬───────────┐
│ Symbol │ Price     │
├────────┼───────────┤
│ DAI    │ $0.999    │
├────────┼───────────┤
│ ETH    │ $2,635.77 │
├────────┼───────────┤
│ LINK   │ $19.82    │
├────────┼───────────┤
│ USDC   │ $1        │
├────────┼───────────┤
│ USDT   │ $1        │
└────────┴───────────┘

Addresses
‾‾‾‾‾‾‾‾‾
┌──────────┬────────────────────────────────────────────┬────────────────────┬───────────────────┬─────────────────┬─────────┬───────────────────┬────────────┐
│ Ledger   │ Address                                    │ ETH                │ USDT              │ USDC            │ DAI     │ LINK              │ Note       │
├──────────┼────────────────────────────────────────────┼────────────────────┼───────────────────┼─────────────────┼─────────┼───────────────────┼────────────┤
│ Binance  │ 0xBE0eB53F46cd790Cd13851d5EFf43D12404d33E8 │ 1,996,008.38       │ 162               │ 0               │ 0       │ 5,000,000         │ Binance 7  │
├──────────┼────────────────────────────────────────────┼────────────────────┼───────────────────┼─────────────────┼─────────┼───────────────────┼────────────┤
│ Binance  │ 0xF977814e90dA44bFA03b6295A0616a897441aceC │ 647,701.18         │ 5,325,198,345.11  │ 300,000,000     │ 0       │ 40,153,254.58     │ Binance 8  │
├──────────┼────────────────────────────────────────────┼────────────────────┼───────────────────┼─────────────────┼─────────┼───────────────────┼────────────┤
│ Kraken   │ 0xDA9dfA130Df4dE4673b89022EE50ff26f6EA73Cf │ 1,598,923.57       │ 142               │ 0               │ 0       │ 9,500,000         │            │
├──────────┼────────────────────────────────────────────┼────────────────────┼───────────────────┼─────────────────┼─────────┼───────────────────┼────────────┤
│ Coinbase │ 0x71660c4005BA85c37ccec55d0C4493E66Fe775d3 │ 11,571.19          │ 10.76             │ 1,622.94        │ 0.0002  │ 0                 │ Coinbase 1 │
├──────────┼────────────────────────────────────────────┼────────────────────┼───────────────────┼─────────────────┼─────────┼───────────────────┼────────────┤
│          │ Total                                      │ 4,254,204.32       │ 5,325,198,659.87  │ 300,001,622.94  │ 0.0002  │ 54,653,254.58     │            │
├──────────┼────────────────────────────────────────────┼────────────────────┼───────────────────┼─────────────────┼─────────┼───────────────────┼────────────┤
│          │                                            │ ETH                │ USDT              │ USDC            │ DAI     │ LINK              │            │
├──────────┼────────────────────────────────────────────┼────────────────────┼───────────────────┼─────────────────┼─────────┼───────────────────┼────────────┤
│          │ Total Value                                │ $11,213,104,126.64 │ $5,325,198,659.87 │ $300,001,622.94 │ $0.0002 │ $1,083,227,505.76 │            │
└──────────┴────────────────────────────────────────────┴────────────────────┴───────────────────┴─────────────────┴─────────┴───────────────────┴────────────┘

Ledgers
‾‾‾‾‾‾‾
┌─────────────┬────────────────────┬───────────────────┬─────────────────┬─────────┬───────────────────┐
│ Ledger      │ ETH                │ USDT              │ USDC            │ DAI     │ LINK              │
├─────────────┼────────────────────┼───────────────────┼─────────────────┼─────────┼───────────────────┤
│ Binance     │ 2,643,709.56       │ 5,325,198,507.11  │ 300,000,000     │ 0       │ 45,153,254.58     │
├─────────────┼────────────────────┼───────────────────┼─────────────────┼─────────┼───────────────────┤
│ Kraken      │ 1,598,923.57       │ 142               │ 0               │ 0       │ 9,500,000         │
├─────────────┼────────────────────┼───────────────────┼─────────────────┼─────────┼───────────────────┤
│ Coinbase    │ 11,571.19          │ 10.76             │ 1,622.94        │ 0.0002  │ 0                 │
├─────────────┼────────────────────┼───────────────────┼─────────────────┼─────────┼───────────────────┤
│ Total       │ 4,254,204.32       │ 5,325,198,659.87  │ 300,001,622.94  │ 0.0002  │ 54,653,254.58     │
├─────────────┼────────────────────┼───────────────────┼─────────────────┼─────────┼───────────────────┤
│             │ ETH                │ USDT              │ USDC            │ DAI     │ LINK              │
├─────────────┼────────────────────┼───────────────────┼─────────────────┼─────────┼───────────────────┤
│ Total Value │ $11,213,104,126.64 │ $5,325,198,659.87 │ $300,001,622.94 │ $0.0002 │ $1,083,227,505.76 │
└─────────────┴────────────────────┴───────────────────┴─────────────────┴─────────┴───────────────────┘

Total Amounts
‾‾‾‾‾‾‾‾‾‾‾‾‾
┌──────┬──────────────────┬────────────────────┬──────────────────┐
│ Name │ Amount           │ Value              │ % of Total Value │
├──────┼──────────────────┼────────────────────┼──────────────────┤
│ ETH  │ 4,254,204.32     │ $11,213,104,126.64 │ 62.5678          │
├──────┼──────────────────┼────────────────────┼──────────────────┤
│ USDT │ 5,325,198,659.87 │ $5,325,198,659.87  │ 29.7140          │
├──────┼──────────────────┼────────────────────┼──────────────────┤
│ USDC │ 300,001,622.94   │ $300,001,622.94    │ 1.67397          │
├──────┼──────────────────┼────────────────────┼──────────────────┤
│ DAI  │ 0.0002           │ $0.0002            │ 9.95097e-13      │
├──────┼──────────────────┼────────────────────┼──────────────────┤
│ LINK │ 54,653,254.58    │ $1,083,227,505.76  │ 6.04428          │
├──────┼──────────────────┼────────────────────┼──────────────────┤
│      │ Total Value      │ $17,921,531,915.21 │                  │
└──────┴──────────────────┴────────────────────┴──────────────────┘
```

#### Adding Assets

In addition to ETH and token amounts, you can also add static assets, by specifying their name, quantity, and unit prices. For example:

```sh
crypto-scanner asset add --name Gold --quantity 100 --unit-price 2018.25

? Enter password [hidden]

Added 100 units of Gold at the price of 2018.25 USD per unit
```

```sh
crypto-scanner asset add --name "Real Estate" --quantity 1 --unit-price 1000000

? Enter password [hidden]

Added 1 units of Real Estate at the price of 1000000 USD per unit
```

You can check and verify that the assets are now part of the DB:

```sh
crypto-scanner list

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

Querying prices. This operation may take a very long time...

Finished | ████████████████████████████████████████ 100% | ETA: 0s | 4/4

Scanning all addresses and tokens...

Finished | ████████████████████████████████████████ 100% | ETA: 0s | 4/4
Finished | ████████████████████████████████████████ 100% | ETA: 0s | 4/4

Prices
‾‾‾‾‾‾
┌─────────────┬────────────┐
│ Symbol      │ Price      │
├─────────────┼────────────┤
│ DAI         │ $0.999     │
├─────────────┼────────────┤
│ ETH         │ $2,635.77  │
├─────────────┼────────────┤
│ Gold        │ $2,018.25  │
├─────────────┼────────────┤
│ LINK        │ $19.82     │
├─────────────┼────────────┤
│ Real Estate │ $1,000,000 │
├─────────────┼────────────┤
│ USDC        │ $1         │
├─────────────┼────────────┤
│ USDT        │ $1         │
└─────────────┴────────────┘

Addresses
‾‾‾‾‾‾‾‾‾
┌──────────┬────────────────────────────────────────────┬────────────────────┬───────────────────┬─────────────────┬─────────┬───────────────────┬────────────┐
│ Ledger   │ Address                                    │ ETH                │ USDT              │ USDC            │ DAI     │ LINK              │ Note       │
├──────────┼────────────────────────────────────────────┼────────────────────┼───────────────────┼─────────────────┼─────────┼───────────────────┼────────────┤
│ Binance  │ 0xBE0eB53F46cd790Cd13851d5EFf43D12404d33E8 │ 1,996,008.38       │ 162               │ 0               │ 0       │ 5,000,000         │ Binance 7  │
├──────────┼────────────────────────────────────────────┼────────────────────┼───────────────────┼─────────────────┼─────────┼───────────────────┼────────────┤
│ Binance  │ 0xF977814e90dA44bFA03b6295A0616a897441aceC │ 647,701.18         │ 5,325,198,345.11  │ 300,000,000     │ 0       │ 40,153,254.58     │ Binance 8  │
├──────────┼────────────────────────────────────────────┼────────────────────┼───────────────────┼─────────────────┼─────────┼───────────────────┼────────────┤
│ Kraken   │ 0xDA9dfA130Df4dE4673b89022EE50ff26f6EA73Cf │ 1,598,923.57       │ 142               │ 0               │ 0       │ 9,500,000         │            │
├──────────┼────────────────────────────────────────────┼────────────────────┼───────────────────┼─────────────────┼─────────┼───────────────────┼────────────┤
│ Coinbase │ 0x71660c4005BA85c37ccec55d0C4493E66Fe775d3 │ 11,571.16          │ 10.76             │ 1,622.94        │ 0.0002  │ 0                 │ Coinbase 1 │
├──────────┼────────────────────────────────────────────┼────────────────────┼───────────────────┼─────────────────┼─────────┼───────────────────┼────────────┤
│          │ Total                                      │ 4,254,204.29       │ 5,325,198,659.87  │ 300,001,622.94  │ 0.0002  │ 54,653,254.58     │            │
├──────────┼────────────────────────────────────────────┼────────────────────┼───────────────────┼─────────────────┼─────────┼───────────────────┼────────────┤
│          │                                            │ ETH                │ USDT              │ USDC            │ DAI     │ LINK              │            │
├──────────┼────────────────────────────────────────────┼────────────────────┼───────────────────┼─────────────────┼─────────┼───────────────────┼────────────┤
│          │ Total Value                                │ $11,213,104,040.03 │ $5,325,198,659.87 │ $300,001,622.94 │ $0.0002 │ $1,083,227,505.76 │            │
└──────────┴────────────────────────────────────────────┴────────────────────┴───────────────────┴─────────────────┴─────────┴───────────────────┴────────────┘

Ledgers
‾‾‾‾‾‾‾
┌─────────────┬────────────────────┬───────────────────┬─────────────────┬─────────┬───────────────────┐
│ Ledger      │ ETH                │ USDT              │ USDC            │ DAI     │ LINK              │
├─────────────┼────────────────────┼───────────────────┼─────────────────┼─────────┼───────────────────┤
│ Binance     │ 2,643,709.56       │ 5,325,198,507.11  │ 300,000,000     │ 0       │ 45,153,254.58     │
├─────────────┼────────────────────┼───────────────────┼─────────────────┼─────────┼───────────────────┤
│ Kraken      │ 1,598,923.57       │ 142               │ 0               │ 0       │ 9,500,000         │
├─────────────┼────────────────────┼───────────────────┼─────────────────┼─────────┼───────────────────┤
│ Coinbase    │ 11,571.16          │ 10.76             │ 1,622.94        │ 0.0002  │ 0                 │
├─────────────┼────────────────────┼───────────────────┼─────────────────┼─────────┼───────────────────┤
│ Total       │ 4,254,204.29       │ 5,325,198,659.87  │ 300,001,622.94  │ 0.0002  │ 54,653,254.58     │
├─────────────┼────────────────────┼───────────────────┼─────────────────┼─────────┼───────────────────┤
│             │ ETH                │ USDT              │ USDC            │ DAI     │ LINK              │
├─────────────┼────────────────────┼───────────────────┼─────────────────┼─────────┼───────────────────┤
│ Total Value │ $11,213,104,040.03 │ $5,325,198,659.87 │ $300,001,622.94 │ $0.0002 │ $1,083,227,505.76 │
└─────────────┴────────────────────┴───────────────────┴─────────────────┴─────────┴───────────────────┘

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
┌─────────────┬──────────────────┬────────────────────┬──────────────────┐
│ Name        │ Amount           │ Value              │ % of Total Value │
├─────────────┼──────────────────┼────────────────────┼──────────────────┤
│ ETH         │ 4,254,204.29     │ $11,213,104,040.03 │ 62.5636          │
├─────────────┼──────────────────┼────────────────────┼──────────────────┤
│ USDT        │ 5,325,198,659.87 │ $5,325,198,659.87  │ 29.7120          │
├─────────────┼──────────────────┼────────────────────┼──────────────────┤
│ USDC        │ 300,001,622.94   │ $300,001,622.94    │ 1.67386          │
├─────────────┼──────────────────┼────────────────────┼──────────────────┤
│ DAI         │ 0.0002           │ $0.0002            │ 9.95031e-13      │
├─────────────┼──────────────────┼────────────────────┼──────────────────┤
│ LINK        │ 54,653,254.58    │ $1,083,227,505.76  │ 6.04387          │
├─────────────┼──────────────────┼────────────────────┼──────────────────┤
│ Gold        │ 100              │ $201,825           │ 0.00112608       │
├─────────────┼──────────────────┼────────────────────┼──────────────────┤
│ Real Estate │ 1                │ $1,000,000         │ 0.00557951       │
├─────────────┼──────────────────┼────────────────────┼──────────────────┤
│             │ Total Value      │ $17,922,733,653.6  │                  │
└─────────────┴──────────────────┴────────────────────┴──────────────────┘
```

#### Custom Pricing

You can also add assets priced in other tokens/assets. Please note that the token should have been added via the `token add` command (or appear in the global token list, if you have explicitly specified to use it):

```sh
crypto-scanner asset add --name CDP --quantity 123 --unit-price 1 --symbol ETH

? Enter password [hidden]

Added 123 units of CDP at the price of 1 ETH per unit
```

```sh
crypto-scanner asset add --name wwUSDC --quantity 1000 --unit-price 2 --symbol USDC

? Enter password [hidden]

Added 1000 units of wwUSDC at the price of 2 USDC per unit
```

You can check and verify that the new assets are now part of the DB:

```sh
crypto-scanner list

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

Querying prices. This operation may take a very long time...

Finished | ████████████████████████████████████████ 100% | ETA: 0s | 4/4

Scanning all addresses and tokens...

Finished | ████████████████████████████████████████ 100% | ETA: 0s | 4/4
Finished | ████████████████████████████████████████ 100% | ETA: 0s | 4/4

Prices
‾‾‾‾‾‾
┌─────────────┬────────────┐
│ Symbol      │ Price      │
├─────────────┼────────────┤
│ CDP         │ $2,635.77  │
├─────────────┼────────────┤
│ DAI         │ $0.999     │
├─────────────┼────────────┤
│ ETH         │ $2,635.77  │
├─────────────┼────────────┤
│ Gold        │ $2,018.25  │
├─────────────┼────────────┤
│ LINK        │ $19.82     │
├─────────────┼────────────┤
│ Real Estate │ $1,000,000 │
├─────────────┼────────────┤
│ USDC        │ $1         │
├─────────────┼────────────┤
│ USDT        │ $1         │
├─────────────┼────────────┤
│ wwUSDC      │ $2         │
└─────────────┴────────────┘

Addresses
‾‾‾‾‾‾‾‾‾
┌──────────┬────────────────────────────────────────────┬────────────────────┬───────────────────┬─────────────────┬─────────┬───────────────────┬────────────┐
│ Ledger   │ Address                                    │ ETH                │ USDT              │ USDC            │ DAI     │ LINK              │ Note       │
├──────────┼────────────────────────────────────────────┼────────────────────┼───────────────────┼─────────────────┼─────────┼───────────────────┼────────────┤
│ Binance  │ 0xBE0eB53F46cd790Cd13851d5EFf43D12404d33E8 │ 1,996,008.38       │ 162               │ 0               │ 0       │ 5,000,000         │ Binance 7  │
├──────────┼────────────────────────────────────────────┼────────────────────┼───────────────────┼─────────────────┼─────────┼───────────────────┼────────────┤
│ Binance  │ 0xF977814e90dA44bFA03b6295A0616a897441aceC │ 647,701.18         │ 5,325,198,345.11  │ 300,000,000     │ 0       │ 40,153,254.58     │ Binance 8  │
├──────────┼────────────────────────────────────────────┼────────────────────┼───────────────────┼─────────────────┼─────────┼───────────────────┼────────────┤
│ Kraken   │ 0xDA9dfA130Df4dE4673b89022EE50ff26f6EA73Cf │ 1,598,923.57       │ 142               │ 0               │ 0       │ 9,500,000         │            │
├──────────┼────────────────────────────────────────────┼────────────────────┼───────────────────┼─────────────────┼─────────┼───────────────────┼────────────┤
│ Coinbase │ 0x71660c4005BA85c37ccec55d0C4493E66Fe775d3 │ 11,571.16          │ 10.76             │ 1,622.94        │ 0.0002  │ 0                 │ Coinbase 1 │
├──────────┼────────────────────────────────────────────┼────────────────────┼───────────────────┼─────────────────┼─────────┼───────────────────┼────────────┤
│          │ Total                                      │ 4,254,204.29       │ 5,325,198,659.87  │ 300,001,622.94  │ 0.0002  │ 54,653,254.58     │            │
├──────────┼────────────────────────────────────────────┼────────────────────┼───────────────────┼─────────────────┼─────────┼───────────────────┼────────────┤
│          │                                            │ ETH                │ USDT              │ USDC            │ DAI     │ LINK              │            │
├──────────┼────────────────────────────────────────────┼────────────────────┼───────────────────┼─────────────────┼─────────┼───────────────────┼────────────┤
│          │ Total Value                                │ $11,213,104,040.03 │ $5,325,198,659.87 │ $300,001,622.94 │ $0.0002 │ $1,083,227,505.76 │            │
└──────────┴────────────────────────────────────────────┴────────────────────┴───────────────────┴─────────────────┴─────────┴───────────────────┴────────────┘

Ledgers
‾‾‾‾‾‾‾
┌─────────────┬────────────────────┬───────────────────┬─────────────────┬─────────┬───────────────────┐
│ Ledger      │ ETH                │ USDT              │ USDC            │ DAI     │ LINK              │
├─────────────┼────────────────────┼───────────────────┼─────────────────┼─────────┼───────────────────┤
│ Binance     │ 2,643,709.56       │ 5,325,198,507.11  │ 300,000,000     │ 0       │ 45,153,254.58     │
├─────────────┼────────────────────┼───────────────────┼─────────────────┼─────────┼───────────────────┤
│ Kraken      │ 1,598,923.57       │ 142               │ 0               │ 0       │ 9,500,000         │
├─────────────┼────────────────────┼───────────────────┼─────────────────┼─────────┼───────────────────┤
│ Coinbase    │ 11,571.16          │ 10.76             │ 1,622.94        │ 0.0002  │ 0                 │
├─────────────┼────────────────────┼───────────────────┼─────────────────┼─────────┼───────────────────┤
│ Total       │ 4,254,204.29       │ 5,325,198,659.87  │ 300,001,622.94  │ 0.0002  │ 54,653,254.58     │
├─────────────┼────────────────────┼───────────────────┼─────────────────┼─────────┼───────────────────┤
│             │ ETH                │ USDT              │ USDC            │ DAI     │ LINK              │
├─────────────┼────────────────────┼───────────────────┼─────────────────┼─────────┼───────────────────┤
│ Total Value │ $11,213,104,040.03 │ $5,325,198,659.87 │ $300,001,622.94 │ $0.0002 │ $1,083,227,505.76 │
└─────────────┴────────────────────┴───────────────────┴─────────────────┴─────────┴───────────────────┘

Assets
‾‾‾‾‾‾
┌─────────────┬──────────┬────────────┬─────────────┐
│ Name        │ Quantity │ Price      │ Value       │
├─────────────┼──────────┼────────────┼─────────────┤
│ Gold        │ 100      │ $2,018.25  │ $201,825    │
├─────────────┼──────────┼────────────┼─────────────┤
│ Real Estate │ 1        │ $1,000,000 │ $1,000,000  │
├─────────────┼──────────┼────────────┼─────────────┤
│ CDP         │ 123      │ 1 ETH      │ $324,199.71 │
├─────────────┼──────────┼────────────┼─────────────┤
│ wwUSDC      │ 1,000    │ 2 USDC     │ $2,000      │
└─────────────┴──────────┴────────────┴─────────────┘

Total Amounts
‾‾‾‾‾‾‾‾‾‾‾‾‾
┌─────────────┬──────────────────┬────────────────────┬──────────────────┐
│ Name        │ Amount           │ Value              │ % of Total Value │
├─────────────┼──────────────────┼────────────────────┼──────────────────┤
│ ETH         │ 4,254,204.29     │ $11,213,104,040.03 │ 62.5624          │
├─────────────┼──────────────────┼────────────────────┼──────────────────┤
│ USDT        │ 5,325,198,659.87 │ $5,325,198,659.87  │ 29.7114          │
├─────────────┼──────────────────┼────────────────────┼──────────────────┤
│ USDC        │ 300,001,622.94   │ $300,001,622.94    │ 1.67383          │
├─────────────┼──────────────────┼────────────────────┼──────────────────┤
│ DAI         │ 0.0002           │ $0.0002            │ 9.95012e-13      │
├─────────────┼──────────────────┼────────────────────┼──────────────────┤
│ LINK        │ 54,653,254.58    │ $1,083,227,505.76  │ 6.04376          │
├─────────────┼──────────────────┼────────────────────┼──────────────────┤
│ Gold        │ 100              │ $201,825           │ 0.00112606       │
├─────────────┼──────────────────┼────────────────────┼──────────────────┤
│ Real Estate │ 1                │ $1,000,000         │ 0.00557940       │
├─────────────┼──────────────────┼────────────────────┼──────────────────┤
│ CDP         │ 123              │ $324,199.71        │ 0.00180884       │
├─────────────┼──────────────────┼────────────────────┼──────────────────┤
│ wwUSDC      │ 1,000            │ $2,000             │ 0.0000111588     │
├─────────────┼──────────────────┼────────────────────┼──────────────────┤
│             │ Total Value      │ $17,923,059,853.31 │                  │
└─────────────┴──────────────────┴────────────────────┴──────────────────┘
```

You can also choose to aggregate custom-priced assets (i.e., assets which are priced in other tokens/assets) in an additional totals table by passing the optional `-a/--aggregate-assets` flag.

For example, if an asset has a custom price of `3 ETH` per unit and a quantity of `10`, we will aggregate its amount with the total ETH, by adding a total of `30 ETH` to the total ETH balance.

Using our current DB, we can see both `CDP` and `wwUSDC` are being aggregated into `ETH` and `USDC` respectively:

```sh
crypto-scanner scan -p -v -a

? Enter password [hidden]

Querying prices. This operation may take a very long time...

Finished | ████████████████████████████████████████ 100% | ETA: 0s | 8/8

Scanning all addresses and tokens...

Finished | ████████████████████████████████████████ 100% | ETA: 0s | 4/4
Finished | ████████████████████████████████████████ 100% | ETA: 0s | 4/4

Prices
‾‾‾‾‾‾
┌─────────────┬────────────┐
│ Symbol      │ Price      │
├─────────────┼────────────┤
│ CDP         │ $2,635.77  │
├─────────────┼────────────┤
│ DAI         │ $0.999     │
├─────────────┼────────────┤
│ ETH         │ $2,635.77  │
├─────────────┼────────────┤
│ Gold        │ $2,018.25  │
├─────────────┼────────────┤
│ LINK        │ $19.82     │
├─────────────┼────────────┤
│ Real Estate │ $1,000,000 │
├─────────────┼────────────┤
│ USDC        │ $1         │
├─────────────┼────────────┤
│ USDT        │ $1         │
├─────────────┼────────────┤
│ wwUSDC      │ $2         │
└─────────────┴────────────┘

Addresses
‾‾‾‾‾‾‾‾‾
┌──────────┬────────────────────────────────────────────┬────────────────────┬───────────────────┬─────────────────┬─────────┬───────────────────┬────────────┐
│ Ledger   │ Address                                    │ ETH                │ USDT              │ USDC            │ DAI     │ LINK              │ Note       │
├──────────┼────────────────────────────────────────────┼────────────────────┼───────────────────┼─────────────────┼─────────┼───────────────────┼────────────┤
│ Binance  │ 0xBE0eB53F46cd790Cd13851d5EFf43D12404d33E8 │ 1,996,008.38       │ 162               │ 0               │ 0       │ 5,000,000         │ Binance 7  │
├──────────┼────────────────────────────────────────────┼────────────────────┼───────────────────┼─────────────────┼─────────┼───────────────────┼────────────┤
│ Binance  │ 0xF977814e90dA44bFA03b6295A0616a897441aceC │ 647,701.18         │ 5,325,198,345.11  │ 300,000,000     │ 0       │ 40,153,254.58     │ Binance 8  │
├──────────┼────────────────────────────────────────────┼────────────────────┼───────────────────┼─────────────────┼─────────┼───────────────────┼────────────┤
│ Kraken   │ 0xDA9dfA130Df4dE4673b89022EE50ff26f6EA73Cf │ 1,598,923.57       │ 142               │ 0               │ 0       │ 9,500,000         │            │
├──────────┼────────────────────────────────────────────┼────────────────────┼───────────────────┼─────────────────┼─────────┼───────────────────┼────────────┤
│ Coinbase │ 0x71660c4005BA85c37ccec55d0C4493E66Fe775d3 │ 11,571.16          │ 10.76             │ 1,622.94        │ 0.0002  │ 0                 │ Coinbase 1 │
├──────────┼────────────────────────────────────────────┼────────────────────┼───────────────────┼─────────────────┼─────────┼───────────────────┼────────────┤
│          │ Total                                      │ 4,254,204.29       │ 5,325,198,659.87  │ 300,001,622.94  │ 0.0002  │ 54,653,254.58     │            │
├──────────┼────────────────────────────────────────────┼────────────────────┼───────────────────┼─────────────────┼─────────┼───────────────────┼────────────┤
│          │                                            │ ETH                │ USDT              │ USDC            │ DAI     │ LINK              │            │
├──────────┼────────────────────────────────────────────┼────────────────────┼───────────────────┼─────────────────┼─────────┼───────────────────┼────────────┤
│          │ Total Value                                │ $11,213,104,040.03 │ $5,325,198,659.87 │ $300,001,622.94 │ $0.0002 │ $1,083,227,505.76 │            │
└──────────┴────────────────────────────────────────────┴────────────────────┴───────────────────┴─────────────────┴─────────┴───────────────────┴────────────┘

Ledgers
‾‾‾‾‾‾‾
┌─────────────┬────────────────────┬───────────────────┬─────────────────┬─────────┬───────────────────┐
│ Ledger      │ ETH                │ USDT              │ USDC            │ DAI     │ LINK              │
├─────────────┼────────────────────┼───────────────────┼─────────────────┼─────────┼───────────────────┤
│ Binance     │ 2,643,709.56       │ 5,325,198,507.11  │ 300,000,000     │ 0       │ 45,153,254.58     │
├─────────────┼────────────────────┼───────────────────┼─────────────────┼─────────┼───────────────────┤
│ Kraken      │ 1,598,923.57       │ 142               │ 0               │ 0       │ 9,500,000         │
├─────────────┼────────────────────┼───────────────────┼─────────────────┼─────────┼───────────────────┤
│ Coinbase    │ 11,571.16          │ 10.76             │ 1,622.94        │ 0.0002  │ 0                 │
├─────────────┼────────────────────┼───────────────────┼─────────────────┼─────────┼───────────────────┤
│ Total       │ 4,254,204.29       │ 5,325,198,659.87  │ 300,001,622.94  │ 0.0002  │ 54,653,254.58     │
├─────────────┼────────────────────┼───────────────────┼─────────────────┼─────────┼───────────────────┤
│             │ ETH                │ USDT              │ USDC            │ DAI     │ LINK              │
├─────────────┼────────────────────┼───────────────────┼─────────────────┼─────────┼───────────────────┤
│ Total Value │ $11,213,104,040.03 │ $5,325,198,659.87 │ $300,001,622.94 │ $0.0002 │ $1,083,227,505.76 │
└─────────────┴────────────────────┴───────────────────┴─────────────────┴─────────┴───────────────────┘

Assets
‾‾‾‾‾‾
┌─────────────┬──────────┬────────────┬─────────────┐
│ Name        │ Quantity │ Price      │ Value       │
├─────────────┼──────────┼────────────┼─────────────┤
│ Gold        │ 100      │ $2,018.25  │ $201,825    │
├─────────────┼──────────┼────────────┼─────────────┤
│ Real Estate │ 1        │ $1,000,000 │ $1,000,000  │
├─────────────┼──────────┼────────────┼─────────────┤
│ CDP         │ 123      │ 1 ETH      │ $324,199.71 │
├─────────────┼──────────┼────────────┼─────────────┤
│ wwUSDC      │ 1,000    │ 2 USDC     │ $2,000      │
└─────────────┴──────────┴────────────┴─────────────┘

Total Amounts
‾‾‾‾‾‾‾‾‾‾‾‾‾
┌─────────────┬──────────────────┬────────────────────┬──────────────────┐
│ Name        │ Amount           │ Value              │ % of Total Value │
├─────────────┼──────────────────┼────────────────────┼──────────────────┤
│ ETH         │ 4,254,204.29     │ $11,213,104,040.03 │ 62.5624          │
├─────────────┼──────────────────┼────────────────────┼──────────────────┤
│ USDT        │ 5,325,198,659.87 │ $5,325,198,659.87  │ 29.7114          │
├─────────────┼──────────────────┼────────────────────┼──────────────────┤
│ USDC        │ 300,001,622.94   │ $300,001,622.94    │ 1.67383          │
├─────────────┼──────────────────┼────────────────────┼──────────────────┤
│ DAI         │ 0.0002           │ $0.0002            │ 9.95012e-13      │
├─────────────┼──────────────────┼────────────────────┼──────────────────┤
│ LINK        │ 54,653,254.58    │ $1,083,227,505.76  │ 6.04376          │
├─────────────┼──────────────────┼────────────────────┼──────────────────┤
│ Gold        │ 100              │ $201,825           │ 0.00112606       │
├─────────────┼──────────────────┼────────────────────┼──────────────────┤
│ Real Estate │ 1                │ $1,000,000         │ 0.00557940       │
├─────────────┼──────────────────┼────────────────────┼──────────────────┤
│ CDP         │ 123              │ $324,199.71        │ 0.00180884       │
├─────────────┼──────────────────┼────────────────────┼──────────────────┤
│ wwUSDC      │ 1,000            │ $2,000             │ 0.0000111588     │
├─────────────┼──────────────────┼────────────────────┼──────────────────┤
│             │ Total Value      │ $17,923,059,853.31 │                  │
└─────────────┴──────────────────┴────────────────────┴──────────────────┘

Total Aggregated Amounts
‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
┌─────────────┬──────────────────┬────────────────────┬──────────────────┐
│ Name        │ Amount           │ Value              │ % of Total Value │
├─────────────┼──────────────────┼────────────────────┼──────────────────┤
│ ETH         │ 4,254,327.29     │ $11,213,428,239.74 │ 62.5643          │
├─────────────┼──────────────────┼────────────────────┼──────────────────┤
│ USDT        │ 5,325,198,659.87 │ $5,325,198,659.87  │ 29.7114          │
├─────────────┼──────────────────┼────────────────────┼──────────────────┤
│ USDC        │ 300,003,622.94   │ $300,003,622.94    │ 1.67384          │
├─────────────┼──────────────────┼────────────────────┼──────────────────┤
│ DAI         │ 0.0002           │ $0.0002            │ 9.95012e-13      │
├─────────────┼──────────────────┼────────────────────┼──────────────────┤
│ LINK        │ 54,653,254.58    │ $1,083,227,505.76  │ 6.04376          │
├─────────────┼──────────────────┼────────────────────┼──────────────────┤
│ Gold        │ 100              │ $201,825           │ 0.00112606       │
├─────────────┼──────────────────┼────────────────────┼──────────────────┤
│ Real Estate │ 1                │ $1,000,000         │ 0.00557940       │
├─────────────┼──────────────────┼────────────────────┼──────────────────┤
│             │ Total Value      │ $17,923,059,853.31 │                  │
└─────────────┴──────────────────┴────────────────────┴──────────────────┘
```

#### Using Global Token List

You can also scan using the global token list (derived from [CoinGecko's Token List](https://tokens.coingecko.com/ethereum/all.json)), in addition to the tokens you've explicitly added above, by providing the  `-g/--global-token-list` flag.

Due to the latest Coingecko's batch query restriction, fetching prices for the global token list is no longer supported.

Please note that when the global token list is used, the `-v/--verbose` flag is not recommended, since most terminals won't be able to show its output properly. Therefore, we'd recommend using the global token list with the `-r/--csv` report instead.

```sh
crypto-scanner scan -g -r ~/reports

Scanning all addresses and tokens...

Finished | ████████████████████████████████████████ 100% | ETA: 0s | 4/4
Finished | ████████████████████████████████████████ 100% | ETA: 0s | 3748/3748

Total Amounts
‾‾‾‾‾‾‾‾‾‾‾‾‾
┌──────────────────┬─────────────────────────┐
│ Name             │ Amount                  │
├──────────────────┼─────────────────────────┤
│ ETH              │ 5,169,701.41            │
├──────────────────┼─────────────────────────┤
│ USDT             │ 30,000,533.18           │
├──────────────────┼─────────────────────────┤
│ USDC             │ 100,000,490.99          │
├──────────────────┼─────────────────────────┤
│ DAI              │ 292,409                 │
├──────────────────┼─────────────────────────┤
│ LINK             │ 64,500,000              │
├──────────────────┼─────────────────────────┤
│ 0XBTC            │ 2                       │
├──────────────────┼─────────────────────────┤
│ 1INCH            │ 59,708,578.16           │
├──────────────────┼─────────────────────────┤
│ AAVE             │ 1,038,453.08            │
├──────────────────┼─────────────────────────┤
│ ACH              │ 1,061,482,229.53        │
├──────────────────┼─────────────────────────┤
│ ADX              │ 37,534,438.16           │
├──────────────────┼─────────────────────────┤
│ AE               │ 13,150                  │
├──────────────────┼─────────────────────────┤
│ AERGO            │ 25,204,064.57           │
├──────────────────┼─────────────────────────┤
│ AGIX             │ 280,000,000             │
├──────────────────┼─────────────────────────┤
│ AGLD             │ 26,332,322.06           │
├──────────────────┼─────────────────────────┤
│ AKRO             │ 1,862,205,869.01        │
├──────────────────┼─────────────────────────┤
│ ALCX             │ 84,033.69               │
├──────────────────┼─────────────────────────┤
│ ALICE            │ 15,300,000              │
├──────────────────┼─────────────────────────┤
│ ALPHA            │ 38,835,993.65           │
├──────────────────┼─────────────────────────┤
│ AMP              │ 2,109,114,411.84        │
├──────────────────┼─────────────────────────┤
│ ANB              │ 245,554                 │
├──────────────────┼─────────────────────────┤
│ ANKR             │ 453,480,869.48          │
├──────────────────┼─────────────────────────┤
│ ANT              │ 3,700,000               │
├──────────────────┼─────────────────────────┤
│ APE              │ 7,400,002.11            │
├──────────────────┼─────────────────────────┤
│ API3             │ 3,712,417.64            │
├──────────────────┼─────────────────────────┤
│ APPC             │ 20,000,000              │
├──────────────────┼─────────────────────────┤
│ ARPA             │ 281,833,819.78          │
├──────────────────┼─────────────────────────┤
│ ART              │ 157,000                 │
├──────────────────┼─────────────────────────┤
│ AST              │ 59,541,479.89           │
├──────────────────┼─────────────────────────┤
│ ATA              │ 161,756,933.68          │
├──────────────────┼─────────────────────────┤
│ ATRI             │ 3                       │
├──────────────────┼─────────────────────────┤
│ AUCTION          │ 663,719.15              │
├──────────────────┼─────────────────────────┤
│ AUDIO            │ 59,557,198.02           │
├──────────────────┼─────────────────────────┤
│ AXS              │ 1,337,508.95            │
├──────────────────┼─────────────────────────┤
│ BADGER           │ 1,968,285.51            │
├──────────────────┼─────────────────────────┤
│ BAL              │ 1,202,400.56            │
├──────────────────┼─────────────────────────┤
│ BAND             │ 1,681,369.33            │
├──────────────────┼─────────────────────────┤
│ BAT              │ 75,800,000              │
├──────────────────┼─────────────────────────┤
│ BBTC             │ 1,200                   │
├──────────────────┼─────────────────────────┤
│ BCPT             │ 11,875,644.64           │
├──────────────────┼─────────────────────────┤
│ BDOT             │ 107,028                 │
├──────────────────┼─────────────────────────┤
│ BEL              │ 12,227,197.91           │
├──────────────────┼─────────────────────────┤
│ BEND             │ 7                       │
├──────────────────┼─────────────────────────┤
│ BICO             │ 20,492,314.18           │
├──────────────────┼─────────────────────────┤
│ BLUESPARROW      │ 100.01                  │
├──────────────────┼─────────────────────────┤
│ BLZ              │ 185,074,430.12          │
├──────────────────┼─────────────────────────┤
│ BNT              │ 4,000,000               │
├──────────────────┼─────────────────────────┤
│ BOBA             │ 5,462,341.48            │
├──────────────────┼─────────────────────────┤
│ BOND             │ 1,250,140.36            │
├──────────────────┼─────────────────────────┤
│ BRD              │ 21,000,000              │
├──────────────────┼─────────────────────────┤
│ BTB              │ 20                      │
├──────────────────┼─────────────────────────┤
│ BUSD             │ 2,900,000,000           │
├──────────────────┼─────────────────────────┤
│ C98              │ 107,850,854.29          │
├──────────────────┼─────────────────────────┤
│ CBK              │ 28,000                  │
├──────────────────┼─────────────────────────┤
│ CBM              │ 300,000,000             │
├──────────────────┼─────────────────────────┤
│ CBX              │ 120                     │
├──────────────────┼─────────────────────────┤
│ CDAI             │ 20,540,897.37           │
├──────────────────┼─────────────────────────┤
│ CEL              │ 2,230.13                │
├──────────────────┼─────────────────────────┤
│ CELR             │ 1,356,696,774.56        │
├──────────────────┼─────────────────────────┤
│ CERE             │ 2,400                   │
├──────────────────┼─────────────────────────┤
│ CFI              │ 1                       │
├──────────────────┼─────────────────────────┤
│ CHAT             │ 25,156,470.39           │
├──────────────────┼─────────────────────────┤
│ CHR              │ 280,688,434.03          │
├──────────────────┼─────────────────────────┤
│ CHZ              │ 2,376,511,860.02        │
├──────────────────┼─────────────────────────┤
│ CLV              │ 206,641,209.37          │
├──────────────────┼─────────────────────────┤
│ CND              │ 390,000,000             │
├──────────────────┼─────────────────────────┤
│ COMP             │ 533,336.46              │
├──────────────────┼─────────────────────────┤
│ COTI             │ 467,503,535.27          │
├──────────────────┼─────────────────────────┤
│ CPT              │ 250,000                 │
├──────────────────┼─────────────────────────┤
│ CQT              │ 10                      │
├──────────────────┼─────────────────────────┤
│ CREAM            │ 400,000                 │
├──────────────────┼─────────────────────────┤
│ CRV              │ 62,000,000              │
├──────────────────┼─────────────────────────┤
│ CTSI             │ 67,016,128.89           │
├──────────────────┼─────────────────────────┤
│ CULT             │ 697,308.13              │
├──────────────────┼─────────────────────────┤
│ CVC              │ 30,000,000              │
├──────────────────┼─────────────────────────┤
│ CVP              │ 12,186,954.58           │
├──────────────────┼─────────────────────────┤
│ CVX              │ 1,488,947.92            │
├──────────────────┼─────────────────────────┤
│ DAR              │ 61,113,909.71           │
├──────────────────┼─────────────────────────┤
│ DATA             │ 258,272,713.01          │
├──────────────────┼─────────────────────────┤
│ DENT             │ 44,264,582,651.89       │
├──────────────────┼─────────────────────────┤
│ DEXE             │ 1,305,892.05            │
├──────────────────┼─────────────────────────┤
│ DF               │ 175,563,733.35          │
├──────────────────┼─────────────────────────┤
│ DIE              │ 55,343,888              │
├──────────────────┼─────────────────────────┤
│ DINGO            │ 73,522,461,487.56       │
├──────────────────┼─────────────────────────┤
│ DLT              │ 40,000,000              │
├──────────────────┼─────────────────────────┤
│ DMTR             │ 1                       │
├──────────────────┼─────────────────────────┤
│ DNT              │ 31,000,000              │
├──────────────────┼─────────────────────────┤
│ DODO             │ 113,710,661.37          │
├──────────────────┼─────────────────────────┤
│ DOE              │ 3,200,000               │
├──────────────────┼─────────────────────────┤
│ DREP             │ 15,667,977.87           │
├──────────────────┼─────────────────────────┤
│ DTH              │ 69,420                  │
├──────────────────┼─────────────────────────┤
│ DUSK             │ 64,845,859.75           │
├──────────────────┼─────────────────────────┤
│ DYDX             │ 41,022,929.76           │
├──────────────────┼─────────────────────────┤
│ ELF              │ 47,341,020.32           │
├──────────────────┼─────────────────────────┤
│ ELON             │ 632,206,458,069.41      │
├──────────────────┼─────────────────────────┤
│ ENG              │ 93,266.58               │
├──────────────────┼─────────────────────────┤
│ ENJ              │ 174,186,416.08          │
├──────────────────┼─────────────────────────┤
│ ENS              │ 2,076,497.53            │
├──────────────────┼─────────────────────────┤
│ ERN              │ 7,716,434.02            │
├──────────────────┼─────────────────────────┤
│ ETHM             │ 2,157,534,007.9         │
├──────────────────┼─────────────────────────┤
│ EVX              │ 2,500,000               │
├──────────────────┼─────────────────────────┤
│ EZ               │ 728,966.95              │
├──────────────────┼─────────────────────────┤
│ FARM             │ 206,100.79              │
├──────────────────┼─────────────────────────┤
│ FBX              │ 0.03                    │
├──────────────────┼─────────────────────────┤
│ FET              │ 150,000,000.01          │
├──────────────────┼─────────────────────────┤
│ FIS              │ 27,112,861.97           │
├──────────────────┼─────────────────────────┤
│ FOR              │ 220,000,000             │
├──────────────────┼─────────────────────────┤
│ FORTH            │ 2,564,806.18            │
├──────────────────┼─────────────────────────┤
│ FOX              │ 400                     │
├──────────────────┼─────────────────────────┤
│ FREE             │ 550,000                 │
├──────────────────┼─────────────────────────┤
│ FRONT            │ 13,141,145.21           │
├──────────────────┼─────────────────────────┤
│ FTT              │ 39,000,000              │
├──────────────────┼─────────────────────────┤
│ FUEL             │ 219,660,357.47          │
├──────────────────┼─────────────────────────┤
│ FUN              │ 2,465,285,537.17        │
├──────────────────┼─────────────────────────┤
│ FXS              │ 2,100,000               │
├──────────────────┼─────────────────────────┤
│ GAL              │ 18,780,474.75           │
├──────────────────┼─────────────────────────┤
│ GALA             │ 4,591,208,353.23        │
├──────────────────┼─────────────────────────┤
│ GEC              │ 1,000                   │
├──────────────────┼─────────────────────────┤
│ GF               │ 569,396.89              │
├──────────────────┼─────────────────────────┤
│ GHST             │ 7,507,350.22            │
├──────────────────┼─────────────────────────┤
│ GLM              │ 31,361,094              │
├──────────────────┼─────────────────────────┤
│ GMT              │ 26,392,399.1            │
├──────────────────┼─────────────────────────┤
│ GNO              │ 19,288.75               │
├──────────────────┼─────────────────────────┤
│ GRT              │ 694,916,314.64          │
├──────────────────┼─────────────────────────┤
│ GVT              │ 300,000                 │
├──────────────────┼─────────────────────────┤
│ GYEN             │ 14,144,026.8            │
├──────────────────┼─────────────────────────┤
│ HBTC             │ 56                      │
├──────────────────┼─────────────────────────┤
│ HDRN             │ 14,658,610.39           │
├──────────────────┼─────────────────────────┤
│ HEGIC            │ 20,460,000              │
├──────────────────┼─────────────────────────┤
│ HEX              │ 2,200                   │
├──────────────────┼─────────────────────────┤
│ HFT              │ 74,000,000              │
├──────────────────┼─────────────────────────┤
│ HIFI             │ 15,920,864              │
├──────────────────┼─────────────────────────┤
│ HIGH             │ 17,791,945.42           │
├──────────────────┼─────────────────────────┤
│ HOT              │ 43,695,275,508.86       │
├──────────────────┼─────────────────────────┤
│ HSF              │ 1                       │
├──────────────────┼─────────────────────────┤
│ ID               │ 169,359,748.89          │
├──────────────────┼─────────────────────────┤
│ IDEX             │ 215,464,921.06          │
├──────────────────┼─────────────────────────┤
│ IDRT             │ 3,000,000,000           │
├──────────────────┼─────────────────────────┤
│ ILV              │ 364,296.39              │
├──────────────────┼─────────────────────────┤
│ IMX              │ 42,123,788.62           │
├──────────────────┼─────────────────────────┤
│ INJ              │ 3,391.24                │
├──────────────────┼─────────────────────────┤
│ IQ               │ 451,848,008.32          │
├──────────────────┼─────────────────────────┤
│ JASMY            │ 10,094,222,103.03       │
├──────────────────┼─────────────────────────┤
│ KEY              │ 3,375,420,389.23        │
├──────────────────┼─────────────────────────┤
│ KISHU            │ 25,940,474.87           │
├──────────────────┼─────────────────────────┤
│ KNC              │ 9,364,327.12            │
├──────────────────┼─────────────────────────┤
│ KP3R             │ 148,294.74              │
├──────────────────┼─────────────────────────┤
│ LBA              │ 14,000,000              │
├──────────────────┼─────────────────────────┤
│ LCX              │ 0.0343                  │
├──────────────────┼─────────────────────────┤
│ LDO              │ 4,000,000               │
├──────────────────┼─────────────────────────┤
│ LEVER            │ 10,788,791,291.87       │
├──────────────────┼─────────────────────────┤
│ LINA             │ 1,343,433,490.65        │
├──────────────────┼─────────────────────────┤
│ LINU             │ 10                      │
├──────────────────┼─────────────────────────┤
│ LIT              │ 31,191,343.39           │
├──────────────────┼─────────────────────────┤
│ LOKA             │ 46,311,390.47           │
├──────────────────┼─────────────────────────┤
│ LOOKS            │ 17,171.49               │
├──────────────────┼─────────────────────────┤
│ LPT              │ 1,977,525.58            │
├──────────────────┼─────────────────────────┤
│ LQTY             │ 8,000,000               │
├──────────────────┼─────────────────────────┤
│ LRC              │ 130,574,286.43          │
├──────────────────┼─────────────────────────┤
│ LTO              │ 24,014,574.32           │
├──────────────────┼─────────────────────────┤
│ LUN              │ 310,488.42              │
├──────────────────┼─────────────────────────┤
│ LUNC             │ 369,862.43              │
├──────────────────┼─────────────────────────┤
│ MANA             │ 176,977,667.46          │
├──────────────────┼─────────────────────────┤
│ MASK             │ 7,709,266.44            │
├──────────────────┼─────────────────────────┤
│ MATIC            │ 505,938,656.06          │
├──────────────────┼─────────────────────────┤
│ MC               │ 24,079,410.21           │
├──────────────────┼─────────────────────────┤
│ MCO              │ 442,076.7               │
├──────────────────┼─────────────────────────┤
│ MDA              │ 1,040,425.58            │
├──────────────────┼─────────────────────────┤
│ MDT              │ 267,290,546.42          │
├──────────────────┼─────────────────────────┤
│ MDX              │ 148,000,000             │
├──────────────────┼─────────────────────────┤
│ MITH             │ 181,000,000             │
├──────────────────┼─────────────────────────┤
│ MKR              │ 35,780.87               │
├──────────────────┼─────────────────────────┤
│ MLN              │ 80,251.29               │
├──────────────────┼─────────────────────────┤
│ MONGOOSE         │ 212,022,490,024,796,400 │
├──────────────────┼─────────────────────────┤
│ MOPS             │ 160,000,000             │
├──────────────────┼─────────────────────────┤
│ MTH              │ 29,000,000              │
├──────────────────┼─────────────────────────┤
│ MTL              │ 10,563,043.55           │
├──────────────────┼─────────────────────────┤
│ MUSE             │ 2.5                     │
├──────────────────┼─────────────────────────┤
│ MXC              │ 0.8                     │
├──────────────────┼─────────────────────────┤
│ NCASH            │ 770,000,000             │
├──────────────────┼─────────────────────────┤
│ NEXO             │ 7,000,000               │
├──────────────────┼─────────────────────────┤
│ NKN              │ 138,244,319.97          │
├──────────────────┼─────────────────────────┤
│ NMR              │ 400,826.91              │
├──────────────────┼─────────────────────────┤
│ NUTS             │ 8.89                    │
├──────────────────┼─────────────────────────┤
│ OAX              │ 34,900,001              │
├──────────────────┼─────────────────────────┤
│ OCEAN            │ 117,577,514             │
├──────────────────┼─────────────────────────┤
│ OGN              │ 134,770,000             │
├──────────────────┼─────────────────────────┤
│ OGV              │ 78,000,000              │
├──────────────────┼─────────────────────────┤
│ OM               │ 177,116,853.2           │
├──────────────────┼─────────────────────────┤
│ OMG              │ 21,115,750.37           │
├──────────────────┼─────────────────────────┤
│ ONX              │ 90,471                  │
├──────────────────┼─────────────────────────┤
│ OOKI             │ 2,782,754,971.39        │
├──────────────────┼─────────────────────────┤
│ OOKS             │ 148                     │
├──────────────────┼─────────────────────────┤
│ OPENAIERC        │ 4                       │
├──────────────────┼─────────────────────────┤
│ OPTI             │ 37                      │
├──────────────────┼─────────────────────────┤
│ ORBS             │ 70                      │
├──────────────────┼─────────────────────────┤
│ ORN              │ 10,235,354.31           │
├──────────────────┼─────────────────────────┤
│ OST              │ 137,885,647.54          │
├──────────────────┼─────────────────────────┤
│ OXT              │ 77,000,000.09           │
├──────────────────┼─────────────────────────┤
│ PAXG             │ 32,919.52               │
├──────────────────┼─────────────────────────┤
│ PEOPLE           │ 1,470,000,000           │
├──────────────────┼─────────────────────────┤
│ PEPE             │ 70,156,631,106,200.61   │
├──────────────────┼─────────────────────────┤
│ PERL             │ 438,892,467.19          │
├──────────────────┼─────────────────────────┤
│ PERP             │ 21,560,175.86           │
├──────────────────┼─────────────────────────┤
│ PHA              │ 80,392,196.21           │
├──────────────────┼─────────────────────────┤
│ PHCR             │ 1,333,333               │
├──────────────────┼─────────────────────────┤
│ PLA              │ 9,056,485.25            │
├──────────────────┼─────────────────────────┤
│ PNT              │ 27,561,106.11           │
├──────────────────┼─────────────────────────┤
│ POLS             │ 14,900,000              │
├──────────────────┼─────────────────────────┤
│ POND             │ 745,146,090.72          │
├──────────────────┼─────────────────────────┤
│ POWR             │ 45,387,352.92           │
├──────────────────┼─────────────────────────┤
│ PPT              │ 1,000,000               │
├──────────────────┼─────────────────────────┤
│ PROM             │ 1,700,000               │
├──────────────────┼─────────────────────────┤
│ PROS             │ 14,000,010              │
├──────────────────┼─────────────────────────┤
│ PSTAKE           │ 423,319.33              │
├──────────────────┼─────────────────────────┤
│ PUNDIX           │ 22,043,329.47           │
├──────────────────┼─────────────────────────┤
│ PYR              │ 5,923,605.05            │
├──────────────────┼─────────────────────────┤
│ QKC              │ 379,374,275.58          │
├──────────────────┼─────────────────────────┤
│ QNT              │ 622,469.08              │
├──────────────────┼─────────────────────────┤
│ QSP              │ 65,918,989.36           │
├──────────────────┼─────────────────────────┤
│ QUICK            │ 5,000                   │
├──────────────────┼─────────────────────────┤
│ RAD              │ 6,273,554.77            │
├──────────────────┼─────────────────────────┤
│ RCN              │ 30,000,000              │
├──────────────────┼─────────────────────────┤
│ REEF             │ 184,562,485.21          │
├──────────────────┼─────────────────────────┤
│ REN              │ 173,400,000             │
├──────────────────┼─────────────────────────┤
│ REP              │ 220,000                 │
├──────────────────┼─────────────────────────┤
│ REQ              │ 124,167,792.47          │
├──────────────────┼─────────────────────────┤
│ RLC              │ 14,306,743.23           │
├──────────────────┼─────────────────────────┤
│ RNDR             │ 47,000,000              │
├──────────────────┼─────────────────────────┤
│ RPL              │ 202,654.44              │
├──────────────────┼─────────────────────────┤
│ RSR              │ 7,901,502,896.93        │
├──────────────────┼─────────────────────────┤
│ RYOSHI           │ 264,457,420.2           │
├──────────────────┼─────────────────────────┤
│ S4F              │ 3,337                   │
├──────────────────┼─────────────────────────┤
│ SALT             │ 4,041,865.61            │
├──────────────────┼─────────────────────────┤
│ SAND             │ 272,545,978             │
├──────────────────┼─────────────────────────┤
│ SHEESHA          │ 0.03                    │
├──────────────────┼─────────────────────────┤
│ SHIB             │ 31,100,228,229,298.63   │
├──────────────────┼─────────────────────────┤
│ SHIBGUN          │ 51,618                  │
├──────────────────┼─────────────────────────┤
│ SHIBMERICAN      │ 9,167,015,579,905,010   │
├──────────────────┼─────────────────────────┤
│ SHIK             │ 7                       │
├──────────────────┼─────────────────────────┤
│ SKL              │ 420,000,000.42          │
├──────────────────┼─────────────────────────┤
│ SKRT             │ 1,666.67                │
├──────────────────┼─────────────────────────┤
│ SLP              │ 650,000,000             │
├──────────────────┼─────────────────────────┤
│ SNGLS            │ 364,500,000             │
├──────────────────┼─────────────────────────┤
│ SNM              │ 27,822,467.6            │
├──────────────────┼─────────────────────────┤
│ SNT              │ 180,000,000             │
├──────────────────┼─────────────────────────┤
│ SNX              │ 2,231,445.89            │
├──────────────────┼─────────────────────────┤
│ SPELL            │ 12,064,978,842.38       │
├──────────────────┼─────────────────────────┤
│ SSV              │ 2,799,187.65            │
├──────────────────┼─────────────────────────┤
│ STAKE            │ 0.0009                  │
├──────────────────┼─────────────────────────┤
│ STG              │ 23,796,913.1            │
├──────────────────┼─────────────────────────┤
│ STMX             │ 1,438,405,756.32        │
├──────────────────┼─────────────────────────┤
│ STORJ            │ 29,567,668.98           │
├──────────────────┼─────────────────────────┤
│ STPT             │ 308,882,978.33          │
├──────────────────┼─────────────────────────┤
│ SUB              │ 10,035,296.77           │
├──────────────────┼─────────────────────────┤
│ SUPER            │ 62,450,449.29           │
├──────────────────┼─────────────────────────┤
│ SUSD             │ 1,500,000               │
├──────────────────┼─────────────────────────┤
│ SUSHI            │ 42,359,565.41           │
├──────────────────┼─────────────────────────┤
│ SWAPP            │ 5                       │
├──────────────────┼─────────────────────────┤
│ SWFTC            │ 10,000                  │
├──────────────────┼─────────────────────────┤
│ SWRV             │ 1,100,000               │
├──────────────────┼─────────────────────────┤
│ SXP              │ 0                       │
├──────────────────┼─────────────────────────┤
│ SYN              │ 11,196,520              │
├──────────────────┼─────────────────────────┤
│ TCT              │ 128,888,545             │
├──────────────────┼─────────────────────────┤
│ TEXAN            │ 2,200,000               │
├──────────────────┼─────────────────────────┤
│ TLM              │ 703,228,351.11          │
├──────────────────┼─────────────────────────┤
│ TOMOE            │ 22,015,640              │
├──────────────────┼─────────────────────────┤
│ TORN             │ 2,049,728.4             │
├──────────────────┼─────────────────────────┤
│ TRAC             │ 59                      │
├──────────────────┼─────────────────────────┤
│ TRB              │ 597,995.67              │
├──────────────────┼─────────────────────────┤
│ TRIBE            │ 5,800,000               │
├──────────────────┼─────────────────────────┤
│ TSUKA            │ 6                       │
├──────────────────┼─────────────────────────┤
│ TUSD             │ 340,000,000             │
├──────────────────┼─────────────────────────┤
│ TVK              │ 472,826,368.58          │
├──────────────────┼─────────────────────────┤
│ UFT              │ 12,636,580.75           │
├──────────────────┼─────────────────────────┤
│ UMA              │ 3,066,316.93            │
├──────────────────┼─────────────────────────┤
│ UNFI             │ 2,380,267.5             │
├──────────────────┼─────────────────────────┤
│ UTK              │ 109,000,068             │
├──────────────────┼─────────────────────────┤
│ VAB              │ 33,852,452              │
├──────────────────┼─────────────────────────┤
│ VGX              │ 120,000,000             │
├──────────────────┼─────────────────────────┤
│ VIB              │ 139,031,622             │
├──────────────────┼─────────────────────────┤
│ VIBE             │ 18,333,332              │
├──────────────────┼─────────────────────────┤
│ VIDT             │ 360,770,125.83          │
├──────────────────┼─────────────────────────┤
│ WABI             │ 26,700,000              │
├──────────────────┼─────────────────────────┤
│ WCFG             │ 0.167                   │
├──────────────────┼─────────────────────────┤
│ WFTM             │ 453,094,587.14          │
├──────────────────┼─────────────────────────┤
│ WINGS            │ 2,617,585.64            │
├──────────────────┼─────────────────────────┤
│ WJXN             │ 10                      │
├──────────────────┼─────────────────────────┤
│ WNXM             │ 277,436.6               │
├──────────────────┼─────────────────────────┤
│ WOO              │ 123,145,824.19          │
├──────────────────┼─────────────────────────┤
│ WPR              │ 118,104,767             │
├──────────────────┼─────────────────────────┤
│ WTC              │ 15,432,824.66           │
├──────────────────┼─────────────────────────┤
│ WXRP             │ 1,495,557.05            │
├──────────────────┼─────────────────────────┤
│ XDATA            │ 323.39                  │
├──────────────────┼─────────────────────────┤
│ XMON             │ 0.0005                  │
├──────────────────┼─────────────────────────┤
│ XOT              │ 0.0001                  │
├──────────────────┼─────────────────────────┤
│ XPR              │ 4,800,000               │
├──────────────────┼─────────────────────────┤
│ XYO              │ 0.3775                  │
├──────────────────┼─────────────────────────┤
│ YCURVE           │ 46,246.75               │
├──────────────────┼─────────────────────────┤
│ YFI              │ 3,696.31                │
├──────────────────┼─────────────────────────┤
│ YFII             │ 11,869.83               │
├──────────────────┼─────────────────────────┤
│ YFL              │ 0.0001                  │
├──────────────────┼─────────────────────────┤
│ YGG              │ 64,000,000              │
├──────────────────┼─────────────────────────┤
│ YVAULT-LP-YCURVE │ 0.0001                  │
├──────────────────┼─────────────────────────┤
│ ZRX              │ 50,067,948.41           │
├──────────────────┼─────────────────────────┤
│ ZUM              │ 15,682,407.29           │
├──────────────────┼─────────────────────────┤
│ Gold             │ 100                     │
├──────────────────┼─────────────────────────┤
│ Real Estate      │ 1                       │
├──────────────────┼─────────────────────────┤
│ CDP              │ 123                     │
├──────────────────┼─────────────────────────┤
│ wwUSDC           │ 1,000                   │
└──────────────────┴─────────────────────────┘

Exported address data to: ~/reports/addresses.csv
Exported price data to: ~/reports/prices.csv
Exported totals data to: ~/reports/totals.csv
```

If you can't find your token in [src/data/tokens.ts](/src/data/tokens.ts), feel free to open a PR/issue and we'll add it.
