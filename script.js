let ol_list = document.getElementById('ol_list');  
let p = document.getElementById("msg"); 
let query = document.getElementById('q'); 

async function printData(){
  clear_list();
  let index = 1;
  for (let i = 1; i < 7; i++) {

    let res_planets = await fetch("https://swapi.dev/api/planets/?page="+i);
    let {results} = await res_planets.json();

    results.forEach((planet) => {
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
  let data = await fetch("https://swapi.dev/api/planets/"+id);
  let planet = await data.json();

  let detail = document.getElementById("detail"+id); 
  detail.innerHTML = `<dl>
                        <dt>Planeta </dt>
                        <dd>${planet.name}</dd>
                        <dt>Clima</dt>
                        <dd>${planet.climate}</dd>
                        <dt>População</dt>
                        <dd>${planet.population}</dd>
                        <dt>Terreno</dt>
                        <dd>${planet.terrain}</dd>
                      </dl>`

  if (detail.style.display === "block") {
    detail.style.display = "none";
  } else {
    detail.style.display = "block";
  }
}

async function printSearch(){
  clear_list();
  p.innerHTML = '';

  let planet = await fetch("https://swapi.dev/api/planets/?search="+query.value);
  let {results} = await planet.json();

  if (results.length > 0 && query.value !== '' ){
    results.forEach((planet) => {
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
