%{
    let Raiz                        =   require("../Entorno/Raiz").Raiz;
    let Tipo                        =   require("../Entorno/Simbolos/Tipo").Tipo;
    let TipoPrimitivo               =   require("../Entorno/Simbolos/TipoPrimitivo").TipoPrimitivo;
    let DeclararVariable            =   require("../Instrucciones/DeclararVariable").DeclararVariable; 
    let DeclararFuncion             =   require("../Instrucciones/DeclararFuncion").DeclararFuncion;
    let Asignacion                  =   require("../Instrucciones/Asignacion").Asignacion;
    let If                          =   require("../Instrucciones/If").If;
    let Parametro                   =   require("../Instrucciones/Parametro").Parametro;
    let AccesoVariable              =   require("../Expresiones/AccesoVariable").AccesoVariable;
    let LlamadaFuncion              =   require("../Expresiones/LlamadaFuncion").LlamadaFuncion;
    let OperacionAritmetica         =   require("../Expresiones/OperacionAritmetica").OperacionAritmetica;
    let OperacionLogica             =   require("../Expresiones/OperacionLogica").OperacionLogica;
    let OperacionRelacional         =   require("../Expresiones/OperacionRelacional").OperacionRelacional;
    let While                       =   require("../Instrucciones/While").While;
    let Valor                       =   require("../Expresiones/Valor").Valor;

    let Incremento_y_Decremento     =   require("../Expresiones/Incremento_y_Decremento").Incremento_y_Decremento; //MOVI
    let DeclararVector              =   require("../Instrucciones/DeclararVector").DeclararVector;
    let AccesoVector                =   require("../Expresiones/AccesoVector").AccesoVector;
    let Cases                       =   require("../Instrucciones/Cases").Cases;
    let Switch                      =   require("../Instrucciones/Switch").Switch;
    let Default                     =   require("../Instrucciones/Default").Default;
    let For                         =   require("../Instrucciones/For").For;
    let DoWhile                     =   require("../Instrucciones/DoWhile").DoWhile;

    /* Funciones Reservadas Especiales y Nativas */
    let toLower                     =   require("../Expresiones/Funciones_Reservadas/toLower").toLower;
    let toUpper                     =   require("../Expresiones/Funciones_Reservadas/toUpper").toUpper;
    let round                       =   require("../Expresiones/Funciones_Reservadas/round").round;
    let length                      =   require("../Expresiones/Funciones_Reservadas/length").length;
    let truncate                    =   require("../Expresiones/Funciones_Reservadas/truncate").truncate;
    let typeOf                      =   require("../Expresiones/Funciones_Reservadas/typeOf").typeOf;
    let TtoString                   =   require("../Expresiones/Funciones_Reservadas/TtoString").TtoString;
    let toCharArray                 =   require("../Expresiones/Funciones_Reservadas/toCharArray").toCharArray;

    // SENTENCIAS DE TRANSFERENCIA
    let Return                      =   require("../Instrucciones/Sentencias_de_Transicion/Return").Return;                

%}
/* description: Parses end executes mathematical expressions. */

/* lexical grammar */
%lex
%options case-insensitive

digit                       [0-9]
cor1                        "["
cor2                        "]"
esc                         "\\"
int                         (?:[0-9]|[1-9][0-9]+)
exp                         (?:[eE][-+]?[0-9]+)
frac                        (?:\.[0-9]+)

%%

\s+                             {/* skip whitespace */}
<<EOF>>                         {return 'EOF';}

/* COMENTARIOS */
"//".*                                 {/* IGNORE */}
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]    {/* IGNORE */}

/* =================== PALABRAS RESERVADAS =================== */
"true"                          {   return 'ttrue';     }
"false"                         {   return 'tfalse';    }
"int"                           {   return 'tinteger';  }
"boolean"                       {   return 'tboolean';  }
"double"                        {   return 'tdouble';   }
"string"                        {   return 'tstring';   }
"char"                          {   return 'tchar';     }
"if"                            {   return 'tif';       }
"switch"                        {   return 'tswitch';   } 
"case"                          {   return 'tcase';     }
"default"                       {   return 'tdefault';  }
"while"                         {   return 'twhile';    }
"for"                           {   return 'tfor';      }
"do"                            {   return 'tdo';       }
"else"                          {   return 'telse';     }
"void"                          {   return 'tvoid';     }
"main"                          {   return 'tmain';     }  
"return"                        {   return 'treturn';   }
"new"                           {   return 'tnew';      }


"toLower"                       {   return 'toLower';   }
"toUpper"                       {   return 'toUpper';   }
"round"                         {   return 'round';     }
"length"                        {   return 'length';    }
"truncate"                      {   return 'truncate';  }
"typeOf"                        {   return 'typeOf';    }
"tostring"                      {   return 'TTtoString';  }
"toCharArray"                   {   return 'toCharArray'; }


/* =================== EXPRESIONES REGULARES ===================== */
([a-zA-ZÑñ]|("_"[a-zA-ZÑñ]))([a-zA-ZÑñ]|[0-9]|"_")*             yytext = yytext.toLowerCase();          return 'id';
\"(?:[{cor1}|{cor2}]|["\\"]["bnrt/["\\"]]|[^"["\\"])*\"         yytext = yytext.substr(1,yyleng-2);     return 'cadena';
\'(?:{esc}["bfnrt/{esc}]|{esc}"u"[a-fA-F0-9]{4}|[^"{esc}])\'    yytext = yytext.substr(1,yyleng-2);     return 'caracter'
{int}{frac}\b                                                                                           return 'decimal'
{int}\b                                                                                                 return 'entero'

/* ======================== SIGNOS ======================= */
"$"                             {return '$'};
"++"                            {return '++';}
"--"                            {return '--';}
"+"                             {return '+';}
"-"                             {return '-';}
"*"                             {return '*';}
"/"                             {return '/';}
"^"                             {return '^';}
"%"                             {return '%';}
"("                             {return '(';}
")"                             {return ')';}
"=="                            {return '==';}
"="                             {return '=';}
","                             {return ',';}
":"                             {return ':';}
";"                             {return ';';}
"||"                            {return '||';}
"&&"                            {return '&&';}
"!="                            {return '!=';}
"!"                             {return '!';}
"<="                            {return '<=';}
">="                            {return '>=';}
">"                             {return '>';}
"<"                             {return '<';}
"{"                             {return '{';}
"}"                             {return '}';}
"["                             {return '[';}
"]"                             {return ']';}


.                               {}


/lex

/* ================= ASOCIATIVIDAD y PRECEDENCIA DE OPERADORES ===============
/*Operaciones logicas*/

// %left '^'
// %left '||'
// %left '&&'
// %left '!=' '==' '==='
// %left '>' '<' '<=' '>=' 
// %left '++' '--'

// /*Operaciones numericas*/
// %left '+' '-'
// %left '*' '/' '%'
// %right '^^' 
// %right negativo '!' '(' 


//Carrier Priority TEMPORAL
%left '||'
%left '&&'
%left '^'
%left '==', '!='
%left '>=', '<=', '<', '>'
%left '+', '-'
%left '*', '/'
%left '%'
%left '!'
// %left '.' '[' ']'
%left '++', '--'
%left '?', ':'
%right negativo, '!', '(' 


// %left DECLARACION
// %left CELDA



%start INICIO

%% /* language grammar */

INICIO
    : SENTENCIAS EOF
    {
        console.log("Parse de Jison entrada: OK ");
        let raiz = new Raiz($1);
        $$ = raiz;
        return raiz;
    }
    ;

SENTENCIAS :    SENTENCIAS SENTENCIA
            {
                $1.push($2);
                $$ = $1;
            }
            |   SENTENCIA
            {
                let lstsent = [];
                lstsent.push($1);
                $$ = lstsent;
            }
;

BLOQUE_SENTENCAS : '{' SENTENCIAS '}'
                {
                       $$ = $2;
                }
                |  '{' '}'
                {
                        $$ = [];
                }
;

SENTENCIA :     DECLARACION ';'             { $$ = $1; }
            |   FUNCION                     { $$ = $1; }
            |   ASIGNACION ';'                 { $$ = $1; }
            |   SENTENCIAS_TRANSFERENCIA    { $$ = $1; }
            |   IF                          { $$ = $1; }
            |   SWITCH                      { $$ = $1; }
            |   LLAMADA_FUNCION  ';'        { $$ = $1; }
            |   WHILE                       { $$ = $1; }
            |   FOR                         { $$ = $1; } 
            |   DOWHILE                     { $$ = $1; } 
;



CELDA   : id '[' EXP ']'
        {
            $$ = new AccesoVector($1, $3, @1.first_line, @1.first_column);
        }
;


DECLARACION :  TIPO '[' ']' id '=' tnew TIPO '[' EXP ']'
            {
                // console.log("lista de expresiones del id: " + $4 + " es: " + $9);
                $$ = new DeclararVariable($1, $4, [$9], undefined, $7, @4.first_line, @4.first_column);
            }
            |   TIPO '[' ']' id '=' '{' LISTA_EXP '}'
            {
                // console.log("lista de expresiones del id: " + $4 + " es: " + $7);
                $$ = new DeclararVariable($1, $4, $7, undefined, undefined, @4.first_line, @4.first_column);
            }
            | TIPO  id '=' EXP 
            {
                $$ = new DeclararVariable($1, $2, $4, undefined, undefined, @2.first_line, @2.first_column);
            }
            | TIPO  id  
            {
                $$ = new DeclararVariable($1, $2, undefined, undefined, undefined, @2.first_line, @2.first_column);
            }
            // nuevo
            | TIPO id '=' '(' CASTEO ')' EXP
            {
                $$ = new DeclararVariable($1, $2, $7, $5, undefined, @2.first_line, @2.first_column);
            }
;


SWITCH :    tswitch '(' EXP ')' '{' CASOES DEFAULTED '}'    { $$= new Switch($3, $6, $7, @1.first_line, @1.first_column); }
       |    tswitch '(' EXP ')' '{' CASOES '}'              { $$= new Switch($3, $6, undefined, @1.first_line, @1.first_column); }
       |    tswitch '(' EXP ')' '{' DEFAULTED '}'           { $$= new Switch($3, undefined, $6, @1.first_line, @1.first_column); }
;

CASOES :   CASOES CASESS          
            { 
                $1.push($2);
                $$= $1; 
            }
        |   CASESS                  { $$ = [$1]; }
;

CASESS:     tcase EXP ':' SENTENCIAS { $$ = new Cases($2, $4, @1.first_line, @1.first_column); }
;

DEFAULTED:  tdefault ':' SENTENCIAS { $$ = new Default($3, @1.first_line, @1.first_column); }
;


ASIGNACION  :   id '=' EXP 
            {
                $$ = new Asignacion($1, $3, "0", @1.first_line, @1.first_column);
            }
            |   id '++' 
            {
                let info = new AccesoVariable($1, @1.first_line, @1.first_column); 
                //console.log("papa: " + info);
                let incdec = new Incremento_y_Decremento(info, $2, @2.first_line, @2.first_column);
                $$ = new Asignacion($1, incdec, "0", @1.first_line, @1.first_column);
            }
            |   id '--' 
            {
                let info22 = new AccesoVariable($1, @1.first_line, @1.first_column); 
                let incdec22 = new Incremento_y_Decremento(info22, $2, @2.first_line, @2.first_column);
                $$ = new Asignacion($1, incdec22, "0", @1.first_line, @1.first_column);
            }
            // FALTA ASIGNACION DE VECTOR NUMERO 1 RESPECTIVO
;



IF      :   tif '(' EXP ')' BLOQUE_SENTENCAS
        {
            $$ = new If($3, $5, [], @1.first_line, @1.first_column);
        }
        |   tif '(' EXP ')' BLOQUE_SENTENCAS ELSE
        {
            $$ = new If($3, $5, $6, @1.first_line, @1.first_column);
        }
;
 
ELSE    :   telse IF
        {
            let else_sent = [];
            else_sent.push($2);
            $$ = else_sent;
        }
        |   telse BLOQUE_SENTENCAS
        {
            $$ = $2;
        }
;

WHILE   : twhile '(' EXP ')' BLOQUE_SENTENCAS
        {
            $$ = new While($3, $5, @1.first_line, @1.first_column );
        }
;


FOR:    tfor '(' COMENZAR  ';' EXP ';' ACTUALIZAR ')' BLOQUE_SENTENCAS
        {
            $$ = new For($3, $5, $7, $9, @1.first_line, @1.first_column );
        }
;

COMENZAR    : DECLARACION    { $$ = $1; }
            | ASIGNACION     { $$ = $1; }
;

ACTUALIZAR  : ASIGNACION     { $$ = $1; }
;


DOWHILE     : tdo BLOQUE_SENTENCAS twhile '(' EXP ')' ';' 
            {
                $$ = new DoWhile($5, $2, @1.first_line, @1.first_column );
            }
;


FUNCION:        TIPO    id '('  ')' BLOQUE_SENTENCAS
            {
                $$ = new DeclararFuncion($1, $2, [], $5, @2.first_line, @2.first_column);
            }
            |   tvoid   id '('  ')' BLOQUE_SENTENCAS
            {
                $$ = new DeclararFuncion(new Tipo(TipoPrimitivo.Void), $2, [], $5, @2.first_line, @2.first_column);
            }
            |   TIPO    id '(' LISTA_PARAM ')' BLOQUE_SENTENCAS
            {
                $$ = new DeclararFuncion($1, $2, $4, $6, @2.first_line, @2.first_column);
            }
            |   tvoid   id '(' LISTA_PARAM ')' BLOQUE_SENTENCAS
            {
                $$ = new DeclararFuncion(new Tipo(TipoPrimitivo.Void), $2, $4, $6, @2.first_line, @2.first_column);
            }
            
;


TIPO    :       tinteger                    { $$ = new Tipo(TipoPrimitivo.Integer); }
        |       tboolean                    { $$ = new Tipo(TipoPrimitivo.Boolean); }
        |       tstring                     { $$ = new Tipo(TipoPrimitivo.String);  }
        |       tdouble                     { $$ = new Tipo(TipoPrimitivo.Double);  }
        |       tchar                       { $$ = new Tipo(TipoPrimitivo.Char);    }
; 

//nuevo
CASTEO  :       tinteger                    { $$ = new Tipo(TipoPrimitivo.Integer); }
        |       tdouble                     { $$ = new Tipo(TipoPrimitivo.Double);  }
        |       tchar                       { $$ = new Tipo(TipoPrimitivo.Char);    }
; 

LISTA_PARAM :   LISTA_PARAM ',' TIPO id
            {
                $1.push( new DeclararVariable($3, $4, undefined, undefined, undefined, @1.first_line, @1.first_column) );
                $$ = $1;
            }
            |   TIPO id
            {
                let decla1 = new DeclararVariable($1, $2, undefined, undefined, undefined, @2.first_line, @2.first_column);
                let params = [];
                params.push(decla1);
                $$ = params;
            }
;

LISTA_EXP : LISTA_EXP ',' EXP
        {
            $1.push($3);
            $$ = $1;
        }
        |   EXP
        { 
            let lista_exp = [];
            lista_exp.push($1);
            $$ = lista_exp;
        }
;

LLAMADA_FUNCION : id '('')'             { $$ = new LlamadaFuncion($1, [], @1.first_line, @1.first_column);    }
                | id '(' LISTA_EXP ')'  { $$ = new LlamadaFuncion($1, $3, @1.first_line, @1.first_column);    }
                | tmain id '('')'                 { $$ = new LlamadaFuncion($2, [], @1.first_line, @1.first_column); }
                | tmain id '(' LISTA_EXP ')'      { $$ = new LlamadaFuncion($2, $4, @1.first_line, @1.first_column);    }
;



EXP :   EXP '+' EXP                     { $$ = new OperacionAritmetica($1, $2, $3, @2.first_line, @2.first_column);}
    |   EXP '-' EXP                     { $$ = new OperacionAritmetica($1, $2, $3, @2.first_line, @2.first_column);}
    |   EXP '*' EXP                     { $$ = new OperacionAritmetica($1, $2, $3, @2.first_line, @2.first_column);}
    |   EXP '/' EXP                     { $$ = new OperacionAritmetica($1, $2, $3, @2.first_line, @2.first_column);}
    |   EXP '^' EXP                     { $$ = new OperacionAritmetica($1, $2, $3, @2.first_line, @2.first_column);}
    //nuevo
    |   EXP '++'                        { $$ = new Incremento_y_Decremento($1, $2, @2.first_line, @2.first_column);}
    |   EXP '--'                        { $$ = new Incremento_y_Decremento($1, $2, @2.first_line, @2.first_column);}
    //nuevo
    |   '-' EXP %prec negativo          { $$ = new OperacionAritmetica($2, "NIGA", $2, @1.first_line, @1.first_column);}
    |   '(' EXP ')'                     { $$ = $2;}
    |   EXP '=='  EXP                   { $$ = new OperacionRelacional($1, $2, $3, @2.first_line, @2.first_column);}
    |   EXP '!='  EXP                   { $$ = new OperacionRelacional($1, $2, $3, @2.first_line, @2.first_column);}
    |   EXP '<'   EXP                   { $$ = new OperacionRelacional($1, $2, $3, @2.first_line, @2.first_column);}
    |   EXP '>'   EXP                   { $$ = new OperacionRelacional($1, $2, $3, @2.first_line, @2.first_column);}
    |   EXP '<='  EXP                   { $$ = new OperacionRelacional($1, $2, $3, @2.first_line, @2.first_column);}
    |   EXP '>='  EXP                   { $$ = new OperacionRelacional($1, $2, $3, @2.first_line, @2.first_column);}
    |   EXP '&&'  EXP                   { $$ = new OperacionLogica($1, $2, $3, @2.first_line, @2.first_column);}
    |   EXP '||'  EXP                   { $$ = new OperacionLogica($1, $2, $3, @2.first_line, @2.first_column);}
    |   id                              { $$ = new AccesoVariable($1, @1.first_line, @1.first_column);        }
    |   LLAMADA_FUNCION                 { $$ = $1; }
    |   CELDA                           { $$ = $1; }
    |   toLower '(' EXP ')'             { $$ = new toLower($3, @1.first_line, @1.first_column); }
    |   toUpper '(' EXP ')'             { $$ = new toUpper($3, @1.first_line, @1.first_column); }
    |   round '(' EXP ')'               { $$ = new round($3, @1.first_line, @1.first_column); }
    |   length '(' EXP ')'              { $$ = new length($3, @1.first_line, @1.first_column); }
    |   truncate '(' EXP ')'            { $$ = new truncate($3, @1.first_line, @1.first_column); }
    |   typeOf  '(' EXP ')'             { $$ = new typeOf($3, @1.first_line, @1.first_column); }
    |   TTtoString   '(' EXP ')'         { $$ = new TtoString($3, @1.first_line, @1.first_column); }
    |   toCharArray '(' EXP ')'         { $$ = new toCharArray($3, @1.first_line, @1.first_column); }
    |   entero                          { $$ = new Valor($1, "integer", @1.first_line, @1.first_column);}
    |   decimal                         { $$ = new Valor($1, "double", @1.first_line, @1.first_column); }
    |   caracter                        { $$ = new Valor($1, "char", @1.first_line, @1.first_column);   }
    |   cadena                          { $$ = new Valor($1, "string", @1.first_line, @1.first_column); }
    |   ttrue                           { $$ = new Valor($1, "true", @1.first_line, @1.first_column);   }
    |   tfalse                          { $$ = new Valor($1, "false", @1.first_line, @1.first_column);  }
;

SENTENCIAS_TRANSFERENCIA : treturn EXP ';' { $$ = new Return($2, @1.first_line, @1.first_column); }

;