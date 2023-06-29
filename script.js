const poke_container = document.getElementById("poke-container");
const pokemon_count = 150;
const colors = {
  
};

const APIURL = `https://pokeapi.co/api/v2/pokemon/`

async function getAllPoke () {
  const res = await fetch(APIURL + '?limit=100');
  const pokeList = (await res.json()).results;
  
  pokeDetailsList = await Promise.all( pokeList.map( async (pokeInfo) => await getPokeData( pokeInfo.url)));
  
  pokeDetailsList.forEach((pokeDetail) => {
    let type = pokeDetail.types[0].type.name;
    const card = `
    <div class="pokemon" id=${type}>
        <div class="img-container">
          <img src="${pokeDetail.sprites.front_default}" alt="Bulbasaur">
        </div>
        <div class="info">
          <span class="number">${pokeDetail.id}</span>
          <h3 class="name">${pokeDetail.species.name.toUpperCase()}</h3>
          <small class="type">Type: <span>${
            pokeDetail.types[0].type.name
          }</span></small>
        </div>
      </div>;`
    document.getElementById("poke-container").innerHTML += card;
    //  dom add card( generatePkeCard(pokeDetail))
  });

}
async function getPokeData(pokeUrl) {
  const respuesta = await fetch(pokeUrl);
  return await respuesta.json();

};

getAllPoke()
