import { Ambito } from "../../Entorno/Ambito";
import { AST } from "../../Entorno/AST";
import { Expresion } from "../../Entorno/Expresion";
import { Instruccion } from "../../Entorno/Instruccion";
import { TipoPrimitivo } from "../../Entorno/Simbolos/TipoPrimitivo";
import { Nodo } from "../../Entorno/Nodo";
import { Tipo } from "../../Entorno/Simbolos/Tipo";

import { Variable } from "../../Entorno/Simbolos/Variable";

export class Return extends Expresion {
    public valor: Expresion | null;

    constructor(valor: Expresion | null, linea: number, columna: number) {
        super(linea, columna);
        this.valor = valor;
    }

    public getValor(actual: Ambito, global: Ambito, ast: AST) {
        let resultado = null;
        if (this.valor != null) {
            resultado = this.valor.getValor(actual, global, ast);
            let tipo1   = this.valor.tipo;
            console.log("Ebtramos en Return PUTO " + resultado);
            // console.log("TIPO TIPO " + tipo1.getPrimitivo());
            // let tipo1   = this.valor.tipo;
            // this.tipo = new Tipo(TipoPrimitivo.Integer);
            // console.log(resultado.tipo)
            return resultado
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
