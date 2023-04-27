import exp from "constants";
import { Ambito } from "../Entorno/Ambito";
import { AST } from "../Entorno/AST";
import { Expresion } from "../Entorno/Expresion";
import { Instruccion } from "../Entorno/Instruccion";
import { Nodo } from "../Entorno/Nodo";
import { TipoPrimitivo } from "../Entorno/Simbolos/TipoPrimitivo";


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


    // public getName(){
    //     return this.exp_condicion
    // }

}