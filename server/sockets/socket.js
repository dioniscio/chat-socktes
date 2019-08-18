const { io } = require('../server');
const {Usuarios} = require('../classes/usuario');
const {crearMensaje} = require('../utilidades/utilidades');
const usuarios = new Usuarios();

io.on('connection', (client) => {


client.on('entrarChat',(usuario,callback)=>{
     console.log(usuario);
    if(!usuario.nombre || !usuario.sala){

        return  callback({
            error:true,
            mensaje:'El nombre/sala  es necesario'
        });
    }
    
    client.join(usuario.sala);

    usuarios.agregarPersona(client.id,usuario.nombre, usuario.sala);

    
    client.broadcast.to(usuario.sala).emit('listaPersona',usuarios.getPersonaPorSala(usuario.sala));



    callback(usuarios.getPersonaPorSala(usuario.sala));

});


client.on('crearMensaje',(data,callback)=>{

    let perona  = usuarios.getpersona(client.id);
    let mensaje = crearMensaje(perona.nombre, data.mensaje);
    client.broadcast.to(perona.sala).emit('crearMensaje',mensaje);

    callback(mensaje);
}) 




client.on('disconnect',()=>{

 let personaBorrada =usuarios.borrarPersona(client.id);

client.broadcast.to(personaBorrada.sala).emit('crearMensaje',crearMensaje('Administrador',`${personaBorrada.nombre} salio`));

client.broadcast.to(personaBorrada.sala).emit('listaPersona',usuarios.getPersonaPorSala(personaBorrada.sala));


});


// Mensaje privados 

client.on('mensajePrivado', data=>{

    let persona = usuarios.getpersona(client.id);

    client.broadcast.to(data.para).emit('mensajePrivado',crearMensaje(persona.nombre, data.mensaje));
    
    

})



   

});