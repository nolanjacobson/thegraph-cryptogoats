const CryptoGoat = artifacts.require('./CryptoGoat.sol')

module.exports = async (callback) => {
  const registry = await CryptoGoat.deployed()

  console.log('Account address:', registry.address)


  const tx = await registry.requestNewRandomGoat(77, "Satoshi Nakamoto")
  const tx2 = await registry.requestNewRandomGoat(7777777, "Vitalik Buterin")
  const tx3 = await registry.requestNewRandomGoat(7, "Dan Larimer")
  const tx4 = await registry.requestNewRandomGoat(777, "Roger Ver")

  callback(tx.tx)
}
