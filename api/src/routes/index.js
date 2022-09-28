const { Router } = require('express');
const router = Router();
const { Dog, Temperament } = require('../db');
const axios = require('axios');


const getApiInfo = async () => {
    // manejo de errores
    try {
        const ApiInfo = await axios.get(`https://api.thedogapi.com/v1/breeds`)
        const mapmap = await ApiInfo.data.map((e) => {
            return {
                name: e.name,
                id: e.id,
                weight_min: parseInt(e.weight.imperial.split("-")[0]),
                weight_max: parseInt(e.weight.imperial.split("-")[1]),
                heigth_max: e.heigth_max,
                heigth_min: e.heigth_min,
                life_span: e.life_span,
                image: e.image.url,
                temperament: e.temperament,
            }
        })
        return mapmap;
    } catch (error) {
        console.log(error)
        return error;
    }
};
const getTemperament = async () => { // Busco todos los temperamentos y los guardo en mi Db
    let mood = await Temperament.findAll()


    return mood
}


const getDbInfo = async () => {
    try {
        const dbInfo = await Dog.findAll({
            include: {
                model: Temperament,
                attributes: ['name', 'id'],
                througt: {
                    attributes: []
                },

            }
        })
        return dbInfo

    } catch (error) {
        console.log(error)
        return error;
    }
}
const allDogstotal = async () => {
    try {
        const allDogsApi = await getApiInfo();
        const allDogsDb = await getDbInfo();
        const allDogs = allDogsApi.concat(allDogsDb);
        return allDogs
    } catch (error) {
        console.log(error)
        return error
    }
}

router.get('/dogs', async (req, res) => {
    const name = req.query.name
    let todosAllDogs = await allDogstotal();
    if (name) {
        let dogName = await todosAllDogs.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
        dogName.length ?
            res.status(200).send(dogName) :
            res.status(404).send('El perro no existe')

    } else {
        res.status(200).send(todosAllDogs)
    }
})


router.get('/dogs/:id', async (req, res) => {
    const id = req.params.id
    const todosAllDogs = await allDogstotal();
    if (id) {
        let dogId = await todosAllDogs.filter(e => e.id == id);
        dogId.length ?
            res.status(200).send(dogId) :
            res.status(404).send('No se encontro el id')
    } else {
        res.status(200).send(todosAllDogs)
    }
});

router.get('/temperaments', async (req, res) => {
    try {
        let a = await getTemperament()
        res.status(200).json(a)

    } catch (err) {
        res.status(404).send('Toy malito')
    }
})

const createDog = async (name, height_max, height_min, weight_min, weight_max, life_span, temperament) => {

    try {
        
        
        let [newDog, created] = await Dog.findOrCreate({
            
            where: {
                name,
                heigth_min:height_min,
                heigth_max:height_max,
                weight_min:weight_min,
                weight_max:weight_max,
                life_span,
                
            }
        })
        console.log("El cachorro fue creado", created)
        temperament = temperament.split(",")
        console.log("temperamnt", temperament)

        newDog.addTemperament(temperament)

        return "Perro creado con exito"
    } catch (error) {
        console.error(error)
    }
}


router.post("/dogs", async (req, res) => {
    try {
        let {
            name,
            height_max,
            height_min,
            weight_min,
            weight_max,
            life_span,
            temperaments,
            
        } = req.body
        console.log(req.body);
        const search = await Dog.findOne({
            where: { name: name }
        })
        if (search) {
            return res.send("El perro ya existe").status(304)
        }

        createDog(name, height_max, height_min, weight_min, weight_max, life_span, temperaments)

        return res.status(201).send("El perro fue creado")
//
    } catch (error) {
        console.log(error);
    }


})

module.exports = router;
