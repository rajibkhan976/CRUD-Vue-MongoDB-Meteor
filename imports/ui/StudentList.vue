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
		  <th scope="col">Actions</th>
		</tr>
	  </thead>
	  <tbody v-for="student in students">
		<tr>
		  <td>{{ student.studentName }}</td>
		  <td>{{ student.email }}</td>
		  <td>{{ student.phone }}</td>
		  <td>{{ student.dateOfBirth }}</td>
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