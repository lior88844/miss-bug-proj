'use strict'
import { bugService } from '../services/bug.service.js'
import { showErrorMsg } from "../services/event-bus.service.js"
export default {
  props: ['user'],
  template: `<article className="bug-preview">
                <span>👩‍💻</span>
                <h4>Name: {{user.fullname}}</h4>
                <h5>Username: {{user.username}}</h5>    
                <h5>ID: {{user._id}}</h5>    
                <h5>Is Admin: {{user.isAdmin}}</h5>    
                <button @click="onRemove()">X</button>
              </article>`,
  data() {
    return {
      filterBy: { userId: this.user._id },
    }
  },
  methods: {
    onRemove() {
      if (this.user.isAdmin) return showErrorMsg(`The User is the big boss...`)
      bugService
        .query(this.filterBy)
        .then((bugs) => {
          if (bugs.length) showErrorMsg(`The User Has ${bugs.length} Bugs!`)
          else this.$emit('removeUser', this.user._id)
        })
    }

  },
}
