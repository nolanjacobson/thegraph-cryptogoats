const CryptoGoat = artifacts.require('./CryptoGoat.sol')

module.exports = async (callback) => {
  const registry = await CryptoGoat.deployed()

  console.log('Account address:', registry.address)


  const tx = await registry.requestNewRandomGoat(77239, "Jordan Earls")
  const tx2 = await registry.requestNewRandomGoat(7777777, "Jeff Berwick")
  const tx3 = await registry.requestNewRandomGoat(7, "Ned Scott")
  const tx4 = await registry.requestNewRandomGoat(777, "Charlie Shrem")

  callback(tx.tx)
}
