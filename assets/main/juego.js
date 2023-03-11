/*
2C =Two of Clubs
2D =Two of Diaminds
2H =Two of Hearts
2S =Two of Spades
*/
(() => {
  "use strict";
  let deck = [];
  const tipos = ["C", "D", "H", "S"],
    especiales = ["A", "J", "Q", "K"];

  // let puntosJugador = 0;
  // let puntosComputadora = 0;

  let puntosJugadores = [];

  //referencias del HTML
  const btnPedir = document.querySelector("#btnPedir"),
    btnDetener = document.querySelector("#btnDetener"),
    btnNuevoJuego = document.querySelector("#btnNuevo");

  const divCartasJugador = document.querySelector("#jugador-cartas"),
    divCartasComputadora = document.querySelector("#computadora-cartas"),
    puntajeSmalls = document.querySelectorAll("small");

  //Esta funcion inicializa el juego.
  const inicializarJuego = (numJugadores = 2) => {
    deck = crearDeck();

    for (let i = 0; i < numJugadores; i++) {
      puntosJugadores.push(0);
    }

    console.log({ puntosJugadores });
  };

  // esta funcion crea una nueva baraja
  const crearDeck = () => {
    deck = [];
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

    return _.shuffle(deck);
  };

  // esta funcion me permite tener una nueva carta
  const pedirCarta = () => {
    if (deck.length === 0) {
      throw "No hay cartas en el deck";
    }

    // const carta = deck.pop();

    // console.log(deck);
    //carta debe ser de la baraja
    return deck.pop();
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

    return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;
  };

  // pedirCarta();

  // const valor = valorCarta(pedirCarta());
  // console.log({ valor });

  const acumularPuntos = () => {};

  //turno de la computadora---------------------------------------------------
  const turnoComputadora = (puntosMinimos) => {
    do {
      const carta = pedirCarta();

      puntosComputadora = puntosComputadora + valorCarta(carta);
      puntajeSmalls[1].innerHTML = puntosComputadora;

      const imgCarta = document.createElement("img");
      imgCarta.src = `assets/cartas/${carta}.png`;
      imgCarta.classList.add("carta");
      divCartasComputadora.append(imgCarta);

      if (puntosMinimos > 21) {
        break;
      }
    } while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);

    setTimeout(() => {
      if (puntosComputadora === puntosMinimos) {
        alert("Nadie gana");
      } else if (puntosMinimos > 21) {
        alert("Computadora gana");
      } else if (puntosComputadora > 21) {
        alert("Jugador gana");
      } else {
        alert("computadora gana");
      }
    }, 10);
  };

  //Eventos--------------------------------------------------------------
  btnPedir.addEventListener("click", () => {
    const carta = pedirCarta();

    puntosJugador = puntosJugador + valorCarta(carta);
    puntajeSmalls[0].innerHTML = puntosJugador;

    const imgCarta = document.createElement("img");
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add("carta");
    divCartasJugador.append(imgCarta);

    if (puntosJugador > 21) {
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      turnoComputadora(puntosJugador);
    } else if (puntosJugador === 21) {
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      turnoComputadora(puntosJugador);
    }
  });

  btnDetener.addEventListener("click", () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;

    turnoComputadora(puntosJugador);
  });
  // Forma corta de recargar ----------------------------
  // btnNuevoJuego.addEventListener("click", () => {
  //   location.reload();
  // });

  //------------------------------------------------------

  btnNuevoJuego.addEventListener("click", () => {
    console.clear();

    inicializarJuego();
    // deck = [];
    // deck = crearDeck();

    puntosJugador = 0;
    puntosComputadora = 0;

    puntajeSmalls[0].innerHTML = 0;
    puntajeSmalls[1].innerHTML = 0;

    divCartasComputadora.innerHTML = "";
    divCartasJugador.innerHTML = "";

    btnPedir.disabled = false;
    btnDetener.disabled = false;
  });

  //codigo de logica de compañero-------------------------

  // if (puntosJugador === puntosComputadora){
  //   alert('Tablas!!');
  // }
  // else if (puntosJugador > puntosComputadora && puntosJugador <= 21  || puntosComputadora > 21){
  //   alert('Ganaste!!!');
  // }else if (puntosJugador < puntosComputadora && puntosComputadora <= 21 || puntosJugador > 21){
  //   alert('Perdiste!!!');
  // }
})();
