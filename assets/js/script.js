$(document).ready(function(){
	var topic = ["pikachu", "squirtle", "charmander", "bulbasaur", "mew", "mewtwo", "diglet", "meowth", "ditto", "snorlax"];
	displaytopic();

	$('.searchArea').append("<h1>Add a Pokemon here!</h1><form><input type = 'text' id = 'pokemon-input'></input><input id = 'addpokemon' type = 'submit' value = 'Submit'></input></form><br>");

function displaytopic(){
		$('.buttons').empty();
		for(var i = 0; i < topic.length; i++){
			var a = $('<button>')
			a.addClass('pokemon');
			a.attr('data-name', topic[i]);
			a.text(topic[i]);
			$('.buttons').append(a);
		}
}

//Adds the new pokemon to the topic. 
$('#addpokemon').on('click', function(){

	topic.push($('#pokemon-input').val().trim());

	displaytopic();
	
	return false; 
})


$(document).on('click', '.pokemon', showpokemon);
$(document).on('click', '#gif', animateGIF);


function showpokemon(){

	var key = "dc6zaTOxFJmzC";
	var pokemon = $(this).attr('data-name');
	var newpokemon = pokemon; 
	
	for(var i = 0; i < pokemon.length; i++){
		if(pokemon.charAt(i) == " "){
			newpokemon = pokemon.replace(' ', '+');
		}
	}

	var queryURL = "https://api.giphy.com/v1/gifs/search?q="+newpokemon+"&api_key="+key+"&limit=10&fmt=json";

	$(".pokeGif").empty();

	$.ajax({url: queryURL, method: 'GET'}).done(function(response){
		for(var i = 0; i <= 10; i++){
			//$('.pokeGif').prepend("<div class = 'row'><div class = 'col-md-2'><p>Rating: " + response.data[i].rating +"</p></div></div>");
			$('.pokeGif').prepend("<div class = 'col-md-2'><div class = 'gifContainer'><img src = "+response.data[i].images.downsized_still.url+" id = 'gif' still = "+response.data[i].images.downsized_still.url+" animate = "+response.data[i].images.downsized.url+" data-name = "+newpokemon+"><p>Rating: " + response.data[i].rating +"</p></div> </div>");
		}
	})
}


function animateGIF(){
	console.log(this);
	console.log($(this).attr('still'))
	if($(this).attr("src") == $(this).attr('animate')){
		$(this).attr("src", $(this).attr('still'));
	}
	else{
		$(this).attr("src", $(this).attr('animate'));
	}
}
	
});
