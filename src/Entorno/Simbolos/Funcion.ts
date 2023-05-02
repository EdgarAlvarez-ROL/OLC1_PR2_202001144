import { Parametro } from "../../Instrucciones/Parametro";
import { Nodo } from "../Nodo";
import { DeclararVariable } from "../../Instrucciones/DeclararVariable";
import { Tipo } from "./Tipo";

export class Funcion {


    tipo: Tipo;
    nombre:         string;
    parametros:     DeclararVariable[];
    sentencias:     Nodo[];
    linea:          number;
    columna:        number;

    constructor(tipo: Tipo, nombre: string, parametros: DeclararVariable[], sentencias: Nodo[], linea:number, columna:number) {
        this.tipo = tipo;
        this.nombre = nombre;
        this.parametros = parametros;
        this.sentencias = sentencias;
        this.linea = linea;
        this.columna = columna;
    }

    public getNombre(): string {
        return this.nombre;
    }

    public getTipo(): Tipo {
        return this.tipo;
    }

    public getParametros(): DeclararVariable[] {
        return this.parametros;
    }

    public getSentencias(): Nodo[]{
        return this.sentencias;
    }
}