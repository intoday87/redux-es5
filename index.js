var redux = require('redux');

var incrementReducer = function (state, action) {
	console.log('incrementReducer was called with state', state, 'and action', action)

	switch (action.type) {
		case 'INCREMENT':
			return state + 1;
		default:
			return !state ? 0 : state;
	}
};
var messageReducer = function (state, action) {
	console.log('messageReducer was called with state', state, 'and action', action)

	switch (action.type) {
		case 'MESSAGE':
			return {
				message: action.message
			};
		default:
			return !state ? "empty message" : state;
	}
};

var reducer = redux.combineReducers({
	incrementReducer: incrementReducer,
	messageReducer  : messageReducer
});
var store = redux.createStore(reducer, {
	incrementReducer: 10,
	messageReducer  : 'saved message'
});

console.log(store.getState());

store.subscribe(function () {
	var state = store.getState();
	console.log("subscribed state : " + (typeof state === 'object' ? JSON.stringify(state) : state));
});

var incrementActionCreator = function () {
	return {type: 'INCREMENT'};
};
var messageActionCreator = function (message) {
	return {
		type   : 'MESSAGE',
		message: message
	};
};

console.log('dispatch incrementActionCreator: ');
console.log(store.dispatch(incrementActionCreator()));
console.log("dispatch messageActionCreator('new message'): ");
console.log(store.dispatch(messageActionCreator('new message')));
console.log('dispatch incrementActionCreator: ');
console.log(store.dispatch(incrementActionCreator()));
