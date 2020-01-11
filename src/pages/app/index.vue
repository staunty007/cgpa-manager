<template>
  <f7-page name="app" class="bg-page">
    <!-- Top Navbar -->
    <f7-navbar :sliding="false" color="white" navbar-fixed>
      <f7-nav-left>
        <f7-link icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu" panel-open="left"></f7-link>
      </f7-nav-left>
      <f7-nav-title sliding>MY-CGPA</f7-nav-title>
    </f7-navbar>
    <!-- Page content-->
    <f7-block>
      <f7-row>
        <f7-col>
          <f7-card class="demo-card-header-pic">
            <f7-card-header class="no-border img-student" valign="bottom"></f7-card-header>
            <f7-card-footer class="card_footer">
              <f7-link href="/student/"><b>Students</b> </f7-link>
            </f7-card-footer>
          </f7-card>
        </f7-col>
        <f7-col>
          <f7-card class="demo-card-header-pic">
            <f7-card-header class="no-border img-course" valign="bottom"></f7-card-header>
            <f7-card-footer>
              <f7-link href="/courses/"><b>Courses</b></f7-link>
            </f7-card-footer>
          </f7-card>
        </f7-col>
      </f7-row>
      <f7-row>
        <f7-col>
          <f7-card class="demo-card-header-pic">
            <f7-card-header class="no-border img-cgpa" valign="bottom"></f7-card-header>
            <f7-card-footer>
              <f7-link href="/add-gcpa/"><b>Grade</b></f7-link>
            </f7-card-footer>
          </f7-card>
        </f7-col>
        <f7-col>
          <f7-card class="demo-card-header-pic">
            <f7-card-header class="no-border img-session" valign="bottom"></f7-card-header>
            <f7-card-footer>
              <f7-link><b>Session</b></f7-link>
            </f7-card-footer>
          </f7-card>
        </f7-col>
      </f7-row>
    </f7-block>


    <!-- FAB Right Bottom (Orange) -->
    <f7-fab position="right-bottom" slot="fixed" color="bg-page">
      <f7-icon ios="f7:add" aurora="f7:add" md="material:add"></f7-icon>
      <f7-icon ios="f7:close" aurora="f7:close" md="material:close"></f7-icon>
      <f7-fab-buttons position="top">
        <f7-fab-button href="/student" label="Add Students">
          <f7-icon ios="f7:add" aurora="f7:add" md="material:person_add"></f7-icon>
          </f7-fab-button>
        <f7-fab-button label="Search for Student">
          <f7-icon ios="f7:search" aurora="f7:search" md="material:search"></f7-icon>
        </f7-fab-button>
      </f7-fab-buttons>
    </f7-fab>

  </f7-page>
</template>

<script>
  export default {
    computed: {
      rand() {
        return Math.floor(Math.random() * 10)
      }
    },
    mounted() {
      this.$store.dispatch("fetchAllCourses")
      this.$store.dispatch("fetchAllStudents")
    }
  }
</script>

<style scoped>
  .img-head {
    height: 150px;
    color:white;
  }
  .img-student {
    background:url('../../static/img/student.png');
    background-size: contain;
    height: 150px;
  }
  .img-course {
    background:url('../../static/img/certificate.png');
    background-size: contain;
    height: 150px;
  }
  .img-cgpa {
    background:url('../../static/img/calculation.png');
    background-size: contain;
    height: 150px;
  }
  .img-session {
    background:url('../../static/img/session.png');
    background-size: cover;
    height: 150px;
  }
  .bg {
    background: grey !important;
  }

</style>