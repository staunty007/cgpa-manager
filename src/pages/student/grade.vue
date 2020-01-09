<template>
    <f7-page>
        <f7-navbar :sliding="false" color="white" navbar-fixed>
            <f7-nav-left>
                <f7-link icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu" panel-open="left"></f7-link>
            </f7-nav-left>
            <f7-nav-title sliding>Students Grade</f7-nav-title>
        </f7-navbar>
        <f7-block>

        </f7-block>
    </f7-page>
</template>

<script>
    import fire from '../../js/firebase.js';
    export default {
        data() {
            var studentId = this.$f7route.params.id;
            return {
                student: studentId,
            }
        },
        methods: {
            async fetchStudentGrade() {
                // let grades = await fire.firestore().collection('grades')
                //     .where('student', '==', this.student)  // workaround works
                //     .get();
                // console.log(grades);
                    await fire.firestore().collection("grades")
                    .where('student', '==', this.student) 
                    .get().then(res => {
                    const allGrade = [];
                    res.forEach(doc => {
                        let grade = doc.data()
                        grade.id = doc.id
                        allGrade.push(grade);
                    })
                    console.log(allGrade);
                });
            }
        },
        mounted() {
            // this.person = this.studentId;
            console.log(this.$f7route.params.id);
            console.log(this.$f7route.path)
            this.fetchStudentGrade()
        }
    }
</script>

<style>

</style>