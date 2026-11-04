import { spawn } from 'node:child_process'
import { resolve } from 'node:path'

const forwarded = process.argv.slice(2)
const normalized = []

for (let index = 0; index < forwarded.length; index += 1) {
  const argument = forwarded[index]
  if (argument === '--host') {
    normalized.push('--hostname', forwarded[index + 1] || '0.0.0.0')
    index += 1
  } else if (argument.startsWith('--host=')) {
    normalized.push(`--hostname=${argument.slice('--host='.length)}`)
  } else {
    normalized.push(argument)
  }
}

const hasArgument = (name) => normalized.some((argument) => argument === name || argument.startsWith(`${name}=`))
const hasPort = hasArgument('--port') || normalized.includes('-p')
const hasHostname = hasArgument('--hostname') || normalized.includes('-H')
const nextArguments = [
  'dev',
  ...(hasPort ? [] : ['--port', '3000']),
  ...(hasHostname ? [] : ['--hostname', '0.0.0.0']),
  ...normalized,
]

const child = spawn(process.execPath, [resolve(process.cwd(), 'node_modules/next/dist/bin/next'), ...nextArguments], {
  env: process.env,
  stdio: 'inherit',
})

child.on('exit', (code, signal) => {
  if (signal) process.kill(process.pid, signal)
  else process.exit(code ?? 1)
})
