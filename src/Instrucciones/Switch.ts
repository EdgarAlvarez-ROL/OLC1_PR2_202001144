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

}