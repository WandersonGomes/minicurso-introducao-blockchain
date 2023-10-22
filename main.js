const BlockChain = require('./blockchain');
const Transacao = require('./transacao');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
const debug = require('debug')('moneyCoin:blockchain');

console.log('Criando uma instancia da minha chave...');
const minhaChave = ec.keyFromPrivate('1e43cb1d3459d71dea37086562dd27e8998a7ae0e93f394f12daf49a8d9f07af');

console.log('Pegando a chave publica da minha chave privada...');
const enderecoMinhaCarteira = minhaChave.getPublic('hex');

console.log('Criando a blockchain...');
const moneyCoin = new BlockChain();

console.log('Minerando transacoes pendentes...');
moneyCoin.minerarTransacoesPendentes(enderecoMinhaCarteira);

console.log('Criando a primeira transacao...');
const transacao1 = new Transacao(enderecoMinhaCarteira, 'mansao-do-caminho', 100);
console.log('Assinando transacao...');
transacao1.assinarTransacao(minhaChave);
console.log('Adicionando transacao...');
moneyCoin.adicionarTransacao(transacao1);

console.log('Minerando transacoes pendentes...');
moneyCoin.minerarTransacoesPendentes(enderecoMinhaCarteira);

console.log('Criando a segunda transacao...');
const transacao2 = new Transacao(enderecoMinhaCarteira, 'mansao-do-caminho', 50);
console.log('Assinando transacao...');
transacao2.assinarTransacao(minhaChave);
console.log('Adicionando transacao...');
moneyCoin.adicionarTransacao(transacao2);

console.log('Minerando transacaoes pendentes...');
moneyCoin.minerarTransacoesPendentes(enderecoMinhaCarteira);

console.log(`Saldo da minha carteira: ${moneyCoin.getSaldoEndereco(enderecoMinhaCarteira)}`);
console.log('BlockChain é válida?', moneyCoin.validarCadeiaBlocos() ? 'Sim' : 'Não');