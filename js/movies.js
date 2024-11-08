const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMmNjMTg3ZGUxMGEyZTIzODk0NzMxMTJkZjRlMjU0OSIsIm5iZiI6MTcyNzE3MTI1Ni43NjY3Miwic3ViIjoiNjZlZDJlMTMxOTIzZmUwMzI3YWRjNmRkIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.DyA3DvUXFsWMDmZa0lPR02vtIc2sGLAGebDPUM7XQXE",
  },
};

let paginationOne = document.querySelector(".pagination__one");
let paginationTwo = document.querySelector(".pagination__two");
let paginationThree = document.querySelector(".pagination__three");
let paginationFour = document.querySelector(".pagination__four");
let paginationFive = document.querySelector(".pagination__five");
let paginationSix = document.querySelector(".pagination__six");
let paginationSeven = document.querySelector(".pagination__seven");
let paginationEight = document.querySelector(".pagination__eight");
let paginationNine = document.querySelector(".pagination__nine");
let paginationTen = document.querySelector(".pagination__ten");
let paginationEleven = document.querySelector(".pagination__eleven");

let serach;
const serachFilm = document.querySelector(`[name="serachfilm"]`);
const movieContainer = document.querySelector(".moviecontainer");
const hidden = document.querySelector(".header--hidden");
let maxpages;
let page = 1;

createGenres = (args) => {
  let temp = "";
  for (let i = 0; i < args.genres.length; i++) {
    if (args.genres[i] == undefined) {
      break;
    }
    if (i == 0) {
      temp += args.genres[i].name;
    } else temp += ", " + args.genres[i].name;
    if (
      i == args.genres.length - 1 &&
      args.release_date != undefined &&
      args.release_date != null
    ) {
      temp += " | ";
    }
  }
  if (args.release_date != undefined && args.release_date != null) {
    temp += `${args.release_date[0]}${args.release_date[1]}${args.release_date[2]}${args.release_date[3]}`;
  }
  return temp;
};

let aa = async () => {
  let string = "";
  let a;
  try {
    a = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${serach}&include_adult=false&language=en-US&page=${page}`,
      options
    );
  } catch (e) {
    console.log(e);
    return;
  }

  const b = await a.json();
  maxpages = b.total_pages;

  if (b.results.length == 0) {
    hidden.classList.add("header--nothidden");
    hidden.classList.remove("header--hidden");
    return;
  }
  hidden.classList.add("header--hidden");
  hidden.classList.remove("header--nothidden");

  paginationTwo.innerHTML = "1";
  paginationTen.innerHTML = maxpages;
  check();

  paginationOne.classList.remove("pagination--hidden");
  paginationFour.classList.remove("pagination--hidden");
  paginationFive.classList.remove("pagination--hidden");
  paginationSix.classList.remove("pagination--hidden");
  paginationSeven.classList.remove("pagination--hidden");
  paginationEight.classList.remove("pagination--hidden");
  paginationEleven.classList.remove("pagination--hidden");
  paginationThree.innerHTML = "...";
  paginationNine.innerHTML = "...";

  const array = new Array(b.results.length);
  for (let i = 0; i < array.length; i++) {
    array[i] = i;
  }

  filmsfetch = async () => {
    const temp = array.map(async (elements) => {
      try {
        const temp = await fetch(
          `https://api.themoviedb.org/3/movie/${b.results[elements].id}?language=en-US`,
          options
        );
        return temp.json();
      } catch (e) {
        console.log(e);
        return;
      }
    });
    return await Promise.all(temp);
  };

  const films = await filmsfetch();

  for (let i = 0; i < b.results.length; i++) {
    if (b.results[i].poster_path == null) {
      string += `<div class="moviecontainer__wrapper">
          <img class="moviecontainer__img" src="" alt="brak" />
                 <p class="moviecontainer__name">${films[i].title}</p>
        <p class="moviecontainer__genres">${createGenres(films[i])}</p>
      
    </div>`;
    } else {
      string += `<div class="moviecontainer__wrapper">
        <picture>
          <source  class="moviecontainer__img" srcset="https://image.tmdb.org/t/p/w185/${
            b.results[i].poster_path
          }" media="(max-width:768px)"/>
          <source  class="moviecontainer__img" srcset="https://image.tmdb.org/t/p/w342/${
            b.results[i].poster_path
          }" media="(min-width: 768px) and (max-width: 1280px)"/>
          <img class="moviecontainer__img" src="https://image.tmdb.org/t/p/w500/${
            b.results[i].poster_path
          }" alt="brak" />
        </picture>
        <p class="moviecontainer__name">${films[i].title}</p>
        <p class="moviecontainer__genres">${createGenres(films[i])}</p>
    </div>`;
    }
  }

  movieContainer.innerHTML = string;
};

document.addEventListener("keydown", (e) => {
  serach = serachFilm.value;

  if (e.key == "Enter") {
    e.preventDefault();

    page = 1;
    paginationFour.innerHTML = "1";
    paginationFive.innerHTML = "2";
    paginationSix.innerHTML = "3";
    paginationSeven.innerHTML = "4";
    paginationEight.innerHTML = "5";
    reset();
    aa();
  }
});

paginationOne.addEventListener("click", efirst);
paginationTwo.addEventListener("click", eventp);
paginationFour.addEventListener("click", eventp);
paginationFive.addEventListener("click", eventp);
paginationSix.addEventListener("click", eventp);
paginationSeven.addEventListener("click", eventp);
paginationEight.addEventListener("click", eventp);
paginationTen.addEventListener("click", eventp);
paginationEleven.addEventListener("click", eEleven);

paginationOne.addEventListener("click", std);
paginationTwo.addEventListener("click", std);
paginationFour.addEventListener("click", std);
paginationFive.addEventListener("click", std);
paginationSix.addEventListener("click", std);
paginationSeven.addEventListener("click", std);
paginationEight.addEventListener("click", std);
paginationTen.addEventListener("click", std);
paginationEleven.addEventListener("click", std);

function check() {
  if (paginationFour.innerHTML == 1) {
    paginationOne.classList.add("pagination__element__disabled");
    paginationOne.removeEventListener("click", efirst);
  } else {
    paginationOne.classList.remove("pagination__element__disabled");
    paginationOne.addEventListener("click", efirst);
  }
  if (maxpages <= paginationEight.innerHTML) {
    paginationEleven.classList.add("pagination__element__disabled");
    paginationEleven.removeEventListener("click", eEleven);
  } else {
    paginationEleven.classList.remove("pagination__element__disabled");
    paginationEleven.addEventListener("click", eEleven);
  }
  if (maxpages < paginationFour.innerHTML) {
    paginationFour.classList.add("pagination__element__disabled");
    paginationFour.removeEventListener("click", eventp);
  } else {
    paginationFour.classList.remove("pagination__element__disabled");
    paginationFour.addEventListener("click", eventp);
  }

  if (maxpages < paginationFive.innerHTML) {
    paginationFive.classList.add("pagination__element__disabled");
    paginationFive.removeEventListener("click", eventp);
  } else {
    paginationFive.classList.remove("pagination__element__disabled");
    paginationFive.addEventListener("click", eventp);
  }
  if (maxpages < paginationSix.innerHTML) {
    paginationSix.classList.add("pagination__element__disabled");
    paginationSix.removeEventListener("click", eventp);
  } else {
    paginationSix.classList.remove("pagination__element__disabled");
    paginationSix.addEventListener("click", eventp);
  }
  if (maxpages < paginationSeven.innerHTML) {
    paginationSeven.classList.add("pagination__element__disabled");
    paginationSeven.removeEventListener("click", eventp);
  } else {
    paginationSeven.classList.remove("pagination__element__disabled");
    paginationSeven.addEventListener("click", eventp);
  }
  if (maxpages < paginationEight.innerHTML) {
    paginationEight.classList.add("pagination__element__disabled");
    paginationEight.removeEventListener("click", eventp);
  } else {
    paginationEight.classList.remove("pagination__element__disabled");
    paginationEight.addEventListener("click", eventp);
  }
}
function eventp(e) {
  page = e.currentTarget.innerHTML;
  reset();
  aa();
}
function std(e) {
  e.preventDefault();
}

function efirst() {
  paginationFour.innerHTML--;
  paginationFive.innerHTML--;
  paginationSix.innerHTML--;
  paginationSeven.innerHTML--;
  paginationEight.innerHTML--;
  check();
  reset();
}

function eEleven() {
  paginationFour.innerHTML++;
  paginationFive.innerHTML++;
  paginationSix.innerHTML++;
  paginationSeven.innerHTML++;
  paginationEight.innerHTML++;
  check();
  reset();
}

function reset() {
  paginationFour.classList.remove("pagination--checked");
  paginationFive.classList.remove("pagination--checked");
  paginationSix.classList.remove("pagination--checked");
  paginationSeven.classList.remove("pagination--checked");
  paginationEight.classList.remove("pagination--checked");

  if (paginationFour.innerHTML == page) {
    paginationFour.classList.add("pagination--checked");
  }
  if (paginationFive.innerHTML == page) {
    paginationFive.classList.add("pagination--checked");
  }
  if (paginationSix.innerHTML == page) {
    paginationSix.classList.add("pagination--checked");
  }
  if (paginationSeven.innerHTML == page) {
    paginationSeven.classList.add("pagination--checked");
  }
  if (paginationEight.innerHTML == page) {
    paginationEight.classList.add("pagination--checked");
  }
}
