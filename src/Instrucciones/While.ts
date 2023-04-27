import { Ambito } from "../Entorno/Ambito";
import { AST } from "../Entorno/AST";
import { Expresion } from "../Entorno/Expresion";
import { Instruccion } from "../Entorno/Instruccion";
import { Nodo } from "../Entorno/Nodo";
import { TipoPrimitivo } from "../Entorno/Simbolos/TipoPrimitivo";

export class While extends Instruccion{
    
    exp: Expresion;
    sentencias : Nodo[];

    constructor(exp: Expresion, sentencias : Nodo[], linea: number, columna: number){
        super(linea, columna);
        this.exp = exp;
        this.sentencias = sentencias;
    }

    public ejecutar(actual: Ambito, global: Ambito, ast: AST) {
        let val_cond = this.exp.getValor(actual, global, ast);

        // Verificar tipo booleano
        if(this.exp.tipo.getPrimitivo() != TipoPrimitivo.Boolean) {
        // * ERROR * 
        throw new Error("ERROR en el While.ts la validacion no es de tipo booleano " + this.exp);
        }
       
        // let ambito_local = new Ambito(actual);
        while(val_cond) 
        {
            let ambito_local = new Ambito(actual);
             for(let sentencia of this.sentencias){
                // let nvzxcvzew = new Ambito(ambito_local);
                if(sentencia instanceof Instruccion) sentencia.ejecutar(ambito_local, global, ast);
                if(sentencia instanceof Expresion) sentencia.getValor(ambito_local, global, ast);
                 
                
             }
             val_cond = this.exp.getValor(actual, global, ast);
        }
    }

}