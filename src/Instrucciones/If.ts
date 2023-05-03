import exp from "constants";
import { Ambito } from "../Entorno/Ambito";
import { AST } from "../Entorno/AST";
import { Expresion } from "../Entorno/Expresion";
import { Instruccion } from "../Entorno/Instruccion";
import { Nodo } from "../Entorno/Nodo";
import { TipoPrimitivo } from "../Entorno/Simbolos/TipoPrimitivo";

import { Return } from "./Sentencias_de_Transicion/Return";
import { Tipo } from "../Entorno/Simbolos/Tipo";


import { Digraph } from "ts-graphviz";
import { Node } from "ts-graphviz";

import { Consola } from "../Consola/Consola";
import { Excepcion } from "../Errores/Excepcion";
import { Breakk } from "./Sentencias_de_Transicion/Breakk";

export class If extends Instruccion {
    
    exp_condicion   : Expresion;
    sentencias      : Nodo[];
    sentencias_else : Nodo[];

    constructor(exp_condicion :Expresion, sentencias :Nodo[], sentencias_else :Nodo[], linea :number, columna :number) {
        super(linea, columna);
        this.exp_condicion = exp_condicion;
        this.sentencias = sentencias;
        this.sentencias_else = sentencias_else;
    }
    
    public ejecutar(actual: Ambito, global: Ambito, ast: AST) {
        // Condicion
        let condicion = this.exp_condicion.getValor(actual, global, ast);

        // Verificar tipo booleano
        if(this.exp_condicion.tipo.getPrimitivo() != TipoPrimitivo.Boolean) {
            // * ERROR * 
            var consola = Consola.getInstance(); //instancia de la consola por posibles errores
            const error = new Excepcion("Error semántico", `Error en la tercera parte del for declarado, la expresión declarada no es correcta`, this.linea, this.columna);
            consola.set_Error(error);
            throw new Error("ERROR en el IF.ts la validacion no es de tipo booleano " + this.exp_condicion);
        }

        if ( condicion ){
            // Añadiendo token de IF al AST

            // Crear ambito nuevo
            let ambito_if = new Ambito(actual);

            let retorno;
            let tipotipo;
            let x;
            for(let sentencia of this.sentencias){
                if(sentencia instanceof Instruccion) sentencia.ejecutar(ambito_if, global, ast);
                /* {
                    x = sentencia.ejecutar(ambito_if, global, ast);
                    console.log("IF");
                    console.log(x);
                    retorno = x["valor"];
                    tipotipo  = x["tipo"];
                    break;
                }
                */
                
                if(sentencia instanceof Expresion) sentencia.getValor(ambito_if, global, ast);
                if(sentencia instanceof Return) {
                    x = sentencia.ejecutar(ambito_if, global, ast);
                    
                  
                    retorno = x;
                    console.log("IF retorno");
                    console.log(retorno);
                    // tipotipo  = x["tipo"];
                    break;
                }

                if(sentencia instanceof Breakk) {
                    x = sentencia.ejecutar(ambito_if, global, ast);
                    if(x == undefined){
                        continue
                    }else{
                        if(x["inst"] == "Breakk"){
                            console.log("Breakk en IF");
                           
                            break;
                        }else{
                            continue;
                        }
                    }
                }




                // en vias de parar todo
                // if(sentencia instanceof Return) {
                //     let paella = sentencia.getValor(ambito_if, global, ast);
                //     console.log("Paella: " + paella);
                //     // let coso = sentencia.getTipo(ambito_if, global, ast);
                //     // tipotipo = coso;
                //     // this.tipo = new Tipo(tipotipo.getPrimitivo())
                //     return paella

                //     break;
                // } 
            }
            // this.tipo = new Tipo(tipotipo.getPrimitivo())
            return retorno;
        }else {
            let ambito_else = new Ambito(actual);
            for(let sentencia of this.sentencias_else){
                if(sentencia instanceof Instruccion) sentencia.ejecutar(ambito_else, global, ast);
                if(sentencia instanceof Expresion) sentencia.getValor(ambito_else, global, ast);
            }
        }
    }


    public ast(): void {
        const consola = Consola.getInstance()
        const name_node = `instruccion_${this.linea}_${this.columna}_`
        consola.set_Ast(`
        ${name_node}[label="\\<Instruccion\\>\\nIf / Else if / Else"];
        ${name_node}1[label="\\<Sentencia if\\>"];
        ${name_node}2[label="\\<Sentencia else\\>"];
        ${name_node}->${name_node}1;
        ${name_node}->${name_node}2;`);
        // ${name_node}1->instruccion_${this.bloque.line}_${this.bloque.column}_; 
        // this.bloque.ast()
        // if (this.sentencias_else != null) {
        //     consola.set_Ast(`${name_node}2->instruccion_${this.sentencias_else.linea}_${this.sentencias_else}_`)
        //     this.sentencias_else.ast()
        // }
    }

   

}