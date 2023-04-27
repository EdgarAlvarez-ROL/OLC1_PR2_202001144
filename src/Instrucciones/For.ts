import { Ambito } from "../Entorno/Ambito";
import { AST } from "../Entorno/AST";
import { Expresion } from "../Entorno/Expresion";
import { Instruccion } from "../Entorno/Instruccion";
import { Nodo } from "../Entorno/Nodo";

import { DeclararVariable } from "./DeclararVariable";
import { Asignacion } from "./Asignacion";
import { Incremento_y_Decremento } from "../Expresiones/Incremento_y_Decremento";
import { TipoPrimitivo } from "../Entorno/Simbolos/TipoPrimitivo";


export class For extends Instruccion{
    

    comenzar: DeclararVariable | Asignacion;
    exp: Expresion;
    actualizar: Asignacion;
    sentencias : Nodo[];


    constructor(comenzar: DeclararVariable | Asignacion, exp: Expresion, actualizar: Asignacion, sentencias : Nodo[], linea: number, columna: number){
        super(linea, columna);
        this.comenzar = comenzar;
        this.exp = exp;
        this.actualizar = actualizar;
        this.sentencias = sentencias;
    }

    public ejecutar(actual: Ambito, global: Ambito, ast: AST) {

        this.comenzar.ejecutar(actual, global, ast);
        // Condicion
       let val_cond = this.exp.getValor(actual, global, ast);

     
        
       // Verificar tipo booleano
       if(this.exp.tipo.getPrimitivo() === TipoPrimitivo.Boolean) {
            
            while(val_cond) 
            {   
                    // AQUI VA EL BREAK Y EL CONTINUE
                    let ambito_local = new Ambito(actual);
                    for(let sentencia of this.sentencias){
                        if(sentencia instanceof Instruccion) sentencia.ejecutar(ambito_local, global, ast);
                        if(sentencia instanceof Expresion) sentencia.getValor(ambito_local, global, ast);
                    }
                    this.actualizar.ejecutar(actual, global, ast);
                    val_cond = this.exp.getValor(actual, global, ast);
            }
       }else{
           // * ERROR * 
           throw new Error("ERROR en el FOR.ts la validacion no es de tipo booleano " + this.exp);
       }
       
       
    }

}