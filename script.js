let ol_list = document.getElementById('ol_list');  
let p = document.getElementById("msg"); 
let query = document.getElementById('q'); 

async function printData(){
  clear_list();
  let index = 1;
  for (let i = 1; i < 7; i++) {

    let res_planets = await fetch("https://swapi.dev/api/planets/?page="+i);
    let {results} = await res_planets.json();

    results.forEach(planet => {
      let li = document.createElement('li');
      li.innerHTML = `<p>
                        <button onclick="printDetails(${index})" class="btn btn-outline-dark btn-sm">
                          ${planet.name}
                        </button>
                      </p>
       
                        <span id="detail${index}"></span>        

                      `
      ol_list.appendChild(li);
      index += 1;
    });
  }
  p.innerHTML = '';
  query.value = '';
}

async function printDetails(id){
  let part1, part2;
  let data = await fetch("https://swapi.dev/api/planets/"+id);
  let planet = await data.json();

  let detail = document.getElementById("detail"+id); 
  part1 = `<dl>
              <dt>Planeta</dt>
              <dd>${planet.name}</dd>
              <dt>Clima</dt>
              <dd>${planet.climate}</dd>
              <dt>População</dt>
              <dd>${planet.population}</dd>
              <dt>Terreno</dt>
              <dd>${planet.terrain}</dd>
            </dl>
            <dl>
              <dt>Residentes</dt>
          `
  detail.innerHTML = part1;
  let residents = planet.residents
  if (residents.length > 0 ){
    printResidents(residents,id);
  }
  else {
    part2 = ` <dd>Não há registros de residentes nesse planeta.</dd>
            </dl> `
    detail.innerHTML = part1 + part2;
  }
 
  if (detail.style.display === "block") {
    detail.style.display = "none";
  } else {
    detail.style.display = "block";
  }
}

async function printResidents(residents,id){
  let detail = document.getElementById("detail"+id);  
  let tbl, thead, tbdy, td, tr ;
  tbl = document.createElement('table');
  tbl.style.width = '70%';
  tbl.setAttribute('class', 'table table-dark table-hover');
  tbl.setAttribute('border', '1');
  
  let header = ["Nome", "Data de Nascimento"];
  thead = document.createElement('thead');
  thead.setAttribute('class', 'table-light');
  tbl.appendChild(thead);

  for (var i=0; i<header.length; i++) {
    thead.appendChild(document.createElement("th")).
          appendChild(document.createTextNode(header[i]));
  }

  tbdy = document.createElement('tbody');

  residents.forEach(async (resident) => {
    let data = await fetch(resident);
    let people = await data.json();
    
    tr = tbl.insertRow(0); 
    td = tr.insertCell(0);
    td.innerHTML =people.name;
    td = tr.insertCell(1);
    td.innerHTML = people.birth_year;
    tr.appendChild(td)
    tbdy.appendChild(tr);
  });
  tbl.appendChild(tbdy);
  detail.appendChild(tbl);
}

async function printSearch(){
  clear_list();
  p.innerHTML = '';

  let planet = await fetch("https://swapi.dev/api/planets/?search="+query.value);
  let {results} = await planet.json();

  if (results.length > 0 && query.value !== '' ){
    results.forEach(planet => {
      let li = document.createElement('li');
      li.innerHTML  = `<dl>
                          <dt>Planeta </dt>
                          <dd>${planet.name}</dd>
                          <dt>Clima</dt>
                          <dd>${planet.climate}</dd>
                          <dt>População</dt>
                          <dd>${planet.population}</dd>
                          <dt>Terreno</dt>
                          <dd>${planet.terrain}</dd>
                        </dl>`
      ol_list.appendChild(li);
    });
  }
  else {
    p.innerHTML = 'Nenhum resultado encontrado';
  }
}

function clear_list(){
  if (ol_list != null) {
    while (ol_list.hasChildNodes()) {
      ol_list.removeChild(ol_list.firstChild);
    }
  }
}
