import userServices from '@/services/admin/user'

const state = () => ({
  user: []
})

const getters = {}

const mutations = {}

const actions = {
  getUsers(commit, data) {
    return userServices.getUsers(data)
  },
  getAll(commit,data){
    return userServices.getAll(data)
  },
  getUser(commit, userId) {
    return userServices.getUser(userId)
  },
  createUser(commit, user) {
    return userServices.createUser(user)
  },
  updateUser(commit, user) {
    return userServices.updateUser(user)
  },
  deleteUser(commit, userId) {
    return userServices.deleteUser(userId)
  },
  searchUser(commit, emailFilter) {
    return userServices.searchUser(emailFilter)
  },
  changePassword(commit, data) {
    return userServices.changePassword(data)
  },
  exportUser(commit, data){
    return userServices.exportUser(data)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}