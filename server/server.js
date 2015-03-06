// SERVER(LEADERBOARD)

// PUBLICATIONS
Meteor.publish('theTodos', function()
{
	return TodosList.find({createdBy: this.userId})
})

// METHODS(LEADERBOARD)
Meteor.methods
({
	'addTodo': function(todoContent, groupId)
	{
		if (Meteor.userId())
		{
			if(todoContent.length > 0 && groupId)
				TodosList.insert(
				{
					content: todoContent, 
					groupId: groupId, 
					createdBy: Meteor.userId()
				})
		}
	},
	'removeTodo': function(todoId)
	{
		if (Meteor.userId())
			// HERE: Will probably remove by todo content instead 
			TodosList.remove({_id: todoId, createdBy: Meteor.userId()})
	},
	'finishTodo': function(todoId)
	{
		TodosList.update({_id: todoId}, {$set: {status: -1}})
	},
	'changeTodoStatus': function(todoId)
	{
		TodosList.update
		({
			_id: todoId}, 
			{$set: {status: 0}
			// HERE: Set who is working on this by putting initial(s) of whoever's working on it
			// (should be an array) and groupId stuff
		})


	}
})

