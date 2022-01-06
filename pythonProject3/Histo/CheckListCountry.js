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
    choice.addEventListener('change', checked(choice, all_list, cn))
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

let manageList = function (div, all_list, list, cn){
    var li = document.createElement('li');
    if (cn === countryCN)
        li.className = "scroller";

    li.style.listStyle = "none";
    li.appendChild(document.createElement("br"));
    for (let i = 0; i < list.length; i++){
        let courant = list[i];
        let cb = addCheckBox(courant, cn, all_list);
        let label = addLabel(courant);
        let RL = i % 2 ? "left" : "right";
        addElem(li, cb, label, RL);
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
        div.appendChild(createButton('SELECT ALL', selectAll(all_country, countryCN)));
        let btn = createButton('DESELECT ALL', deselectAll(all_country, countryCN))
        btn.style.float = "right"
        div.appendChild(btn);div.appendChild(document.createElement("br"));

        manageList(div, all_country, country, countryCN);

        div = document.getElementById("Genre");
        div.appendChild(addTitle('Genre'));
        div.appendChild(createButton('SELECT ALL', selectAll(all_genre, genreCN)));
        btn = createButton('DESELECT ALL', deselectAll(all_genre, genreCN))
        btn.style.float = "right"
        div.appendChild(btn);


        div.appendChild(document.createElement("br"));

        manageList(div, all_genre, genre, genreCN);
    });

}