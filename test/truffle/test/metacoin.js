import Contest from '../../../src';
const contest = new Contest({ debug: true });

// contract('MetaCoin', function () {
//   it('does a thing', function(done) {
//     setTimeout(() => {
//       console.log("meta", MetaCoin);
//       assert.equal(1,1);
//       done()
//     }, 2000);
//   })
//   // it('doeeeee');
//   setTimeout(() => {
//     console.log("hmm", MetaCoin)
//   }, 1000)
// });

//
// // woohoo!
contract('MetaCoin', function (accounts) {
  // if we want to redeploy the contract we can do so
  it('is ready', function () {
    const balance = 10000;
    const transfer = Math.ceil(Math.random() * balance / 2);

    contest
    .deploy(MetaCoin)
    // .use(MetaCoin.deployed())

    .describe('Account Balances')
    ._('getBalance', 'initializes with correct balances', {
      [accounts[0]]: balance,
      [accounts[1]]: 0,
    })

    .describe('Library Import')
    ._('getBalanceInEth', 'returns correct value', {
      [accounts[0]]: balance * 2,
      [accounts[1]]: 0,
    })
    .use(MetaCoin.deployed())
    .describe('Transfer balances')
    ._('Transfer event', 'fires the events correctly', [
      { _from: accounts[0], _to: accounts[1], _value: transfer },
    ])
    ._('sendCoin transaction', 'transfer succeeds', [
      [accounts[1], transfer, { from: accounts[0] }],
    ])
    ._('getBalance', 'balances after transaction are correct', {
      [accounts[0]]: balance - transfer,
      [accounts[1]]: transfer,
    })

    .done();
  });
});
