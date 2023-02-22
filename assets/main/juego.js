/*
2C =Two of Clubs
2D =Two of Diaminds
2H =Two of Hearts
2S =Two of Spades
*/

let deck = [];
const tipos = ["C", "D", "H", "S"];
const especiales = ["A", "J", "Q", "K"];

let puntosJugador = 0;
let puntosComputadoras = 0;

//referencias del HTML
const btnPedir = document.querySelector("#btnPedir");
const puntajeSmall = document.querySelector("#puntaje");

// esta funcion crea una nueva baraja
const crearDeck = () => {
  for (let i = 2; i <= 10; i++) {
    for (let tipo of tipos) {
      deck.push(i + tipo);
    }
  }

  for (let especial of especiales) {
    for (let tipo of tipos) {
      deck.push(especial + tipo);
    }
  }
  //   console.log(deck);
  deck = _.shuffle(deck);
  console.log(deck);
  return deck;
};

// esta funcion me permite tener una nueva carta
const pedirCarta = () => {
  if (deck.length === 0) {
    throw "No hay cartas en el deck";
  }

  const carta = deck.pop();

  // console.log(deck);
  //carta debe ser de la baraja
  return carta;
};

//-----------------------------codigo largo------------------------------------------------------------------

// const valorCarta = (carta) => {
//   //el primer caracter se incluye y el ultimo se excluye al utilizar en metodo substring
//   const valor = carta.substring(0, carta.length - 1);

//   let puntos = 0;

//   //isNaN me permite evaluar si lo que esta dentro es un numero o no.
//   //la respuesta sera booleano true -> si no es un numero y false -> si es un numero
//   if (isNaN(valor)) {
//     console.log("No es un numero");

//     //operador ternario
//     puntos = valor === "A" ? 11 : 10;
//   } else {
//     // console.log("Es un numero ");

//     //Lo multiplo para que mi string '5' se convierta en numero
//     puntos = valor * 1;
//   }

//   console.log(puntos);
// };

//---------------------------------------codigo reducido-----------------------------------------------
const valorCarta = (carta) => {
  const valor = carta.substring(0, carta.length - 1);

  return isNaN(valor)
    ? (puntos = valor === "A" ? 11 : 10)
    : (puntos = valor * 1);
};

crearDeck();
// pedirCarta();

// const valor = valorCarta(pedirCarta());
// console.log({ valor });

//Eventos--------------------------------------------------------------
btnPedir.addEventListener("click", () => {
  const carta = pedirCarta();

  puntosJugador = puntosJugador + valorCarta(carta);
  puntajeSmall.innerHTML = puntosJugador;
});
