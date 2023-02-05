# crypto-watcher

Crypto Watcher is a privacy-oriented tool used to track Ether and token balances across multiple addresses and groups (ledgers).

All the data is stored locally in an AES256 encrypted database.

## Usage

```sh
index.ts <command>

Commands:
  index.ts show            Show the configuration
  index.ts add-address     Add an address or a list of space-separated addresses
                           to a named ledger
  index.ts remove-address  Remove an address or a list of space-separated
                           addresses from a named ledger
  index.ts remove-ledger   Remove an entire named ledger
  index.ts add-token       Add a token to the config
  index.ts remove-token    Remove a token from the config
  index.ts query           Query all addresses and tokens

Options:
  --version  Show version number                                       [boolean]
  --url      Web3 provider's URL     [string] [default: "http://localhost:8545"]
  --verbose  Verbose mode                                              [boolean]
  --help     Show help                                                 [boolean]
```
