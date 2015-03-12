// SERVER (TODOLIST)

// METHODS (TODOLIST)
Meteor.methods({
	'addTodo': function(todoContent, groupId)
	{
		if (Meteor.userId())
		{
			if(todoContent.length > 0 && groupId)
				TodosList.insert(
				{
					content: todoContent, 
					groupId: groupId,
					status: 0,
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
		TodosList.update({_id: todoId}, 
			{$set: {status: -1, finishedAt: new Date(), finishedBy: Meteor.userId()}})
	},
	'changeTodoStatus': function(todoId)
	{
		var statusCode = 0
		var thing = TodosList.findOne({_id: todoId}).workers
		if (statusCode === 1)
		{
			TodosList.update
			(
				{_id: todoId}, 
				{$inc: {status: statusCode}, $addToSet: {workers: Meteor.userId()}}
			)
		}
		else if (statusCode === -1)
		{
			TodosList.update
			(
				{_id: todoId}, 
				{$inc: {status: statusCode}, $pull: {workers: Meteor.userId()}}
			)
		}

	}
})