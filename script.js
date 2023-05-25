async function printData(){
  let res_planets = await fetch('https://swapi.dev/api/planets/?format=json');
  let {results} = await res_planets.json();
  console.log(results);
}