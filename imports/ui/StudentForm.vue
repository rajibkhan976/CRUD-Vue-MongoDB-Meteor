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
        label="Email :"
        label-for="input-2"
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          id="input-2"
          v-model="form.email"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>
	  <b-form-group
        id="input-group-3"
        label="Phone :"
        label-for="input-3"
      >
        <b-form-input
          id="input-3"
          v-model="form.phone"
          required
          placeholder="Enter phone number"
        ></b-form-input>
      </b-form-group>
	  <b-form-group
        id="input-group-4"
        label="Date of birth :"
        label-for="input-4"
      >
        <b-form-datepicker 
		  id="input-4" 
		  v-model="form.dob"
		  required
          placeholder="Enter date of birth"
		  ></b-form-datepicker>
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
import { mapState } from 'vuex';
import { mapMutations } from 'vuex';
import { mapActions } from 'vuex';

  export default {
	name: 'StudentForm',
	computed: mapState({
		editStudent: state => state.editStudent
	}),
    data() {
	if (this.$store.state.editStudent !== null) {
		return {
			form: {
				name: this.$store.state.editStudent[0].studentName,
				email: this.$store.state.editStudent[0].email,
				phone: this.$store.state.editStudent[0].phone, 
				dob: this.$store.state.editStudent[0].dateOfBirth
				},
				show: true
		};
	} else {
		return {
        form: {
			name: '',
			email: '',
			phone: '', 
			dob: null
			},
			show: true
      }
	}
    },
    methods: {
		...mapMutations([
			'hideStudentModal', 'removeEditStudent'
		]),
		...mapActions([
			'hideStudentModal', 'removeEditStudent'
		]),
      onSubmit(event) {
        event.preventDefault();
		let formData = {
		name: this.form.name,
		email: this.form.email,
		phone: this.form.phone,
		dob: this.form.dob
		};
		if (this.$store.state.editStudent !== null) {
			Meteor.call("students.update", this.$store.state.editStudent[0]._id, formData);
			this.$store.dispatch('removeEditStudent');
		} else {
			Meteor.call("students.insert", formData);
		}
		this.$store.dispatch('hideStudentModal');
      },
      onReset(event) {
        event.preventDefault();
        // Reset our form values
        this.form.name = '';
        this.form.email = '';
        this.form.phone = '';
		this.form.dob = null;
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