// é á í ó ú ñ Ñ
const { spawn } = require('child_process')

let holocServer = null,
	reactServer = null,
	holoData = '',
	reacData = ''

process.chdir('frontend')
reactServer = spawn('npm',['start']) 
process.chdir('../backend')
holocServer = spawn('node',['holo-server.js'])
process.chdir('..')

function display() {
	console.log("\x1b[35m",'holo-server:')
	console.log('\x1b[33m%s\x1b[0m', holoData)
	console.log("\x1b[35m",'React-server:')
	console.log("\x1b[36m",reacData)
}

holocServer.stdout.on('data', (chunk) => {
	console.clear()
	holoData = chunk.toString()
	display()
})

reactServer.stdout.on('data', (chunk) => {
	console.clear()
	reacData = chunk.toString()
	display()
})


reactServer.on('error', (err) => {
	console.log('Failed to start subprocess.')
})

reactServer.on('warning', (warning) => {
	console.warn(warning.name)
	console.warn(warning.message)
	console.warn(warning.code)
	console.warn(warning.stack)
})
holocServer.on('warning', (warning) => {
	console.warn(warning.name)
	console.warn(warning.message)
	console.warn(warning.code)
	console.warn(warning.stack)
})

process.on('exit',()=>{
	holocServer.kill('SIGHUP')
	reactServer.kill('SIGHUP')
})