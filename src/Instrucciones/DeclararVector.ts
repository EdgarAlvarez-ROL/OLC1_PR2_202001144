import { Ambito } from "../Entorno/Ambito";
import { AST } from "../Entorno/AST";
import { Expresion } from "../Entorno/Expresion";
import { Instruccion } from "../Entorno/Instruccion";
import { Tipo } from "../Entorno/Simbolos/Tipo";
import { TipoPrimitivo } from "../Entorno/Simbolos/TipoPrimitivo";
import { Variable } from "../Entorno/Simbolos/Variable";

export class DeclararVector extends Instruccion{
    
    tipo1:   Tipo;
    tipo2:   Tipo;
    id:     string;
    lista_exp:    Expresion[];

    constructor(tipo1: Tipo, id: string, tipo2: Tipo, lista_exp : Expresion[], linea: number, columna: number) {
        super(linea, columna);
        this.tipo1 = tipo1;
        this.id = id;
        this.tipo2 = tipo2;
        this.lista_exp = lista_exp;
    }

    
    public ejecutar(actual: Ambito, global: Ambito, ast: AST) {
        
        let tipo2_undefined = false;
        if(this.tipo2 == undefined){
            this.tipo2 = this.tipo1;
            tipo2_undefined = true;
        }

        // Verificar que no exista variable
        console.log(actual.existeVariable(this.id));
        if( actual.existeVariable(this.id) ) {
            // * ERROR *
            throw new Error("Variable ya se encuentra definida en el entorno actual: " + this.linea + " , " + this.columna);
        }

        let listavacia = [];
        if (this.tipo1.getPrimitivo() == this.tipo2.getPrimitivo()){

            
            let res;
            let heroes: Expresion[] = this.lista_exp;
            let tamañoListaVacia;
            
            if(this.lista_exp != undefined) {
                // res = this.lista_exp.getValor(actual, global, ast);
                // console.log(this.lista_exp["valor"]);
                // console.log("tamaño: ");
                // console.log(this.lista_exp[0].getValor(actual, global, ast));
                tamañoListaVacia = (this.lista_exp[0].getValor(actual, global, ast));
                if (heroes.length == 1 && (this.lista_exp[0].tipo.getPrimitivo()) == TipoPrimitivo.Integer && tipo2_undefined == false){
                    
                    for(let i = 0; i < tamañoListaVacia; i++){
                        if(this.tipo1.getPrimitivo() === TipoPrimitivo.Integer){
                            listavacia.push(0);
                        }else if(this.tipo1.getPrimitivo() === TipoPrimitivo.Double){
                            listavacia.push(0.0);
                        } else if(this.tipo1.getPrimitivo() === TipoPrimitivo.String) {
                            listavacia.push("");
                        } else if(this.tipo1.getPrimitivo() === TipoPrimitivo.Char) {
                            listavacia.push('');
                        }
                    }
                }else{
                    for (let i = 0; i < heroes.length; i++) {
                        res = this.lista_exp[i].getValor(actual, global, ast);
                        if(this.tipo1.getPrimitivo() != this.lista_exp[i].tipo.getPrimitivo()) {
                            // * ERROR *
                            throw new Error("Tipo de variable declarada no es igual al tipo de la expresion: " + this.linea + " , " + this.columna);
                        }
                        // console.log ("Numero de operaciones Vector" + i);
                        listavacia.push(res);
                    }
                }
                
            } else 
            {
                if(this.tipo1.getPrimitivo() === TipoPrimitivo.Integer){
                    res = 0;
                }else if(this.tipo1.getPrimitivo() === TipoPrimitivo.Double){
                    res = 0.0;
                } else if(this.tipo1.getPrimitivo() === TipoPrimitivo.String) {
                    res = "";
                } else if(this.tipo1.getPrimitivo() === TipoPrimitivo.Char) {
                    res = '';
                }
            }
            
          
        //     let nueva_var = new Variable(this.tipo, this.id, res);
        // actual.insertarVariable(this.id,nueva_var);

        }else{
            throw new Error("Tipo de variable declarada no coincide con el new <TIPO declarado> " + this.linea + " , " + this.columna);
        }

        // console.log("=============");
        // console.log(listavacia);
        // console.log("=============");


        let nueva_var = new Variable(this.tipo1, this.id, listavacia);

        // console.log("=============");
        // console.log(nueva_var);
        // console.log("=============");

        actual.insertarVariable(this.id, nueva_var);

    }

}