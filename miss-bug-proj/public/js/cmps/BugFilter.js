'use strict'

export default {
  emits: ['setFilterBy', 'setSortBy'],
  template: `
        <section class="bug-filter">
            <span>Filter by title: </span>
            <input @input="setFilterBy" type="text" v-model="filterBy.title">
            <span>Filter by severity: </span>
            <input @input="setFilterBy" type="number" min="0" max="3" v-model="filterBy.severity">
<br>
            <span>Filter by labels: </span>
            <br>
            <input @change="setFilterBy" type="checkbox" id="critical" value="critical" v-model="filterBy.labels">
            <label for="critical">Critical</label>
            <br>
            <input @change="setFilterBy" type="checkbox" id="need-cr" value="need-CR" v-model="filterBy.labels">
            <label for="need-CR">Need Cr</label>
            <br>
            <input @change="setFilterBy" type="checkbox" id="dev-branch" value="dev-branch" v-model="filterBy.labels">
            <label for="dev-branch">Dev Branch</label>
        </section>
       <section class="bug-sort">
  <select @change="setSortBy()" v-model="sortBy.by">
  <option disabled value="">Please select sort</option>
    <option value="createdAt">Created At</option>
    <option value="title">Title</option>
  </select>
  <label>Descending</label>
  <input type="checkbox" v-model="isDesc" @input=toggleDesc()>
       </section>
    `,
  data() {
    return {
      filterBy: {
        title: '',
        severity: 0,
        labels: [],
        page: 0
      },
      sortBy: {
        by: '',
        desc: 1
      },
      isDesc: true
    }
  },
  methods: {
    setFilterBy() {
      console.log(this.filterBy);
      this.$emit('setFilterBy', this.filterBy)
    },
    setSortBy() {
      console.log(this.sortBy);
      this.$emit('setSortBy', this.sortBy)
    },
    toggleDesc() {
      this.isDesc = !this.isDesc
      this.sortBy.desc = this.isDesc ? 1 : -1
      this.setSortBy()
    }
  },
  watch: {
    filterBy() {
      this.$emit('setFilterBy', this.filterBy)
    },
  }
}
