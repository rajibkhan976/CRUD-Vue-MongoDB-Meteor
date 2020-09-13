<template>
  <div className="container">
    <header>
      <h3>Student module</h3>
    </header>
	<NavigationMenu />
	<router-view />
  </div>
</template>
 
<script>
import Vue from "vue";
import Vuex from "vuex";
import NavigationMenu  from "./NavigationMenu.vue";

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		studentModals: [],
		subjectModals: [],
		editStudent: null,
		editSubject: null
	},
	mutations: {
	 showStudentModal(state, id) {
		state.studentModals.unshift({key: id, show: true});
	 },
	 hideStudentModal(state) {
		state.studentModals.shift();
	 },
	 showSubjectModal(state, id) {
		state.subjectModals.unshift({key: id, show: true});
	 },
	 hideSubjectModal(state) {
		state.subjectModals.shift();
	 },
	 addEditStudent(state, student) {
		state.editStudent = Object.assign({}, student);
	 },
	 removeEditStudent(state) {
		state.editStudent = null;
	 },
	 addEditSubject(state, subject) {
		state.editSubject = Object.assign({}, subject);
	 },
	 removeEditSubject(state) {
		state.editSubject = null;
	 },
	},
	actions: {
	 showStudentModal(context, id) {
		context.commit('showStudentModal', id);
	 },
	 hideStudentModal(context) {
		context.commit('hideStudentModal');
	 },
	 showSubjectModal(context, id) {
		context.commit('showSubjectModal', id);
	 },
	 hideSubjectModal(context) {
		context.commit('hideSubjectModal');
	 },
	 addEditStudent(context, student) {
		context.commit('addEditStudent', student);
	 },
	 removeEditStudent(context) {
		context.commit('removeEditStudent');
	 },
	 addEditSubject(context, subject) {
		context.commit('addEditSubject', subject);
	 },
	 removeEditSubject(context) {
		context.commit('removeEditSubject');
	 },
	}
});
 
export default {
  name: 'App',
  store: store,
  components: {
    NavigationMenu
  },
  data() {
    return {};
  }
};
</script>