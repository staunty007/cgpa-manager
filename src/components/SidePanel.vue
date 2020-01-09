<template>
    <f7-page style="background: #2a5f8a;">

        <!-- <f7-navbar title="CGPA-CALC"></f7-navbar> -->
        <div class="navbar navbar-container">
            <div class=""></div>
            <div class="navbar-inner">
                <div class="left">
                    <a href="#" class="link icon-only">
                        <img src="https://i.pravatar.cc/50?img=5" class="img-rounded" alt="">
                    </a>
                </div>
                <div class="right">

                </div>
            </div>
        </div>


        <a class="list list-menu">
            <ul>
                <li>
                    <a href="#" class="item-link item-content">
                        <div class="item-media"><i class="material-icons md-only">home</i></div>
                        <div class="item-inner">
                            <div class="item-title">Home</div>
                        </div>
                    </a>
                </li>
                <li>
                    <a href="#" class="item-link item-content">
                        <div class="item-media"><i class="material-icons md-only">person</i></div>
                        <div class="item-inner">
                            <div class="item-title">Students</div>
                        </div>
                    </a>
                </li>
                <li>
                    <a href="/courses" class="item-link item-content">
                        <div class="item-media"><i class="material-icons md-only">library_books</i></div>
                        <div class="item-inner">
                            <div class="item-title">Courses</div>
                        </div>
                    </a>
                </li>
                <li>
                    <a href="#" class="item-link item-content">
                        <div class="item-media"><i class="material-icons md-only">settings</i></div>
                        <div class="item-inner">
                            <div class="item-title">Settings</div>
                        </div>
                    </a>
                </li>
                <li>
                    <a href="#" class="item-link item-content">
                        <div class="item-media"><i class="material-icons md-only">power_settings_new</i></div>
                        <div class="item-inner">
                            <div class="item-title">Exit</div>
                        </div>
                    </a>
                </li>
            </ul>
        </a>
    </f7-page>
</template>

<script>
    export default {

    }
</script>

<style scoped>
  .navbar-container {
    height: 100px;
    background: url('https://i.pravatar.cc/200?img=5');
    background-repeat: no-repeat;
    background-size: cover;
    filter: blur(0.7px);
  }

  .img-rounded {
    border-radius: 50%;
  }

  .list-menu {
    margin-top: 0px;
  }

  .list-menu .item-title {
    font-size: 12px;
  }

  .list-menu .item-content {
    background: #f9f9f9
  }
</style>