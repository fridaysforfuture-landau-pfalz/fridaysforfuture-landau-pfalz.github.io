<div class="ui container">

  <div class="ui menu">
    <div class="header item">Brand</div>
    <a class="active item">Link</a>
    <a class="item">Link</a>
    <div class="ui dropdown item">
      Dropdown
      <i class="dropdown icon"></i>
      <div class="menu">
        <div class="item">Action</div>
        <div class="item">Another Action</div>
        <div class="item">Something else here</div>
        <div class="divider"></div>
        <div class="item">Separated Link</div>
        <div class="divider"></div>
        <div class="item">One more separated link</div>
      </div>
    </div>
    <div class="right menu">
      <div class="item">
        <div class="ui action left icon input">
          <i class="search icon"></i>
          <input type="text" placeholder="Search">
          <button class="ui button">Submit</button>
        </div>
      </div>
      <a class="item">Link</a>
    </div>
  </div>
</div>

<br/>
<div class="ui container">
  <div class="ui grid">
    <div class="ui sixteen column">
      <div id="calendar"></div>
    </div>
  </div>
</div>

</div>

$(document).ready(function() {
		$('#calendar').fullCalendar({
			header: {
				left: 'prev,next today',
				center: 'title',
				right: 'month,basicWeek,basicDay'
			},
			defaultDate: '2016-12-12',
			navLinks: true, // can click day/week names to navigate views
			editable: true,
			eventLimit: true, // allow "more" link when too many events
			events: [
				{
					title: 'All Day Event',
					start: '2016-12-01'
				},
				{
					title: 'Long Event',
					start: '2016-12-07',
					end: '2016-12-10'
				},
				{
					id: 999,
					title: 'Repeating Event',
					start: '2016-12-09T16:00:00'
				},
				{
					id: 999,
					title: 'Repeating Event',
					start: '2016-12-16T16:00:00'
				},
				{
					title: 'Conference',
					start: '2016-12-11',
					end: '2016-12-13'
				},
				{
					title: 'Meeting',
					start: '2016-12-12T10:30:00',
					end: '2016-12-12T12:30:00'
				},
				{
					title: 'Lunch',
					start: '2016-12-12T12:00:00'
				},
				{
					title: 'Meeting',
					start: '2016-12-12T14:30:00'
				},
				{
					title: 'Happy Hour',
					start: '2016-12-12T17:30:00'
				},
				{
					title: 'Dinner',
					start: '2016-12-12T20:00:00'
				},
				{
					title: 'Birthday Party',
					start: '2016-12-13T07:00:00'
				},
				{
					title: 'Click for Google',
					url: 'https://google.com/',
					start: '2016-12-28'
				}
			]
		});	
	});
