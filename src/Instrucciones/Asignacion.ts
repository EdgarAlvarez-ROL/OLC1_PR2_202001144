import { Ambito } from "../Entorno/Ambito";
import { AST } from "../Entorno/AST";
import { Expresion } from "../Entorno/Expresion";
import { Instruccion } from "../Entorno/Instruccion";
import { TipoPrimitivo } from "../Entorno/Simbolos/TipoPrimitivo";

import { Incremento_y_Decremento } from "../Expresiones/Incremento_y_Decremento";

export class Asignacion extends Instruccion {

    id:     string;
    exp:    Expresion;
    normal_o_no: String; /*0 asignacion normal | 1 asignacion vector */

    constructor(id: string, exp: Expresion, normal_o_no: string,  linea: number, columna: number) {
        
        super(linea, columna);
        this.id = id;
        this.exp = exp;
        this.normal_o_no = normal_o_no;
    }


    public ejecutar(actual: Ambito, global: Ambito, ast: AST) {
        // console.log("Entramos en asignacion");
        let variable = actual.getVariable(this.id);
        if(variable === undefined) {
            // * ERROR *
            throw new Error("ERROR => No se ha definido la variable " + this.id);
        }

        if (this.normal_o_no == "0"){

            let valor_asig = this.exp.getValor(actual, global, ast);
            if(variable.getTipo().getPrimitivo() != this.exp.tipo.getPrimitivo()) {
                throw new Error("ERROR => El tipo del valor asignado no corresponde a la variable " + this.id);
            }

            variable.asignarValor(valor_asig);
            
        }else{
            const posicion = this.exp.getValor(actual, global, ast);
            let valor_var = variable.getValor();
            let devuelta = valor_var[posicion];
        }
        
        

        

    }

}