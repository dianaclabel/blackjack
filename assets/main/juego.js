/*
2C =Two of Clubs
2D =Two of Diamonds
2H =Two of Hearts
2S =Two of Spades
*/
// Llamada patron modulo es un patron de diseño
// es una funcion autoinvocada
// cuando quiero desde el inspector de elemento accder a una varible no me va a dar el resultado.
//porque es una forma de proteger lo que esta dentro d ela función autoinvocada.
(() => {
  "use strict";
  let deck = [];
  const tipos = ["C", "D", "H", "S"],
    especiales = ["A", "J", "Q", "K"];

  // let puntosJugador = 0;
  // let puntosComputadora = 0;

  let puntosJugadores = [];

  //Referencias del HTML
  const btnPedir = document.querySelector("#btnPedir"),
    btnDetener = document.querySelector("#btnDetener"),
    btnNuevoJuego = document.querySelector("#btnNuevo");

  const divCartasJugadores = document.querySelectorAll(".divCartas"),
    puntosHTML = document.querySelectorAll("small");

  //Esta funcion inicializa el juego.
  const inicializarJuego = (numJugadores = 2) => {
    deck = crearDeck();

    puntosJugadores = [];

    for (let i = 0; i < numJugadores; i++) {
      puntosJugadores.push(0);
    }

    puntosHTML.forEach((element) => (element.innerText = 0));

    btnPedir.disabled = false;
    btnDetener.disabled = false;
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

    //-.Shuffle es una funcion de underscore que lo instalamos a traves de un CND
    // Nos devuelve el array creado de forma desordenado.
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

  // _Turno: 0 = primer jugador y el ultimo será la computadora
  const acumularPuntos = (carta, turno) => {
    puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
    puntosHTML[turno].innerText = puntosJugadores[turno];
    return puntosJugadores[turno];
  };

  const crearCarta = (carta, turno) => {
    const imgCarta = document.createElement("img");
    imgCarta.src = `assets/cartas/${carta}.png`; // 3H, JD
    imgCarta.classList.add("carta");
    divCartasJugadores[turno].append(imgCarta);
  };

  const determinarGanador = () => {
    const [puntosMinimos, puntosComputadora] = puntosJugadores;

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
    }, 100);
  };

  //turno de la computadora---------------------------------------------------
  const turnoComputadora = (puntosMinimos) => {
    let puntosComputadora = 0;

    do {
      const carta = pedirCarta();

      puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);

      crearCarta(carta, puntosJugadores.length - 1);

      // const imgCarta = document.createElement("img");
      // imgCarta.src = `assets/cartas/${carta}.png`;
      // imgCarta.classList.add("carta");
      // divCartasComputadora.append(imgCarta);

      if (puntosMinimos > 21) {
        break;
      }
    } while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);

    determinarGanador();
  };

  //Eventos--------------------------------------------------------------
  btnPedir.addEventListener("click", () => {
    const carta = pedirCarta();
    const puntosJugador = acumularPuntos(carta, 0);
    crearCarta(carta, 0);

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
    inicializarJuego();
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
