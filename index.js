'use strict'

const input = require('./input.json')
 
// user state transition = { userId: [ status, ... ], ... } 
const userTransitions = { }

input.map(element => {
  const [ userId, status ] = element.split(',')

  if (status) {
    if (userTransitions[userId]) userTransitions[userId].push(status)
    else userTransitions[userId] = [ status ]
  }
})

let totalFreqTransitions = { }
let mostFreqTransition = {
  transition: '',
  count: 0
}

Object.keys(userTransitions).forEach(UserId => {
  const userTransition = userTransitions[UserId]

  for (let i = 0, j = 2; i < userTransition.length; i++, j++) {
    if (userTransition[j]) {
      let indx = userTransition[j - 2] + userTransition[j - 1] + userTransition[j] + ''

      if (totalFreqTransitions[indx]) totalFreqTransitions[indx]++
      else totalFreqTransitions[indx] = 1

      if (mostFreqTransition.count < totalFreqTransitions[indx]) {
        mostFreqTransition.transition = indx
        mostFreqTransition.count = totalFreqTransitions[indx]
      }
    }
  }
})


console.log('The most common path')
console.log(mostFreqTransition.transition)