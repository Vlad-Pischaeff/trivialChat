const App = {
  data() {
    return {
      placeholderStr: 'type your question ...',
      inputVal: '', 
      messages: [ { from: 'me', msg: 'Lorem ipsum dolor sit amet, consectetur', date: '2001-07-11'},
                  { to: 'me', msg: 'sed do eiusmod tempor incididunt ut', date: '2001-07-11'},
                  { from: 'me', msg: 'Ut enim ad minim veniam, quis nostrud', date: '2001-07-11'},
                  { to: 'me', msg: 'Nisi ut aliquip ex ea commodo consequat', date: '2001-07-11'},
                  { from: 'me', msg: 'Reprehenderit in voluptate velit esse', date: '2001-07-11'},
                  { to: 'me', msg: 'Excepteur sint occaecat cupidatat non', date: '2001-07-11'},
                  { from: 'me', msg: 'mollit anim id est laborum', date: '2001-07-11'},],
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
        let message = { 'from': this.userID, 'msg': this.inputVal, 'date': (new Date()).toLocaleString('ru-RU') }
        this.ws.send(JSON.stringify(message))
        this.messages.push(message)
        this.inputVal  = ''
        this.update = true
        console.log(this.messages)
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
    this.ws = new WebSocket(`ws://localhost:5000/ws?userName=${this.userID}`)
    this.ws.onmessage = (event) => {
      // Vue data binding means you don't need any extra work to
      // update your UI. Just set the `time` and Vue will automatically
      // update the `<h2>`.
      console.log('vue messages...', event.data)
      // this.time = event.data;
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