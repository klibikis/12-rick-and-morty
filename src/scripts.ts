const cardContainer = document.querySelector(".js-cards");

let rickAndMortyLink = "https://rickandmortyapi.com/api/character/?page=1"

type Origin = {
    name: string,
    url: string;
}
type Character = {
    name: string,
    status: string,
    species: string,
    image: string,
    origin: Origin
}

// MAIN funkcija kartiņu iegūšanai un noformēšanai

const addElement = (character: Character) => {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    cardContainer.appendChild(cardDiv);

    const imageDiv = document.createElement("div");
    const image = document.createElement("img") as HTMLImageElement;
    image.setAttribute("src", character.image);
    image.setAttribute("alt", character.name);
    image.setAttribute("width", "100%");

    imageDiv.classList.add("card__image")
    imageDiv.appendChild(image)
    cardDiv.appendChild(imageDiv);

    const textDiv = document.createElement("div");
    textDiv.classList.add("card__text-section")
    cardDiv.appendChild(textDiv);
    
    const cardTitle = document.createElement("h1");
    cardTitle.innerHTML = character.name;
    cardTitle.classList.add("mb-10")
    textDiv.appendChild(cardTitle);

    const deadOrAliveDiv = document.createElement("div");
    deadOrAliveDiv.classList.add("character--dead-or-alive")
    deadOrAliveDiv.classList.add("mb-10")
    const characterStatus = document.createElement("div");
    const characterStatusText = document.createElement("h2");
    characterStatusText.innerHTML = character.status + " - " + character.species;

    if(character.status === "Alive"){
        characterStatus.classList.add("character--alive");
    }else if(character.status === "Dead"){
        characterStatus.classList.add("character--dead");
    }else{
        characterStatus.classList.add("character--unknown");
    }

    deadOrAliveDiv.appendChild(characterStatus);
    deadOrAliveDiv.appendChild(characterStatusText);
    textDiv.appendChild(deadOrAliveDiv);

    const characterOriginTitle = document.createElement("h3");
    characterOriginTitle.innerHTML = "Origin:"
    const characterOrigin = document.createElement("h2");
    characterOrigin.innerHTML = character.origin.name
    characterOrigin.classList.add("mb-10");
    textDiv.appendChild(characterOriginTitle);
    textDiv.appendChild(characterOrigin);
}



const showData = (data:any) => {
    const characters = [...data.results];
    characters.forEach(character => {
        addElement(character);
        });
}


fetch(rickAndMortyLink)
.then((response) => response.json())
.then(showData);

let sum=1;
const loadMore = document.querySelector<HTMLButtonElement>(".button")
loadMore.addEventListener("click", () => {
    sum+=1;
    rickAndMortyLink = rickAndMortyLink.slice(0, -1)+sum;

        fetch(rickAndMortyLink)
        .then((response) => response.json())
        .then(showData);

})


