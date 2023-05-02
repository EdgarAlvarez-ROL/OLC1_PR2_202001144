import { Ambito } from "../Entorno/Ambito";
import { AST } from "../Entorno/AST";
import { Instruccion } from "../Entorno/Instruccion";
import { Nodo } from "../Entorno/Nodo";
import { Tipo } from "../Entorno/Simbolos/Tipo";
import { DeclararVariable } from "./DeclararVariable";
import { Funcion } from "../Entorno/Simbolos/Funcion";

import { Digraph } from "ts-graphviz";
import { Node } from "ts-graphviz";

import { Consola } from "../Consola/Consola";

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

        let functionnn = new Funcion(this.tipo, this.nombre, this.parametros, this.sentencias, this.linea, this.columna);

        actual.insertarFuncion(this.nombre, functionnn);

        console.log("Funcion Insertada: " + this.nombre);


        // actual.insertarFuncion(this.nombre,);
        // throw new Error("Method not implemented.");
    }


    public ast(): void {
        const consola = Consola.getInstance();
        const nombreNodo = `instruccion_${this.linea}_${this.columna}_`
        consola.set_Ast(`${nombreNodo}[label="\\<Instruccion\\>\\nDeclaracion"];\n`)
        consola.set_Ast(`${nombreNodo}2[label="\\<Nombre\\>\\n${this.nombre}"];\n`)
        consola.set_Ast(`${nombreNodo}->${nombreNodo}1;\n`)
        consola.set_Ast(`${nombreNodo}->${nombreNodo}2;\n`)
        // consola.set_Ast(`${nombreNodo}->${this.nombre?.ast()}\n`)
    }
}