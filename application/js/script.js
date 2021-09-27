const App = {
  data() {
    return {
      placeholderStr: 'type your question ...',
      inputVal: '', 
      messages: [ { from: 'me', msg: 'Lorem ipsum dolor sit amet, consectetur mollit anim id est laborum mollit anim id est laborum mollit anim id est laborum mollit anim id est laborum mollit anim id est laborum mollit anim id est laborum mollit anim id est laborum mollit anim id est laborum mollit anim id est laborum mollit anim id est laborum', date: 1630159825486},
                  { to: 'me', msg: 'sed do eiusmod tempor incididunt ut', date: 1630159825486},
                  { to: 'me', msg: 'Ut enim ad minim veniam, quis nostrud', date: 1630159825486},
                  { to: 'me', msg: 'Nisi ut aliquip ex ea commodo consequat', date: 1630159825486},
                  { from: 'me', msg: 'Reprehenderit in voluptate velit esse', date: 1630159825486},
                  { from: 'me', msg: 'Excepteur sint occaecat cupidatat non', date: 1630159825486},
                  { from: 'me', msg: 'mollit anim id est laborum', date: 1630159825486},],
      update: false,
      ws: null,
      userID: null
    }
  },
  methods: {
    inputHandler(e) {
      this.inputVal = e.target.value
    },
    addMessage() {
      if (this.inputVal !== '') {
        let message = { 'from': this.userID, 'msg': this.inputVal, 'date': Date.now() }
        this.ws.send(JSON.stringify(message))
        this.messages.push(message)
        this.inputVal  = ''
        this.update = true
        console.log('Messages ...', this.messages, this.userID)
      }
    },
  },
  watch: {
    inputVal(value) {
      console.log('inputVal ...', value)
    }
  },
  updated() {
    this.$nextTick(function () {
      if (this.update) {
        this.$refs.msg.scrollIntoView({ behavior: 'smooth' })
        this.update = false
      }
    })
  },
  mounted() {
    this.userID = random_id()
    this.ws = new WebSocket(`ws://192.168.140.68:5000/ws?userName=${this.userID}`)
    this.ws.onmessage = (event) => {
      // Vue data binding means you don't need any extra work to
      // update your UI. Just set the `time` and Vue will automatically
      // update the `<h2>`.
      console.log('vue messages...', event.data)
      this.messages.push(JSON.parse(event.data))
      this.update = true
    }
    this.ws.onopen = () => {
      this.ws.send(JSON.stringify({'msg': 'initial connection...'}))
    }
  }
}
Vue.createApp(App).mount('#App')

function random_id() {
  return (
    Number(String(Math.random()).slice(2)) + 
    Date.now() + 
    Math.round(performance.now())
  ).toString(36)
}