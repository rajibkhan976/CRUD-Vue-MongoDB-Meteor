<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
	<div class="container">
	<div class="row">
	<div class="col-md-12">
      <b-form-group
        id="input-group-1"
        label="Name :"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.name"
          required
          placeholder="Enter name"
        ></b-form-input>
      </b-form-group>
	  <b-form-group 
	    id="input-group-2" 
		label="Students :" 
		label-for="input-2"
	  >
        <b-form-select
        id="input-2"
        v-model="form.student"
        :options="students" 
		multiple
        required
        ></b-form-select>
      </b-form-group>
	</div>
	<div class="mt-3">
	<b-button class="ml-3" type="submit" variant="outline-success">Save</b-button>
	<b-button class="ml-2" type="reset" variant="outline-secondary">Reset</b-button>
	</div>
	</div>
	</div>
    </b-form>
	</div>
</template>

<script>
import { Students } from "../api/students.js";
import { Subjects } from "../api/subjects.js";
import { mapState } from 'vuex';
import { mapMutations } from 'vuex';
import { mapActions } from 'vuex';

  export default {
	name: 'StudentForm',
	computed: mapState({
		editSubject: state => state.editSubject
	}),
    data() {
	if (this.$store.state.editSubject !== null) {
		let studentOptionsOne = [];
		Students.find({},{ fields: { studentName: 1, _id: 0 }}).fetch().forEach(element => studentOptionsOne.push(element.studentName));
		return {
        form: {
        name: this.$store.state.editSubject[0].subjectName,
		student: this.$store.state.editSubject[0].students
        },
		students: studentOptionsOne,
        show: true
      };
	} else {
		let studentOptionsTwo = [];
		Students.find({},{ fields: { studentName: 1, _id: 0 }}).fetch().forEach(element => studentOptionsTwo.push(element.studentName));
		return {
        form: {
        name: '',
		student: []
        },
		students: studentOptionsTwo,
        show: true
      };
	}
    },
    methods: {
		...mapMutations([
			'hideSubjectModal', 'removeEditSubject'
		]),
		...mapActions([
			'hideSubjectModal', 'removeEditSubject'
		]),
      onSubmit(event) {
        event.preventDefault();
		let formData = {
		name: this.form.name,
		student: this.form.student
		};
		if (this.$store.state.editSubject !== null) {
			Meteor.call("subjects.update", this.$store.state.editSubject[0]._id, formData);
			this.$store.dispatch('removeEditSubject');
		} else {
			Meteor.call("subjects.insert", formData);
		}
		this.$store.dispatch('hideSubjectModal');
      },
      onReset(event) {
        event.preventDefault();
        // Reset our form values
        this.form.name = '';
        this.form.student = [];
        // Trick to reset/clear native browser form validation state
        this.show = false;
        this.$nextTick(() => {
          this.show = true
        });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>