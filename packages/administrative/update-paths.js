const os = require('os');
const fs = require('fs');
const path = require('path');
const homedir = os.homedir();

console.log('Replacing references in config.json')
const configFilePath = path.join(__dirname, '../../org1.identities.config.json');
const configFile = require(configFilePath);
fs.writeFileSync(configFilePath, JSON.stringify({
    ...configFile,
    keyStore: configFile.keyStore.replace(/^.+\/hyperledger-fabric-network/, path.join(homedir, 'hyperledger-fabric-network')),
    networkProfile: configFile.networkProfile.replace(/^.+\/hyperledger-fabric-network/, path.join(homedir, 'hyperledger-fabric-network'))
}, null, 2));