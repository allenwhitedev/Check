// EVENTS (TODOGROUPS)
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

// HELPERS (TODO GROUPS)
Template.todoGroups.helpers
({
	'group': function()
	{
		return TodoGroupsList.find({});
	}
})

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ FORMS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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


