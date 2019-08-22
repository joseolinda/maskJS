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
    return alert();
});