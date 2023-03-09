'use strict'
import userPreview from '../cmps/userPreview.js'
import { userService } from "../services/user.service.js"

export default {
	props: [],
	template: `
    <section v-if="users.length" className="bug-list">                    
      <user-preview 
	  v-for="user in users" 
	  :user="user" 
	  :key="user._id" 
	  @removeUser="removeUser"
	  />
    </section>
    <section v-else class="user-list">Oh! No Users!</section>
    `,
	created() {
		this.loadUsers()
	},
	data() {
		return {
			loggedinUser: userService.getLoggedInUser(),
			users: [],

		}
	},
	methods: {
		loadUsers() {
			userService.query()
				.then(users => {
					this.users = users
				})

		},
		removeUser(userId) {
			userService.remove(userId).then(() => this.loadUsers())
		}
	},
	components: {
		userPreview,
	},
}
