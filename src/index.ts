import readline from 'readline'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.question('how are you?', answer => {
  if (answer === 'e') process.exit()
  console.log(`your are ${answer}`)
})
