<template>
  <div class="user-manage">
    <div class="user-content">
    </div>
    <template>
  <div class="center">
    <vs-table>
      <template #header>
            <div class="flex justify-between items-center m-2 mb-8 w-full" style="padding-top:50px;">
              <div
                @click="onCreate"
                class="flex items-center justify-center p-2 rounded cursor-pointer bg-gray-100 hover:bg-gray-200 border-blue-400 border-2"
              >
                <span class="material-icons text-green-600 mx-2">person_add</span>
                <span class="font-bold">Thêm người dùng</span>
              </div>
              <div class="knd-field-group">
                <vs-button @click="onExport">Export</vs-button>
              </div>
              <div>
                <vs-input type="text" v-model="searchFilter"   @keyup.enter="onSearch" border placeholder="Tìm kiếm theo email,name, phone">
                  <template #icon>
                    <i class='bx bx-search'></i>
                  </template>
                </vs-input>
              </div>
            </div>
          </template>
      <template #thead>
        <vs-tr>
          <vs-th><vs-checkbox @click="onCheckAll()" v-model="selectPage" /></vs-th>
          <vs-th @click.prevent="change_sort('id')" >
            <span>STT</span>
            <span v-if="sort_direction == 'desc' && sort_field == 'id'">&uarr;</span>
            <span v-if="sort_direction == 'asc' && sort_field == 'id'">&darr;</span>
          </vs-th>
          <vs-th >
            <div @click.prevent="change_sort('name')">Name</div>
            <span v-if="sort_direction == 'desc' && sort_field == 'name'">&uarr;</span>
            <span v-if="sort_direction == 'asc' && sort_field == 'name'">&darr;</span>
          </vs-th>
          <vs-th @click.prevent="change_sort('email')">
            Email
            <span v-if="sort_direction == 'desc' && sort_field == 'email'">&uarr;</span>
            <span v-if="sort_direction == 'asc' && sort_field == 'email'">&darr;</span>
          </vs-th>
          <vs-th @click.prevent="change_sort('phone')">
            Phone
            <span v-if="sort_direction == 'desc' && sort_field == 'phone'">&uarr;</span>
            <span v-if="sort_direction == 'asc' && sort_field == 'phone'">&darr;</span>
          </vs-th>
          <vs-th @click.prevent="change_sort('role')">
            Role
            <span v-if="sort_direction == 'desc' && sort_field == 'role'">&uarr;</span>
            <span v-if="sort_direction == 'asc' && sort_field == 'role'">&darr;</span>
          </vs-th>
          <vs-th>Thao tác</vs-th>
        </vs-tr>
      </template>
      <template #tbody>
        <vs-tr
            v-for="tr in users"
            :key="tr.id"
            :data="tr"
            :class="isSelected(tr.id) ? 'table-primary' : ''"
        >
        <vs-td>
          <vs-checkbox :val="tr.id" @click="onchecked(tr.id)" v-model="selected"></vs-checkbox>
            </vs-td>
          <vs-td>
          {{ tr.id }}
          </vs-td>
          <vs-td>
            {{ tr.name }}
          </vs-td>
          <vs-td>
          {{ tr.email }}
          </vs-td>
          <vs-td>
          {{ tr.phone }}
          </vs-td>
          <vs-td>
          {{ tr.role_name }}
          </vs-td>
          <vs-td>
            <div class="center">
              <vs-row>
                <vs-button class="mr-2 text-blue-600 hover:text-black" @click="onEdit(tr.id)" flat icon>  
                <i class='bx bx-pencil' ></i>
              </vs-button>

                <vs-button class="text-red-400 hover:text-black" :disabled="tr.role_name=='SuperAdmin'?true:false"  @click="onDelete(tr.id)" flat icon>  
                  <i class='bx bxs-trash'></i>
                </vs-button>

              </vs-row>
            
            </div>
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
    <div class="center con-pagination" >
      <vs-pagination not-arrows :length="data.last_page>0 ? data.last_page:1"
    :max="10"
   @input="changePage()"
    v-model="page"/>
    </div>
    <span class="data">
        <pre>
  {{  selected.length? unSelect:unSelect }}
        </pre>
      </span>
  </div>
</template>
<vs-dialog width="550px" not-center v-model="active2">
        <div class="con-content">
          <p>
            Bạn có chắc chắn muốn xóa người dùng này?
          </p>
        </div>

        <template #footer>
          <div class="con-footer">
            <vs-button @click="actionDelete()" transparent>
              Ok
            </vs-button>
            <vs-button  @click="active2=false" dark transparent>
              Cancel
            </vs-button>
          </div>
        </template>
</vs-dialog>
<vs-dialog width="550px" not-center v-model="isShowDialog">
        <template #header>
          <h4 class="not-margin">
            {{isCreate ? 'Thêm người dùng':'Chỉnh sửa người dùng'}}
          </h4>
        </template>
        <UserDetail
        :user="user"
        @clearEvent="clearEvent"
        @actionCreate="actionCreate"
        @actionEdit="actionEdit"
        @actionDelete="onDelete"
      />
</vs-dialog>

  </div>
</template>

<script>
import { mapActions } from 'vuex'
import UserDetail from '@/components/admin/DetailUser.vue'
export default {
  name: 'UserManagePage',
  data() {
    return {
      unSelect:[],
      selectPage : false,
      selected: [],
      active2:false,
      search:'',
      page:1,
      max:10,
      isShowDialog: false,
      isEdit: false,
      isCreate: false,
      users: [],
      data:{},
      select: null,
      user: {},
      searchFilter:'',
      sort_direction : 'desc',
      sort_field: 'id',
    }
  },
  components: {
    UserDetail
  },
  watch: {
    // selectPage: function(value){
    //         if(value){
    //           this.users.forEach(user => {
    //             if(!this.isSelected(user.id)){
    //               this.selected.push(user.id)
    //             }
    //           });
    //         }else{
    //           this.users.forEach(user => {
    //             this.onChangeSelect(user.id)
    //           });
    //         }
    //         // console.log(value)
    //     }, 
    // selectPage: function(value){
    //   console.log(value)
    // } 
  },
  methods: {
    ...mapActions('user', {
      getUsers: 'getUsers',
      getUser: 'getUser',
      getAll: 'getAll',
      createUser: 'createUser',
      updateUser: 'updateUser',
      deleteUser: 'deleteUser',
      searchUser: 'searchUser',
      exportUser:'exportUser'
    }),
    async onEdit(id) {
      const res = await this.getUser(id)
      this.user = res.data
      this.isEdit = true
      this.isCreate = false
      this.isShowDialog = true
    },
    onDelete(id) {
     this.select=id
     this.active2=true
    },
    onCreate() {
      this.user = {}
      this.isCreate = true
      this.isEdit = false
      this.isShowDialog = true
    },
    clearEvent() {
      this.user = {}
      this.isCreate = false
      this.isEdit = false
      this.isShowDialog = false
      this.isDelete = false
    },
    async actionCreate() {
      await this.createUser(this.user)
      await this.fetchUsers()
      this.clearEvent()
    },
    async actionEdit() {
      await this.updateUser(this.user)
      await this.fetchUsers()
      this.clearEvent()
    },
    async actionDelete() {
      await this.deleteUser(this.select)
      await this.fetchUsers()
      this.active2=false
      this.clearEvent()
    },
    async fetchUsers() {
      const data={
        page:this.page,
        sort_direction:this.sort_direction,
        sort_field:this.sort_field,
        search:this.searchFilter
      }
      const users = await this.getUsers(data)
      this.data = users.data
      this.users=users.data.data
      var isHistory=false
      this.users.forEach(user => {
        if (this.isUnSelect(user.id)){
          isHistory=true;
        }
        else{
          this.selected.push(user.id)
        }
       
      });
      if(isHistory){
        this.selectPage=false;
      }
      else{
        this.selectPage=true;
      }
    },
    changePage(){
      this.fetchUsers()
    },
    change_sort(field){
      if(this.sort_field == field){
          this.sort_direction = this.sort_direction == "asc" ? "desc" : "asc";
      }else{
          this.sort_field = field;
      }
      this.fetchUsers()    
          
        },
    isSelected(user_id){
            return this.selected.includes(user_id);
        },
    isUnSelect(user_id){
      return this.unSelect.includes(user_id);
    },
  //   onChangeSelect(user_id){
  //    if(!this.isSelected(user_id)){
  //     this.selected.push(user_id)
  //    }
  //    else {
  //     this.selected=this.selected.filter(function(ele){
  //      return ele != user_id;
  //    })
  //   }
  // },
  onchecked(user_id){
    if (this.isSelected(user_id)){
      this.unSelect.push(user_id)
      this.selectPage=false
    }
    else {
      this.unSelect=this.unSelect.filter(function(ele){
       return ele != user_id;
     })

    }
  },
  onCheckAll(){
    if (this.selectPage==false){
      this.users.forEach(user =>{
        if (!this.isSelected(user.id)){
          this.selected.push(user.id);
          this.unSelect=this.unSelect.filter(function(ele){
          return ele != user.id;
        })
      }})
    }
    else {
      this.users.forEach(user => {
        this.unSelect.push(user.id)
      //   if (this.isSelected(user.id)){
      //   //   this.selected=this.selected.filter(function(ele){
      //   //     return ele != user.id;
      //   // })
      //   this.selected=[]
      //   this.unSelect.push(user.id)
      // }
      })
      this.selected=[]
    }
console.log(this.selectPage)
  },
    async onSearch() {
      this.page=1
      this.unSelect=[]
      this.fetchUsers()   
    },
    async onExport(){
      const dataExport={
        sort_direction:this.sort_direction,
        sort_field:this.sort_field,
        unSelect:this.unSelect.join(','),
        search:this.searchFilter
      }
    await this.exportUser(dataExport)
    this.clearEvent()
  }
  },
  async created() {
    await this.fetchUsers()
  },

  

}
</script>
<style>
  .con-footer{
    display: flex;
    align-items: center;
    justify-content: flex-end;
   
  }
  .con-footer  .vs-button{
    margin: 0px;
  }
      .vs-button__content{
        padding: 10px 30px;
      }
       
</style>