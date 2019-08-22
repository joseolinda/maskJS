(function(elementoPrincipal, factory) {
        if (typeof define === 'function' && define.amd) {
            define(factory);
        } else if (typeof exports === 'object') {
            module.exports = factory();
        } else {
            elementoPrincipal.MaskJS = factory();
        }
    }
)( this, function () {
    const   NUMERO = "9",
            LETRA = "A",
            LETRA_E_NUMERO = "S",
            TECLAS_PROIBIDAS = [9, 16, 17, 18, 36, 37, 38, 39, 40, 91, 92, 93],
            teclaPermitida = function (codigoTecla) {
                for( let i = 0; i < TECLAS_PROIBIDAS.length; i++){
                    if ( codigoTecla === TECLAS_PROIBIDAS[i]) {
                        return false;
                    }
                    return true;
                }
            },
        mesclarOpcoesMoeda = function(opcoes) {
            opcoes = opcoes || {};
            opcoes = {
                casasDecimais: opcoes.hasOwnProperty("casasDecimais") ? opcoes.casasDecimais : 2,
                separadorDecimal: opcoes.separadorDecimal || ",",
                separadorMilhar: opcoes.separadorMilhar || ".",
                simboloMoeda: opcoes.simboloMoeda && (opcoes.simboloMoeda.replace(/[\s]/g,'') + " ") || "",
                simboloMoedaNoFinal: opcoes.simboloMoedaNoFinal && (" " + opcoes.simboloMoedaNoFinal.replace(/[\s]/g,'')) || "",
                zeroCentavos: opcoes.zeroCentavos,
                saidaExibida: opcoes.saidaExibida
            };
            opcoes.precisao = opcoes.zeroCentavos ? 0 : opcoes.casasDecimais;
            return opcoes;
        },
        adicionarPlaceholderNaSaida = function(saida, index, placeholder) {
            for (; index < saida.length; index++) {
                if(saida[index] === NUMERO || saida[index] === LETRA || saida[index] === LETRA_E_NUMERO) {
                    saida[index] = placeholder;
                }
            }
            return saida;
        }
        ;

    // Objeto principal
    const MaskJS = function (el) {
        if( !el || ! el instanceof HTMLElement ) {
            throw new Error("");
        }
        const elementos = ("length" in el) ? (el.length ? el : []) : [el];
        return new ClassMascarar(elementos);

    };

    // Classe das mascaras
    const ClassMascarar = function(elementos) {
        this.elementos = elementos;
    };

    ClassMascarar.prototype.desvincularMascara = function() {
        for (let i = 0, len = this.elementos.length; i < len; i++) {
            this.elementos[i].saidaExibida = "";
            this.elementos[i].onkeyup = false;
            this.elementos[i].onkeydown = false;

            if (this.elementos[i].value.length) {
                this.elementos[i].value = this.elementos[i].value.replace(/\D/g, '');
            }
        }
    };
});