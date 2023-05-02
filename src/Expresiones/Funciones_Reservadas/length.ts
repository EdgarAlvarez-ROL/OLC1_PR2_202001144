import { AST } from "../../Entorno/AST";
import { Ambito } from "../../Entorno/Ambito";
import { Expresion } from "../../Entorno/Expresion";
import { Tipo } from "../../Entorno/Simbolos/Tipo";
import { TipoPrimitivo } from "../../Entorno/Simbolos/TipoPrimitivo";

export class length extends Expresion {
    
    exp:     Expresion;
    

    constructor(exp: Expresion, linea: number, columna: number) {
        
        super(linea, columna);
        this.exp = exp;
    }

    public getValor(actual, global, ast){
        let valor = this.exp.getValor(actual, global,ast);
        
        let tipo   = this.exp.tipo;
        console.log(this.exp.tipo.getPrimitivo());
        // let prim1:TipoPrimitivo = tipo.getPrimitivo();

        if (tipo.getPrimitivo() == TipoPrimitivo.String) {
            this.tipo = new Tipo(TipoPrimitivo.String);
            return ((valor.toString()).length)
        }else if(tipo.getPrimitivo() == TipoPrimitivo.Char){
            return ((valor.toString()).length)
        }else if(tipo.getPrimitivo() != undefined){
            this.tipo   = new Tipo(tipo.getPrimitivo());
            return (valor.length)
        }else{
            throw new Error("Length: Error semantico " + this.linea + " , " + this.columna);
        }
        // retorno = { value: (nodoExp.value.toString()).toLowerCase(), type: Tipo.STRING}
        this.tipo = new Tipo(TipoPrimitivo.Null);
        return null;
        
    }

}