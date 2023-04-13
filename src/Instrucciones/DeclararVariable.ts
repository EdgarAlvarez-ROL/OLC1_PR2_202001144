import { Ambito } from "../Entorno/Ambito";
import { AST } from "../Entorno/AST";
import { Expresion } from "../Entorno/Expresion";
import { Instruccion } from "../Entorno/Instruccion";
import { Tipo } from "../Entorno/Simbolos/Tipo";
import { TipoPrimitivo } from "../Entorno/Simbolos/TipoPrimitivo";
import { Variable } from "../Entorno/Simbolos/Variable";


export class DeclararVariable extends Instruccion{
    

    tipo:   Tipo;
    id:     string;
    exp:    Expresion;
    casteo: Tipo;

    constructor(tipo: Tipo, id: string, exp: Expresion, casteo: Tipo, linea: number, columna: number) {
        super(linea, columna);
        this.tipo = tipo;
        this.id = id;
        this.exp = exp;
        this.casteo = casteo;
    }

    public ejecutar(actual: Ambito, global: Ambito, ast: AST) {
        
        // Verificar que no exista variable
        console.log(actual.existeVariable(this.id));
        if( actual.existeVariable(this.id) ) {
            // * ERROR *
            throw new Error("Variable ya se encuentra definida en el entorno actual: " + this.linea + " , " + this.columna);
        }

        let res
        if(this.exp != undefined) {
            res = this.exp.getValor(actual, global, ast);
            if(this.tipo.getPrimitivo() != this.exp.tipo.getPrimitivo()) {

                if(this.casteo.getPrimitivo() != undefined){
                    // Castear la variable a una nueva
                    res = this.castear(res, this.exp.tipo.getPrimitivo(), this.casteo.getPrimitivo());
                }else{
                    // * ERROR *
                    throw new Error("Tipo de variable declarada no es igual al tipo de la expresion: " + this.linea + " , " + this.columna);
                }
             }
        } else 
        {
            if(this.tipo.getPrimitivo() === TipoPrimitivo.Integer){
                res = 0;
            }else if(this.tipo.getPrimitivo() === TipoPrimitivo.Double){
                res = 0.0;
            } else if(this.tipo.getPrimitivo() === TipoPrimitivo.String) {
                res = "";
            } else if(this.tipo.getPrimitivo() === TipoPrimitivo.Char) {
                res = '';
            }
        }



        let nueva_var = new Variable(this.tipo, this.id, res);
        actual.insertarVariable(this.id,nueva_var);

    }


    public castear(expre, tipo_expre, cast) {
        // Integer,
        // Double,
        // Char,
        // String,
        // Null,
        // Boolean,
        // Void
        let variable_casteada;
        // console.log("Tipo Expresion: ", tipo_expre);
        switch(tipo_expre){
            case 2: {   // Char valor original
                if(cast == 0){ //Integer
                    let tx = expre.charCodeAt(0)
                    variable_casteada = parseFloat(tx).toFixed(0);
                    // console.log("Integer de Char: "+ variable_casteada);
                }
            }
            case 0: {   // Integer valor original
                if (cast == 2){ //Char
                    variable_casteada = String.fromCharCode(expre);
                    // console.log("Variable CASTEADA: ", variable_casteada);
                }else if (cast == 1){ //Double
                    variable_casteada = parseFloat(expre).toFixed(2);
                }
            }
            case 1: {   // Double valor original
                if (cast == 0){ //Integer
                    variable_casteada = expre | 0;
                    // console.log("Variable CASTEADA: ", variable_casteada);
                }
            }
            default: {

            }
        }
        
        // console.log("la casteada return es: "+ variable_casteada);
        return variable_casteada;
    }
}
