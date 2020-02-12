'use strict'

const input = require('./input.json')
 
// users state transition = { userId: [ stateId, ... ], ... }
const usersTransitions = { }

// total transitions = [ { key: ABC, count: n }, ... ]
const totalTransitions = [ ]
let countMostFreqTransition = 0

input.forEach(element => {
  const [ userId, stateId ] = element.split(',')

    if (!usersTransitions[userId])
      usersTransitions[userId] = [ ]

    usersTransitions[userId].push(stateId)
})

Object.keys(usersTransitions).forEach(UserId => {
  const userTransition = usersTransitions[UserId]

  for (let i = 2; i < userTransition.length; i++) {
    const key = userTransition[i - 2] + userTransition[i - 1] + userTransition[i]
    const currentTransition = totalTransitions.find(transition => transition.key === key)

    let count = 1
    if (currentTransition) {
      currentTransition.count++
      count = currentTransition.count
    } else {
      totalTransitions.push({ key, count: 1 })
    }

    if (count > countMostFreqTransition)
      countMostFreqTransition = count
  }
})


let MostFreqTransitions = totalTransitions.filter(({ count}) => count >= countMostFreqTransition)

if (MostFreqTransitions.length > 1) {
  MostFreqTransitions = MostFreqTransitions.map(MostFreqTransition => {
    return {
      key: MostFreqTransition.key.split('').sort().join(''),
      count: MostFreqTransition.count
    }
  })
}

MostFreqTransitions.forEach(mostFreqTransition => {
  console.log(mostFreqTransition.key.split('').sort().join('->'))
})
