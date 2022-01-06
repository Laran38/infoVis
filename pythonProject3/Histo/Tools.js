/*
 *
 * This file is only use to collect information from the second div, like the min year, max year, ...
 * These variables are then exported to be collected in the other files, and then use for filter information
 *
 */
const splitValues = values => values.split(", ");
const scaleW = 2, scaleH = 1.1;
const countryCN = "LabelCountry"
const genreCN = "LabelGenre"


let all_country= [];

let all_genre = [];

var filtrer = (d, elemToTake)  => {
    let to_ret = [];
    d = splitValues(d);
    for(let i = 0; i < elemToTake.length; i++){
        if(d.includes(elemToTake[i])){
            to_ret.push(elemToTake[i]);
        }
    }
    return to_ret.length === 0 ? [] : d;
}

const uniqueValues = function (tsv){
    return d3.tsv(tsv, (function (d) {
		return {
			country: splitValues(d.Country),
			genre: splitValues(d.Genre)
		};
	})).then(function(data) {

        for(let i =0; i < data.length; i++){
            data[i].country.forEach(c => {
                            if (!all_country.includes(c))
                                                    all_country.push(c.toString());});

            data[i].genre.forEach(c => {
                            if (!all_genre.includes(c))
                                                    all_genre.push(c.toString());});
        }
        all_country = all_country.filter(d => d !== "" && d!=="N/A");
        all_genre = all_genre.filter(d => d !== "" && d!=="N/A");

    });
}
uniqueValues("../Data/metadata.tsv");
let country = all_country;
let genre = all_genre;

let setGenre = l => genre = l;
let setCountry = l => country = l;




let get_elem_form = function (){
    let getDiv = (id) => document.getElementById(id);
    let min_year = getDiv("ps").querySelectorAll("input[type=number]")[0].value;
    let max_year = getDiv("ps").querySelectorAll("input[type=number]")[1].value;
    let ranking = getDiv("SelectionMenu").getElementsByClassName("Ranking")[0].value;
    let nbFilms = getDiv("nbFilms").getElementsByClassName("topMovies")[0].value;
    return {
        min_year: min_year,
        max_year: max_year,
        ranking:ranking,
        nbFilms: nbFilms
    }
}

//Todo gerer plus belles couleurs
let cScale = d3.schemeSet1 .concat(d3.schemeSet2.concat(d3.schemeSet3));