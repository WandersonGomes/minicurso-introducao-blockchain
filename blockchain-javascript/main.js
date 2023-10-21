const Bloco = require('./Bloco'); 
const BlockChain = require('./BlockChain');

const main = () => {
    let IFCoin = new BlockChain();

    IFCoin.adicionarBloco(new Bloco(1, new Date().getTime(), { saldo: 4 }));
    IFCoin.adicionarBloco(new Bloco(2, new Date().getTime(), { saldo: 10 }));

    //console.log(JSON.stringify(IFCoin.cadeia_blocos, null, 4));
    console.log("A BlockChain é válida? " + IFCoin.validarCadeiaBlocos());

    IFCoin.cadeia_blocos[1].dados = { amount: 20 };

    console.log("A BlockChain é válida? " + IFCoin.validarCadeiaBlocos());

}

main();