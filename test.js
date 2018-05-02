var QL = require('./dev/main')

// test part
function test() {
  var t = new QL()

  // t.alpha = 0
  t.setActions([
    'action1',
    'action2'
  ])

  t.saveQ('state1', {
    action1: 1,
    action2: 2
  })

  t.saveQ('state2', {
    action1: 10,
    action2: 20
  })

  console.log('Test saveQ funciton:', t.Q)

  t.reward('state1', 'action1')
  console.log('Test reward state1-action1:', t.Q)

  t.reward('state1', 'action2')
  console.log('Test reward state1-action2:', t.Q)

  console.log('Test getMaxAction of state1:', t.getMaxAction('state1'))
  console.log('Test getMaxAction of state2:', t.getMaxAction('state2'))


  console.log('Test counter:', t.counter)


  console.log('Test detail:', t.getDetail())

}

test()
