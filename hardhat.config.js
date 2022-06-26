require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.4',
  networks: {
    rinkeby: {
      url: 'https://rinkeby.infura.io/v3/a44ba5a185844cd8b2a0d799c5e773c9',
      accounts: [
        `${process.env.REACT_APP_PRIVATE_KEY}`
      ],
    },
  },
  paths: {
    artifacts: './src/Contract/artifacts',
    sources: './src/Contract/contracts',
    cache: './src/Contract/cache',
    tests: './src/Contract/test',
  },
};
// 0x2723dC111bc2AA0ad38341F5DB24f1A2e8A30d11