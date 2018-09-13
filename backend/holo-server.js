const { spawn } = require('child_process'),
	fs = require('fs'),
	chokidar = require('chokidar')

let holoserver = spawn('hcdev', ['web']),
	stream = holoserver.stdout

stream.on('data', (chunk) => {
  process.stdout.write(chunk.toString())
})

chokidar.watch('dna', {ignored: /(^|[\/\\])\../}).on('all', (event, path) => {
	holoserver.kill('SIGHUP')
	console.clear()
	console.log('Restarting server...')
	holoserver = spawn('hcdev', ['web'])
	stream = holoserver.stdout
	stream.on('data', (chunk) => {
		process.stdout.write(chunk.toString())
	})
})
