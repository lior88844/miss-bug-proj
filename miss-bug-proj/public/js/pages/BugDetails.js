'use strict'

import { bugService } from '../services/bug.service.js'

export default {
  template: `
    <section v-if="bug" class="bug-details">
        <h1>{{bug.title}}</h1>
        <p>{{bug.description}}</p>
        <span :class='"severity" + bug.severity'>Severity: {{bug.severity}}</span>
        
        <router-link to="/bug">Back</router-link>
    </section>
    
    <section v-else class="bug-details">  
        <p>{{msg}}</p>
    </section>
    `,
  data() {
    return {
      bug: null,
      msg: ''
    }
  },
  created() {
    const { bugId } = this.$route.params
    console.log(bugId);
    if (bugId) {
      bugService.getById(bugId)
        .then((bug) => {
          this.bug = bug
        })
        .catch(err =>
          this.msg = err)
    }
  }
}
