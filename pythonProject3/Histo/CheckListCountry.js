let checked = function (choice, all_liste, cn){

    return function (e){
        let liste = cn === genreCN ? genre : country;
        console.log(choice.checked)
        if (choice.checked){

            all_liste.forEach(title => {
                if (liste.includes(title) || choice.id === title)
                    liste.push(title);
            });
        }

        else {

            liste.splice(liste.indexOf(choice.id), 1);
        }
        setListeElems(cn, liste);
    }
}



let addCheckBox = function ( courant, cn, all_liste) {
    let choice = document.createElement("input");
    choice.type = "checkbox";
    choice.id = courant;
    choice.checked = true;
    choice.className = cn;
    choice.addEventListener('change', checked(choice, all_liste, cn))
    return choice;
}


let addLabel = function (courant){
    let label = document.createElement("label")
    label.innerText = courant;

    return label;
}

let addTitle = function (title){
    let hG = document.createElement('h2');
    hG.innerText = title;
    hG.style.textAlign = "center";
    return hG;
}

let addElem = function (div, cb, label, RL){
    div.appendChild(cb);
    div.appendChild(label);
    cb.style.float = RL;
    label.style.float = RL;
}

let manageList = function (div, all_liste, liste, cn){
    for (let i = 0; i < liste.length; i++){
        let courant = liste[i];
        let cb = addCheckBox(courant, cn, all_liste);
/*        if (cn === genreCN){
            cb.onchange = (d => d.style.font = 'black');
        }*/
        let label = addLabel(courant);
        let RL = i % 2 ? "left" : "right";
        addElem(div, cb, label, RL);
        if (!((i+1) % 2))
         div.appendChild(document.createElement("br"));
    }
}

let setListeElems = (cn, elem) => cn === genreCN ? setGenre(elem) : setCountry(elem);

let deselectAll = function (all_liste, cn){
    return function (e){
        let all_checked = document.getElementsByClassName(cn);
        for(let i = all_checked.length - 1; i >= 0; i--){
            all_checked[i].checked = false;
        }
        setListeElems(cn, []);




        //console.log(document.getElementsByClassName(cn).length);
    }
}

let selectAll = function (all_liste, cn){
    return function (e){
        //console.log(document.getElementsByClassName(cn));
        let all_checked = document.getElementsByClassName(cn);
        let liste = [];
        for(let i = all_checked.length - 1; i >= 0; i--){
            all_checked[i].checked = true;
            liste.push(all_checked[i].id);
        }
        setListeElems(cn, liste);


        //console.log(document.getElementsByClassName(cn).length);
    }
}


let createButton = function (text, listener){
    let btn = document.createElement('button');
    btn.innerText = text;
    btn.addEventListener('click', listener);
    return btn;

}

let details = function (){
    let div = document.getElementById("Country");
    d3.tsv("../../Data/Metadata.tsv", (function (d){
        return {
            country:country,
            genre:genre,
        }
    })).then(function (d) {
        //TODO Find a better way, don't know how
        //TODO Style

        country = d[0].country.filter(d => d !== "" && d!=="N/A");
        genre = d[0].genre.filter(d => d !== "" && d!=="N/A");

        div.appendChild(addTitle('Country'));
        div.appendChild(createButton('DESELECT ALL', deselectAll(all_country, countryCN)));
        div.appendChild(createButton('SELECT ALL', selectAll(all_country, countryCN)));
        div.appendChild(document.createElement("br"));

        manageList(div, all_country, country, countryCN);


        div.appendChild(addTitle('Genre'));
        div.appendChild(createButton('DESELECT ALL', deselectAll(all_genre, genreCN)));
        div.appendChild(createButton('SELECT ALL', selectAll(all_genre, genreCN)));
        div.appendChild(document.createElement("br"));

        manageList(div, all_genre, genre, genreCN);

    });

}
