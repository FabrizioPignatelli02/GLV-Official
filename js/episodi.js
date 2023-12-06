const URL = "https://api.spreaker.com/v2/users/17162641/episodes";

function prendiEpisodi() {
  const cardContainer = document.getElementById("cardContainer");
  fetch(URL)
    .then((resp) => resp.json())
    .then((podcast) => {
      const podcastArray = podcast.response.items;
      console.log("Podcast:", podcastArray);

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
        console.log(img);

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
          audio.controls = true;

          const sourceAudio = document.createElement("source");
          sourceAudio.src = "";
          sourceAudio.type = "audio/mpeg";

          audio.appendChild(sourceAudio);
          sourceAudio.src = episodio.playback_url;
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
