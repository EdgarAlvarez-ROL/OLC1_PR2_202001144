import { Ambito } from "../../Entorno/Ambito";
import { AST } from "../../Entorno/AST";
import { Expresion } from "../../Entorno/Expresion";
import { Instruccion } from "../../Entorno/Instruccion";
import { TipoPrimitivo } from "../../Entorno/Simbolos/TipoPrimitivo";
import { Nodo } from "../../Entorno/Nodo";
import { Tipo } from "../../Entorno/Simbolos/Tipo";

import { Variable } from "../../Entorno/Simbolos/Variable";

export class Return extends Instruccion {
    public valor: Expresion | null;

    constructor(valor: Expresion | null, linea: number, columna: number) {
        super(linea, columna);
        this.valor = valor;
    }

    public ejecutar(actual: Ambito, global: Ambito, ast: AST) {
        let resultado;
        if (this.valor != null) {
            resultado = this.valor.getValor(actual, global, ast);
            let tipo1   = this.valor.tipo;
            // console.log("Ebtramos en Return " + resultado);
            // console.log("TIPO TIPO " + tipo1.getPrimitivo());
            // let tipo1   = this.valor.tipo;
            // this.tipo = new Tipo(TipoPrimitivo.Integer);
            // console.log(resultado.tipo)
            return {inst:'Return', valor: resultado, tipo:tipo1, linea:this.linea, columna:this.columna}
        }
        throw new ReturnException(resultado);
    }

    public getTipo(actual: Ambito, global: Ambito, ast: AST){
        let resultado = null;
        if (this.valor != null) {
            resultado = this.valor.getValor(actual, global, ast);
            let tipo1   = this.valor.tipo
            // console.log("Tipo Tipo " + tipo1);
            // this.tipo = new Tipo(TipoPrimitivo.Integer);
            // console.log(resultado.tipo)
            return tipo1
        }
    }
}

class ReturnException {
    valor: Expresion | null;

    constructor(valor: Expresion | null) {
        this.valor = valor;
    }
}
