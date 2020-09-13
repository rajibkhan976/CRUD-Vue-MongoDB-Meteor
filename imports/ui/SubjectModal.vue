<template>
  <div>
	<b-button class="float-right mt-3 mb-3" variant="outline-primary" @click="openSubjectModal">Add subject</b-button>
	<div v-for="subjectModal in subjectModals" v-bind:key="subjectModal.key">
	  <b-modal id="modal-2" v-model="subjectModal.show" :title="modalTitle" hide-header-close no-stacking>
		<SubjectForm />
		<template v-slot:modal-footer>
				<div class="w-100">
				  <b-button
					variant="outline-danger"
					size="sm"
					class="float-right"
					@click="closeSubjectModal"
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
import SubjectForm from './SubjectForm.vue';

export default {
  name: 'SubjecttModal',
  computed: mapState({
	subjectModals: state => state.subjectModals
	}),
  components: {
	SubjectForm
  },
  data() {
	return {
		modalTitle: 'Add New Subject'
	};
  },
  methods: {
	...mapMutations([
	'showSubjectModal', 'hideSubjectModal', 'removeEditSubject'
	]),
	...mapActions([
    'showSubjectModal', 'hideSubjectModal', 'removeEditSubject'
    ]),
	openSubjectModal() {
		this.$store.dispatch('showSubjectModal', 0);
	},
	closeSubjectModal() {
		this.$store.dispatch('hideSubjectModal');
		this.$store.dispatch('removeEditSubject');
	}
  }
}
</script>