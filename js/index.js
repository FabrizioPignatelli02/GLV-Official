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

      button.addEventListener("click", playSong);

      function playSong() {
        if (currentAudio) {
          currentAudio.pause();
          currentAudio.remove();
        }
        const podcastRange = document.querySelector(".podcast-range");

        podcastRange.value = 0;
        const audio = document.createElement("audio");

        audio.src = podcast.playback_url;

        currentAudio = audio;

        currentAudio.volume = 0.5;

        currentAudio.play();

        const songsTitle = document.getElementsByClassName("songsTitle")[0];
        const songsArtist = document.getElementsByClassName("songsArtist")[0];
        const playerImageSong = document.getElementById("playerImageSong");

        playerImageSong.src = podcast.image_original_url;
        songsTitle.innerText = podcast.title;
        songsArtist.innerText = "Fabrizio Pignatelli & Sara Smera";

        const playbar = document.getElementById("playbar");
        playbar.classList.remove("d-none");
        playbar.classList.add("d-block");

        const volumeRange = document.querySelector(".volume-range");

        volumeRange.addEventListener("input", function () {
          currentAudio.volume = volumeRange.value / 100;
        });

        const totalTimeAudio = document.querySelector(".totalTimeAudio");

        let durationMinute = Math.floor(podcast.duration / 1000 / 60);
        let durationSecond = Math.floor((podcast.duration / 1000) % 60);
        if (durationSecond < 10) {
          durationSecond = "0" + durationSecond;
        }
        if (durationMinute < 10) {
          durationMinute = "0" + durationMinute;
        }
        totalTimeAudio.innerText = durationMinute + ":" + durationSecond;
        console.log("Totale:", podcast.duration);

        podcastRange.addEventListener("change", function () {
          const currentTimeAudio = document.querySelector(".currentTimeAudio");
          let actualTime = currentAudio.duration * (podcastRange.value / 100);
          currentAudio.currentTime = actualTime;
          console.log("Actual:", actualTime);
          podcastRange.value = (actualTime / currentAudio.duration) * 100;
          let minutes = Math.floor(actualTime / 60);
          let seconds = Math.floor(actualTime % 60);
          if (minutes < 10) {
            minutes = "0" + minutes;
          }
          if (seconds < 10) {
            seconds = "0" + seconds;
          }
          currentTimeAudio.innerText = minutes + ":" + seconds;
        });

        setInterval(() => {
          const currentTimeAudio = document.querySelector(".currentTimeAudio");
          podcastRange.value = (currentAudio.currentTime / currentAudio.duration) * 100;
          console.log("Dove sono:", podcastRange.value);
          let minutes = Math.floor(currentAudio.currentTime / 60);
          let seconds = Math.floor(currentAudio.currentTime % 60);
          if (minutes < 10) {
            minutes = "0" + minutes;
          }
          if (seconds < 10) {
            seconds = "0" + seconds;
          }
          currentTimeAudio.innerText = minutes + ":" + seconds;
        }, 1000);

        positionPodcastRange = 0;
        positionPodcastRange = (currentAudio.currentTime * 100) / currentAudio.duration;
        podcastRange.value = positionPodcastRange;

        const playButtonPreview = document.getElementById("playButton");
        const pauseButtonPreview = document.getElementById("pauseButton");

        playButtonPreview.addEventListener("click", play);
        pauseButtonPreview.addEventListener("click", pause);

        playButtonPreview.classList.add("d-none");
        pauseButtonPreview.classList.remove("d-none");
        pauseButtonPreview.classList.add("d-block");

        function play() {
          currentAudio.play();
          playButtonPreview.classList.add("d-none");
          pauseButtonPreview.classList.remove("d-none");
          pauseButtonPreview.classList.add("d-block");
        }

        function pause() {
          currentAudio.pause();
          playButtonPreview.classList.remove("d-none");
          pauseButtonPreview.classList.add("d-none");
        }
      }

      let currentAudio;

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
