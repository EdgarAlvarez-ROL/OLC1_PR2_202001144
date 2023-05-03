
import { Ambito } from "../../Entorno/Ambito";
import { AST } from "../../Entorno/AST";
import { Expresion } from "../../Entorno/Expresion";
import { Instruccion } from "../../Entorno/Instruccion";
import { TipoPrimitivo } from "../../Entorno/Simbolos/TipoPrimitivo";
import { Nodo } from "../../Entorno/Nodo";
import { Tipo } from "../../Entorno/Simbolos/Tipo";

import { Variable } from "../../Entorno/Simbolos/Variable";


import { Digraph } from "ts-graphviz";
import { Node } from "ts-graphviz";

import { Consola } from "../../Consola/Consola";


export class Breakk extends Instruccion {
    // public valor: Expresion | null;

    constructor(linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(actual: Ambito, global: Ambito, ast: AST) {
        
        return {inst:'Breakk',linea:this.linea, columna:this.columna}
        
        // throw new ReturnException(resultado);
    }


    public ast(): void {
        const consola = Consola.getInstance()
        //Si me ejecuto quiere decir que soy un error porque el break no se tiene que ejecutar solo es una clase bandera.
        const name_node = `instruccion_${this.linea}_${this.columna}_`
        consola.set_Ast(`
        ${name_node}[label="\\<Instrucción\\>\\nBreak"];        
        `)
    }

}

