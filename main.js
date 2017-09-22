$(document).ready(function(){
	var n = [];
	$.ajax({
		type: "GET",
		url: "https://api.twitch.tv/kraken/users/freecodecamp/follows/channels/",
		headers: {
			'Client-ID': 'i4xd3ar83oclvzg41zjnoqnzt8og0t'
		},
		success: function(data){
			for(var i= 0; i< data.follows.length; i++){
				var name= data.follows[i].channel.name;
				n.push(name);
				$.ajax({
					type: "GET",
					url: "https://api.twitch.tv/kraken/streams/" + name,
					headers: {
						'Client-ID': 'i4xd3ar83oclvzg41zjnoqnzt8og0t'
					},
					success: function(data1){
						if(data1.stream !== null){
							var logo= data1.stream.channel.logo;
							var status= data1.stream.channel.status;
							if(logo===null || status===null){
								logo = "https://static-cdn.jtvnw.net/jtv_user_pictures/twitch-profile_image-8a8c5be2e3b64a9a-300x300.png";
								status = "";
							}
							$(".all, .online1").prepend("<div class= 'well'><div class= 'row'><div class= 'col-md-4'><img src= '" + logo + "' style= 'width: 70px; height: 70px; border-radius: 30px'></div><div class= 'col-md-4 name' style= 'padding-top: 30px'><a href='" + data1.stream.channel.url + "'>" + data1.stream.channel.display_name + "</a></div><div class= 'col-md-4' style= 'padding-top: 30px'>" + status + "</div></div></div>");
						}
						else{
							$.ajax({
								type: "GET",
								url: data1._links.channel,
								headers:{
									'Client-ID': 'i4xd3ar83oclvzg41zjnoqnzt8og0t'
								},
								success: function(data2){
									var logo1= data2.logo;
									var status1= data2.status;
									if(logo1==null || status1==null){
										logo1 = "https://static-cdn.jtvnw.net/jtv_user_pictures/twitch-profile_image-8a8c5be2e3b64a9a-300x300.png";
										status1 = "";
									}
									$(".all, .offline").prepend("<div class= 'well'><div class= 'row'><div class= 'col-md-4'><img src= '" + logo1 + "' style= 'width: 70px; height: 70px; border-radius: 40px'></div><div class= 'col-md-4 name' style= 'padding-top: 30px'><a href='" + data2.url + "'>" + data2.display_name + "</a></div><div class= 'col-md-4' style= 'padding-top: 30px'>" + status1 + "</div></div></div>");
								}
							});
						}
					}
				});
			}
		}
	});
	$(".tablink").on('click', function(){
		var tab_data = $(this).data('tab');
		$(this).addClass('active').siblings().removeClass('active');
		$(tab_data).show().siblings().hide();
	});
	$.expr[':'].Contains = function(a,i,m){
    	return $(a).text().toUpperCase().indexOf(m[3].toUpperCase())>-1;
	};
	$(".prompt").on('input', function(event) {
    	var text = $(this).val();
    	$('.well').hide();
  		$('.well:Contains(' + text + ')').show();
	});
});