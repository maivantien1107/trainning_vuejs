import axios from '@/axios'

export default {
  ///////////////////////////////
  /////        ADMIN        /////
  ///////////////////////////////
   async login(data) {
    return axios.post('api/login', data)
  },
  async verifyotp(data){
    return axios.post('api/otp',data)
  },
  getProfile() {
    return axios.get('api/user/profile')
  },
  updateProfile(data) {
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    return axios.post('api/user/update-profile', data, config)
  },
  logout() {
    return axios.get('api/logout')
  },
  resetPassword(email) {
    return axios.post('api/reset-password', email)
  },
  changePassword(data) {
    return axios.put(`api/reset-password/${data.token}`, { password: data.password })
  }
}