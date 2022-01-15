let finalPanel = function (size_graph) {
	return function (d) {
		let d1 = d3.select(this)
		let barre = d1._groups[0][0];
		let donnees = barre.__data__;
		let divSVG = document.getElementById("histogram");

		makePanel(divSVG, donnees, size_graph);


	}
}

let makePanel = function (ds, data, size_graph) {
	ds.remove();
	let div = d3.select('body').append('div').attr("id", 'finalPanel');
	let btn = createButton('< back', histoMovie);
	btn.className = "buttonP";
	document.getElementById('finalPanel').appendChild(btn);


	let ratio_image = 0.4
	let posText = size_graph.y/10;

	let SVGText = div.append('svg')
		.attr("width", size_graph.x*(1-ratio_image) - size_graph.x*0.1)
		.attr("height", size_graph.y)


	div.style.background = "black";
	div.append('img')
		.attr("src", data.poster)
		.attr("width", size_graph.x*(ratio_image) - size_graph.x*0.1)
		.attr("height", size_graph.y)
		.attr('float', "right")

	let addBackSpace = function (data, limit, splitter){
		let splittedData = data.split(splitter);
		let list = []
		list.push("")
		let nbLetterIn = 0
		for (let elem in splittedData){
			let e = splittedData[elem];
			if (e.length + list[nbLetterIn].length > limit){
				list.push("");
				nbLetterIn ++;
			}
			list[nbLetterIn] += e;
			if (splittedData.length - 1 > elem) {
			    list[nbLetterIn] += splitter;
			}
		}
		return list;
	}


	SVGText.attr("fill", "black");
	let titre = addBackSpace(data.title, 15, " ")
	SVGText.selectAll('.row')
			.data(titre)
			.enter()
			.append('text')
			.text(d => d)
			.classed("titleMoviePanelFinal", true)
			.attr("transform", (d,i) => `translate(${20}, ${posText / titre.length + posText + (posText+10)/2 * (i*1.1)})`)
	.style('fill', "white");

	SVGText.append('text')
		.text("Released on " + data.release)
		.classed("textPanelFinal", true)
		.attr("transform", `translate(${30}, ${posText * 5})`).style('fill', "white");

	SVGText.append('text')
		.text("Duration " + data.runtime)
		.classed("textPanelFinal", true)
		.attr("transform", `translate(${30}, ${posText * 5.75})`).style('fill', "white");

	SVGText
		.append('text')
		.text("Starring: ")
		.classed("textPanelFinal", true)
		.attr("transform", `translate(${30}, ${posText * 6.5 })`).style('fill', "white");



	let actors = addBackSpace(data.actors, 50, ",");

	SVGText.selectAll('.row')
			.data(actors)
			.enter()
			.append('text')
			.text(d => d)
			.classed("titlePanelFinal", true)
			.attr("transform", (d,i) => `translate(${30}, ${posText * 6.5 + posText/3 +  (posText)/4 * (i)})`).style('fill', "white");

	SVGText
		.append('text')
		.text("Genres: ")
		.classed("textPanelFinal", true)
		.attr("transform", `translate(${30}, ${posText * 8 })`).style('fill', "white");

	let genres = addBackSpace(data.genre.toString(), 50, ",");

	SVGText
		.append('text')
		.text(genres)
		.classed("titlePanelFinal", true)
		.attr("transform", `translate(${30}, ${posText * 8 + posText/3 })`).style('fill', "white");


	let awards = addBackSpace(data.awards, 50, " ");

	SVGText.selectAll('.row')
			.data(awards)
			.enter()
			.append('text')
			.text(d => d)
			.classed("textPanelFinal", true)
			.attr("transform", (d,i) => `translate(${30}, ${posText * 9.5 + posText/2 +  (posText)/2 * (i - 1)})`).style('fill', "white");
}

