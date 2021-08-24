const App = {
  data() {
    return {
      placeholderStr: 'type your question ...',
      inputVal: '', 
      messages: [ 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ', 
                  'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 
                  'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris', 
                  'Nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in',  
                  'Reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.', 
                  'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt', 
                  'mollit anim id est laborum'],
      update: false
    }
  },
  methods: {
    inputHandler(e) {
      this.inputVal = e.target.value
    },
    addMessage() {
      if (this.inputVal !== '') {
        this.messages.push(this.inputVal)
        this.inputVal  = ''
        this.update = true
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
  }
}
Vue.createApp(App).mount('#App')