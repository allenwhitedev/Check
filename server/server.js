// SERVER

// PUBLICATIONS (TODOLISTS AND TODOGROUPS)
Meteor.publish('theTodos', function(currTodoGroupId)
{
	return TodosList.find({groupId: currTodoGroupId})
})
Meteor.publish('theGroups', function()
{
	return TodoGroupsList.find({ members: this.userId })
})



