import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const deploymentDirectory = dirname(fileURLToPath(import.meta.url))
const standaloneServer = pathToFileURL(resolve(deploymentDirectory, 'server.js')).href

process.env.HOSTNAME ||= '0.0.0.0'
process.env.PORT ||= '3000'

await import(standaloneServer)
