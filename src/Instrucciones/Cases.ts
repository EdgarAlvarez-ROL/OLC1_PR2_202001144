import exp from "constants";
import { Ambito } from "../Entorno/Ambito";
import { AST } from "../Entorno/AST";
import { Expresion } from "../Entorno/Expresion";
import { Instruccion } from "../Entorno/Instruccion";
import { Nodo } from "../Entorno/Nodo";
import { TipoPrimitivo } from "../Entorno/Simbolos/TipoPrimitivo";

import { Digraph } from "ts-graphviz";
import { Node } from "ts-graphviz";

import { Consola } from "../Consola/Consola";

export class Cases extends Instruccion {
    
    // exp_condicion   : Expresion;
    // sentencias      : Nodo[];

    constructor(public exp_condicion :Expresion, public sentencias :Nodo[], linea :number, columna :number) {
        super(linea, columna);
        // this.exp_condicion = exp_condicion;
        // this.sentencias = sentencias;
    }
    
    public ejecutar(actual: Ambito, global: Ambito, ast: AST) {
        // console.log("algo");
        // Condicion
        // let condicion = this.exp_condicion.getValor(actual, global, ast);

        // Verificar tipo booleano
        // if(this.exp_condicion.tipo.getPrimitivo() != TipoPrimitivo.Boolean) {
        //     // * ERROR * 
        //     throw new Error("ERROR en el Cases.ts la validacion no es de tipo booleano " + this.exp_condicion);
        // }
        // Crear ambito nuevo
        let ambito_if = new Ambito(actual);
        for(let sentencia of this.sentencias){
            if(sentencia instanceof Instruccion) sentencia.ejecutar(ambito_if, global, ast);
            if(sentencia instanceof Expresion) sentencia.getValor(ambito_if, global, ast);
        }
        
    }


    public ast(): void {
        const consola = Consola.getInstance()
        var name_node = `instruccion_${this.linea}_${this.columna}_case`
        consola.set_Ast(`
        ${name_node}[label="\\<Instrucción\\>\\nCase"];        
        ${name_node}_AmbitoCase[label="\\<Nuevo ámbito\\>"];
        ${name_node} -> ${name_node}_AmbitoCase;
        `)
        name_node = `${name_node}_AmbitoCase`;
        var cont = 0;
        var inst_line_anterior = 0;
        var inst_col_anterior = 0;
        for(let sentencia of this.sentencias){
            if(sentencia instanceof Instruccion){
                if (cont == 0) {
                    consola.set_Ast(`${name_node}->instruccion_${sentencia.linea}_${sentencia.columna}_;`)
                } else {
                    consola.set_Ast(`instruccion_${inst_line_anterior}_${inst_col_anterior}_->instruccion_${sentencia.linea}_${sentencia.columna}_;`)
                }
                inst_line_anterior = sentencia.linea;
                inst_col_anterior = sentencia.columna;
                sentencia.ast()
                cont++;
            }
        }

    }

}