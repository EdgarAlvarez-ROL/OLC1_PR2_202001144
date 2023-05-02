import { AST } from "../../Entorno/AST";
import { Ambito } from "../../Entorno/Ambito";
import { Expresion } from "../../Entorno/Expresion";
import { Tipo } from "../../Entorno/Simbolos/Tipo";
import { TipoPrimitivo } from "../../Entorno/Simbolos/TipoPrimitivo";

export class typeOf extends Expresion {
    
    exp:     Expresion;
    

    constructor(exp: Expresion, linea: number, columna: number) {
        
        super(linea, columna);
        this.exp = exp;
    }

    public getValor(actual, global, ast){
        let valor = this.exp.getValor(actual, global,ast);
        
        let tipo1   = this.exp.tipo;
        let prim1:TipoPrimitivo = tipo1.getPrimitivo();

        if (tipo1.getPrimitivo() == TipoPrimitivo.Integer) {
            this.tipo = new Tipo(TipoPrimitivo.String);
            return ("integer")
        }else if(tipo1.getPrimitivo() == TipoPrimitivo.Double) {
            this.tipo = new Tipo(TipoPrimitivo.String);
            return ("double")
        }else if(tipo1.getPrimitivo() == TipoPrimitivo.String) {
            this.tipo = new Tipo(TipoPrimitivo.String);
            return ("string")
        }else if(tipo1.getPrimitivo() == TipoPrimitivo.Char) {
            this.tipo = new Tipo(TipoPrimitivo.String);
            return ("char")
        }else if(tipo1.getPrimitivo() == TipoPrimitivo.Boolean) {
            this.tipo = new Tipo(TipoPrimitivo.String);
            return ("boolean")
        }else{
            throw new Error("TypeOF: Error semantico no tiene tipo al parecer " + this.linea + " , " + this.columna);
        }
        // retorno = { value: (nodoExp.value.toString()).toLowerCase(), type: Tipo.STRING}
        this.tipo = new Tipo(TipoPrimitivo.Null);
        return null;
        
    }

}