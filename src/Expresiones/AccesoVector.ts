import { Ambito } from "../Entorno/Ambito";
import { AST } from "../Entorno/AST";
import { Expresion } from "../Entorno/Expresion";
import { AccesoVariable } from "./AccesoVariable";


// import { Instruccion } from "../Entorno/Instruccion";
import { TipoPrimitivo } from "../Entorno/Simbolos/TipoPrimitivo";
import { Variable } from "../Entorno/Simbolos/Variable";
import { Tipo } from "../Entorno/Simbolos/Tipo";



export class AccesoVector extends Expresion{
    
    
    exp: Expresion; //para obtener su numero mas facil
    id: string;

    constructor(id: string, exp: Expresion, linea : number, columna : number) {
        super(linea,columna);
        this.exp = exp;
        this.id = id;
    }
    
    public getValor(actual: Ambito, global: Ambito, ast: AST) {

        // let alsñkjf = new AccesoVariable(this.id, this.linea, this.columna);
        // console.log("existe variable");
        // console.log(actual.existeVariable(this.id))

        let variable = actual.getVariable(this.id);
        
        if(variable === undefined) {
            // * ERROR *
            throw new Error("Sintactico VECTOR Error: No existe la variable " + this.id + " " + this.linea + ", " + this.columna);
        }

        // console.log("existe variable");
        // console.log(this.exp);
        
        
        const posicion = this.exp.getValor(actual, global, ast);
        let valor_var = variable.getValor();
        let devuelta = valor_var[posicion];

        // this.tipo = variable.getTipo();
        // this.tipo = new Tipo(TipoPrimitivo.Integer);
        
        let n = typeof devuelta;
        // console.log("ACCESO alsñkjf"); //NICE tengo una lista
        // console.log(n);
        // console.log("ACCESO alsñkjf");
        // return devuelta;


        switch(variable.tipo.getPrimitivo()) {
            case TipoPrimitivo.Integer:
                {
                    this.tipo = new Tipo(TipoPrimitivo.Integer);
                    return parseInt(devuelta);
                }
            case TipoPrimitivo.String :
                {
                    this.tipo = new Tipo(TipoPrimitivo.String);
                    return devuelta;
                }
            case TipoPrimitivo.Double :
                {
                    this.tipo = new Tipo(TipoPrimitivo.Double);
                    return parseFloat(devuelta);
                }
            case TipoPrimitivo.Char:
                {
                    this.tipo = new Tipo(TipoPrimitivo.Char);
                    return devuelta;
                }
            case TipoPrimitivo.Boolean :
                {   
                    this.tipo = new Tipo(TipoPrimitivo.Boolean);
                    return devuelta;
                }
        }
        
    }

}