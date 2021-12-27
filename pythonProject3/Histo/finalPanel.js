let finalPanel = function (size_graph) {
	return function (d) {
		let d1 = d3.select(this)
		let barre = d1._groups[0][0];
		let donnees = barre.__data__;

		console.log(" FAUT FAIRE LE PANEL");
		let divSVG = document.getElementById("histogram");
		let d2 = document.getElementById("finalPanel")
		makePanel(divSVG, d2, size_graph);


	}
}

let makePanel = function (ds, elems, size_graph) {
	//TODO Faire plein de choses

	//TODO div visible hidden quand on valide

	var div = d3.select("body").append('div');
	//div.style.position = "absolute";
	ds.style.display = "none";
	var svg = div
		.append('svg')
		.attr("width", size_graph.x)
		.attr("height", size_graph.y);

	let btn = document.createElement('button').addEventListener('click', () => {
		div.style.visibility = "hidden";
		ds.style.visibility = "visible";
	});

	div.append(btn);

	svg = 	svg.append('g')
		.attr("transform", `translate(${100},${100})`);

	svg.append('rect')
		.attr("width", size_graph.x)
		.attr("height", size_graph.y)
		.classed('finalPanel', true);




	svg.append('rect')
		.attr("width", 200)
		.attr("height", 200)
		.classed("element", true)
		;
	///TODO AFFICHER ELEMENT PAR DESSUS


}

