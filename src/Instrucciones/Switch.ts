import exp from "constants";
import { Ambito } from "../Entorno/Ambito";
import { AST } from "../Entorno/AST";
import { Expresion } from "../Entorno/Expresion";
import { Instruccion } from "../Entorno/Instruccion";
import { Nodo } from "../Entorno/Nodo";
import { TipoPrimitivo } from "../Entorno/Simbolos/TipoPrimitivo";
import { Cases } from "./Cases";
import { FORMERR } from "dns";
import { Default } from "./Default";


import { Digraph } from "ts-graphviz";
import { Node } from "ts-graphviz";
import { Consola } from "../Consola/Consola";

export class Switch extends Instruccion {
    
    exp_condicion   : Expresion;
    cases      : Cases[];
    sentencias_def : Default;

    constructor(exp_condicion :Expresion, cases :Cases[], sentencias_def :Default, linea :number, columna :number) {
        super(linea, columna);
        this.exp_condicion = exp_condicion;
        this.cases = cases;
        this.sentencias_def = sentencias_def;
    }
    
    public ejecutar(actual: Ambito, global: Ambito, ast: AST) {
        // Condicion
        let condicion = this.exp_condicion.getValor(actual, global, ast);

        // Verificar tipo booleano
        // if(this.exp_condicion.tipo.getPrimitivo() != TipoPrimitivo.Boolean) {
        //     // * ERROR * 
        //     return 
        // }

        let correrDef = true;
        if(this.cases != undefined){

            for (let caso of this.cases) {
                let nameCase = caso.exp_condicion.getValor(actual, global, ast);
                if (condicion.tipo == nameCase.tipo){
                    if (condicion == nameCase) {
                        caso.ejecutar(actual, global, ast);
                        // if (x != null && x != undefined) {
                        //     if (x.getValor(actual, global, ast) == 'Break') {
                        //         exe = false
                        //         break
                        //     }
                        //sin break
                        correrDef = false;
                    }
                }
            }

        }

        if (this.sentencias_def != null) {
            if (correrDef) {
                this.sentencias_def.ejecutar(actual, global, ast);
            }
        }
    }


    public ast(): void {
        const consola = Consola.getInstance()
        const name_node = `instruccion_${this.linea}_${this.columna}_`
        consola.set_Ast(`
        ${name_node}[label="\\<Instruccion\\>\\nSwitch"];`)
        var cont = 0;
        var inst_line_anterior = 0;
        var inst_col_anterior = 0;
        var valorUltimoCase = 0;
        if (this.cases != undefined) {
            for (let instruccion of this.cases) {
                if (cont == 0) {
                    consola.set_Ast(`${name_node}->instruccion_${instruccion.linea}_${instruccion.columna}_;`)
                } else {
                    consola.set_Ast(`instruccion_${inst_line_anterior}_${inst_col_anterior}_->instruccion_${instruccion.linea}_${instruccion.columna}_;`)
                }
                inst_line_anterior = instruccion.linea;
                inst_col_anterior = instruccion.columna;
                instruccion.ast()
                cont++;
            }
        }

        if (this.sentencias_def != null) {
            consola.set_Ast(`instruccion_${inst_line_anterior}_${inst_col_anterior}_${valorUltimoCase}->instruccion_${this.sentencias_def.linea}_${this.sentencias_def.columna}_`)
            this.sentencias_def.ast() 
        }
    }


}