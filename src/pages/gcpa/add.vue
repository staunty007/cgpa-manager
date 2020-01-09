<template>
    <f7-page name="add-gcpa" class="bg-page"  @page:init="onPageInit">
        <!-- Top Navbar -->
        <f7-navbar :sliding="false" color="white" navbar-fixed>
            <f7-nav-left>
                <f7-link icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu" panel-open="left"></f7-link>
            </f7-nav-left>
            <f7-nav-title sliding>Grade</f7-nav-title>
        </f7-navbar>
        <!-- Page content-->


        <!-- <f7-block-title class="title-head">Calculate CGPA</f7-block-title> -->
        <f7-block>
            <f7-list no-hairlines-md class="main-block">
                <ul>
                    <li class="item-content item-input">
                        <div class="item-inner">
                            <div class="item-title item-label">Student Name</div>
                            <div class="item-input-wrap">
                                <input type="text" :value="student" @input="student = $event.target.value"
                                    id="autocomplete-dropdown-placeholder" />
                            </div>
                        </div>
                    </li>
                </ul>
                <f7-list-input label="Semester" type="select" :value="form.semester" 
                    @input="form.semester = $event.target.value">
                    <option value="first">First Semester</option>
                    <option value="second">Second Semester</option>
                </f7-list-input>
                <div style="margin-top: 60px;"></div>
                <div v-if="showCourses">
                    <f7-row no-gap class="form-row" v-if="newCoursesList.length > 0">
                        <f7-col width="70">
                            <f7-list>
                                <f7-list-input label="Course" type="select" :value="form.course.course1.name" 
                                    @input="form.course.course1.name = $event.target.value">
                                    <option :value="c.code" v-for="c in newCoursesList" :key="c.code">
                                        {{ c.code }}</option>
                                </f7-list-input>
                            </f7-list>
                        </f7-col>
                        <f7-col width="30">
                            <f7-list>
                                <f7-list-input type="number" label="Grade" :value="form.course.course1.grade" 
                                @input="form.course.course1.grade = $event.target.value"></f7-list-input>
                            </f7-list>
                        </f7-col>
                    </f7-row>
                    <f7-row no-gap class="form-row" v-if="newCoursesList.length > 1">
                        <f7-col width="70">
                            <f7-list>
                                <f7-list-input label="Course" type="select" :value="form.course.course2.name" 
                                    @input="form.course.course2.name = $event.target.value">
                                    <option :value="c.code" v-for="c in newCoursesList" :key="c.code">
                                        {{ c.code }}</option>
                                </f7-list-input>
                            </f7-list>
                        </f7-col>
                        <f7-col width="30">
                            <f7-list>
                               <f7-list-input type="number" label="Grade" :value="form.course.course2.grade" 
                                @input="form.course.course2.grade = $event.target.value"></f7-list-input>
                            </f7-list>
                        </f7-col>
                    </f7-row>
                    <f7-row no-gap class="form-row" v-if="newCoursesList.length > 2">
                        <f7-col width="70">
                            <f7-list>
                                <f7-list-input label="Course" type="select" :value="form.course.course3.name" 
                                    @input="form.course.course3.name = $event.target.value">
                                    <option :value="c.code" v-for="c in newCoursesList" :key="c.code">
                                        {{ c.code }}</option>
                                </f7-list-input>
                            </f7-list>
                        </f7-col>
                        <f7-col width="30">
                            <f7-list>
                                <f7-list-input type="number" label="Grade" :value="form.course.course3.grade" 
                                @input="form.course.course3.grade = $event.target.value"></f7-list-input>
                            </f7-list>
                        </f7-col>
                    </f7-row>
                    <f7-row no-gap class="form-row" v-if="newCoursesList.length > 3">
                        <f7-col width="70">
                            <f7-list>
                                <f7-list-input label="Course" type="select" :value="form.course.course4.name" 
                                    @input="form.course.course4.name = $event.target.value">
                                    <option :value="c.code" v-for="c in newCoursesList" :key="c.code">
                                        {{ c.code }}</option>
                                </f7-list-input>
                            </f7-list>
                        </f7-col>
                        <f7-col width="30">
                            <f7-list>
                               <f7-list-input type="number" label="Grade" :value="form.course.course4.grade" 
                                @input="form.course.course4.grade = $event.target.value"></f7-list-input>
                            </f7-list>
                        </f7-col>
                    </f7-row>
                    <f7-row no-gap class="form-row" v-if="newCoursesList.length > 4">
                        <f7-col width="70">
                            <f7-list>
                                <f7-list-input label="Course" type="select" :value="form.course.course5.name" 
                                    @input="form.course.course5.name = $event.target.value">
                                    <option :value="c.code" v-for="c in newCoursesList" :key="c.code">
                                        {{ c.code }}</option>
                                </f7-list-input>
                            </f7-list>
                        </f7-col>
                        <f7-col width="30">
                            <f7-list>
                                <f7-list-input type="number" label="Grade" :value="form.course.course5.grade" 
                                @input="form.course.course5.grade = $event.target.value"></f7-list-input>
                            </f7-list>
                        </f7-col>
                    </f7-row>
                    <f7-row no-gap class="form-row" v-if="newCoursesList.length > 5">
                        <f7-col width="70">
                            <f7-list>
                                <f7-list-input label="Course" type="select" :value="form.course.course6.name" 
                                    @input="form.course.course6.name = $event.target.value">
                                    <option :value="c.code" v-for="c in newCoursesList" :key="c.code">
                                        {{ c.code }}</option>
                                </f7-list-input>
                            </f7-list>
                        </f7-col>
                        <f7-col width="30">
                            <f7-list>
                               <f7-list-input type="number" label="Grade" :value="form.course.course6.grade" 
                                @input="form.course.course6.grade = $event.target.value"></f7-list-input>
                            </f7-list>
                        </f7-col>
                    </f7-row>
                    <f7-row no-gap class="form-row" v-if="newCoursesList.length > 6">
                        <f7-col width="70">
                            <f7-list>
                                <f7-list-input label="Course" type="select" :value="form.course.course7.name" 
                                    @input="form.course.course7.name = $event.target.value">
                                    <option :value="c.code" v-for="c in newCoursesList" :key="c.code">
                                        {{ c.code }}</option>
                                </f7-list-input>
                            </f7-list>
                        </f7-col>
                        <f7-col width="30">
                            <f7-list>
                                <f7-list-input type="number" label="Grade" :value="form.course.course7.grade" 
                                @input="form.course.course7.grade = $event.target.value"></f7-list-input>
                            </f7-list>
                        </f7-col>
                    </f7-row>
                </div>
            </f7-list>
            <f7-button fill class="btn-submit" @click="saveGrade">SAVE GRADE</f7-button>


        </f7-block>

    </f7-page>
</template>

<script>
    import Navbar from "../../components/Navbar";
    import students from "../../json/students.json"
    import courses from "../../json/courses.json";
    import fire from '../../js/firebase.js';
    export default {
        components: {
            Navbar
        },
        data() {
            return {
                courses: [],
                student:'',
                form: {
                    student:'',
                    session:'',
                    semester:'',
                    course: {
                        course1: {
                            name:'',
                            grade:'',
                        },
                        course2: {
                            name:'',
                            grade:'',
                        },
                        course3: {
                            name:'',
                            grade:'',
                        },
                        course4: {
                            name:'',
                            grade:'',
                        },
                        course5: {
                            name:'',
                            grade:'',
                        },
                        course6: {
                            name:'',
                            grade:'',
                        },
                        course7: {
                            name:'',
                            grade:'',
                        },
                    },
                },
                coursesList:[],
                newCoursesList:[],
                showCourses: false,
            }
        },
        methods: {
            onPageBeforeRemove() {
                this.autocompleteDropdownSimple.destroy();
            },
            onPageInit() {
                const app = this.$f7;
                const fruits = this.students;
                const $ = this.$$;
                // Simple Dropdown
                this.autocompleteDropdownSimple = app.autocomplete.create({
                    inputEl: '#autocomplete-dropdown-placeholder',
                    openIn: 'dropdown',
                    dropdownPlaceholderText: 'Type Student Name',
                    source(query, render) {
                        let results = [];
                        if (query.length === 0) {
                            render(results);
                            return;
                        }
                        // Find matched items
                        results = fruits.filter((e) => e.name.toLowerCase().indexOf(query.toLowerCase()) !== -1)
                            .map(e => e.name);
                        // Render items by passing array with result items
                        render(results);
                    },
                });
            },
            populateCourses(level){
                this.coursesList = this.$store.getters.getCourses.filter(e => e.session.toLowerCase() == level.toLowerCase());
                console.log(this.coursesList);
                this.showCourses = false;
            },
            saveGrade() {
                this.$f7.preloader.show();
                console.log(this.form);
                fire.firestore().collection("grades").add(this.form)
                .then(res => {
                    this.$f7.preloader.hide();
                    //this.$store.dispatch("fetchAllCourses")
                    this.toastBottom = this.$f7.toast.create({
                        text: 'Grade Saved',
                        closeTimeout: 3000,
                        closeButton: true,
                        closeButtonColor: 'white',
                    }); this.toastBottom.open();
                }).catch(err => {
                    console.log(err);
                })
            }
        },
        mounted() {
            //this.onPageInit()
            this.courses = courses
        },
        computed:{
            students(){
                return this.$store.getters.getStudents
            }
        },
        watch:{
            student(value) {
                if (value) {                    
                    if (value.length > 5) {                    
                        let student = this.students.filter(e => e.name.toLowerCase() == value.toLowerCase());
                        student = student.length == 1 ? student[0] : [];
                        this.form.student = student.id;
                        this.form.session = student.level;
                        this.populateCourses(student.level);
                        this.form.semester = "";
                    }
                }
            },
            'form.semester'(value) {
               this.newCoursesList = this.coursesList.filter(e => e.semester.toLowerCase() == value.toLowerCase())
               console.log(this.newCoursesList);
               this.showCourses = true;
            }
        }
    }
</script>

<style scoped>
    .main-block {
        margin-top: 5px;
    }

    .form-row {
        margin-top: -60px;
    }

    .title-head {
        font-size: 15px;
        font-weight: bold;
    }

    .btn-submit {
        margin-top: -30px;
        background: #2a5f8a;
        border-radius: 0;
    }
</style>