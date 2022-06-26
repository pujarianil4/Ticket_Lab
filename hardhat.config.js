require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.4',
  networks: {
    rinkeby: {
      url: 'https://rinkeby.infura.io/v3/a44ba5a185844cd8b2a0d799c5e773c9',
      accounts: [
        `${process.env.REACT_APP_PRIVATE_KEY ? process.env.REACT_APP_PRIVATE_KEY : '0e48ab07ef90dec14498607fc16dedb2252e1ddb146c03be5c24c94d242a9f9d'}`
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
//'0e48ab07ef90dec14498607fc16dedb2252e1ddb146c03be5c24c94d242a9f9d',