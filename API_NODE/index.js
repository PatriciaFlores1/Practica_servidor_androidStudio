const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')

//iniciamos espress
const app = express()

app.use(bodyParser.json())
const PUERTO = 3000

const conexion = mysql.createConnection(
    {
        host:'localhost',
        database: 'pruebas',
        user: 'root',
        password: ''
    }
)

app.listen(PUERTO, '0.0.0.0', () => {
    console.log(`Servidor corriendo en el puerto http://0.0.0.0: ${PUERTO}`);
})

conexion.connect(error => {
    if(error) throw error
    console.log('Conexión exitosa a la base de datos');
})

//creando la raiz de nuestro Backend
app.get('/', (req, res) => {
    res.send('API')
})

//Creando los endpoints
//PRIMER ENDPOINT -> CONSULTA A LA BASE DE DATOS GET
app.get('/usuarios', (req, res) => {

    const query = 'SELECT * FROM usuarios;'
    conexion.query(query, (error, resultado) => {
        if(error) return console.error(error.message)

        const obj = {}
        if(resultado.length > 0) {
            obj.listaUsuarios = resultado
            res.json(obj)
        } else {
            res.send('No hay registros')
        }
    })
})


//SEGUNDO ENPOINT -> OBTENER USUARIO POR ID GET
app.get('/usuario/:id', (req, res) => {
    const { id } = req.params

    const query = `SELECT * FROM usuarios WHERE idUsuario=${id};`
    conexion.query(query, (error, resultado) => {
        if(error) return console.error(error.message)

        if(resultado.length > 0){
            res.json(resultado);
        } else {
            res.send('No hay registros');
        }
    })
})

//TERCER ENDPOINT -> AGREGAMOS UN NUEVO USUARIOS POST
app.post('/usuario/add', (req, res) => {
    const usuario = {
        nombre: req.body.nombre,
        email: req.body.email        
    }

    const query = `INSERT INTO usuarios SET ?`
    conexion.query(query, usuario, (error) => {
        if(error) return console.error(error.message)

        res.json(`Se inserto correctamente el usuario`)
    })
})


//CUARTO ENDPOINT -> ACTUALIZAMOS UN USUARIO PUT
app.put('/usuario/update/:id', (req, res) => {
    const { id } = req.params
    const { nombre, email } = req.body

    const query = `UPDATE usuarios SET nombre='${nombre}', email='${email}' WHERE idUsuario='${id}';`
    conexion.query(query, (error) => {
        if(error) return console.log(error.message)

        res.json(`Se actualizó correctamente el usuario`)
    })
})

//QUINTO ENDPOINT -> ELIMINANOS UN USUARIO DELETE
app.delete('/usuario/delete/:id', (req, res) => {
    const { id } = req.params

    const query = `DELETE FROM usuarios WHERE idUsuario=${id};`
    conexion.query(query, (error) => {
        if(error) return console.log(error.message)

        res.json(`Se eliminó correctamente el usuario`)
    })
})
