
import HomePage from '../pages/home.vue';
import SidePanel from '../pages/side-panel.vue';
import NotFoundPage from '../pages/404.vue';
import Courses from '../pages/courses/index.vue';
import AddCourse from '../pages/courses/add.vue';
import AddResult from '../pages/gcpa/add.vue';
import Student from '../pages/student/index.vue';
import StudentGrade from '../pages/student/grade.vue';
import Dashboard from '../pages/app/index.vue';

var routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/app',
    component: Dashboard,
  },
  {
    path: '/side-panel',
    component: SidePanel,
  },
  {
    path: '/courses',
    component: Courses,
  },
  {
    path: '/add-course',
    component: AddCourse,
  },
  {
    path: '/add-gcpa',
    component: AddResult,
  },
  {
    path: '/student',
    component: Student,
  },
  {
    path: '/student/:id/',
    component: StudentGrade,
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export default routes;
