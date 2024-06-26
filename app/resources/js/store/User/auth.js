/** @format */
import router from '@/router'
import authService from '@/services/users/auth'

const state = () => ({
  token: null,
  profile: {}
})

const getters = {
  profile: state => state.profile
}

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
  },
  SET_PROFILE(state, profile) {
    state.profile = profile
  }
}

const actions = {
  async login({ dispatch }, data) {
    const result = await authService.login(data)
    if (result) {
      dispatch('setToken', result.data)
      dispatch('app/setSuccessNotification', 'Đăng nhập thành công !', { root: true })
      router.push('/home')
    }
  },
  async getProfile({ commit }) {
    const response = await authService.getProfile()
    if (response) {
      commit('SET_PROFILE', response.data)
      localStorage.setItem('profileClient', JSON.stringify(response.data))
      return true
    } else {
      router.push('/login')
    }
  },
  async updateProfile({ commit }, data) {
    const res = await authService.updateProfile(data)
    if (res) {
      commit('SET_PROFILE', res.data)
      localStorage.setItem('profileClient', JSON.stringify(res.data))
      return res.data
    }
  },
  async logout({ dispatch }) {
    const res = await authService.logout()
    if (res) {
      dispatch('setToken')
      router.push('/login')
    }
  },
  registerCustomer(commit, data) {
    return authService.registerCustomer(data)
  },
  confirmRegisterCustomer(commit, data) {
    return authService.confirmRegisterCustomer(data)
  },
  forgetPassword(commit, data) {
    return authService.forgetPassword(data)
  },
  confirmForgetPassword(commit, data) {
    return authService.confirmForgetPassword(data)
  },
  confirmNewPassword(commit, data) {
    return authService.confirmNewPassword(data)
  },
  async changePassword({ dispatch }, data) {
    const res = await authService.changePassword(data)
    if (res) {
      dispatch('setToken')
      router.push('/login')
    }
  },
  setEmailCustomer(commit, email) {
    return authService.setEmailCustomer(email)
  },
  confirmSetEmailCustomer(commit, token) {
    return authService.confirmSetEmailCustomer(token)
  },
  setToken({ commit }, data = undefined) {
    if (!data) {
      commit('SET_TOKEN', null)
      commit('SET_PROFILE', {})
      localStorage.removeItem('tokenClient')
      localStorage.removeItem('profileClient')
    } else {
      commit('SET_TOKEN', data.token.access_token)
      commit('SET_PROFILE', data.customer_information)
      localStorage.setItem('tokenClient', data.token.access_token)
      localStorage.setItem('profileClient', JSON.stringify(data.customer_information))
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}