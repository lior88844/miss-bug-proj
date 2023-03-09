
const fs = require('fs')
const gBugs = require('../data/bug.json')


module.exports = {
    query,
    save,
    remove,
    getById
}

const PAGE_SIZE = 3

function query(filterBy = { title: '', page: 0, labels: [], severity: 0, desc: 1, userId: '' }, sortBy = { by: '', desc: 1 }) {
    const regex = new RegExp(filterBy.title, 'i')
    let bugs = (filterBy.userId) ? gBugs.filter(bug => bug.creator._id === filterBy.userId) : gBugs
    bugs = bugs.filter((bug) => {
        return regex.test(bug.title) &&
            bug.severity >= filterBy.severity &&
            !filterBy.labels.length || filterBy.labels.some(label => bug.labels.includes(label))
    })
    if (sortBy.by === 'title') {
        if (sortBy.desc === 1) bugs.sort((bugA, bugB) => (bugA.title.localeCompare(bugB.title)))
        if (sortBy.desc === -1) bugs.sort((bugA, bugB) => (bugB.title.localeCompare(bugA.title)))
    }
    if (sortBy.by === 'createdAt') {
        bugs.sort((bugA, bugB) => (bugB.createdAt - bugA.createdAt) * sortBy.desc)
    }
    if (filterBy.page !== undefined) {
        const startIdx = filterBy.page * PAGE_SIZE
        bugs = bugs.slice(startIdx, startIdx + PAGE_SIZE)
    }
    return Promise.resolve(bugs)
}

function getById(bugId) {
    const bug = gBugs.find(bug => bug._id === bugId)
    if (!bug) return Promise.reject('Unknonwn bug')
    return Promise.resolve(bug)
}


function remove(bugId) {
    const idx = gBugs.findIndex(bug => bug._id === bugId)
    if (idx === -1) return Promise.reject('Unknonwn bug')

    gBugs.splice(idx, 1)
    return _saveBugsToFile()
}

function save(bug) {
    var savedBug
    if (bug._id) {
        savedBug = gBugs.find(currBug => currBug._id === bug._id)
        if (!savedBug) return Promise.reject('Unknonwn bug')
        savedBug.title = bug.title
        savedBug.description = bug.description
        savedBug.severity = bug.severity
        savedBug.labels = bug.labels

    } else {
        savedBug = {
            _id: _makeId(),
            title: bug.title,
            description: bug.description,
            severity: bug.severity,
            labels: bug.labels,
            createdAt: Date.now(),
            creator: bug.creator
        }
        gBugs.push(savedBug)
    }
    return _saveBugsToFile().then(() => {
        return savedBug
    })
}

function _makeId(length = 5) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}


function _saveBugsToFile() {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify(gBugs, null, 2)
        fs.writeFile('data/bug.json', data, (err) => {
            if (err) return reject(err)
            resolve()
        })
    })
}
