import express 		from 'express';
import path 		from 'path';
import cookieParser from 'cookie-parser';
import bodyParser   from 'body-parser';
import { Analizador } from './Analizador/Analizador';
import { AST } from './Entorno/AST';
// import { publicDecrypt } from 'crypto';

const app = express();
const port = 3000;

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
console.log(__dirname);
app.use(express.static(path.join(__dirname, '../public')));



// ===================================== RUTAS
app.listen(port, err => {
    if (err) {
    	return console.error(err);
    }
    return console.log(`Servidor funcionando en puerto: ${port}`);
});


app.get('/status', (req, res) => {
	res.send('El servicio express esta funcionando OK !!');
});

app.get('/', (req, res) => {
	res.render('index.ejs', { title: 'InterpreteTS - JISON', salida: '', codigo:""});
});

app.post('/ejecutar', (req, res) => {
    
    // Limpiar el archivo a blanco
    const fs = require("fs");
    fs.writeFile("./Txt/document.txt", "", (err) => {
    if (err) throw err;
    console.log("Archivo limpiado!");
    });
    // FIN Limpiar el archivo a blanco

    let cadena_codigo = req.body.codigo;
    let analizador = new Analizador(cadena_codigo, "editor");
    let ast: AST = analizador.Analizar();
    // console.log(analizador)
    if(ast != undefined) {
        res.render('index.ejs', { title: 'InterpreteTS - JISON', salida: ast.getSalida(), codigo: cadena_codigo});
    } else{
        res.render('index.ejs', { title: 'InterpreteTS - JISON', salida: 'ERROR al procesar cadena', codigo: cadena_codigo});
    }


    /* Creando un HTML con los Simbolos */
    let listacero;
    fs.readFile("./Txt/document.txt", (err, xdxx) => {
        if (err) throw err;
        // console.log(data.toString().split('\n'));
        listacero = (xdxx.toString().split('\n'));
        // console.log(listacero);
        // console.log(listacero[0].split("##"));

        // HACEMOS EL HTML
        let cuerpoHTML = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Tabla de Simbolos</title>
            <style>
            table {
                border-collapse: collapse;
                margin: 0 auto; /* Centra la tabla en la página */
            }
            td, th {
                border: 1px solid black;
                padding: 8px;
                text-align: left;
            }
            </style>
        </head>
        <body>
            <h1 style="text-align: center;">TABLA DE SIMBOLOS</h1> <!-- Título centrado -->
            <table>
            <thead>
                <tr>
                <th>Identificador</th>
                <th>Tipo</th>
                <th>Tipo Variable</th>
                <th>Entorno</th>
                <th>Linea</th>
                <th>Columna</th>
                </tr>
            </thead> 
            <tbody>`;
            
        let temporal1;
        let temporal2;
        let otro
        for (let index = 0; index < listacero.length; index++) {
            let newAA = listacero[index].split("##");
            let number = index + 1;
            if (number >= listacero.length){
                continue
            }else{
                otro = listacero[number].split("##");
                
                temporal2 = otro[0];
            }
            
            
            if (newAA[0] == temporal1 || newAA[0] == temporal2){
                continue;
            }else{
                cuerpoHTML = cuerpoHTML + `\n<tr>\n`;
                temporal1 = newAA[0]
                // console.log(temporal2);
                for(let parte of newAA){
                    cuerpoHTML = cuerpoHTML + `<td>` + parte + `</td>\n`;
                }
                cuerpoHTML = cuerpoHTML + `</tr>`;
            }
            
        }
        
        

        cuerpoHTML = cuerpoHTML + `        
            </tbody>
            </table>
        </body>
        </html>

        `;

        cuerpoHTML = cuerpoHTML + ``;      
        fs.writeFile("./Txt/simbolosHTML.html", cuerpoHTML, (err) => {
            if (err) throw err;
            console.log("Archivo HTML configurado");
            });

    });

});



