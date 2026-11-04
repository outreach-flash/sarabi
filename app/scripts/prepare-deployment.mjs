import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs'
import { resolve } from 'node:path'

const root = process.cwd()
const dist = resolve(root, 'dist')
const standalone = resolve(root, '.next/standalone')
const standaloneServer = resolve(standalone, 'server.js')

if (!existsSync(standaloneServer)) {
  throw new Error('Next.js standalone server is missing. Ensure output: "standalone" is configured.')
}

rmSync(dist, { recursive: true, force: true })
mkdirSync(dist, { recursive: true })
cpSync(standalone, dist, { recursive: true })
cpSync(resolve(root, 'public'), resolve(dist, 'public'), { recursive: true })
cpSync(resolve(root, '.next/static'), resolve(dist, '.next/static'), { recursive: true })

console.log('Prepared self-contained Next.js deployment in dist/.')
