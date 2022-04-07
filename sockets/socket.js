const Bands = require('../models/bands')
const Band = require('../models/band')

const bands = new Bands()
bands.addBand(new Band('Queen'))
bands.addBand(new Band('Led Zeppelin'))
bands.addBand(new Band('Pink Floyd'))
bands.addBand(new Band('The Rolling Stones'))
bands.addBand(new Band('The Who'))

console.log('init db')

const setupIO = (io) => {
    io.on('connection', (client) => {
        console.log('Client connected')

        client.emit('active-bands', bands.getBands())

        client.on('disconnect', () => {
            console.log('Client disconnected')
        })

        client.on('vote-band', (payload) => {
            bands.voteBand(payload.id)
            io.emit('active-bands', bands.getBands())
        })

        client.on('add-band', (payload) => {
            console.log(payload)
            bands.addBand(new Band(payload.name))
            io.emit('active-bands', bands.getBands())
        })

        client.on('delete-band', (payload) => {
            console.log(payload)
            bands.deleteBand(payload.id)
            io.emit('active-bands', bands.getBands())
        })
    })
}

module.exports = { setupIO }
