<!-- <template>
  <div class="header-container left-60 top-4 ml-4 rounded border-yellow-300 border-2 fixed right-4 bg-yellow-100 flex items-center justify-between h-14 z-10">
    <div class="search">
      <span class="material-icons text-yellow-500 mx-2 text-3xl"> grade </span>
    </div>
    <div class="flex items-center">
      <Notification class="mt-2" :notifications="notifications" />
      <div class="user-info flex justify-center items-center mr-2">
        <span class="font-semibold mx-2">{{ userInfo.name }}</span>
        <vs-dropdown>
          <vs-avatar class="mt-3" />
          <vs-dropdown-menu class="w-max">
            <vs-dropdown-item>
              <div class="flex justify-start items-center" @click="$router.push('/admin-profile')">
                <span class="material-icons mx-2 text-xl"> person </span>
                Thông tin người dùng
              </div>
            </vs-dropdown-item>
            <vs-dropdown-item>
              <div class="flex justify-start items-center" @click="handleLogout">
                <span class="material-icons mx-2 text-xl"> logout </span>
                Đăng xuất
              </div>
            </vs-dropdown-item>
          </vs-dropdown-menu>
        </vs-dropdown>
      </div>
    </div>
  </div>
</template> -->


<template>
  <div class="center examplex">
    <Notification class="mt-2" :notifications="notifications" />
    <vs-navbar text-white :color="active" center-collapsed v-model="active">
      <template #left>
        <img src="/logos/logo-vuesax-logotipo-vuesax-png-4.png" alt="">
      </template>
      <template #right>
        <vs-navbar-item :active="active == 'primary'" id="primary">
          Primary
        </vs-navbar-item>
        <vs-navbar-item :active="active == 'success'" id="success">
          Success
        </vs-navbar-item>
        <vs-navbar-item :active="active == 'danger'" id="danger">
          Danger
        </vs-navbar-item>
        <vs-navbar-item :active="active == 'warn'" id="warn">
          Warn
        </vs-navbar-item>
        <vs-navbar-item :active="active == 'dark'" id="dark">
          Dark
        </vs-navbar-item>
        <vs-navbar-item :active="active == '#7d33ff'" id="#7d33ff">
          HEX
        </vs-navbar-item>
        <vs-navbar-item :active="active == 'rgb(59,222,200)'" id="rgb(59,222,200)">
          <div class="flex justify-start items-center" @click="handleLogout">
                <span class="material-icons mx-2 text-xl"> logout </span>
                Đăng xuất
              </div>
        </vs-navbar-item>
      </template>
    </vs-navbar>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Notification from '@/components/common/Notification.vue'
export default {
  name: 'Header',
  data(){
    return {
      active:'primary',
    }
  },
  components: {
    Notification
  },
  computed: {
    ...mapGetters({
      profile: 'auth/profile',
      notifications: 'notification/admin'
    }),
    userInfo() {
      return this.profile || JSON.parse(localStorage.getItem('profileAdmin'))
    }
  },
  methods: {
    ...mapActions({
      logout: 'auth/logout',
      getProfile: 'auth/getProfile',
      getNotifications: 'notification/getNotificationsForAdmin'
    }),
    async handleLogout() {
      await this.logout()
    }
  },
  async created() {
    await this.getProfile()
    await this.getNotifications()
  }
}
</script>