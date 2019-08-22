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
    const NUMERO = "9",
        LETRA = "A",
        LETRA_E_NUMERO = "S",
        TECLAS_PROIBIDAS = [9, 16, 17, 18, 36, 37, 38, 39, 40, 91, 92, 93],
        teclaPermitida = function (codigoTecla) {
            for (let i = 0; i < TECLAS_PROIBIDAS.length; i++) {
                if (codigoTecla === TECLAS_PROIBIDAS[i]) {
                    return false;
                }
                return true;
            }
        },
        mesclarOpcoesMoeda = function (opcoes) {
            opcoes = opcoes || {};
            opcoes = {
                casasDecimais: opcoes.hasOwnProperty("casasDecimais") ? opcoes.casasDecimais : 2,
                separadorDecimal: opcoes.separadorDecimal || ",",
                separadorMilhar: opcoes.separadorMilhar || ".",
                simboloMoeda: opcoes.simboloMoeda && (opcoes.simboloMoeda.replace(/[\s]/g, '') + " ") || "",
                simboloMoedaNoFinal: opcoes.simboloMoedaNoFinal && (" " + opcoes.simboloMoedaNoFinal.replace(/[\s]/g, '')) || "",
                zeroCentavos: opcoes.zeroCentavos,
                saidaExibida: opcoes.saidaExibida
            };
            opcoes.precisao = opcoes.zeroCentavos ? 0 : opcoes.casasDecimais;
            return opcoes;
        },
        adicionarPlaceholderNaSaida = function (saida, index, placeholder) {
            for (; index < saida.length; index++) {
                if (saida[index] === NUMERO || saida[index] === LETRA || saida[index] === LETRA_E_NUMERO) {
                    saida[index] = placeholder;
                }
            }
            return saida;
        }
    ;

    // Objeto principal
    const MaskJS = function (el) {
        if (!el || !el instanceof HTMLElement) {
            throw new Error("");
        }
        const elementos = ("length" in el) ? (el.length ? el : []) : [el];
        return new ClassMascarar(elementos);

    };

    // Classe das mascaras
    const ClassMascarar = function (elementos) {
        this.elementos = elementos;
    };

    ClassMascarar.prototype.desvincularMascara = function () {
        for (let i = 0, len = this.elementos.length; i < len; i++) {
            this.elementos[i].saidaExibida = "";
            this.elementos[i].onkeyup = false;
            this.elementos[i].onkeydown = false;

            if (this.elementos[i].value.length) {
                this.elementos[i].value = this.elementos[i].value.replace(/\D/g, '');
            }
        }
    };

    ClassMascarar.prototype.vincularMascara = function (funcaoDeMascara) {
        const that = this,
            aoDigitar = function (e) {
                e = e || window.event;
                const origem = e.target || e.srcElement;

                if (teclaPermitida(e.keyCode)) {
                    setTimeout(function () {
                        that.opcoes.saidaExibida = origem.saidaExibida;
                        origem.value = MaskJS[funcaoDeMascara](origem.value, that.opcoes);
                        origem.saidaExibida = origem.value;
                    }, 0);
                }
            };

        for( let i = 0; i < this.elementos.length; i++){
            this.elementos[i].saidaExibida = "";
            this.elementos[i].onkeyup = aoDigitar;
            if (this.elementos[i].value.length) {
                this.elementos[i].value = MaskJS[funcaoDeMascara](this.elementos[i].value, this.opcoes);
            }
        }

    };

    MaskJS.paraNumero = function (valor) {
        return valor.toString().replace(/(?!^-)[^0-9]/g, "");
    };

    MaskJS.paraAlfanumerico = function(valor) {
        return valor.toString().replace(/[^a-z0-9 ]+/i, "");
    };

    MaskJS.paraLetras = function(valor) {
        return valor.toString().replace(/[^a-z]+/i, "");
    };

    ClassMascarar.prototype.mascararNumero = function () {
        this.opcoes = {};
        this.vincularMascara("paraNumero");
    };

    return MaskJS;

});