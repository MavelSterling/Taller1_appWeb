function fetchPokemon() {
    const pokeID = document.getElementById('pokeID').value;
    
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeID}`)
        .then(response => response.json())

        .then(data => {

            // Se muestra la información básica del Pokemon
            // data.name llamo el nombre del pokemon
            document.getElementById('pokeName').textContent = data.name;

            // Se muestra los tipos del Pokemon
            const typesList = document.getElementById('pokeTypes');
            typesList.innerHTML = ""; 

            // data.types llamo los tipos de pokemon
            // listar los pokeTypes - lista sin orden
            data.types.forEach(type => {
                const listItem = document.createElement('li');
                listItem.textContent = type.type.name;
                typesList.appendChild(listItem);
            });

            // Se muestra la imagen del pokemon
            const pokeImgElem = document.getElementById('pokeImg');

            // data.sprintes llamo la imagen del pokemon
            pokeImgElem.src = data.sprites.front_default;
            pokeImgElem.style.display = 'block'; 

            // Se consulta las habilidades del Pokemon
            // data.abilities llamo las habilidades del pokemon
            const abilitiesURLs = data.abilities.map(ability => ability.ability.url);
            Promise.all(abilitiesURLs.map(url => fetch(url).then(res => res.json())))
                .then(abilitiesData => {
                    const abilitiesList = document.getElementById('pokeAbilities');
                    abilitiesList.innerHTML = "";  
                    
                    // Para listar las habilidades - lista sin orden
                    abilitiesData.forEach(abilityData => {
                        const listItem = document.createElement('li');
                        listItem.textContent = abilityData.name;
                        abilitiesList.appendChild(listItem);
                    });
                    document.querySelector('.poke-info').style.display = 'block';
                });
        })
        .catch(error => {
            console.error(error);
            
            // Ocultar la sección de información del Pokémon ya que no esta en la base de datos
            document.querySelector('.poke-info').style.display = 'none';
        });
}
