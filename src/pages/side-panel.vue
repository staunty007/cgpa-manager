<template>
    <f7-page style="background: #2a5f8a;">

        <!-- <f7-navbar title="CGPA-CALC"></f7-navbar> -->
        <div class="navbar navbar-container">
            <div class=""></div>
            <div class="navbar-inner">
                <div class="left">
                    <a href="#" class="link icon-only">
                        <img :src="image" height="70" width="70" class="img-rounded" alt="">
                    </a>
                </div>
                <div class="right">

                </div>
            </div>
        </div>

        <f7-list class="list-menu">
            <f7-list-item link="/app" class="content" title="Home" panel-close>
                <f7-icon slot="media" md="material:home"></f7-icon>
            </f7-list-item>
            <f7-list-item link="/student" class="content" title="Students" panel-close>
                <f7-icon slot="media" md="material:people"></f7-icon>
            </f7-list-item>
            <f7-list-item link="/courses/" class="content" title="Courses" panel-close>
                <f7-icon slot="media" md="material:library_books"></f7-icon>
            </f7-list-item>
            <f7-list-item link="/add-gcpa/" class="content" title="Grade" panel-close>
                <f7-icon slot="media" md="material:poll"></f7-icon>
            </f7-list-item>
            <f7-list-item link="/" class="content" title="Profile" panel-close>
                <f7-icon slot="media" md="material:perm_contact_calendar"></f7-icon>
            </f7-list-item>
            <f7-list-item link="/" class="content" title="Settings" panel-close>
                <f7-icon slot="media" md="material:settings"></f7-icon>
            </f7-list-item>
            <f7-list-item link="/" class="content" title="Exit" panel-close>
                <f7-icon slot="media" md="material:power_settings_new"></f7-icon>
            </f7-list-item>
        </f7-list>

    </f7-page>
</template>

<script>
    export default {
        data() {
            return {
                image: '/static/img/man.png',
            }
        }
    }
</script>

<style scoped>
    .navbar-container {
        height: 100px;
    }

    .img-rounded {
        border-radius: 50%;
        border: 1.5 px solid #f9f9f9;
    }

    .list-menu {
        margin-top: 0px;
    }

    .content {
        background: #f9f9f9;
        font-size: 12px;
        color: #2a5f8a;
    }
</style>