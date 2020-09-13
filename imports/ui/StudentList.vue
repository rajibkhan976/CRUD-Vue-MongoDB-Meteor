<template>
  <div>
	<StudentModal />
	<table class="table table-bordered table-striped table-hover">
	  <thead>
		<tr>
		  <th scope="col">Name</th>
		  <th scope="col">Email</th>
		  <th scope="col">Phone</th>
		  <th scope="col">DOB</th>
		  <th scope="col">Subjects</th>
		  <th scope="col">Actions</th>
		</tr>
	  </thead>
	  <tbody v-for="student in students">
		<tr>
		  <td>{{ student.studentName }}</td>
		  <td>{{ student.email }}</td>
		  <td>{{ student.phone }}</td>
		  <td>{{ formatDate(student.dateOfBirth) }}</td>
		  <td>{{ fetchStudentSubjects(student.studentName) }}</td>
		  <td>
			<b-button
            variant="outline-secondary"
            size="sm"
            @click="editStudent(student._id)"
			>
            Edit
			</b-button>
			<b-button
            variant="outline-danger"
            size="sm"
            class="ml-2"
            @click="deleteStudent(student._id)"
			>
            Delete
			</b-button>
		  </td>
		</tr>
	  </tbody>
	</table>
  </div>
</template>
 
<script>
import StudentModal  from "./StudentModal.vue";
import { Students } from "../api/students.js";
import { Subjects } from "../api/subjects.js";
import { mapMutations } from 'vuex';
import { mapActions } from 'vuex';
import moment from 'moment';

export default {
  name: 'StudentList',
  components: {
	StudentModal
  },
  data() {
    return {};
  },
  methods: {
	...mapMutations([
	'showStudentModal', 'hideStudentModal', 'addEditStudent'
	]),
	...mapActions([
    'showStudentModal', 'hideStudentModal', 'addEditStudent'
    ]),
	editStudent(studentId) {
		let student = Students.find({_id: studentId}).fetch();
		this.$store.dispatch('showStudentModal', studentId);
		this.$store.dispatch('addEditStudent', student);
	},
	deleteStudent(id) {
	 Meteor.call("students.remove", id);
	},
	fetchStudentSubjects(studentName) {
		if (Subjects.find({}).fetch()) {
			let subjectsArrObj = Subjects.find({students: studentName}, {fields: {subjectName: 1, _id: 0}}).fetch();
			let subjectsArr = [];
			subjectsArrObj.forEach((element) => {
				subjectsArr.push(element.subjectName);
			});
			return subjectsArr.toString().replace(/,/g, ", ");
		}
	},
	formatDate(date) {
	 return moment(date).format("DD-MM-YYYY");
	}
  },
  meteor: {
	$subscribe: {
		students: []
	},
	students() {
		if (Students.find({}).fetch()) {
			return Students.find({}).fetch();
		} else {
			return [];
		}
	}
  }
};
</script>
