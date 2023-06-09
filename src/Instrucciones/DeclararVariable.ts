import { Ambito } from "../Entorno/Ambito";
import { AST } from "../Entorno/AST";
import { Expresion } from "../Entorno/Expresion";
import { Instruccion } from "../Entorno/Instruccion";
import { Tipo } from "../Entorno/Simbolos/Tipo";
import { TipoPrimitivo } from "../Entorno/Simbolos/TipoPrimitivo";
import { Variable } from "../Entorno/Simbolos/Variable";


import { Digraph } from "ts-graphviz";
import { Node } from "ts-graphviz";
import { Consola } from "../Consola/Consola";

export class DeclararVariable extends Instruccion{
    

    tipo:   Tipo;
    tipo2:  Tipo;
    id:     string;
    exp:    Expresion;
    casteo: Tipo;

    constructor(tipo: Tipo, id: string, exp: Expresion, casteo: Tipo, tipo2: Tipo, linea: number, columna: number) {
        super(linea, columna);
        this.tipo = tipo;
        this.id = id;
        this.exp = exp;
        this.casteo = casteo;
        this.tipo2 = tipo2;
    }

    public ejecutar(actual: Ambito, global: Ambito, ast: AST) {

        // console.log("EXP array: ");
        // console.log(Array.isArray(this.exp));

        let PUTA = Array.isArray(this.exp);
        // actual = new Ambito(actual);
        // Verificar que no exista variable
        console.log(actual.existeVariable(this.id));
        if( actual.existeVariable(this.id) ) {
            // * ERROR *
            
            throw new Error("Variable: " + this.id + " ya se encuentra definida en el entorno actual: " + this.linea + " , " + this.columna);
            
            
        }else{

        

        let res
        let temp
        let listavacia = [];
        let cua;
        if(this.exp != undefined) {

            let tipo2_undefined = false;
            if(this.tipo2 == undefined){
                this.tipo2 = this.tipo;
                tipo2_undefined = true;
            }
            if(this.tipo.getPrimitivo() === TipoPrimitivo.Integer){
                cua = "integer";
            }else if(this.tipo.getPrimitivo() === TipoPrimitivo.Double){
                cua = "double";
            } else if(this.tipo.getPrimitivo() === TipoPrimitivo.String) {
                cua = "string";
            } else if(this.tipo.getPrimitivo() === TipoPrimitivo.Char) {
                cua = "char";
            }
            
            let piri = [];
            if (PUTA == true){
                if (this.tipo.getPrimitivo() == this.tipo2.getPrimitivo()){
                            let tamañoListaVacia;
                            // res = this.exp.getValor(actual, global, ast);
                            // console.log(this.exp["valor"]);
                            piri.push(this.exp);
                            
                            
                            tamañoListaVacia = piri[0].length;
                            const tamañodelrelleno = piri[0][0]["valor"];
                            if (this.exp[0]["tipo_valor"] == "integer" && tipo2_undefined == false){
                                
                                for(let i = 0; i < tamañodelrelleno; i++){
                                    if(this.tipo.getPrimitivo() === TipoPrimitivo.Integer){
                                        listavacia.push(0);
                                    }else if(this.tipo.getPrimitivo() === TipoPrimitivo.Double){
                                        listavacia.push(0.0);
                                    } else if(this.tipo.getPrimitivo() === TipoPrimitivo.String) {
                                        listavacia.push("");
                                    } else if(this.tipo.getPrimitivo() === TipoPrimitivo.Char) {
                                        listavacia.push('');
                                    }
                                }
                            }else{
                                // console.log("asdfadfadsdfasdf: ");
                                // console.log(tamañoListaVacia);
                                for (let i = 0; i < tamañoListaVacia; i++) {
                                    temp = this.exp[i]["valor"];
                                    if(cua != this.exp[i]["tipo_valor"]) {
                                        // * ERROR *
                                        throw new Error("Tipo de variable declarada no es igual al tipo de la expresion: " + this.linea + " , " + this.columna);
                                    }
                                    // console.log ("Numero de operaciones Vector" + i);
                                    listavacia.push(temp);
                                }
                            }
                            
                        
                    }
                    // ========================================
                    res = listavacia;
                    // console.log(listavacia);
            }else{
                res = this.exp.getValor(actual, global, ast);
                if(this.tipo.getPrimitivo() != this.exp.tipo.getPrimitivo()) {

                    if(this.casteo != undefined){
                        // Castear la variable a una nueva
                        res = this.castear(res, this.exp.tipo.getPrimitivo(), this.casteo.getPrimitivo());
                        //==========================================================
                        //========================================
                    }else{
                        // * ERROR *
                        throw new Error("Tipo de variable declarada no es igual al tipo de la expresion: " + this.linea + " , " + this.columna);
                                        
                    }
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


        // console.log("RESSSSSSSSSSSSSSS");
        // console.log(res);
        // console.log("RESSSSSSSSSSSSSSS");

        let nueva_var = new Variable(this.tipo, this.id, res, this.linea, this.columna);
        actual.insertarVariable(this.id,nueva_var);
        this.txtListaSimbolos()
        
    }
        
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
            case TipoPrimitivo.Char: {   // Char valor original
                if(cast == TipoPrimitivo.Integer){ //Integer
                    let tx = expre.charCodeAt(0)
                    variable_casteada = parseFloat(tx).toFixed(0);
                    // console.log("Integer de Char: "+ variable_casteada);
                }
            }
            case TipoPrimitivo.Integer: {   // Integer valor original
                if (cast == TipoPrimitivo.Char){ //Char
                    variable_casteada = String.fromCharCode(expre);
                    // console.log("Variable CASTEADA: ", variable_casteada);
                }else if (cast == TipoPrimitivo.Double){ //Double
                    variable_casteada = parseFloat(expre).toFixed(2);
                }
            }
            case TipoPrimitivo.Double: {   // Double valor original
                if (cast == TipoPrimitivo.Integer){ //Integer
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


    public txtListaSimbolos(){  
        const fs = require("fs");
        
        // LECTURA o ESCRITURA r o w
        // fs.readFile("sample.txt", (err, data) => {
        //     if (err) throw err;
        //     console.log(data.toString());
        //  });

        // Limpiar el archivo a blanco
        // fs.writeFile("./Txt/document.txt", "", (err) => {
        // if (err) throw err;
        // // console.log("Completed!");
        // });

        // \nToken
        let pere;
        if(this.tipo.getPrimitivo() === TipoPrimitivo.Integer){
            pere = "Integer";
        }else if(this.tipo.getPrimitivo() === TipoPrimitivo.Double){
            pere = "Double";
        } else if(this.tipo.getPrimitivo() === TipoPrimitivo.String) {
            pere = "String";
        } else if(this.tipo.getPrimitivo() === TipoPrimitivo.Char) {
            pere = "Char";
        } else if(this.tipo.getPrimitivo() === TipoPrimitivo.Boolean) {
            pere = "Boolean";
        }
        let estructura_Simbolo = this.id + "##Variable##" + pere + "##Entorno##" + (this.linea).toString() + "##" + (this.columna).toString() + "\n";
        
        

        fs.appendFile('./Txt/document.txt', estructura_Simbolo, (error)=>{
            if(error){
                throw error;
            }
            // console.log('Simbolo Ingresado');
        });
    }


    public ast(): void {
        const consola = Consola.getInstance();
        const nombreNodo = `instruccion_${this.linea}_${this.columna}_`
        consola.set_Ast(`${nombreNodo}[label="\\<Instruccion\\>\\nDeclaracion"];\n`)
        // consola.set_Ast(`${nombreNodo}1[label="\\<Tipo\\>\\n${consola.getTipo(this.tipo)}"];\n`)
        consola.set_Ast(`${nombreNodo}2[label="\\<Nombre\\>\\n${this.id}"];\n`)
        consola.set_Ast(`${nombreNodo}->${nombreNodo}1;\n`)
        consola.set_Ast(`${nombreNodo}->${nombreNodo}2;\n`)
        // consola.set_Ast(`${nombreNodo}->${this.value?.ast()}\n`)
    }

}
