const tekstPesme = document.getElementById("Tekst-pesme")
const naslovPesme = document.getElementById("naslov-pesme")
const forma = document.getElementById("forma")
const trazeniIzvodjac = document.getElementById("trazeni-izvodjac")
const trazenaPesma = document.getElementById("trazena-pesma")
const drzacZaClanak = document.getElementById('drzac-za-clanak');
const naslov = document.getElementById('naslov');


function ucitajPodatke() {

    // const izvodjac = "Alphaville"
    // const pesma = "Forever young" prvobitni fiksni primer
    const izvodjac = trazeniIzvodjac.value
    const pesma = trazenaPesma.value


    // const url = "https://api.lyrics.ovh/v1/" + izvodjac + "/" + pesma 
    const url = `https://api.lyrics.ovh/v1/${izvodjac}/${pesma}`
    // console.log(url)
    fetch(url)

        // .then(function(response){
        //     return response.json()
        // })
        // .then((response)=>{
        //     return response.json() prva verizja orfinalna a ova druga skracenija
        // })
        .then(response => response.json())
        .then(objekat => {
            // console.log(objekat.lyrics)
            // neki text koji sam povukao
            // TODO:dodati tekst u HTML
            naslovPesme.innerText = izvodjac + "-" + pesma
            tekstPesme.innerText = objekat.lyrics ? objekat.lyrics : "Nema trazenog teksta pesme"
            // naslovPesme.innerText = objekat.pesma ja samnesto probao
        })
}

//spreci podrazumevano ponasanje
// console.log(123123123);primer da li radi ili i ne trba d apokazuje
// const dugme = document.getElementById('dugme');


function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function ucitajWiki() {
    const trazenaRec = trazeniIzvodjac.value.split(' ').map(capitalize).join(' ');
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${trazenaRec}&prop=extracts|pageimages|info&pithumbsize=400&inprop=url&redirects=&format=json&origin=*`;
    drzacZaClanak.innerHTML = '';
    naslov.innerText = '';

    fetch(url)
        .then(response => response.json())
        .then(podatak => {
            const pages = podatak.query.pages;
            const clanak = Object.values(pages)[0] // pretvara vrednosti objekta u niz
            const imgSrc = clanak.thumbnail ? clanak.thumbnail.source : 'images/default.jpg';

            naslov.innerText = clanak.title;
            drzacZaClanak.innerHTML += `<img src="${imgSrc}" alt="${clanak.title}">`
            drzacZaClanak.innerHTML += clanak.extract.substring(0, 1000) + "[...}";
            drzacZaClanak.innerHTML += `<a href="${clanak.fullurl}">read more</a>`;

        })
}
forma.addEventListener("submit", function (e) {
    e.preventDefault();
    ucitajPodatke();
    ucitajWiki();
})

