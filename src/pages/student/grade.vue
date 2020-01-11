<template>
    <f7-page class="bg-page">
        <f7-navbar :sliding="false" color="white" navbar-fixed>
            <f7-nav-left>
                <f7-link icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu" panel-open="left"></f7-link>
            </f7-nav-left>
            <f7-nav-title sliding>Students Grade</f7-nav-title>
        </f7-navbar>

        <f7-block-title>{{ student.name.toUpperCase() }}</f7-block-title>

        <f7-block>

        <f7-row class="form-row" style="margin-top: -30px;">
            <f7-col width="70">
                <f7-list no-hairlines-md>
                    <f7-list-input type="select" :value="form.semester" 
                    @input="form.semester = $event.target.value">
                         <option value="first">First Semester</option>
                        <option value="second">Second Semester</option>
                         <option value="both">Session CGPA</option>
                    </f7-list-input>
                </f7-list>
            </f7-col>
            <f7-col width="30">
                <f7-list style="margin-top: 40px;">
                    <f7-button color="primary" :disabled="form.semester == null" fill @click="fetchStudentGrade">
                        Submit
                    </f7-button>
                </f7-list>
            </f7-col>
        </f7-row>
        </f7-block>


        
        <f7-block style="margin-top: -30px;">
            <f7-row>
                <f7-col width="50" class="bold">COURSE</f7-col>
                <f7-col width="25" class="bold">CREDIT</f7-col>
                <f7-col width="25" class="bold">GRADE</f7-col>
            </f7-row>
        </f7-block>
        <f7-block strong medium-inset class="grades" v-if="showGrade">
            <div class="list-grade" v-for="(grade, index) in grades" :key="index">
                <f7-row v-show="grade.name.length">
                    <f7-col width="50">{{ grade.name }}</f7-col>
                    <f7-col width="25">
                        <f7-button color="gray" fill large small>{{ grade.grade }}</f7-button>
                    </f7-col>
                    <f7-col width="25">
                        <f7-button color="primary" fill large small>{{ checkGrade(grade.grade) }}</f7-button>
                    </f7-col>
                </f7-row>
            </div>
        </f7-block>
            <f7-block v-if="showGrade">
                <f7-row>
                    <f7-col width="50"> SEMESTER {{ form.semester == 'first' ? '1' : '2' }} - GPA</f7-col>
                    <f7-col width="50">
                        <f7-button color="gray" fill large small>{{ semester.first }}</f7-button>
                    </f7-col>
                </f7-row>
            </f7-block>
        <div  v-if="showSessionCgpa">
            <f7-block>
                <f7-row class="mb-1">
                    <f7-col width="50"> SEMESTER 1 - GPA</f7-col>
                    <f7-col width="50">
                        <f7-button color="gray" fill large small>{{ semester.first }}</f7-button>
                    </f7-col>
                </f7-row>
                <f7-row class="mb-1">
                    <f7-col width="50"> SEMESTER 2 - GPA</f7-col>
                    <f7-col width="50">
                        <f7-button color="gray" fill large small>{{ semester.second }}</f7-button>
                    </f7-col>
                </f7-row>
                <f7-row class="mb-1">
                    <f7-col width="50"> CGPA</f7-col>
                    <f7-col width="50">
                        <f7-button color="primary" fill large small>{{ semester.both }}</f7-button>
                    </f7-col>
                </f7-row>
            </f7-block>
        </div>
        <f7-block strong v-if="message != null">
            <p color="primary" style="text-align:center;">{{ message }}</p>
        </f7-block>
    </f7-page>
</template>

<script>
    import fire from '../../js/firebase.js';
    export default {
        data() {
            var studentId = this.$f7route.params.id;
            return {
                studentId: studentId,
                grades: [],
                showGrade: false,
                showSessionCgpa: false,
                semester: {
                    first: 0,
                    second: 0,
                    both: 0
                },
                form: {
                    semester: null
                },
                message: null
            }
        },
        methods: {
            async fetchStudentGrade() {
                // let grades = await fire.firestore().collection('grades')
                //     .where('student', '==', this.student)  // workaround works
                //     .get();
                // console.log(grades);
                this.showGrade = false;
                this.showSessionCgpa = false;
                this.message = null;
                await fire.firestore().collection("grades")
                    .where('student', '==', this.studentId)
                    //.where('semester', '==', this.form.semester)
                    .get().then(res => {
                        const allGrade = [];
                        res.forEach(doc => {
                            let grade = doc.data()
                            grade.id = doc.id
                            allGrade.push(grade);
                        })
                        console.log(allGrade);
                        if (allGrade.length < 1) {
                            this.message = "Result Not Available";
                            //.log('No Record Available')
                            return
                        }
                        if (this.form.semester == "both") {
                            if (allGrade.length != 2) {
                                this.message = "CGPA Result Not Available";
                                return
                            }

                            let grd = allGrade
                            grd = grd.map(e => e.course);
                            let no = [];
                            grd = grd.forEach(e => {
                                //console.log(e)
                                    Object.keys(e).forEach(s => {
                                    console.log(`${s} : ${e[s]['name']}`);
                                    this.courses.forEach(c => {
                                        if (c.code == e[s]['name']) {        
                                            no.push({
                                                name: c.code,
                                                unit: c.unit,
                                                semester: c.semester,
                                                grade: parseFloat(e[s]['grade'])
                                            });
                                        }
                                    })
                                });
                            })
                            //console.log(no);
                            const firstCreditUnit = no.filter(e => e.semester == "first")
                            .map(e => e.unit).reduce((a, b) => a + b,0);
                            const firstTotalGrade = no.filter(e => e.semester == "first")
                            .map(e => e.unit * e.grade).reduce((a, b) => a + b,0);
                            const secondCreditUnit = no.filter(e => e.semester == "second").map(e => e.unit).reduce((a, b) => a + b,0);
                            const secondTotalGrade = no.filter(e => e.semester == "second")
                            .map(e => e.unit * e.grade).reduce((a, b) => a + b,0);
                            const fGpa = firstTotalGrade/firstCreditUnit;
                            const sGpa = secondTotalGrade/secondCreditUnit;
                            const sessionCGPA = (fGpa + sGpa) / 2
                            this.semester = {
                                first: fGpa.toFixed(2),
                                second: sGpa.toFixed(2),
                                both: sessionCGPA.toFixed(2),
                            }
                            // console.log(sessionCGPA);
                            // console.log(this.semester);
                            this.showSessionCgpa = true;
                            return;
                        }
                        this.grades = allGrade.filter(e => e.semester == this.form.semester);
                        this.grades = this.grades.length == 1 ? this.grades[0].course : [];

                        if (this.grades.length < 1) {
                            this.message = "Result Not Available";
                            return
                        }

                        let semesterGrade = [];
                        Object.keys(this.grades).forEach(key => {
                            //console.log(`${key} : ${this.grades[key]['name']}`);
                            this.courses.forEach(e => {
                                if (e.code == this.grades[key]['name']) {
                                    semesterGrade.push({
                                        name: e.code,
                                        unit: e.unit,
                                        grade: parseFloat(this.grades[key]['grade'])
                                    });
                                }
                            });
                        });
                        console.log(semesterGrade)
                        const creditUnit = semesterGrade.map(e => e.unit).reduce((a, b) => a + b,
                            0); //sum units
                        const totalGrades = semesterGrade.map(e => e.unit * e.grade).reduce((a, b) => a + b,
                            0); // sum unit +total grades
                        const gpa = totalGrades / creditUnit;
                        //console.log(gpa.toFixed(2))
                        this.showGrade = true;
                        this.semester.first = gpa.toFixed(2);
                        //let grades = Object.keys(this.grades).map(data => this.grades[data]['grade']);
                        //console.log(grades.map(e => e = parseFloat(e)).filter(Boolean).reduce((a,b) => a + b , 0));
                        //grades.map()
                        //.reduce((a, b) => a + b, 0))
                    });
            },
            checkGrade(unit) {
                const grade = parseFloat(unit);
                let newGrade = "F";
                if (grade <= 4.0 && grade >= 3.76)
                    newGrade = "A"
                else if (grade <= 3.75 && grade >= 3.51)
                    newGrade = "AB"
                else if (grade <= 3.50 && grade >= 3.26)
                    newGrade = "B"
                else if (grade <= 3.25 && grade >= 3.1)
                    newGrade = "BC"
                else if (grade <= 3.0 && grade >= 2.76)
                    newGrade = "C"
                else if (grade <= 2.75 && grade >= 2.51)
                    newGrade = "CD"
                else if (grade <= 2.50 && grade >= 2.26)
                    newGrade = "D"
                else if (grade <= 2.25 && grade >= 2.1)
                    newGrade = "DE"
                else if (grade <= 2.0 && grade >= 1.76)
                    newGrade = "E"
                else if (grade <= 1.75 && grade >= 1.51)
                    newGrade = "EF"
                else if (grade <= 1.5 && grade >= 1.26)
                    newGrade = "PF"
                else if (grade <= 1.25 && grade >= 1.01)
                    newGrade = "FF"
                else if (grade <= 1.00 && grade >= 0.1)
                    newGrade = "FF"
                else
                    newGrade = "F#"
                return newGrade;
            }
        },
        mounted() {
            // this.person = this.studentId;
            // console.log(this.$f7route.params.id);
            // console.log(this.$f7route.path)
            //this.fetchStudentGrade()
            // console.log(this.student);
            // console.log(this.courses);

        },
        computed: {
            student() {
                let student = this.$store.getters.getStudents.filter(e => e.id === this.studentId)
                return student = student.length == 1 ? student[0] : null
            },
            courses() {
                return this.$store.getters.getCourses;
            }
        }
    }
</script>

<style scoped>
    .grades {
        margin-top: -25px;
    }

    .list-grade {
        margin-bottom: 20px;
    }

    .bold {
        font-weight: bold;
    }
    .mb-1 {
        margin-bottom: 10px;
    }
</style>