let checked = function (choice, all_list, cn){
    return function (e){
        let list = cn === genreCN ? genre : country;
        if (choice.checked){
            all_list.forEach(title => {
                if (choice.id === title)
                    list.push(title);
            });
        }
        else {
            list.splice(list.indexOf(choice.id), 1);
        }
        setListElem(cn, list);
    }
}



let addCheckBox = function ( courant, cn, all_list) {
    let choice = document.createElement("input");
    choice.type = "checkbox";
    choice.id = courant;
    choice.checked = true;
    choice.className = cn;


    choice.style.width = "12px";
    choice.style.height = "12px";
    choice.style.opacity = "0";
    if (cn === genreCN){
        console.log(cn)

        var styleElem = document.head.appendChild(document.createElement("style"));
        couleur = cScale[all_genre.indexOf(courant)]
        styleElem.innerHTML = "#"+courant+" + label:before {background-color:"+ couleur+ "}";
    }

    choice.addEventListener('change', checked(choice, all_list, cn))
    return choice;
}


let addLabel = function (courant){
    let label = document.createElement("label")
    label.innerText = courant;
    label.className = "LabelGenre";
    return label;
}

let addTitle = function (title){
    let hG = document.createElement('h2');
    hG.innerText = title;
    hG.style.textAlign = "center";
    return hG;
}

let addElem = function (div, cb, label, cn, RL){
    div.appendChild(cb);
    div.appendChild(label);

    if(cn === genreCN){
        label.style.position = "absolute"
        label.style.zIndex = "-1";
        cb.style.float = RL % 2 === 0 ? "left" : "right";
        label.style.float = RL % 2 === 0 ? "right" : "left";
        cb.style.position = "absolute"
    }
    else {
        cb.style.opacity = "100";
        label.className = cn;
    }


}

let manageList = function (div, all_list, list, cn){
    var li = document.createElement('li');
    if (cn === countryCN)
        li.className = "scroller";

    li.style.listStyle = "none";
    //li.appendChild(document.createElement("br"));
    for (let i = 0; i < list.length; i++){
        let courant = list[i];
        let cb = addCheckBox(courant, cn, all_list);
        let label = addLabel(courant);
        let divc = document.createElement('div');
        addElem(divc, cb, label, cn, i);
        li.appendChild(divc);
        li.appendChild(document.createElement("br"));
    }
    div.appendChild(li);
}

let setListElem = (cn, elem) => cn === genreCN ? setGenre(elem) : setCountry(elem);

let deselectAll = function (all_list, cn){
    return function (e){
        let all_checked = document.getElementsByClassName(cn);
        for(let i = all_checked.length - 1; i >= 0; i--){
            all_checked[i].checked = false;
        }
        setListElem(cn, []);
    }
}

let selectAll = function (all_list, cn){
    return function (e) {
        let all_checked = document.getElementsByClassName(cn);
        let list = [];
        for(let i = all_checked.length - 1; i >= 0; i--){
            all_checked[i].checked = true;
            list.push(all_checked[i].id);
        }
        setListElem(cn, list);
    }
}


let createButton = function (text, listener){
    let btn = document.createElement('button');
    btn.innerText = text;
    btn.addEventListener('click', listener);
    btn.className = "btn";
    return btn;
}

let details = function (){
    d3.tsv("../Data/metadata.tsv", (function (d){
        return {
            country:country,
            genre:genre,
        }
    })).then(function (d) {
        country = d[0].country.filter(d => d !== "" && d!=="N/A");
        genre = d[0].genre.filter(d => d !== "" && d!=="N/A");

        let div = document.getElementById("Country");

        div.appendChild(addTitle('Country'));
        div.appendChild(createButton('Select all', selectAll(all_country, countryCN)));
        let btn = createButton('Deselect all', deselectAll(all_country, countryCN))
        btn.style.float = "right"
        div.appendChild(btn);
        div.appendChild(document.createElement("br"));

        manageList(div, all_country, country, countryCN);

        div = document.getElementById("Genre");
        div.appendChild(addTitle('Genre'));
        div.appendChild(createButton('Select all', selectAll(all_genre, genreCN)));
        btn = createButton('Deselect all', deselectAll(all_genre, genreCN))
        btn.style.float = "right"
        div.appendChild(btn);


        //div.appendChild(document.createElement("br"));

        manageList(div, all_genre, genre, genreCN);
    });

}