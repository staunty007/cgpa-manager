<template>
  <f7-page name="home" class="bg-landing">

    <f7-block-title medium class="pg-title">
      <p class="login-title">MyCGPA</p>
    </f7-block-title>

    <f7-block style="display:none;">
      <f7-list>
        <f7-list-input type="text" color="primary" placeholder="Username" clear-button>
        </f7-list-input>

        <f7-list-input type="password" color="primary" placeholder="Password" clear-button>
        </f7-list-input>

      </f7-list>
      <f7-button fill class="btn" @click.prevent="login">Login</f7-button>
    </f7-block>

    <f7-block>
      <div class="list">
        <ul class="transparent">
          <li class="item-content item-input">
            <div class="item-inner">
              <div class="item-title item-label light">Username</div>
              <div class="item-input-wrap light w-border">
                <input type="text" placeholder="" class="light">
                <span class="input-clear-button light"></span>
              </div>
            </div>
          </li>
          <li class="item-content item-input">
            <div class="item-inner">
              <div class="item-title item-label light">Password</div>
              <div class="item-input-wrap light w-border">
                <input type="password" placeholder="" class="light">
                <span class="input-clear-button light"></span>
              </div>
            </div>
          </li>
        </ul>

        <f7-button fill class="btn" @click.prevent="login">Login</f7-button>
      </div>
    </f7-block>
    <f7-block class="reg-block">
      <f7-link href="/" class="reg-link">Register</f7-link>
    </f7-block>




  </f7-page>
</template>

<script>
import fire from '../js/firebase.js'
  export default {
    methods: {
      login() {
        this.$f7.preloader.show();
        setTimeout(() => {
          this.$f7.preloader.hide();
          this.toastBottom = this.$f7.toast.create({
            text: 'Login Successful',
            closeTimeout: 2000,
            closeButton: true,
            closeButtonColor: 'white',
          });
          this.toastBottom.open();
          this.$f7router.navigate('/app/')
        }, 2000);
      },
    },
    mounted() {
      this.$store.dispatch("fetchAllCourses")
      this.$store.dispatch("fetchAllStudents")
    }
  }
</script>

<style scoped>
  .reg-block {
    text-align: center;
    margin-top: -15px;
  }

  .reg-link {
    color: #f9f9f9;
    text-decoration: underline;
    margin-top: -15px;
  }

  .pg-title {
    margin-top: 200px;
  }

  .login-title {
    text-align: center;
    color: #f9f9f9;
  }

  .transparent {
    background: transparent;
  }

  .light {
    color: #fff !important;
  }

  .w-border {
    border-bottom: 2px solid #c7c2c2;
  }

  ::placeholder {
    color: #c7c2c2 !important;
  }

  .input-focused {
    background: grey;
  }

  .btn {
    margin-top: 10px;
    border-radius: 0px;
  }
  
</style>