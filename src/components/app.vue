<template>
  <f7-app :params="f7params">

    <!-- Left panel with cover effect-->
    <f7-panel left cover >
        <f7-view url="/side-panel/" links-view=".view-main"></f7-view>
    </f7-panel>


    <!-- Views/Tabs container -->
    <f7-views tabs class="safe-areas">
      <!-- Tabbar for switching views-tabs -->
      <f7-toolbar tabbar labels bottom class="tabbed-nav" style="display:none;">
        <f7-link tab-link="#view-home" tab-link-active icon-ios="f7:house_fill" icon-aurora="f7:house_fill"
          icon-md="material:home" text="Home"></f7-link>
        <f7-link tab-link="#view-courses" icon-ios="f7:square_list_fill" icon-aurora="f7:square_list_fill"
          icon-md="material:library_books" text="Courses"></f7-link>
        <f7-link tab-link="#view-gcpa" icon-ios="f7:gear" icon-aurora="f7:gear" icon-md="material:poll" text="GCPA">
        </f7-link>
      </f7-toolbar>

      <!-- Your main view/tab, should have "view-main" class. It also has "tab-active" class -->
      <f7-view id="view-home" main tab tab-active url="/"></f7-view>

      <!-- Courses View -->
      <f7-view id="view-courses" name="courses" tab url="/courses/"></f7-view>

      <!-- GCPA View -->
      <f7-view id="view-gcpa" name="gcpa" tab url="/add-gcpa/"></f7-view>

    </f7-views>

  </f7-app>
</template>
<script>
  import cordovaApp from '../js/cordova-app.js';
  import routes from '../js/routes.js';
  import fire from '../js/firebase.js';

  export default {
    data() {
      return {
        // Framework7 Parameters
        f7params: {
          id: 'io.framework7.myapp', // App bundle ID
          //name: 'CGPA-Calc', // App name
          theme: 'auto', // Automatic theme detection
          // App root data
          data: function () {
            return {};
          },

          // App routes
          routes: routes,


          // Input settings
          input: {
            scrollIntoViewOnFocus: this.$device.cordova && !this.$device.electron,
            scrollIntoViewCentered: this.$device.cordova && !this.$device.electron,
          },
          // Cordova Statusbar settings
          statusbar: {
            iosOverlaysWebView: true,
            androidOverlaysWebView: false,
          },
        },

        // Login screen data
        username: '',
        password: '',
      }
    },
    methods: {

    },
    mounted() {
      //console.log(fire)
      this.$f7ready((f7) => {
        // Init cordova APIs (see cordova-app.js)
        if (f7.device.cordova) {
          cordovaApp.init(f7);
        }
        // Call F7 APIs here
        
          fire.auth().onAuthStateChanged((user) => {
              if (user){
                  console.log("User Logged In");
              } else {
                  console.log("No User");
              }
          })
      });
    }
  }
</script>

<style scoped>

</style>