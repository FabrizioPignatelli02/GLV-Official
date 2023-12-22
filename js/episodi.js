const URL = "https://api.spreaker.com/v2/users/17162641/episodes";

function prendiEpisodi() {
  const cardContainer = document.getElementById("cardContainer");
  fetch(URL)
    .then((resp) => resp.json())
    .then((podcast) => {
      const podcastArray = podcast.response.items;

      podcastArray.forEach((episodio) => {
        const divCard = document.createElement("div");
        divCard.classList.add("card");
        const divCardBody = document.createElement("div");
        divCardBody.classList.add("card-body");
        const img = document.createElement("img");
        img.classList.add("card-img-top");
        const h5 = document.createElement("h5");
        h5.classList.add("card-title");
        h5.classList.add("truncate");
        const divButton = document.createElement("div");
        divButton.classList.add("container");
        divButton.classList.add("d-flex");

        img.src = episodio.image_original_url;

        h5.innerText = episodio.title;

        divCardBody.appendChild(h5);
        divCard.appendChild(img);
        divCard.appendChild(divCardBody);

        cardContainer.appendChild(divCard);

        divCard.addEventListener("click", playSong);

        function playSong() {
          if (currentAudio) {
            currentAudio.pause();
            currentAudio.remove();
          }
          const audio = document.createElement("audio");

          audio.src = episodio.playback_url;
          currentAudio = audio;

          currentAudio.volume = 0.5;

          currentAudio.play();

          const songsTitle = document.getElementsByClassName("songsTitle")[0];
          const songsArtist = document.getElementsByClassName("songsArtist")[0];
          const playerImageSong = document.getElementById("playerImageSong");

          playerImageSong.src = episodio.image_original_url;
          songsTitle.innerText = episodio.title;
          songsArtist.innerText = "Fabrizio Pignatelli & Sara Smera";

          const playbar = document.getElementById("playbar");
          playbar.classList.remove("d-none");
          playbar.classList.add("d-block");

          const volumeRange = document.querySelector(".volume-range");

          volumeRange.addEventListener("input", function () {
            currentAudio.volume = volumeRange.value / 100;
          });

          const totalTimeAudio = document.querySelector(".totalTimeAudio");

          let durationMinute = Math.floor(episodio.duration / 1000 / 60);
          let durationSecond = Math.floor(episodio.duration / 1000 - durationMinute * 60);
          if (durationSecond < 10) {
            durationSecond = "0" + durationSecond;
          }
          if (durationMinute < 10) {
            durationMinute = "0" + durationMinute;
          }
          totalTimeAudio.innerText = durationMinute + ":" + durationSecond;
          console.log("Totale:", episodio.duration);

          const podcastRange = document.querySelector(".podcast-range");

          podcastRange.value = 0;

          podcastRange.addEventListener("input", function () {
            const currentTimeAudio = document.querySelector(".currentTimeAudio");
            let actualTime = currentAudio.duration * (podcastRange.value / 100);
            currentAudio.currentTime = actualTime;
            console.log("Actual:", actualTime);
            let minutes = Math.floor(actualTime / 60);
            let seconds = Math.floor((actualTime / 1000) % 60);
            console.log("minutes:", minutes);
            console.log("seconds:", seconds);
            if (minutes < 10) {
              minutes = "0" + minutes;
            }
            if (seconds < 10) {
              seconds = "0" + seconds;
            }
            currentTimeAudio.innerText = minutes + ":" + seconds;
          });

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
      });
    });
}

let currentAudio;

prendiEpisodi();
