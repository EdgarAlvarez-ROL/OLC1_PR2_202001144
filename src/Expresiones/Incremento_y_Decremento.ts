import { Ambito } from "../Entorno/Ambito";
import { AST } from "../Entorno/AST";
import { Expresion } from "../Entorno/Expresion";
import { Tipo } from "../Entorno/Simbolos/Tipo";
import { TipoPrimitivo } from "../Entorno/Simbolos/TipoPrimitivo";

export class Incremento_y_Decremento extends Expresion {
    
    id:     Expresion;
    signo:  string;

    constructor(id: Expresion, signo: string, linea: number, columna: number) {
        
        super(linea, columna);
        this.id = id;
        this.signo = signo;
    }


    public getValor(actual: Ambito, global: Ambito, ast: AST) {
        let val1    = this.id.getValor(actual,global,ast);
        let tipo1   = this.id.tipo;

        switch(this.signo) {
            case "++" :
                {
                    return this.Suma(val1, tipo1, actual, global, ast);
                }
            case "--" :
                {
                    return this.Resta(val1, tipo1, actual, global, ast);
                }
        }
    }

    public Suma(val1:any,tipo1:Tipo,actual:Ambito,global:Ambito,ast:AST) : any
    {
        let prim1:TipoPrimitivo = tipo1.getPrimitivo();
        // TIPO DOUBLE
        if (prim1 == TipoPrimitivo.Double) {
            this.tipo = new Tipo(TipoPrimitivo.Double);
            return val1 + 1.00;
        }
        // TIPO INTEGER
        else if (prim1 == TipoPrimitivo.Integer) {
            this.tipo = new Tipo(TipoPrimitivo.Integer);
            return 1 + val1;
        } 
        /* TALVEZ SE VA A BORRAR ESTO */
        else if (prim1 == TipoPrimitivo.String)
        {
            this.tipo = new Tipo(TipoPrimitivo.String);
            return val1.toString() + val1.toString();
        }
    }


    public Resta(val1:any,tipo1:Tipo,actual:Ambito,global:Ambito,ast:AST) : any
    {
        let prim1:TipoPrimitivo = tipo1.getPrimitivo();
        // TIPO DOUBLE
        if (prim1 == TipoPrimitivo.Double) {
            this.tipo = new Tipo(TipoPrimitivo.Double);
            return val1 - 1.00;
        }
        // TIPO INTEGER
        else if (prim1 == TipoPrimitivo.Integer) {
            this.tipo = new Tipo(TipoPrimitivo.Integer);
            return val1 - 1;
        }
    }


}