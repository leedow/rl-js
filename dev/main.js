class QL {
  constructor() {
    this.Q = {}
    this.actions =  [] // actions 对应的name
    this._actions = {}

    this.rewardValue = 1 // 奖励
    this.alpha = 0.6
    this.gamma = 0.8

    // counte times of each Q
    this.enableCounter = true  // turn off to save memmory
    this.counter = {}
  }

  max(data) {
    var max = data[0]
    data.forEach(item => {
      if(item > max) max = item
    })
    return max
  }


  // add one Q
  // if the state has already exsit,just update
  // if the state is never been added, add new one
  // @param state
  // @param actions {actionName: actionValue}
  saveQ(state, actions){
    if(typeof this.Q[state] === 'undefined') {
      var arr = new Array(this.actions.length)
      for(var i=0; i<arr.length; i++){
        arr[i] = 0
      }
      this.Q[state] = arr
    }

    if(actions){
      Object.keys(actions).forEach((item)=>{
        if(item in this.actions)
        this.Q[state][this._actions[item]] = actions[item]
      })
    }

    this.updateCounter(state)

  }

  // update counter of each Q if the value of enableCounter is true
  updateCounter(state) {
    if(!this.enableCounter) return

    if(typeof this.counter[state] === 'undefined') {
      this.counter[state] = 1
    } else {
      this.counter[state]++
    }
  }

  getMaxAction(state){
    let q = this.Q[state]
    if(typeof q === 'undefined'){
      this.saveQ(state, {})
      return this.actions[Math.floor(Math.random()*this.actions.length)]
    } else {
      var i = 0
      var max = q[0]
      q.forEach((item, index) =>{
        if(item > max) i = index
      })
      return this.actions[i]
    }
  }

  // @param ac ['action1', 'action2']
  setActions (ac) {
    this.actions = ac
    this.actions.forEach((item, index) => {
      this._actions[item] = index
    })
  }

  reward(S, A, val) {
    let R = val||this.rewardValue
    if(this.Q[S]){
      var offset = this._actions[A]
      this.Q[S][offset] = (1-this.alpha)*this.Q[S][offset] + this.alpha * (R + this.gamma * this.max(this.Q[S]))
    }

    this.updateCounter(S)
  }

  // read detail of Q that include counter
  getDetail() {

    if(this.enableCounter){
      let res = {}
      Object.keys(this.Q).forEach(item => {
        res[item] = {
          count: this.counter[item],
          value: this.Q[item]
        }
      })
      return res
    } else {
      return this.Q
    }

  }

}

if (typeof module !== 'undefined') {
  module.exports = QL
} else {
  window.RL = QL
}
