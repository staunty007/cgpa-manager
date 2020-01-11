<template>
    <f7-page name="courses" class="bg-page"  ptr :ptr-mousewheel="true" @ptr:refresh="loadMore">
        <!-- Top Navbar -->
        <f7-navbar :sliding="false" color="white" navbar-fixed>
            <f7-nav-left>
                <f7-link icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu" panel-open="left"></f7-link>
            </f7-nav-left>
            <f7-nav-title sliding>Course</f7-nav-title>
        </f7-navbar>
        <!-- Page content-->

        <f7-block>
            <f7-row>
                <f7-col>
                    <f7-button href="/add-course" large medium fill color="primary no-border"
                        :disabled="currentRoute == '/add-course' ? true : false">
                        ADD
                    </f7-button>
                </f7-col>
                <f7-col>
                    <f7-button href="/courses" large medium fill color="primary no-border"
                        :disabled="currentRoute == '/courses' ? true : false">
                        COURSES
                    </f7-button>
                </f7-col>
            </f7-row>
        </f7-block>

        <f7-list media-list>
            <f7-list-item link="#" swipeout :title="course.title" :subtitle="course.code"
                v-for="(course, index) in courses" :key="course.title">
                <img slot="media" :src="`https://loremflickr.com/50/50?random=${ index + 1 }`" width="44" />
                <f7-swipeout-actions right>
                    <f7-swipeout-button style="background: goldenrod;">
                        <f7-icon material="edit"></f7-icon>
                    </f7-swipeout-button>
                    <f7-swipeout-button v-if="false" style="background: #b82f2f;" @click="confirmDelete(course)">
                        <f7-icon material="delete_forever"></f7-icon>
                    </f7-swipeout-button>
                </f7-swipeout-actions>
            </f7-list-item>
        </f7-list>
        <f7-block strong v-if="courses.length < 1">
            <p color="primary" style="text-align:center;">No Course Available.</p>
        </f7-block>

    </f7-page>
</template>

<script>
    import Navbar from "../../components/Navbar";
    import courses from "../../json/courses.json"
    export default {
        components: {
            Navbar
        },
        computed: {
            courses() {
                return this.$store.getters.getCourses
            },
            currentRoute() {
                return this.$f7route.path
            }
        },
        methods: {
            confirmDelete(course){
                this.$f7.dialog.confirm(' ', 'Are you Sure ?', () => {
                    this.callbackOk(course)
                });
            },
            callbackOk(course){
                this.$store.dispatch("deleteCourseById", course)
                .then(res => {
                    this.toastBottom = this.$f7.toast.create({
                        text: `${course.title} Deleted`,
                        closeTimeout: 3000,
                    }); this.toastBottom.open();
                })
                console.log(course)
            },
            callbackCancel(){
                console.log("Canceled");
            },
            loadMore(done) {
                this.$store.dispatch("fetchAllCourses")
                .then(res => done());
            }
        },
        mounted() {
            this.myCourses = courses;
            //this.currentRoute = this.$f7route.path
        },
        data() {
            return {
                myCourses: [],
                // currentRoute: ''
            }
        }
    }
</script>

<style scoped>
    .btn-danger {
        background: red;
        color: #333;
    }
</style>