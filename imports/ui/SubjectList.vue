<template>
  <div>
	<SubjectModal />
    <table class="table table-bordered table-striped table-hover">
	  <thead>
		<tr>
		  <th scope="col">Name</th>
		  <th scope="col">Students</th>
		  <th scope="col">Actions</th>
		</tr>
	  </thead>
	  <tbody v-for="subject in subjects">
		<tr>
		  <td>{{ subject.subjectName }}</td>
		  <td>{{ subject.students.toString().replace(/,/g, ", ") }}</td>
		  <td>
			<b-button
            variant="outline-secondary"
            size="sm"
            @click="editSubject(subject._id)"
			>
            Edit
			</b-button>
			<b-button
            variant="outline-danger"
            size="sm"
            class="ml-2"
            @click="deleteSubject(subject._id)"
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
import SubjectModal  from "./SubjectModal.vue";
import { Subjects } from "../api/subjects.js";
import { mapMutations } from 'vuex';
import { mapActions } from 'vuex';

export default {
  name: 'SubjectList',
  components: {
	SubjectModal
  },
  data() {
    return {};
  },
  methods: {
	...mapMutations([
	'showSubjectModal', 'hideSubjectModal', 'addEditSubject'
	]),
	...mapActions([
    'showSubjectModal', 'hideSubjectModal', 'addEditSubject'
    ]),
	editSubject(subjectId) {
		let subject = Subjects.find({_id: subjectId}).fetch();
		this.$store.dispatch('showSubjectModal', subjectId);
		this.$store.dispatch('addEditSubject', subject);
	},
	deleteSubject(id) {
		Meteor.call("subjects.remove", id);
	}
  },
  meteor: {
	$subscribe: {
		subjects: []
	},
	subjects() {
		if (Subjects.find({}).fetch()) {
			return Subjects.find({}).fetch();
		} else {
			return [];
		}
	}
  }
};
</script>