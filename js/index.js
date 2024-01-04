const URL = "https://api.spreaker.com/v2/users/17162641/episodes";

function ultimoEpisodio() {
  const ultimoEpisodio = document.getElementById("ultimoEpisodio");
  fetch(URL)
    .then((resp) => resp.json())
    .then((ulitmoPodcast) => {
      const podcast = ulitmoPodcast.response.items[0];
      const imgCard = document.createElement("img");
      imgCard.src = podcast.image_original_url;
      const h3 = document.createElement("h3");
      h3.innerText = podcast.title;
      const p = document.createElement("p");
      p.innerText = podcast.published_at.substr(0, 10);
      const div = document.createElement("div");
      div.id = "lastEpisodeInfo";

      const button = document.createElement("button");
      button.innerText = "PLAY NOW";
      button.classList.add("button-style");

      const h1 = document.createElement("h1");
      h1.innerText = "LAST RELEASED❗";

      ultimoEpisodio.appendChild(imgCard);
      div.appendChild(h1);
      div.appendChild(h3);
      div.appendChild(p);
      div.appendChild(button);
      ultimoEpisodio.appendChild(div);
    });
}

function episodiRecenti() {
  const episodiRecenti = document.getElementById("episodiRecenti");
  fetch(URL)
    .then((resp) => resp.json())
    .then((episodi4) => {
      const episodi = episodi4.response.items;
      for (let i = 0; i < 4; i++) {
        let episodio = episodi[i];
        const divCard = document.createElement("div");
        divCard.classList.add("card");
        const divCardBody = document.createElement("div");
        divCardBody.classList.add("card-body");
        const img = document.createElement("img");
        img.classList.add("card-img-top");
        const h5 = document.createElement("h5");
        h5.classList.add("card-title");
        h5.classList.add("truncate");
        const p = document.createElement("p");

        img.src = episodio.image_original_url;

        h5.innerText = episodio.title;

        const data = episodio.published_at;

        p.innerText = data.substr(0, 10);

        divCardBody.appendChild(h5);
        divCard.appendChild(img);
        divCardBody.appendChild(p);
        divCard.appendChild(divCardBody);

        episodiRecenti.appendChild(divCard);
      }
    });
}

ultimoEpisodio();
episodiRecenti();
