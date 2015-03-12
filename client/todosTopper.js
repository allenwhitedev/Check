// EVENTS (TODOS TOPPER)
Template.todosTopper.events
({
	'submit .todosTopper form': function()
	{
		event.preventDefault()
		console.log("fired!")
		Meteor.call('changeListTitle', event.target.listTitle.value, localStorage.getItem('currTodoGroupId')) 
		event.target.listTitle.value = ""
	}
})

// HELPERS (TODOS TOPPER)
Template.todosTopper.helpers
({
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