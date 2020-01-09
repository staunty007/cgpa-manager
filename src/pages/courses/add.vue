<template>
    <f7-page name="add-courses" class="bg-page">
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

        <f7-block strong>
            <f7-list no-hairlines-md>
                <f7-list-input label="Session" type="select" :value="form.session" 
                    @input="form.session = $event.target.value">
                    <option value="nd1">ND1</option>
                    <option value="nd2">ND2</option>
                    <option value="hnd1">HND1</option>
                    <option value="hnd2">HND2</option>
                </f7-list-input>
                <f7-list-input label="Semester" type="select" :value="form.semester" 
                    @input="form.semester = $event.target.value">
                    <option value="first">First</option>
                    <option value="second">Second</option>
                </f7-list-input>
                <f7-list-input label="Course Title" type="text" :value="form.title"
                    @input="form.title = $event.target.value" clear-button></f7-list-input>

                <f7-list-input type="text" :value="form.code" @input="form.code = $event.target.value"
                    label="Course Code" clear-button></f7-list-input>

                <f7-list-input type="number" :value="form.unit" @input="form.unit = $event.target.value"
                    label="Course Unit" clear-button></f7-list-input>

                <f7-button :disabled="form.unit == ''" fill class="btn" @click.prevent="saveCourse">ADD COURSE
                </f7-button>
            </f7-list>
        </f7-block>

    </f7-page>
</template>

<script>
    import fire from '../../js/firebase.js';
    export default {
        data() {
            return {
                form: {
                    session:"",
                    semester:"",
                    title: "",
                    code: "",
                    unit: ""
                }
            }
        },
        computed: {
            currentRoute() {
                return this.$f7route.path
            }
        },
        methods: {
            saveCourse() {
                this.$f7.preloader.show();
                this.form.unit = parseInt(this.form.unit); // covert unit to integer
                fire.firestore().collection("courses").add(this.form)
                .then(res => {
                    this.$f7.preloader.hide();
                    this.$store.dispatch("fetchAllCourses")
                    this.toastBottom = this.$f7.toast.create({
                        text: 'Course Added',
                        closeTimeout: 5000,
                        closeButton: true,
                        closeButtonColor: 'white',
                    }); this.toastBottom.open();
                    this.form = {}
                }).catch(err => {
                    console.log(err);
                })
                // setTimeout(() => {
                //     this.$store.dispatch('submitNewCourse', this.form);
                //     this.$f7.preloader.hide();
                //     //this.$f7.dialog.alert('Coursed Saved');
                //     //this.$f7router.navigate('/courses/')
                //     this.toastBottom = this.$f7.toast.create({
                //         text: 'Course Added',
                //         closeTimeout: 5000,
                //         closeButton: true,
                //         closeButtonColor: 'white',
                //     }); this.toastBottom.open();
                //     this.form = {}
                // }, 2000);
            },
        },
        mounted() {
            
        }
    }
</script>

<style scoped>
    .btn {
        margin-top: 10px;
        background: #2a5f8a;
        border-radius: 0;
    }
</style>