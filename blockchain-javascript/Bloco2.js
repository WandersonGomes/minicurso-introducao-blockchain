/*
Código adaptado de Simply Explained
*/
const SHA256 = require('crypto-js/sha256');

class Bloco {
    constructor(indice, instante, dados, hash_bloco_anterior = '') {
        this.indice = indice;
        this.instante = instante;
        this.dados = dados;
        this.hash_bloco_anterior = hash_bloco_anterior;
        this.nonce = 0;
        this.hash = this.calcularHash();
    }

    calcularHash() {
        const dados_gerar_hash = 
            this.index +
            this.hash_bloco_anterior +
            this.instante +
            this.nonce +
            JSON.stringify(this.dados).toString();
        
        return SHA256(dados_gerar_hash).toString();
    }

    minerarBloco(dificuldade) {
        while(this.hash.substring(0, dificuldade) !== Array(dificuldade + 1).join("0")) {
            this.nonce++;
            this.hash = this.calcularHash();
        }

        console.log("Bloco minerado: " + this.hash);
    }
}

module.exports = Bloco;