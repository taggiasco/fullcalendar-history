$(function() {
	// we get a normal Location object

	/*
	* Note, this is the only difference when using this library,
	* because the object window.location cannot be overriden,
	* so library the returns generated "location" object within
	* an object window.history, so get it out of "history.location".
	* For browsers supporting "history.pushState" get generated
	* object "location" with the usual "window.location".
	*/
	var location = window.history.location || window.location;

	window.FullCalendarHistory = {};
	FullCalendarHistory.viewRender = function (view, element) {
		if (history && FullCalendarHistory.on_navigation) {
			var url;
			if (event && event.target && $(event.target).hasClass('fc-today-button')) {
				// today button = clear remembered date
				url = location.pathname.replace(/\/(month|week|day)\/[-0-9]{10}/, '');
				history.pushState(null, null, url);
				$.removeCookie('fullcalendar-history-view-name', { path: '/' });
				$.removeCookie('fullcalendar-history-start', { path: '/' });
			} else {
				var view_name;
				if (view.name == 'month') {
					view_name = 'month';
				} else if (view.name == 'agendaWeek') {
					view_name = 'week';
				} else if (view.name == 'agendaDay') {
					view_name = 'day';
				}
				var start = view.intervalStart.format('YYYY-MM-DD');
				url = location.pathname.replace(/\/(month|week|day)\/[-0-9]{10}/, '') + '/' + view_name + '/' + start;
				history.pushState(null, null, url);
				$.cookie('fullcalendar-history-view-name', view_name, { expires: 7, path: '/' });
				$.cookie('fullcalendar-history-start', start, { expires: 7, path: '/' });
			}
		}
		FullCalendarHistory.on_navigation = 1;
	};
});
