'use strict'
import { userService } from "../services/user.service.js"

export default {
  props: ['bug'],
  template: `<article className="bug-preview">
                <span>🐛</span>
                <h4>{{bug.title}}</h4>
                <h5>{{bug.createdAt}}</h5>
                <p v-for="label in bug.labels">{{label}}</p>
                <span :class='"severity" + bug.severity'>Severity: {{bug.severity}}</span>
                <RouterLink :to="'/user/' + bug.creator?._id">
                    Owner: {{ bug.creator?.fullname }}
                </RouterLink>
                <div class="actions">
                  <router-link :to="'/bug/' + bug._id">Details</router-link>
                  <router-link v-if="isOwner(bug)" :to="'/bug/edit/' + bug._id"> Edit</router-link>
                </div>
                <button v-if="isOwner(bug)" @click="onRemove(bug._id)">X</button>
              </article>`,
  methods: {
    onRemove(bugId) {
      this.$emit('removeBug', bugId)
    },
    isOwner(bug) {
      const user = userService.getLoggedInUser()
      if (!user) return false
      if (user.isAdmin === true) return true
      if (user._id !== bug.creator._id) return false
      return true
    }
  },
}
