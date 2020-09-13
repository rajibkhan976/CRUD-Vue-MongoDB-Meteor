import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import SimpleSchema from 'simpl-schema';
 
export const Subjects = new Mongo.Collection('subjects');

Subjects.schema = new SimpleSchema({
  subjectName: { type: String, required: true },
  students: { type: Array, required: true },
  'students.$': String,
  createdAt: { type: Date, required: true }
});

if (Meteor.isServer) {
	Meteor.publish('subjects', function subjectsPublication () {
		return Subjects.find();
	});
}

if (Meteor.isClient) {
	Meteor.subscribe('subjects');
}

Meteor.methods({
	'subjects.insert'(data) {
		check(data, Object);
		Subjects.insert({
				subjectName: data.name,
				students: data.student,
				createdAt: new Date() // current time
		});
	},
	'subjects.remove'(subjectId) {
		check(subjectId, String);
		Subjects.remove(subjectId);
	},
	'subjects.update'(subjectId, data) {
		check(subjectId, String);
		check(data, Object);
		Subjects.update(subjectId, {
				$set: {
					subjectName: data.name,
					students: data.student,
					createdAt: new Date() // current time
				}
		});
	}
});