import { Ambito } from "../Entorno/Ambito";
import { AST } from "../Entorno/AST";
import { Expresion } from "../Entorno/Expresion";
import { Instruccion } from "../Entorno/Instruccion";
import { Print } from "../Instrucciones/Print";
import { TipoPrimitivo } from "../Entorno/Simbolos/TipoPrimitivo";
import { Asignacion } from "../Instrucciones/Asignacion";
import { Variable } from "../Entorno/Simbolos/Variable";
import { Return } from "../Instrucciones/Sentencias_de_Transicion/Return";
import { Valor } from "./Valor";
import { Tipo } from "../Entorno/Simbolos/Tipo";


export class LlamadaFuncion extends Expresion {
    
    nombre  : string;
    lista_exp   : Expresion[];

    constructor(nombre :string, lista_exp :Expresion[], linea :number, columna :number){
        super(linea, columna);
        this.nombre = nombre;
        this.lista_exp = lista_exp;
    }

    public getValor(actual: Ambito, global: Ambito, ast: AST) {
        
        switch(this.nombre) {
            case "print":
                {
                    let print = new Print(this.lista_exp, this.linea, this.columna);
                    return print.ejecutar(actual, global, ast);
                }
            default:
                {
                    console.log("EXISTE FUNCION");
                    console.log(global.existeFuncion(this.nombre));
                    console.log("EXISTE FUNCION");

                    let funcionP = global.getFuncion(this.nombre);

                    
                    let ambito_local = new Ambito(actual);

                    if(funcionP != undefined) {
                        if (funcionP.tipo.getPrimitivo() == TipoPrimitivo.Void) {
                            //VOID
                            // console.log("llamamos a un void");
                            if (funcionP.parametros.length == this.lista_exp.length) {
                                
                                let sentenciasFuncion = funcionP.getSentencias();
                                let declaracionFuncion = funcionP.getParametros();
    
                                if (this.lista_exp.length == 0) {
                                    // console.log("Entramos en lista 0");
                                    for(let sentencia of sentenciasFuncion){
                                        if(sentencia instanceof Instruccion) sentencia.ejecutar(ambito_local, global, ast);
                                        if(sentencia instanceof Expresion) sentencia.getValor(ambito_local, global, ast);
                                    }
                                }else{
                                    for (let i = 0; i < this.lista_exp.length; i++) {
                                        let value = this.lista_exp[i];
                                        
                                        let parara = value.getValor(actual,global,ast)
                                        // console.log(value.tipo.getPrimitivo());
                                        let cua = value.tipo.getPrimitivo();


                                        if(funcionP.parametros[i].tipo.getPrimitivo() == cua){
                                            let nombreParametro = funcionP.getNombre();
                                            
                                            let valor_asig = value.getValor(actual, global, ast);
                                            
                                            // console.log("alsdjfañsldfjañl");
                                            // console.log()
                                            
                                            let asinga = new Asignacion(declaracionFuncion[i].id, value, "0", this.linea, this.columna);
                                            asinga.ejecutar(actual, global, ast);
                                            
                                           
                                            
                                        }
                                }

                                for(let sentencia of sentenciasFuncion){
                                    if(sentencia instanceof Instruccion) sentencia.ejecutar(ambito_local, global, ast);
                                    if(sentencia instanceof Expresion) sentencia.getValor(ambito_local, global, ast);
                                }
                                
                                } 
                                
                            }
                        }else{ // Funciones con Tipo
                            let retorno;
                            let tipotipo;
                            let sentenciasFuncion = funcionP.getSentencias();
                            let declaracionFuncion = funcionP.getParametros();
    
                            if (this.lista_exp.length == 0) {
                                // console.log("Entramos en lista 0");
                                for(let sentencia of sentenciasFuncion){
                                    if(sentencia instanceof Instruccion) sentencia.ejecutar(ambito_local, global, ast);
                                    if(sentencia instanceof Expresion) sentencia.getValor(ambito_local, global, ast);
                                    if(sentencia instanceof Return) {
                                        let paella = sentencia.getValor(ambito_local, global, ast);
                                        // console.log("Paella: " + paella);
                                        retorno = paella;
                                        tipotipo = sentencia.getTipo(ambito_local, global, ast);
                                    } 
                                }
                            }else{
                                for (let i = 0; i < this.lista_exp.length; i++) {
                                    let value = this.lista_exp[i];
                                    
                                    let parara = value.getValor(actual,global,ast)
                                    // console.log(value.tipo.getPrimitivo());
                                    let cua = value.tipo.getPrimitivo();


                                    if(funcionP.parametros[i].tipo.getPrimitivo() == cua){
                                        let nombreParametro = funcionP.getNombre();
                                        
                                        let valor_asig = value.getValor(actual, global, ast);
                                        
                                        // console.log("alsdjfañsldfjañl");
                                        // console.log()
                                        
                                        let asinga = new Asignacion(declaracionFuncion[i].id, value, "0", this.linea, this.columna);
                                        asinga.ejecutar(actual, global, ast);
                                        
                                       
                                    }
                                }


                                for(let sentencia of sentenciasFuncion){
                                    if(sentencia instanceof Instruccion) sentencia.ejecutar(ambito_local, global, ast);
                                    if(sentencia instanceof Expresion) sentencia.getValor(ambito_local, global, ast);
                                    if(sentencia instanceof Return) {
                                        let paella = sentencia.getValor(ambito_local, global, ast);
                                        // console.log("Paella: " + paella);
                                        retorno = paella;
                                        let coso = sentencia.getTipo(ambito_local, global, ast);
                                        
                                        tipotipo = coso;
                                        console.log("TIPO fasdfasfdafs  ");
                                        console.log(tipotipo);
                                    } 
                                }

                            }

                            
                            this.tipo = new Tipo(tipotipo.getPrimitivo())
                            return retorno
                        }
                        
                    }else{
                        // * ERROR *
                        throw new Error("Sintactico Error LlamadaFuncion: No existe la Funcion " + this.nombre + " " + this.linea + ", " + this.columna);
                   
                    }




                    
                }
        }
    }

}