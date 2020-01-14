const Dev = require('../models/Dev')
const axios = require('axios')
const parseStringAsArray = require('../utils/parseStringAsArray')

module.exports = {
    async index (req, res) {
        const devs = await Dev.find()

        return res.json(devs)
    },

    async store (req, res) {
        const { github_username, techs, latitude, longitude } = req.body

        let dev = await Dev.findOne({ github_username })

        if(!dev) {
            const techsArray = parseStringAsArray(techs)
        
            const response = await axios.get(`https://api.github.com/users/${github_username}`)
            
            const { name, avatar_url, bio } = response.data
        
            // To save location
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }
        
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray, 
                location
            })
        }

        return res.json(dev)
    },

    async update (req, res) {
        const { id } = req.params

        let dev = await Dev.findOne({ _id: id })

        if(dev) {
            const { github_username = null, techs = null, latitude = null, longitude = null } = req.body

            const techsArray = techs && parseStringAsArray(techs)
        
            const response = github_username && await axios.get(`https://api.github.com/users/${github_username}`)
            
            github_username ? { name = null, avatar_url = null, bio = null } = response.data : null
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }

            dev = await dev.updateOne({
                name: github_username ? name : dev.name,
                avatar_url: github_username ? avatar_url : dev.avatar_url,
                bio : github_username ? bio : dev.bio,
                techs: techs ? techsArray : dev.techs, 
                location: latitude && longitude ? location : dev.location
            })
        }

        return res.json(dev)
    },

    async destroy (req, res) {
        const { id } = req.params

        try {
            await Dev.deleteOne({ _id: id })
            return res.json({ message: 'User deleted'})
        } catch (err) {
            return res.json(err)
        }
    }
}