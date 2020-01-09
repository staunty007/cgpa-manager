import Vue from 'vue';
import Vuex from 'vuex';
import fire from '../js/firebase.js'
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        courses: [],
        students: []
    },
    //showing things, not mutating state
    getters: {
        getCourses: (state) => {
            return state.courses;
        },
        getStudents: (state) => {
            return state.students;
        },
    },
    //mutating the state
    //mutations are always synchronous
    mutations: {
        //showing passed with payload, represented as num
        addCourse: (state, payload) => {
            state.courses.unshift(payload);
        },
        setCourses: (state, payload) => {
            state.courses = payload;
        },
        setStudents: (state, payload) => {
            state.students = payload;
        },
        
        deleteCourse: (state, payloadId) => {
            state.courses = state.courses.filter(course => course.id !== payloadId);
            console.log("Updated");
        }
    },
    //commits the mutation, it's asynchronous
    actions: {
        submitNewCourse: ({commit}, payload) => {
            commit('addCourse', payload);
        },
        async fetchAllCourses ({commit})  {
            await fire.firestore().collection("courses").get().then(res => {
              const allCourses = [];
              res.forEach(doc => {
                let course = doc.data()
                course.id = doc.id
                allCourses.push(course);
              })
              commit('setCourses', allCourses);
            });
        },
        async fetchAllStudents ({commit})  {
            await fire.firestore().collection("students").get().then(res => {
              const allStudents = [];
              res.forEach(doc => {
                let student = doc.data()
                student.id = doc.id
                allStudents.push(student);
              })
              commit('setStudents', allStudents);
            });
        },
        async deleteCourseById({commit}, payload) {
            await fire.firestore().collection("courses").doc(payload.id).delete().then(res => {
                commit('deleteCourse', payload.id);
            });
        }
    }
});