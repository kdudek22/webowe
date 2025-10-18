
const names = ['Grzegorz', 'Wiktoria', 'Mateusz', 'Ania', 'Sandra', 'Kasia', 'Izabela', 'Weronika'];

let  numbers = [1, 2, 3, 4, 5, 6, 7, 8, 8, 9];


const countries = [
    { name: 'Nigeria', continent: 'Africa'},
    { name: 'Nepal', continent: 'Asia'},
    { name: 'Angola', continent: 'Africa'},
    { name: 'Poland', continent: 'Europe'},
    { name: 'Kenya', continent: 'Africa'},
    { name: 'Greece', continent: 'Europe'},
	{ name: 'France', continent: 'Europe'},
	{ name: 'China', continent: 'Asia'}
]

let people = [
    {"id":123, "name":"Rick Deckard", "email":"rick@bladerunner.org"},
    {"id":456, "name":"Roy Batty", "email":"roy@replicant.io"},
    {"id":789, "name":"J.F. Sebastian", "email":"j.f@tyler.com"},
    {"id":258, "name":"Pris", "email":"pris@replicant.io"}
];

let duplicateName = ['John', 'Paul', 'George', 'Ringo', 'Paul', 'Paul', 'Ringo'];

const names_with_r = names.filter(word => word.toLowerCase().includes("r"))

const list = document.getElementById("app");

const addElement = (value) => {
  const li = document.createElement("li");
  li.textContent = value; // set text
  list.appendChild(li);  // add to the <ul>
}

// 1. Na stronie wyświetl w sekcji 1 tylko imiona zawierające znak "r".  ( tablica names)
names_with_r.forEach(word => {
  addElement(word)
});





// 2. sprawdź czy tablica zawiera tylko elementy mniejsze niż 9. Wynik wyswietl na stronie w sekcji 2.
//      sprawdź, czy tablica zawiera jakieś elementy mniejsze niż 6. Wynik wyświetl w przeglądarce w sekcji 2
//      inkrementuj wszystkie elementy w tablicy numbers. Nastepnie stwórz nowa tablice zawierajaca tylko elementy nieparzyste. 
//      Nasteopnie Oblicz sumę wszystkich elementów z tablicy. Wynik wyswietl w sekcji 2


is_smaller_than_9 = numbers.every( n => n < 9)
addElement(is_smaller_than_9)

is_any_smaller_than_6 = numbers.some(n => n <6)
addElement(is_any_smaller_than_6)



sum = numbers.reduce((acc, num) => acc + num, 0);
addElement(sum)

// 3. Na stronie w sekcji 3 wyświetl tylko kraje z Europy

countries_from_europe = countries.filter(c => c.continent === "Europe")
countries_from_europe.forEach(c => {
  addElement(c.name)
})

// 4. Znajdź nazwiska wszystkich osób, które mają e-maile „replicant.io”. Wyświetlanie wyników na ekranie przegladarki w sekcji 4.
mails = people.filter(p => p.email.includes("replicant.io"))
mails.forEach(m=>{
  addElement(m.email)
})


// 5. W sekcji 5 wyswietl tylko imiona osób, które nie sa zdublowane

const companies = [
  { name: "Company One", category: "Finance", start: 1981, end: 2004 },
  { name: "Company Two", category: "Retail", start: 1992, end: 2008 },
  { name: "Company Three", category: "Auto", start: 1999, end: 2007 },
  { name: "Company Four", category: "Retail", start: 1989, end: 2010 },
  { name: "Company Five", category: "Technology", start: 2009, end: 2014 },
  { name: "Company Six", category: "Finance", start: 1987, end: 2010 },
  { name: "Company Seven", category: "Auto", start: 1986, end: 1996 },
  { name: "Company Eight", category: "Technology", start: 2011, end: 2016 },
  { name: "Company Nine", category: "Retail", start: 1981, end: 1989 },
];

unique_names = [...new Map(people.map(user => [user.name, user])).values()];
unique_names.forEach(u =>{
  addElement(u.name)
})


const ages = [33, 12, 20, 16, 5, 54, 21, 44, 61, 13, 15, 45, 25, 64, 32.]

// W sekcji 6 wyswietl odpoiwiedzi dla nastepujacych pytań: 
//  1. Wypisz liste wszytkich firm 

companies.forEach(c=>{
  addElement(c.name)
})

//  2.  Wypisz liste wszytkich pełnoletnich (tablica ages).

ages.filter(a=>a>18).forEach(a=>{
  addElement(a)
})

//  3.  Wypisz liste wszytkich firm  należacych do kategorii -  "Ratail".

companies.filter(c=>c.category === "Retail").forEach(c=>{
  addElement(c.name)
})

//  4.  Wypisz liste wszytkich firm rozpoczynajacych działanosc w latach 80.

companies.filter(c=>c.start -1980 < 10).forEach(c=>{
  addElement(c.name)
})

//  5.  Dodaj do tych wszytkich firm z punktu 4 prefix "Super". Wyniki wyswietl na ekranie.

companies.filter(c=>c.start -1980 < 10).forEach(c=>{
  addElement("Super " + c.name)
})
//  6. Posiosrtuj liste firm pod katem długości działania na rynku działanosci. Wyniki wyswietl na ekranie. 

companies.filter(c => c.category === "Technology").sort((a, b) => a.start - b.start).forEach(c => {
  addElement(c.name)
  } 
)

//  7. Wyswwietl sumaryczna liczbe lat działanosci firm z kategorii Technology. 

sum = companies.filter(c => c.category === "Technology").map(c=>c.end-c.start).reduce((acc, num) => acc + num, 0)

addElement(sum)

// 8.Kazdy rok z  tablicy ages zduplikuj. Następnie onlicz sume lat ale tylko dla lat większych od 40. Wynik napisz na ektranie.

addElement(ages.filter(a => a >20).reduce((acc, num) => acc + num, 0) * 2)