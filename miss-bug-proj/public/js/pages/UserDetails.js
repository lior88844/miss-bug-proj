import { userService } from "../services/user.service.js"
import { bugService } from '../services/bug.service.js'
import bugList from '../cmps/BugList.js'

export default {
    template: `
        <section class="user-details" v-if="user">
            <h5 v-if="isMyProfile">My Profile</h5>
            <h2>Full Name: {{user.fullname}}</h2>    
            <p>Username: {{user.username}}</p> 
            <bug-list v-if="bugs" 
		:bugs="bugs" 
		>
    </bug-list>
    <button @click="getPage(-1)">Prev</button>
	<button @click="getPage(1)">Next</button>
        </section>
    `,
    //
    data() {
        return {
            loggedinUser: userService.getLoggedInUser(),
            filterBy: { page: 0, userId: '' },
            user: null,
            bugs: null,
        }
    },
    created() {
        this.loadUser()
    },
    computed: {
        userId() {
            return this.$route.params.userId
        },
        isMyProfile() {
            if (!this.loggedinUser) return false
            return this.loggedinUser._id === this.user._id
        }
    },
    watch: {
        userId() {
            this.loadUser()
        }
    },
    methods: {
        loadBugs() {
            bugService
                .query(this.filterBy)
                .then((bugs) => {
                    this.bugs = bugs
                })
        },
        loadUser() {
            userService.get(this.userId)
                .then(user => {
                    this.user = user
                    this.filterBy.userId = user._id
                    this.loadBugs()
                })

        },
        getPage(dir) {
            //HERE
            this.filterBy.page += dir
            if (this.filterBy.page >= this.totalPages) this.filterBy.page = 0
            if (this.filterBy.page < 0) this.filterBy.page = this.totalPages - 1
            this.loadBugs()
        }
    },
    components: {
        bugList,
    }
}