const CryptoGoat = artifacts.require('./CryptoGoat.sol')
const fs = require('fs')

const metadataTemple = {
    "name": "",
    "description": "",
    "image": "",
    "attributes": [
        {
            "trait_type": "Strength",
            "value": 0
        },
        {
            "trait_type": "Dexterity",
            "value": 0
        },
        {
            "trait_type": "Constitution",
            "value": 0
        },
        {
            "trait_type": "Intelligence",
            "value": 0
        },
        {
            "trait_type": "Wisdom",
            "value": 0
        },
        {
            "trait_type": "Charisma",
            "value": 0
        },
        {
            "trait_type": "Experience",
            "value": 0
        }
    ]
}
module.exports = async callback => {
    const cg = await CryptoGoat.deployed()
    length = await cg.getNumberOfGoats()
    index = 0
    while (index < length) {
        console.log('Let\'s get the overview of your character ' + index + ' of ' + length)
        let cryptoGoatMetadata = metadataTemple
        let cryptoGoatOverview = await cg.goats(index)
        index++
        cryptoGoatMetadata['name'] = cryptoGoatOverview['name']
        if (fs.existsSync('metadata/' + cryptoGoatMetadata['name'].toLowerCase().replace(/\s/g, '-') + '.json')) {
            console.log('test')
            continue
        }
        console.log(cryptoGoatMetadata['name'])
        cryptoGoatMetadata['attributes'][0]['value'] = cryptoGoatOverview['strength']['words'][0]
        cryptoGoatMetadata['attributes'][1]['value'] = cryptoGoatOverview['greed']['words'][0]
        cryptoGoatMetadata['attributes'][2]['value'] = cryptoGoatOverview['savageness']['words'][0]
        cryptoGoatMetadata['attributes'][3]['value'] = cryptoGoatOverview['privacy']['words'][0]
        cryptoGoatMetadata['attributes'][4]['value'] = cryptoGoatOverview['wisdom']['words'][0]
        cryptoGoatMetadata['attributes'][5]['value'] = cryptoGoatOverview['wealth']['words'][0]
        filename = 'metadata/' + cryptoGoatMetadata['name'].toLowerCase().replace(/\s/g, '-')
        let data = JSON.stringify(cryptoGoatMetadata)
        fs.writeFileSync(filename + '.json', data)
    }
    callback(cg)
}