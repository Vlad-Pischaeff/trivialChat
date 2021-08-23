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
                  'mollit anim id est laborum']
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
      }
    },
  },
  watch: {
    inputVal(value) {
      console.log('inputVal ...', value)
    },
    messages(val) {
      console.log('messages ...', val.length)
    }
  }
}
Vue.createApp(App).mount('#App')