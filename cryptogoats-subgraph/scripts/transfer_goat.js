const CryptoGoat = artifacts.require('./CryptoGoat.sol')

module.exports = async (callback) => {
  const registry = await CryptoGoat.deployed()

  console.log('Account address:', registry.address)


  const tx = await registry.safeTransferFrom("0xae5cde3eccf1c906cf5eeeaf983b88ed6879c316", "0x08438ed71083fb9e7887f4d9e7d0b39fb3620900", 1)
  console.log(tx)

  callback(tx.tx)
}
