import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import SimpleSchema from 'simpl-schema';
import { Subjects } from "./subjects.js";

export const Students = new Mongo.Collection('students');

Students.schema = new SimpleSchema({
  studentName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  createdAt: { type: Date, required: true }
});

if (Meteor.isServer) {
	Meteor.publish('students', function studentsPublication () {
		return Students.find();
	});
}

if (Meteor.isClient) {
	Meteor.subscribe('students');
}

Meteor.methods({
	'students.insert'(data) {
		check(data, Object);
		Students.insert({
				studentName: data.name,
				email: data.email,
				phone: data.phone,
				dateOfBirth: data.dob,
				createdAt: new Date() // current time
		});
	},
	'students.remove'(studentId) {
		check(studentId, String);
		Students.remove(studentId);
	},
	'students.update'(studentId, data) {
		check(studentId, String);
		check(data, Object);
		Students.update(studentId, {
				$set: {
					studentName: data.name,
					email: data.email,
					phone: data.phone,
					dateOfBirth: data.dob,
					createdAt: new Date() // current time
				}
		});
	}
});