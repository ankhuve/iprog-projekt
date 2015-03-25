this.search = function(keyword){
		loading = true;
		var apiKey = "dvxLl271adHi9kSJNj29sNWp256I35Y0";
		// var url = "http://api.bigoven.com/recipes?pg=1&rpp=25&title_kw="+keyword+"&api_key="+apiKey;
		var url = "http://api.arbetsformedlingen.se/af/v0/platsannonser/soklista/yrken/it";
		// url += "/platsannonser/matchning?nyckelord=";
		// url += keyword;

		$.ajax({
			type: 'GET',

			// The URL to make the request to.
			url: url,

			// The 'contentType' property sets the 'Content-Type' header.
			// The JQuery default for this property is
			// 'application/x-www-form-urlencoded; charset=UTF-8', which does not trigger
			// a preflight. If you set this value to anything other than
			// application/x-www-form-urlencoded, multipart/form-data, or text/plain,
			// you will trigger a preflight request.
			contentType: 'application/json',

			xhrFields: {
			// The 'xhrFields' property sets additional fields on the XMLHttpRequest.
			// This can be used to set the 'withCredentials' property.
			// Set the value to 'true' if you'd like to pass cookies to the server.
			// If this is enabled, your server must respond with the header
			// 'Access-Control-Allow-Credentials: true'.
				withCredentials: true
			},

			headers: {
				'Accept': 'application/json',
				'Accept-Language': 'sv'
			// Set any custom headers here.
			// If you set any non-simple headers, your server must include these
			// headers in the 'Access-Control-Allow-Headers' response header.
			},

			success: function() {
			// Here's where you handle a successful response.
				loading = false;
            	error = false;
                dishes = data.Results;
                console.log(data);
			},

			error: function() {
			// Here's where you handle an error response.
			// Note that if the error was due to a CORS issue,
			// this function will still fire, but there won't be any additional
			// information about the error.
				error = true;
			}
		});
		
		// $.ajax({
  //           type: "GET",
  //           dataType: 'json',
  //           cache: false,
  //           url: url,
  //           headers:  {'Accept': 'application/json',
		// 		'Accept-Language': 'sv',
		// 		'From': 'eforsbe@kth.se'
		// 	},
  //           success: function (data) {
  //           	loading = false;
  //           	error = false;
  //               dishes = data.Results;
  //               console.log(data);
  //           }, 
  //           error: function(){
  //           	error = true;
  //           }
  //       });
	}

