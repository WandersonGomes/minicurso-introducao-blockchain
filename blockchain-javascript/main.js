const Transacao = require('./Transacao');
const Bloco = require('./Bloco3'); 
const BlockChain = require('./BlockChain3');

const main = () => {
    let IFCoin = new BlockChain();

/*    console.log("Minerando o bloco 1...");
    IFCoin.adicionarBloco(new Bloco(1, new Date().getTime(), { saldo: 4 }));
    console.log("Minerando o bloco 2...")
    IFCoin.adicionarBloco(new Bloco(2, new Date().getTime(), { saldo: 10 }));

    console.log(JSON.stringify(IFCoin.cadeia_blocos, null, 4));
    console.log("A BlockChain é válida? " + IFCoin.validarCadeiaBlocos());
    IFCoin.cadeia_blocos[1].dados = { amount: 20 }
    console.log("A BlockChain é válida? " + IFCoin.validarCadeiaBlocos());
*/

    IFCoin.criarTransacao(new Transacao('endereco1', 'endereco2', 100));
    IFCoin.criarTransacao(new Transacao('endereco2', 'endereco1', 50));

    console.log("\n Iniciando a mineração...");
    IFCoin.minerarTransacoesPendentes('endereco3');
    IFCoin.minerarTransacoesPendentes('endereco1');

    console.log('\nBalanço do endereco1: ' + IFCoin.getBalancoEndereco('endereco1'));
    console.log('\nBalanço do endereco2: ' + IFCoin.getBalancoEndereco('endereco2'));
    console.log('\nBalanço do endereco3: ' + IFCoin.getBalancoEndereco('endereco3'));

    console.log('\n Minerando novamente...');
    IFCoin.minerarTransacoesPendentes('endereco3');
    console.log('\nBalanço do endereco3: ' + IFCoin.getBalancoEndereco('endereco3'));
    console.log('\nBalanço do endereco1: ' + IFCoin.getBalancoEndereco('endereco1'));
}

main();