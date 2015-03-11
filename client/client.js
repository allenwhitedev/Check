// CLIENT(TODOS LIST )

// SUBSCRIPTIONS (TODOSLIST AND TODOGROUPS)
var Stuff = Meteor.subscribe('theTodos', localStorage.getItem('currTodoGroupId'))
Meteor.subscribe('theGroups')

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
	},
	'submit .todosTopper form': function()
	{
		event.preventDefault()
		console.log("fired!")
		Meteor.call('changeListTitle', event.target.listTitle.value, localStorage.getItem('currTodoGroupId')) 
		event.target.listTitle.value = ""
	}
})

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
	},
	'listTitle': function()
	{
		// redundant code and session check necessary to update template
		// w/o page refresh
		if (Session.get('currTodoGroupId'))
			return TodoGroupsList.findOne({_id: localStorage.getItem('currTodoGroupId')}).title
		else
			return TodoGroupsList.findOne({_id: localStorage.getItem('currTodoGroupId')}).title
	}
})

// EVENTS (ADD TODOGROUP FORM)
Template.todoGroups.events
({
	'click .todoGroup': function()
	{
		console.log("Todogroup id: " + this._id)
		localStorage.setItem('currTodoGroupId', this._id)
		Session.set('currTodoGroupId', this._id) // for listTitle
		Stuff.stop()
		Stuff = Meteor.subscribe('theTodos', localStorage.getItem('currTodoGroupId'))
	}
})

// EVENTS (ADD TODOGROUP FORM)
Template.addTodoGroupForm.events
({
	'submit .addTodoGroupArea': function()
	{
		event.preventDefault()
		var todoListTitle = event.target.todoListTitle.value
		Meteor.call('addTodoGroup', todoListTitle)
	}
})

// HELPERS (TODO GROUPS)
Template.todoGroups.helpers
({
	'group': function()
	{
		return TodoGroupsList.find({});
	}
})