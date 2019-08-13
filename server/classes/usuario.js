class Usuarios{

    constructor(){
        this.personas=[];
    }


    agregarPersona(id, nombre,sala){
        let persona ={id, nombre, sala};
        
        this.personas.push(persona);
        return this.personas;
    }

    getpersona(id){
        let persona = this.personas.filter(persona=>{
            return persona.id ===id
        })[0];

        return persona;
    }

    getPersonas(){
        return this.personas;
    }


    getPersonaPorSala(sala){
        let personasEnsala = this.personas.filter(persona=> persona.sala === sala);
        return personasEnsala;
    }


    borrarPersona(id){
      
        let peronaBorrada = this.getpersona(id);

        this.personas = this.personas.filter(persona=> persona.id !=id);
       
        return peronaBorrada;
    }


}



module.exports={
    Usuarios
}