let finalPanel = function (size_graph) {
	return function (d) {
		let d1 = d3.select(this)
		let barre = d1._groups[0][0];
		let donnees = barre.__data__;

		console.log(" FAUT FAIRE LE PANEL");
		let divSVG = document.getElementById("histogram");

		makePanel(divSVG, donnees, size_graph);


	}
}

let makePanel = function (ds, data, size_graph) {

	//TODO div visible hidden quand on valide
	//TODO ajouter dans data poster, rewards, Actors, Runtime, Released

	ds.remove();
	let div = d3.select('body').append('div').attr("id", 'finalPanel');
	let btn = createButton('< back', histoMovie);
	btn.className = "buttonP";
	document.getElementById('finalPanel').appendChild(btn);


	let ratio_image = 0.4
	let posText = size_graph.y/10;

	let SVGtext = div.append('svg')
		.attr("width", size_graph.x*(1-ratio_image) - size_graph.x*0.1)
		.attr("height", size_graph.y)


	div.style.background = "black";
	div.append('img')
		.attr("src", data.poster)
		.attr("width", size_graph.x*(ratio_image) - size_graph.x*0.1)
		.attr("height", size_graph.y)
		.attr('float', "right")

	let addBackSpace = function (data, limit, splitter){
		let splitedData = data.split(splitter);
		let liste = []
		liste.push("")
		let nbLetterIn = 0
		for (let elem in splitedData){
			elem = splitedData[elem];
			if (elem.length + liste[nbLetterIn].length > limit){
				liste.push("");
				nbLetterIn ++;
			}
			liste[nbLetterIn] += elem + splitter;
		}
		return liste;
	}


	SVGtext.attr("fill", "black");
	let titre = addBackSpace(data.title, 15, " ")
	SVGtext.selectAll('.row')
			.data(titre)
			.enter()
			.append('text')
			.text(d => d)
			.classed("titleMoviePanelFinal", true)
			.attr("transform", (d,i) => `translate(${30}, ${posText * titre.length/7 + posText + (posText + 10)/2 * (i)})`);

	SVGtext.append('text')
		.text("Released on " + data.release)
		.classed("textPanelFinal", true)
		.attr("transform", `translate(${30}, ${posText * 5})`);

	SVGtext.append('text')
		.text("Duration " + data.runtime)
		.classed("textPanelFinal", true)
		.attr("transform", `translate(${30}, ${posText * 6})`);

	SVGtext
		.append('text')
		.text("Starring: ")
		.classed("textPanelFinal", true)
		.attr("transform", `translate(${30}, ${posText * 7 })`);



	let actors = addBackSpace(data.actors, 50, ",");

	SVGtext.selectAll('.row')
			.data(actors)
			.enter()
			.append('text')
			.text(d => d)
			.classed("titlePanelFinal", true)
			.attr("transform", (d,i) => `translate(${30}, ${posText * 7 + posText/2 +  (posText)/4 * (i - 1)})`);

	SVGtext
		.append('text')
		.text("Genres: ")
		.classed("textPanelFinal", true)
		.attr("transform", `translate(${30}, ${posText * 8 })`);

	SVGtext
		.append('text')
		.text(data.genre)
		.classed("titlePanelFinal", true)
		.attr("transform", `translate(${30}, ${posText * 8 + posText/2 })`);


	let awards = addBackSpace(data.awards, 50, " ");
	console.log(awards)

	SVGtext.selectAll('.row')
			.data(awards)
			.enter()
			.append('text')
			.text(d => d)
			.classed("textPanelFinal", true)
			.attr("transform", (d,i) => `translate(${30}, ${posText * 9 + posText/2 +  (posText)/2 * (i - 1)})`);

	///TODO AFFICHER ELEMENT PAR DESSUS


}

