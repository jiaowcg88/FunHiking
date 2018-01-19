$('#hiking-search').on('input', function() {
  var search = $(this).serialize();
  if(search === "search=") {
    search = "all"
  }
  $.get('/campgrounds?' + search, function(data) {
    $('#hiking-grid').html('');
    data.forEach(function(campground) {
      $('#hiking-grid').append(`
        <div class="col-md-3 col-sm-6">
          <div class="thumbnail">
            <img src="${ campground.image }" style="width: 100%; height:175px">
            <div class="caption" style="margin:0; padding:0px;" >
              <h4>${ campground.name }</h4>
            </div>
            <p>
              <a href="/campgrounds/${ campground._id }" class="btn btn-primary">More Info</a>
            </p>
          </div>
        </div>
      `);
    });
  });
});

$('#campground-search').submit(function(event) {
  event.preventDefault();
});