<ExtensionHeader
  name="Decoder"
  description="Decode BOLT11 invoices and LNURL codes."
  category="Utilities & Tools"
  icon="🔍"
  repo="bitkarrot/decoder"
/>

## Demo (Video)

https://github.com/bitkarrot/decoder/assets/73979971/9621f31f-052b-46e4-a294-8cd5a17c8d30

## Installation

Install this extension using the manifest from this repository:

[https://raw.githubusercontent.com/bitkarrot/decoder/main/manifest.json](https://raw.githubusercontent.com/bitkarrot/decoder/main/manifest.json)

Add the above link to LNBits on the Admin Panel by Visiting: Manage Server -> Server -> Extension Sources

<img width="480" alt="Screenshot 2024-01-08 at 3 37 25 PM" src="https://github.com/bitkarrot/decoder/assets/73979971/eb782af2-e4ae-4249-8f7d-ffa809693150">

## Example Usage

### Decode a BOLT11 invoice

<img width="620" alt="Screenshot 2024-01-08 at 3 31 09 PM" src="https://github.com/bitkarrot/decoder/assets/73979971/63f8e6e4-1594-4cc8-b277-8ef60d0df1a1">

### Decode a LNURL

<img width="630" alt="Screenshot 2024-01-08 at 3 30 53 PM" src="https://github.com/bitkarrot/decoder/assets/73979971/ce97a651-2f75-401b-887e-3a2ddf6010fe">

### Decode a Lightning Address

<img width="644" alt="Screenshot 2024-01-08 at 3 30 23 PM" src="https://github.com/bitkarrot/decoder/assets/73979971/8e14373b-842c-4529-86c0-50785347a4f0">

## Get Started

Mininum poetry version has is ^1.2, but it is recommended to use latest poetry. (including OSX)

```sh
poetry env use python3.9
poetry install --only main
```

## API Reference

See the [Decoder API documentation](./api) for endpoint details.

## Related Pages

- [Decoder API Reference](./api): API endpoints for this extension
- [All Extensions](/extensions/): Browse all LNbits extensions
