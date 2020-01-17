import socketio from 'socket.io-client'

const socket = socketio('http://192.168.100.77:3333', {
    autoConnect: false,
})

const subscribToNewDevs = subscribFunction => {
    socket.on('new-dev', subscribFunction)
}

const connect = ( latitude, longitude, techs) => {
    socket.io.opts.query = {
        latitude,
        longitude,
        techs
    }

    socket.connect()

}

const disconnect = () => {
    if(socket.connected) {
        socket.disconnect()
    }
}

export { connect, disconnect, subscribToNewDevs }