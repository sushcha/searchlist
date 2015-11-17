
var getData = function(file, name, post) {
	$.getJSON( file, function( data ) {
	  if (name != undefined && post != undefined) {
	  	var newItem = {"name" : name,
	  					"designation": post,
	  					"avatar": "http://coenraets.org/apps/angular-directory/pics/james_king.jpg"
					  };
		$("#myFilter")[0].value = "";
		data.push(newItem);
		$("#new-employee")[0].style.display = "none";
	  }
	  data.sort(function(a, b) {
	      var textA = a.name.toUpperCase();
	      var textB = b.name.toUpperCase();
	      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
	  });		
	  var items = [];
	  $.each( data, function( key, val ) {
	    items.push( "<li class='item' id='" + key + "'>" + "<img id='avatar' src=" + val.avatar + ">" + "<h3 class='name'>" + val.name + "</h3>" +  "<p>" + val.designation + "</p>" + "</li>" );
	  });
	  $( "<ul/>", {
	    "class": "my-new-list",
	    html: items.join( "" )
	  }).appendTo( "body" );
	});
}

var runFilter = function(filter){
	$(filter).on('keyup', function() {
		var filter = this.value.toUpperCase();
		var lis = $('li');
		for(var i=0; i<lis.length;i++) {
			var name = lis[i].getElementsByClassName('name')[0].innerHTML;
			if (name.toUpperCase().indexOf(filter) == 0) {
				lis[i].style.display = 'flex';
			}
			else
				lis[i].style.display = 'none';
		}
		for(var i=0;i<lis.length;i++) {
			if (lis[i].style.display == "none"){
				$("#new-employee")[0].style.display = "block"
			}
			else
				$("#new-employee")[0].style.display = "none"
		}
	})
}





$( document ).ready(function() {
    
    getData("data.json");
    
    runFilter("#myFilter");

    $("#add-new").on("click", function() {
    	var newName = $("#new-name")[0].value;
    	var newDesignation = $("#new-designation")[0].value;
    	$("#new-name")[0].value = "";
		$("#new-designation")[0].value = "";
    	console.log(newName, newDesignation);
    	getData("data.json", newName, newDesignation)
    })
    
});

