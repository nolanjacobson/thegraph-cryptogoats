# The Graph + Chainlink + NFT's

In this repository, you will find two folders. The first folder contains a simple NextJS server-side React application that is read-only
and renders an array of NFT's on the Rinkeby testnet that represent "CryptoGoats". You should be able to see their picture which is hosted and pinned
on IPFS via Pinata, their unique Id in the collection of CryptoGoats, the current owner of the NFT, and their randomly generated stats where I leveraged
Chainlink VRF function in the second folder for on-chain randomness.

The second repository contains a suite of folders with a smart contract that represents the ERC-721 NFT's, migrations, truffle scripts to generate the CryptoGoats
and their IPFS metadata, and a simple subgraph that maps over `NewGoat`, `UpdatedGoatMetadata`, and `Transfer` events. The subgraph can be found on The Graph at
the following url: https://thegraph.com/explorer/subgraph/nolanjacobson/cryptogoats

