<template>
  <div>
	<b-button class="float-right mt-3 mb-3" variant="outline-primary" @click="openStudentModal">Add student</b-button>
	  <div v-for="studentModal in studentModals" v-bind:key="studentModal.key">
		  <b-modal id="modal-1" v-model="studentModal.show" :title="modalTitle" hide-header-close no-stacking>
			<StudentForm />
			<template v-slot:modal-footer>
				<div class="w-100">
				  <b-button
					variant="outline-danger"
					size="sm"
					class="float-right"
					@click="closeStudentModal"
				  >
					Close
				  </b-button>
				</div>
		    </template>
		  </b-modal>
	  </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { mapMutations } from 'vuex';
import { mapActions } from 'vuex';
import StudentForm from './StudentForm.vue';

export default {
  name: 'StudentModal',
  components: {
	StudentForm
  },
  computed: mapState({
	studentModals: state => state.studentModals
	}),
  data() {
	return {
		modalTitle: 'Add New Student'
	};
  },
  methods: {
	...mapMutations([
	'showStudentModal', 'hideStudentModal', 'removeEditStudent'
	]),
	...mapActions([
    'showStudentModal', 'hideStudentModal', 'removeEditStudent'
    ]),
	openStudentModal() {
		this.$store.dispatch('showStudentModal', 0);
	},
	closeStudentModal() {
		this.$store.dispatch('hideStudentModal');
		this.$store.dispatch('removeEditStudent');
	}
  }
}
</script>