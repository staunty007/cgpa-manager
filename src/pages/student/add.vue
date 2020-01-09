<template>
        <f7-block strong>
            <f7-list no-hairlines-md>
                <f7-list-input label="Full Name" type="text" :value="form.name"
                    @input="form.name = $event.target.value" clear-button></f7-list-input>
                <f7-list-input label="Email" type="email" :value="form.email"
                    @input="form.email = $event.target.value" clear-button></f7-list-input>
                <f7-list-input label="Level" type="select" :value="form.level" 
                    @input="form.level = $event.target.value">
                    <option value="nd1">ND1</option>
                    <option value="nd2">ND2</option>
                    <option value="hnd1">HND1</option>
                    <option value="hnd2">HND2</option>
                </f7-list-input>
                <f7-list-input label="Gender" type="select" :value="form.gender" 
                    @input="form.gender = $event.target.value">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </f7-list-input>

                <f7-list-input label="Matric No" type="number" :value="form.matric"
                    @input="form.matric = $event.target.value" clear-button></f7-list-input>

                <f7-button :disabled="form.gender == ''" fill class="btn" @click.prevent="addNewStudent">ADD STUDENT
                </f7-button>
            </f7-list>
        </f7-block>
</template>

<script>
    import fire from '../../js/firebase.js';
    export default {
        data() {
            return {
                form: {
                    name:"",
                    email:"",
                    password:"password",
                    gender: "",
                    level: "",
                    matric: ""
                }
            }
        },
        computed: {
            currentRoute() {
                return this.$f7route.path
            }
        },
        methods: {
            async addNewStudent() {
                this.$f7.preloader.show();
                try {
                    const response = await fire.auth().createUserWithEmailAndPassword(this.form.email, this.form.password);
                    const reg = await fire.firestore().collection('students').doc(response.user.uid).set({
                        name: this.form.name.toLowerCase(),
                        email: this.form.email,
                        gender: this.form.gender,
                        level: this.form.level,
                        matric: this.form.matric,
                        role: 'student',
                        status: true,
                    });
                    await fire.auth().signOut(); //logout
                    this.$f7.preloader.hide();
                    this.$store.dispatch("fetchAllStudents")
                    this.toastBottom = this.$f7.toast.create({
                        text: 'Student Added',
                        closeTimeout: 5000,
                        closeButton: true,
                        closeButtonColor: 'white',
                    }); this.toastBottom.open();
                    this.form = {};
                } catch (error) {
                    this.$f7.preloader.hide();
                    this.error = error.message
                }

                // fire.firestore().collection("courses").add(this.form)
                // .then(res => {
                //     this.$f7.preloader.hide();
                //     this.$store.dispatch("fetchAllCourses")
                //     this.toastBottom = this.$f7.toast.create({
                //         text: 'Course Added',
                //         closeTimeout: 5000,
                //         closeButton: true,
                //         closeButtonColor: 'white',
                //     }); this.toastBottom.open();
                //     this.form = {}
                // }).catch(err => {
                //     console.log(err);
                // })
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
            this.form.matric = Math.floor(Math.random() * 2000000000);
        },
    }
</script>

<style scoped>
    .btn {
        margin-top: 10px;
        background: #2a5f8a;
        border-radius: 0;
    }
</style>