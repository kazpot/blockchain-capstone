const SolnSquareVerifier = artifacts.require('SolnSquareVerifier');

contract('TestSolnSquareVerifier', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];

    describe('Solution verification and mint', function () {
        beforeEach(async function () { 
            this.contract = await SolnSquareVerifier.deployed();
        })

        it('Add solution', async function () {
            let a = ["0x229c71eddfa39a531684053787c12a10c6235f062196338ade64033fbbae2435", "0x228c8a878ab7de5f13af21346e030a22be10027d2db0b9fdabbd54170c1a553f"];
            let b = [["0x17e2908e5f22fe6a3465d9b157233b720dd9ba317a7acb8b859ee5845e69877e", "0x0acf427c079d06be88e0d1f8e7d0dab33b581e2dd5a7a9b2280a66333a236c74"], ["0x1be08b841006f51c806d960234b9fe854f5211ff5126ad7af8116b346f403e4c", "0x07823fbdb15a15a158d3a9adbeeb09c7c28779e8dda34c4deeb4df43bcecb396"]];
            let c = ["0x221b26064b666269407f465e4e052cb667cb8f2ac67ba5657309cecfe8214393", "0x251898cf688e0d5ccaf781fe525dbfab5917f0004966d8a51291f5538a441f04"];
            let input = ["0x0000000000000000000000000000000000000000000000000000000000000009", "0x0000000000000000000000000000000000000000000000000000000000000001"];
            await this.contract.addSolution(a, b, c, input, {from: account_two});
            let solSize = await this.contract.solutionSize();
            assert.equal(solSize.toNumber(), 1);
        })

        it('Mint token', async function () {
            await this.contract.mintToken(account_two, 999, {from: account_one});
            let balance = await this.contract.balanceOf(account_two);
            assert.equal(balance.toNumber(), 1);
        })
    });
})