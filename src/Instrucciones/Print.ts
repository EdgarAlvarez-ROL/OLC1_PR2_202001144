import { Ambito } from "../Entorno/Ambito";
import { AST } from "../Entorno/AST";
import { Expresion } from "../Entorno/Expresion";
import { Instruccion } from "../Entorno/Instruccion";


import { Digraph } from "ts-graphviz";
import { Node } from "ts-graphviz";

import { Consola } from "../Consola/Consola";

export class Print extends Instruccion
{

    lista_exp   : Expresion[];

    constructor(listaexp : Expresion[], linea: number, columna :number) {
        super(linea, columna);
        this.lista_exp = listaexp;
    }


    public ejecutar(actual: Ambito, global: Ambito, ast: AST) {
        if(this.lista_exp.length == 1) {

            let exp: Expresion = this.lista_exp[0];
            let res = exp.getValor(actual, global, ast);
            
            // console.log(res);

            ast.escribirConsola(res.toString());
        } else 
        {
            //TODO COLOCAR ERROR
        }
    }
    

    public ast(): void {
        const consola = Consola.getInstance()
        const nombreNodo = `instruccion_${this.linea}_${this.columna}_`;
        consola.set_Ast(`${nombreNodo}[label="\\<Instruccion\\>\\nPrint"];\n`)
        console.log("PUTAPOUTAPIUTAPSIUDTAPSIUTDAPSUTI")
        // if (this.value!= null){consola.set_Ast(`    ${nombreNodo}->${this.value.ast()}\n`)}
    }

}