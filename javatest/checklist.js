var imgactive1 = 1;
var imgactive2 = 1;
var imgactive3 = 1;
var imgactive4 = 1;
document.querySelector(".close").addEventListener("click", function () {
  let modal = document.querySelector("#modal-template");
  modal.classList.add("hide");
});
let imgfetch = function (containerimg) {
  containerimg.forEach((element) => {
    element.addEventListener("click", function () {
      const list_string = this.className.split("_");
      id = list_string[1];
      fetch("http://localhost:8000/api/v1/titles/" + id)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          let modal = document.querySelector("#modal-template");
          modal.classList.remove("hide");
          const variables = {
            "movie-title": data.title,
            "movie-img":
              '<img src="' +
              data.image_url +
              '" alt="' +
              data.image_url +
              '"/>',
            "movie-genres": data.genres.map((el) => {
              return el;
            }),
            "movie-date": data.date_published,
            "movie-rated": data.rated,
            "movie-imdb_score": data.imdb_score,
            "movie-directors": data.directors.map((el) => {
              return el;
            }),
            "movie-actors": data.actors.map((el) => {
              return el;
            }),
            "movie-duration": data.duration,
            "movie-countries": data.countries.map((el) => {
              return el;
            }),
            "movie-boxoffice-usa": data.usa_gross_income,
            "movie-boxoffice-worldwide": data.worldwide_gross_income,
            "movie-description": data.description,
          };
          for (const [key, value] of Object.entries(variables)) {
            var span = document.getElementsByClassName(key)[0];
            span.innerHTML = value;
          }
        });
    });
  });
};
fetch(
  "http://localhost:8000/api/v1/titles/?year=&min_year=&max_year=&imdb_score=&imdb_score_min=&imdb_score_max=&title=&title_contains=&genre=&genre_contains=&sort_by=-imdb_score&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains="
)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    container = document.querySelector("#meilleurfilm");
    document.querySelector("#meilleurfilm").innerHTML =
      `<p class= "nomdumeilleurfilm">` +
      data.results[0].title +
      "</p>" +
      "<img class='classimg_" +
      data.results[0].id +
      "' src=" +
      data.results[0].image_url +
      "/>";
    containerimg = container.querySelectorAll("img");
    imgfetch(containerimg);
  });
function carrousel(genre, containerid) {
  let imgactive = 1;
  url =
    "http://localhost:8000/api/v1/titles/?year=&min_year=&max_year=&imdb_score=&imdb_score_min=&imdb_score_max=&title=&title_contains=&genre=" +
    genre +
    "&genre_contains=&sort_by=-imdb_score&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains=&page_size=7";
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      let container1 = document.querySelector("#container" + containerid);
      for (let img = 0; img < data.results.length; img++) {
        container1.innerHTML =
          container1.innerHTML +
          "<img  class=classimg_" +
          data.results[img].id +
          " src=" +
          data.results[img].image_url +
          "/>";
      }
      container = container1.querySelectorAll("img");
      for (var img = 4; img < container.length; img++) {
        container[img].classList.add("hide");
      }
      flechedroite(container, containerid);
      flechegauche(container, containerid);
      imgfetch(container);
    });
}
var img_pos = 0;
let flechedroite = function (container, containerid) {
  let bouton = document.querySelectorAll(
    "#carrousel" + containerid + " .bouton"
  );

  bouton[0].addEventListener("click", function () {
    if (window["imgactive" + containerid] < 4) {
      for (img = 0; img < container.length; img++) {
        container[img].classList.add("hide");
      }
      for (
        img_pos = window["imgactive" + containerid];
        img_pos < window["imgactive" + containerid] + 4;
        img_pos++
      ) {
        container[img_pos].classList.remove("hide");
      }

      window["imgactive" + containerid] += 1;
    }
  });
};

let flechegauche = function (container, containerid) {
  let bouton = document.querySelectorAll(
    "#carrousel" + containerid + " .bouton"
  );

  bouton[1].addEventListener("click", function () {
    if (window["imgactive" + containerid] < 4) {
      for (img = 0; img < container.length; img++) {
        container[img].classList.add("hide");
      }
      if (img_pos != 0) {
        for (
          img_pos = window["imgactive" + containerid];
          img_pos < window["imgactive" + containerid] + 4;
          img_pos++
        ) {
          if (img_pos != 0) {
            container[img].classList.remove("hide");
          }
        }
        if (img_pos != 0) {
          window["imgactive" + containerid] -= 1;
        }
      }
    }
  });
};

carrousel("", "1");
carrousel("horror", "2");
carrousel("fantasy", "3");
carrousel("drama", "4");
