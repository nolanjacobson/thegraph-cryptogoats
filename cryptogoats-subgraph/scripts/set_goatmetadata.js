const CryptoGoat = artifacts.require('./CryptoGoat.sol')
module.exports = async callback => {
    const cg = await CryptoGoat.deployed()
    const tx = await cg.setTokenURI(0, "https://ipfs.io/ipfs/QmY5gNyR8mGWtYC2LdkxcNMNV7dKjx4YSuHymj2is85dmZ?filename=satoshi-nakamoto.json")
    const tx1 = await cg.setTokenURI(1, "https://ipfs.io/ipfs/QmXxJn43AK1tfYb1DAi21GaogtZCW1JN1M4aEd6cnim14T?filename=vitalik-buterin.json")
    const tx2 = await cg.setTokenURI(2, "https://ipfs.io/ipfs/QmVmw5HCLVxCPZGquWVNzpdUqzQGohFkdCKihKSopZqeDB?filename=dan-larimer.json")
    const tx3 = await cg.setTokenURI(3, "https://ipfs.io/ipfs/Qmbw1LmBsR5QrLgkmQoi8LSUDU2iAsiu4gs251nkw5DgL5?filename=roger-ver.json")
    const tx4 = await cg.setTokenURI(4, "https://ipfs.io/ipfs/QmQgsgMdkfPTFMXVptXZ5T36oqsrsvrBgWtHLhEngHmQuV?filename=jordan-earls.json")
    const tx5 = await cg.setTokenURI(5, "https://ipfs.io/ipfs/QmU85dVewWGjB1Ymsfh34Qzob59vR9mz4VWF4XcSvhKbwb?filename=jeff-berwick.json")
    const tx6 = await cg.setTokenURI(6, "https://ipfs.io/ipfs/QmZVH7jXRDhPVHi4mb1EK1sjn5Cpa4MUXcdPb55d6DsDcx?filename=ned-scott.json")
    const tx7 = await cg.setTokenURI(7, "https://ipfs.io/ipfs/QmXtf8KjWhCLJNpNip6F37qAQjWGbcqpz7Vj2H35Rk3rs8?filename=charlie-shrem.json")
    console.log(tx)
    callback(tx.tx)
}