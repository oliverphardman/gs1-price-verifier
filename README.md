# gs1-price-verifier

A simple npm module for creating check digits for four-digit or five-digit price fields, otherwise known as 'price verifiers'.

For more information, please see the [official GS1 standard](https://ref.gs1.org/standards/genspecs/).

# Installation
`npm install gs1-price-verifier`
`import gs1PriceVerifier from 'gs1-price-verifier'`

# Usage
`gs1PriceVerifier(priceDigits)`

`priceDigits` should be a four or five digit purely numeric string (e.g. "1234" or "12345") depending on your barcode setup.
Values before the first significant digit should be padded with 0s.

For example, in a 4 digit system, $12.34 would be "1234" and $1.23 would be "0123"

In a 5 digit system, $12.34 would be "01234" and $1.23 would be "00123".