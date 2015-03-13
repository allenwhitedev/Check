// SERVER

// METHODS (TODOGROUPS)
Meteor.methods 
({
	'addTodoGroup':function(todoListTitle)
	{
		TodoGroupsList.insert({members: [Meteor.userId()], title: todoListTitle})
		console.log("All's well that end's well.")
	},
	'changeListTitle': function(listTitle, currTodoGroupId)
	{
		var listCreator = TodoGroupsList.findOne({_id: currTodoGroupId}).members[0]
		if (listCreator === Meteor.userId())
			TodoGroupsList.update({_id: currTodoGroupId}, {$set: {title: listTitle}})
	},
	'inviteUser':function(currTodoGroupId, userEmail)
	{
		invitedUserId = Meteor.users.findOne({ emails: { $elemMatch: { address: userEmail } } })._id
		TodoGroupsList.update({_id: currTodoGroupId}, {$addToSet: {members: invitedUserId}})
	}
})
