'use strict'
import { bugService } from '../services/bug.service.js'
import { userService } from "../services/user.service.js"
import bugList from '../cmps/BugList.js'
import userList from './UserList.js'
import bugFilter from '../cmps/BugFilter.js'


export default {
	template: `
    <section class="bug-app">
        <div class="subheader">
          <bug-filter 
		  @setFilterBy="setFilterBy"
		  @setSortBy="setSortBy"
		  ></bug-filter> ||
          <router-link to="/bug/edit">Add New Bug</router-link> 
          <router-link v-if="isAdmin" to="/user">|| View Users</router-link>
        </div>
        <bug-list v-if="bugs" 
		:bugs="bugsToDisplay" 
		@removeBug="removeBug">
	</bug-list>
	<button @click="getPage(-1)">Prev</button>
	<button @click="getPage(1)">Next</button>
    </section>
    `,
	data() {
		return {
			bugs: null,
			filterBy: { title: '', severity: 1, page: 0, labels: [], user: null },
			sortBy: { by: '', desc: 1 }
		}
	},
	created() {
		this.loadBugs()
	},
	methods: {
		loadBugs() {
			bugService
				.query(this.filterBy, this.sortBy)
				.then((bugs) => {
					this.bugs = bugs
				})
		},
		setFilterBy(filterBy) {
			console.log(filterBy);
			this.filterBy = filterBy
			this.loadBugs()
		},
		setSortBy(sortBy) {
			this.sortBy = sortBy
			this.loadBugs()
		},
		removeBug(bugId) {
			bugService.remove(bugId).then(() => this.loadBugs())
		},
		getPage(dir) {
			//HERE
			this.filterBy.page += dir
			if (this.filterBy.page >= this.totalPages) this.filterBy.page = 0
			if (this.filterBy.page < 0) this.filterBy.page = this.totalPages - 1
			this.loadBugs()
		},

	},
	computed: {
		bugsToDisplay() {
			return this.bugs
		},
		isAdmin() {
			const user = userService.getLoggedInUser()
			console.log(user);
			if (user.isAdmin === true) return true
			return false
		}
	},
	components: {
		bugList,
		bugFilter,
		userList

	},
}
