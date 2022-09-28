const axios = require ('axios'); 
const {Temperament} = require ('../db');  


   
let allTemperamentsDb = async () => {
   
 
    const api = await axios.get(`https://api.thedogapi.com/v1/breeds`);
        let perros = api.data.filter(e =>e.temperament)
         perros =  perros.map (el => el.temperament)
         let doggies = []
          perros.forEach (e => doggies.push(e.split(',')))
        perros = doggies.flat(Infinity)

        

    
    perros.forEach( async(e) => {
        
    
            await Temperament.findOrCreate({
             where : {name : e.trim()}
            
            })
            })
         console.log ('Todos los temperamentos fueron agregados.')    
        }

module.exports = {allTemperamentsDb}