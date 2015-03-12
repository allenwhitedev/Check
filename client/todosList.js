// EVENTS (TODOS LIST) 
Template.todosList.events
({
	'click .finishTodo': function ()
	{
		Meteor.call('finishTodo', this._id)
		console.log("this._id: " + this._id)
	},
	'click .changeTodoStatus': function ()
	{
		Meteor.call('changeTodoStatus', this._id)
	}
})

// HELPERS (TODOS LIST)
Template.todosList.helpers
({
	'todo': function()
	{
		return TodosList.find({}, {sort: {status: -1, finishedAt: -1, content: 1}}).fetch();
	},
	'isDone': function()
	{
		if (this.status === -1)
			return false
		return true
	},
	'groupId': function()
	{
		return Session.get('groupId')
	}
})

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ FORMS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// EVENTS (ADD TODO FORM)
Template.addTodoForm.events
({
	'submit .addTodoArea': function(event)
	{
		event.preventDefault()
		var todoContent = event.target.todoContent.value
		var groupId = localStorage.getItem('currTodoGroupId')
		Meteor.call('addTodo', todoContent, groupId)
		event.target.todoContent.value = ""
	}
})

// EVENTS (REMOVE TODO FORM)
Template.removeTodoForm.events
({
	'submit .removeTodoArea': function(event)
	{
		event.preventDefault()
		var todoName = event.target.todoName.value
		Meteor.call('removeTodo', TodoName, Session.get('currTodoId'))
		console.log('Calling remove...')
		event.target.todoName.value = ""
	}
})