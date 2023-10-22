const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const chave = ec.genKeyPair();
const chave_publica = chave.getPublic('hex');
const chave_privada = chave.getPrivate('hex');

console.log('Sua chave publica (endereco carteira)\n', chave_publica);
console.log('Sua chave privada (restrita para assinar transacoes)\n', chave_privada);
