import Vue from "vue";
import Router from "vue-router";
import Dashboard from '../imports/ui/Dashboard.vue';
import StudentList from '../imports/ui/StudentList.vue';
import StudentModal from '../imports/ui/StudentModal.vue';
import SubjectList from '../imports/ui/SubjectList.vue';

Vue.use(Router);

const routes = [
	{
		path: "/",
		component: Dashboard
	},
	{
		path: "/home",
		name: "home",
		component: Dashboard
	},
	{
		path: "/students",
		name: "students",
		component: StudentList
	},
	{
		path: "/subjects",
		name: "subjects",
		component: SubjectList
	},
	{
		path: "/addstudent",
		name: "addstudent",
		component: StudentModal
	}
];

export default new Router({
  routes // short for `routes: routes`
});