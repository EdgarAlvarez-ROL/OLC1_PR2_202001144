import { Ambito } from "../../Entorno/Ambito";
import { AST } from "../../Entorno/AST";
import { Expresion } from "../../Entorno/Expresion";
import { Instruccion } from "../../Entorno/Instruccion";
import { TipoPrimitivo } from "../../Entorno/Simbolos/TipoPrimitivo";
import { Nodo } from "../../Entorno/Nodo";

export class Return extends Instruccion{

    // id:     string;
    exp:    Expresion;
    // normal_o_no: String; /*0 asignacion normal | 1 asignacion vector */

    constructor(exp: Expresion, linea: number, columna: number) {
        super(linea, columna);
        this.exp = exp;
    }

    public ejecutar(actual: Ambito, global: Ambito, ast: AST) {
        let valor_variable = this.exp.getValor(actual, global, ast);
        
        let sentencia_control = "Return";
        return {sentencia_control, valor_variable}
    }

    

}