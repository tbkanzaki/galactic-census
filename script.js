let result = document.getElementById('result');  

async function printData(){
  let res_planets = await fetch('https://swapi.dev/api/planets/?format=json');
  let {results} = await res_planets.json();
  let index = 1;
  results.forEach((planet) => {
    let li = document.createElement('li');
      li.innerHTML = `<p>
                        <button onclick="printDetails(${index})" class="btn btn-outline-dark btn-sm">
                        ${planet.name}
                        </button>
                      </p>
                      <span id="detail${index}"></span>        
                      `
      result.appendChild(li);
      index += 1
    });
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
