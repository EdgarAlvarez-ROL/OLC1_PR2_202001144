import { Ambito } from "../Entorno/Ambito";
import { AST } from "../Entorno/AST";
import { Expresion } from "../Entorno/Expresion";
import { Instruccion } from "../Entorno/Instruccion";
import { Nodo } from "../Entorno/Nodo";

import { DeclararVariable } from "./DeclararVariable";
import { Asignacion } from "./Asignacion";
import { Incremento_y_Decremento } from "../Expresiones/Incremento_y_Decremento";
import { TipoPrimitivo } from "../Entorno/Simbolos/TipoPrimitivo";


import { Digraph } from "ts-graphviz";
import { Node } from "ts-graphviz";

import { Consola } from "../Consola/Consola";

export class For extends Instruccion{
    

    comenzar: DeclararVariable | Asignacion;
    exp: Expresion;
    actualizar: Asignacion;
    sentencias : Nodo[];


    constructor(comenzar: DeclararVariable | Asignacion, exp: Expresion, actualizar: Asignacion, sentencias : Nodo[], linea: number, columna: number){
        super(linea, columna);
        this.comenzar = comenzar;
        this.exp = exp;
        this.actualizar = actualizar;
        this.sentencias = sentencias;
    }

    public ejecutar(actual: Ambito, global: Ambito, ast: AST) {

        this.comenzar.ejecutar(actual, global, ast);
        // Condicion
       let val_cond = this.exp.getValor(actual, global, ast);

     
        
       // Verificar tipo booleano
       if(this.exp.tipo.getPrimitivo() === TipoPrimitivo.Boolean) {
            
            while(val_cond) 
            {   
                    // AQUI VA EL BREAK Y EL CONTINUE
                    let ambito_local = new Ambito(actual);
                    for(let sentencia of this.sentencias){
                        if(sentencia instanceof Instruccion) sentencia.ejecutar(ambito_local, global, ast);
                        if(sentencia instanceof Expresion) sentencia.getValor(ambito_local, global, ast);
                    }
                    this.actualizar.ejecutar(actual, global, ast);
                    val_cond = this.exp.getValor(actual, global, ast);
            }
       }else{
           // * ERROR * 
           throw new Error("ERROR en el FOR.ts la validacion no es de tipo booleano " + this.exp);
       }
       
       
    }


    public ast(): void {
        const consola = Consola.getInstance()
        const name_node = `instruccion_${this.linea}_${this.columna}_`
        consola.set_Ast(`
        ${name_node}[label="\\<Instruccion\\>\\nFor"];
        ${name_node}Ambito[label="\\<Nuevo ámbito\\>\\n"];
        ${name_node}->${name_node}Ambito;
        ${name_node}1[label="\\<Declaración For\\>"];
        ${name_node}2[label="\\<Condición For\\>"];
        ${name_node}3[label="\\<Iteración For\\>"];
        ${name_node}4[label="\\<Cuerpo For\\>"];
        ${name_node}Ambito->${name_node}1;
        ${name_node}Ambito->${name_node}2;
        ${name_node}Ambito->${name_node}3;
        ${name_node}Ambito->${name_node}4;
        `)

        //Unión a la parte declaración
        // if (this.declaracion instanceof Expresion) {
        //     consola.set_Ast(`${name_node}1->${this.declaracion.ast()}`);
        // } else {
        //     consola.set_Ast(`${name_node}1->instruccion_${this.declaracion.line}_${this.declaracion.column}_;`);
        //     this.declaracion.ast();
        // }

        //Unión a la parte condicional
        // consola.set_Ast(`
        // ${name_node}2->${this.condition.ast()}
        // `)

        //Unión a la parte iterativa
        // if (this.iteracion instanceof Expresion) {
        //     consola.set_Ast(`${name_node}3->${this.iteracion.ast()}
        //     `);
        // } else {
        //     consola.set_Ast(`${name_node}3->instruccion_${this.iteracion.line}_${this.iteracion.column}_;
        //     `);
        //     this.iteracion.ast()
        // }

        //Conectando el cuerpo de for.
        // consola.set_Ast(`
        // ${name_node}4->instruccion_${this.bloque?.line}_${this.bloque?.column}_;
        // `)
        // this.bloque?.ast()
    }


}