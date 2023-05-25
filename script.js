let result = document.getElementById('result');  

async function printData(){
  let res_planets = await fetch('https://swapi.dev/api/planets/?format=json');
  let {results} = await res_planets.json();
  results.forEach(planet => {
    let li = document.createElement('li');
      li.innerHTML = `<p>
                        <button class="btn btn-outline-dark btn-sm">${planet.name}</button>
                      </p>`
      result.appendChild(li);
    });

}