import { DeclararFuncion } from "../Instrucciones/DeclararFuncion";
import { DeclararVariable } from "../Instrucciones/DeclararVariable";
import { Ambito } from "./Ambito";
import { AST } from "./AST";
import { Expresion } from "./Expresion";
import { Instruccion } from "./Instruccion";
import { Nodo } from "./Nodo";

// import { attribute as _, Digraph, Subgraph, Node, Edge, toDot } from 'ts-graphviz';
import { Consola } from "../Consola/Consola";
import { toFile } from 'ts-graphviz/adapter';

export class Raiz {

    private sentencias:     Nodo[];

    constructor(sentencias : Nodo[]) {
        this.sentencias = sentencias;
    }

    public ejecutar(ast: AST) {
        try
        {
            let ambito_global:Ambito = new Ambito(undefined);
            let ambito_actual:Ambito = ambito_global;

            
            this.ejecutarDeclaracionesVar(ambito_actual, ambito_global, ast);
            this.ejecutarDeclaracionesFunciones(ambito_actual, ambito_global, ast);
            

            for(let x = 0; x < this.sentencias.length ; x++)
            {
                let sent = this.sentencias[x];
                if ( !(sent instanceof DeclararVariable) && !(sent instanceof DeclararFuncion))
                {
                    if(sent instanceof Instruccion){
                        sent.ejecutar(ambito_actual, ambito_global, ast);
                        // sent.ast();
                    }else if(sent instanceof Expresion) sent.getValor(ambito_actual, ambito_global, ast);
                    
                }
                
            }  

            // =====================================
            // LIMPIANDO EL ARCHIVO GRAPHVIZ
            var consola = Consola.getInstance();
            consola.cleanConsola();
            // FIN LIMPIANDO EL ARCHIVO GRAPHVIZ

            /**For para armar el ast de las instrucciones */
            consola.set_Ast("digraph G { \nnode[shape=box];\nnodeInicio[label=\"<\\ INICIO \\>\"];\n\n");
            var cont = 0;
            var inst_line_anterior = 0;
            var inst_col_anterior = 0;
            for(let sent of this.sentencias){
                // if(sentencia instanceof Instruccion) sentencia.ejecutar(ambito_if, global, ast);
                if(sent instanceof Instruccion)
                    {
                        try {
                            if (cont == 0) {
                                consola.set_Ast(`nodeInicio->instruccion_${sent.linea}_${sent.columna}_;\n`);
                                inst_line_anterior = sent.linea;
                                inst_col_anterior = sent.columna;
                            } else {
                                consola.set_Ast(`instruccion_${inst_line_anterior}_${inst_col_anterior}_->instruccion_${sent.linea}_${sent.columna}_;\n`);
                                inst_line_anterior = sent.linea;
                                inst_col_anterior = sent.columna;
                            }
                
                            sent.ast();
                
                        } catch (error) {
                            console.log("soy un error" + error)
                        }
                        cont++;
                    }
                    
            }

            consola.set_Ast("}"); //para cerrar el dot porque es más práctico hacerlo aquí que en la gramática
            console.log(consola.get_Ast());
            /* AST prueba */
            const dot = consola.get_Ast()
            toFile(dot, './Txt/ASTgrafo.svg', { format: 'svg' });
    
   
            // =====================================

            
            // Solo las variable locales agarra
            // console.log("Imprimiendo lista de simbolos");
            // let listilla_Simbolos = ambito_actual.getListaSimbolos();
            // console.log(ambito_actual);

        
        }catch(ex){
            ast.escribirConsola("ERROR => " + ex.message);
            console.log(ex);

        }
        
    }

    private ejecutarDeclaracionesVar(actual :Ambito, global :Ambito, ast:AST){
         for(let x = 0; x < this.sentencias.length ; x++)
         {
             let sent = this.sentencias[x];
             if ( sent instanceof DeclararVariable)
             {
                 sent.ejecutar(actual, global, ast);
             }
         }
    }

    private ejecutarDeclaracionesFunciones(actual :Ambito, global :Ambito, ast:AST){

        
        for(let x = 0; x < this.sentencias.length ; x++)
        {
            let sent = this.sentencias[x];
            if ( sent instanceof DeclararFuncion)
            {
                sent.ejecutar(actual, global, ast);
            }
        }
   }
}