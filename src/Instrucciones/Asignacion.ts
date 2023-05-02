import { Ambito } from "../Entorno/Ambito";
import { AST } from "../Entorno/AST";
import { Expresion } from "../Entorno/Expresion";
import { Instruccion } from "../Entorno/Instruccion";
import { TipoPrimitivo } from "../Entorno/Simbolos/TipoPrimitivo";

import { Incremento_y_Decremento } from "../Expresiones/Incremento_y_Decremento";
import { Digraph } from "ts-graphviz";
import { Node } from "ts-graphviz";

import { Consola } from "../Consola/Consola";

export class Asignacion extends Instruccion {

    id:     string;
    exp:    Expresion;
    normal_o_no: String; /*0 asignacion normal | 1 asignacion vector */
    posicionV: Expresion;

    constructor(id: string, exp: Expresion, normal_o_no: string, posicionV: Expresion, linea: number, columna: number) {
        
        super(linea, columna);
        this.id = id;
        this.exp = exp;
        this.normal_o_no = normal_o_no;
        this.posicionV = posicionV;
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
            let valor_asig = this.exp.getValor(actual, global, ast);
            const posicion = this.posicionV.getValor(actual, global, ast);
            let valor_var = variable.getValor();
            // let devuelta = valor_var[posicion];
            valor_var[posicion] = valor_asig.toString();
            // console.log(valor_var);

            variable.asignarValor(valor_var);

        }
        
        

        

    }


    public ast(): void {
        const consola = Consola.getInstance()
        const nombre_nodo =`instruccion_${this.linea}_${this.columna}_`
        consola.set_Ast(`${nombre_nodo}[label="\\<Instruccion\\>\\nAsignacion"];\n`)
        consola.set_Ast(`${nombre_nodo}1[label="\\<Identificador\\>\\n{${this.id}}"];\n`)
        consola.set_Ast(`${nombre_nodo}->${nombre_nodo}1;\n`)
        // consola.set_Ast(`${nombre_nodo}->${this.value.ast()}\n`)

    }

}