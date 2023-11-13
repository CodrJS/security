# @codrjs/security

![npm version](https://img.shields.io/npm/v/@codrjs/security)
[![CodeQL](https://github.com/CodrJS/security/actions/workflows/codeql.yml/badge.svg?branch=main)](https://github.com/CodrJS/security/actions/workflows/codeql.yml)

## Purpose

This package should be used in all of Codr's microservices to ensure strict authentication verification is implemented.

## Getting started

Install the package from the npm registry.

```bash
yarn add @codrjs/security
```

```js
// expected usage:
import { JwtPayload } from "jsonwebtoken";
import JwtSecurity from "@codrjs/security";

// Create's an instance of the JwtSecurity class. Use this as a singleton.
const jwtSecurity = new JwtSecurity({ aud: "codr", iss: "https://codrml.com" });

// Creating and verifying a token.
const token = jwtSecurity.sign("subject-id", { permissions: ["CREATE:ANNOTATION"] });
const decoded = jwtSecurity.verify(token) as JwtPayload;

console.log(decoded.permissions);
// output ["CREATE:ANNOTATION"]

// Rotate signing keys, important for secuity mishaps.
//  `-> Keys should be rotated often, at least once a month, preferrably at least once a week.
jwtSecurity.rotate();

// The authentication service show have these values exposed for other services to verify signed tokens.
jwtSecurity.keyId;
jwtSecurity.publicKey;
```

## TODO

- [ ]

## Contributing

```bash
# Clone the repo
git clone git@github.com:CodrJS/security.git

# Install yarn if you don't have it already
npm install -g yarn

# Install dependencies, build, and test the code
yarn install
yarn build
yarn test
```
