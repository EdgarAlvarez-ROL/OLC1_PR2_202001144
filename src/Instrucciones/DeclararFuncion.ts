import { Ambito } from "../Entorno/Ambito";
import { AST } from "../Entorno/AST";
import { Instruccion } from "../Entorno/Instruccion";
import { Nodo } from "../Entorno/Nodo";
import { Tipo } from "../Entorno/Simbolos/Tipo";
import { DeclararVariable } from "./DeclararVariable";
import { Funcion } from "../Entorno/Simbolos/Funcion";

export class DeclararFuncion extends Instruccion {
    
    tipo        : Tipo;
    nombre      : string;
    parametros  : DeclararVariable[];
    sentencias  : Nodo[];  

    constructor(tipo :Tipo, nombre : string, parametros :DeclararVariable[], sentencias: Nodo[], linea :number, columna :number) {
        super(linea, columna);
        this.nombre = nombre;
        this.parametros = parametros;
        this.sentencias = sentencias;
        this.tipo = tipo; //agregue esto nuevo
    }

    public ejecutar(actual: Ambito, global: Ambito, ast: AST) {
        
        // this.parametros[0].ejecutar
        // let ambito_actual= new Ambito(actual);
        for (let param of this.parametros ) {
            param.ejecutar(actual, global, ast);
        }

        let functionnn = new Funcion(this.tipo, this.nombre, this.parametros, this.sentencias);

        actual.insertarFuncion(this.nombre, functionnn);

        console.log("Funcion Insertada: " + this.nombre);


        // actual.insertarFuncion(this.nombre,);
        // throw new Error("Method not implemented.");
    }
}