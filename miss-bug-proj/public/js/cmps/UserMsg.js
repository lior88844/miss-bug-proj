import { eventBusService as eventBusService } from '../services/event-bus.service.js'

export default {
  template: `
        <section v-if="msg" class="user-msg" :class="msg.type">
            <p>{{msg.txt}}</p>
        </section>
    `,
  data() {
    return {
      msg: null,
    }
  },
  created() {
    this.unsubscribe = eventBusService.on('show-msg', this.showMsg)
  },
  methods: {
    showMsg(msg) {
      this.msg = msg
      setTimeout(() => {
        this.msg = null
      }, 3000)
    },
  },
  unmounted() {
    this.unsubscribe()
  },
}
