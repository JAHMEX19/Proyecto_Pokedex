document.addEventListener("DOMContentLoaded", function () {
	//#region Observador de imagenes metodo intersectionObserver
	//Ayuda a no caer en sobre carga de datos
	const imgOptions = {};
	const imgObserver = new IntersectionObserver((entries, imgObserver) => {
		entries.forEach((entry) => {
			if (!entry.isIntersecting) return;
			const img = entry.target;
			var dataImage = img.getAttribute("data-image");
			img.src = dataImage;
			imgObserver.unobserve(img);
		});
	}, imgOptions);

	//#endregion

	//#region Funcion async Consumo de API con fetch
	const recibirInfo = async (endpoint) => {
		let data;
		try {
			const response = await fetch(endpoint, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});

			data = await response.json(); //metodo para extraer el JSON
			//console.log(data);
			//console.log(data.pokemon_species);
			
		} catch (error) {
			console.log(error);
		}
		return data.pokemon_species;
	};
	//#endregion

	//#region Funcion con metodo SubString STR orden
	function order(str) {
		var mySubString = str.substring(
			str.lastIndexOf("s/") + 2,str.lastIndexOf("/")
		);
		return mySubString;
	}
	//#endregion

	//#region Funcion getPokemons & Agregar pokemons al html

	async function getPokemons(numero, toggle) {
		const endpoint = `https://pokeapi.co/api/v2/generation/${numero}/`;

		var container = document.getElementById("container");
		container.innerHTML = "";
		let pokemons = [];

		pokemons = await recibirInfo(endpoint);
		//console.log(pokemons);
		//Recorremos la informacion y añadimos propiedad nr:"" segun su orden
		for (let j = 0; j < pokemons.length; j++) {
			pokemons[j].nr = order(pokemons[j].url);
			
		}
		//Ordenamos los numeros methods sort dos elementos menor(a) y mayor(b)
		pokemons.sort((a, b) => a.nr - b.nr); 
		//recoremos nuestros datos y enviamos al dom
		pokemons.forEach((item) => { //funcion para la Api de imagenes 
			
			let divItem = document.createElement("li");
			divItem.classList.add("item");

			//Indezamos en el  HTML
			divItem.innerHTML = `<div>${order(item.url)}-${item.name} </div>`;
			container.appendChild(divItem);//adjuntamos un hijo
			

			//Imagenes orden para los requerimientos de la api de img requiere 1 o 2 "0"
			let numberDecimales = order(item.url);
			if (numberDecimales < 10) {
				numberDecimales = "0" + numberDecimales;
			}
			if (numberDecimales < 100) {
				numberDecimales = "0" + numberDecimales;
			}
			var img = new Image();

			//operador ternario
			/*const toggleurl = toggle
				? "https://assets.pokemon.com/assets/cms2/img/pokedex/full/"
				: "https://www.serebii.net/pokemongo/pokemon/";*/

			const toggleurl="https://www.serebii.net/pokemongo/pokemon/";
			img.src =
				"https://media3.giphy.com/media/ycfHiJV6WZnQDFjSWH/200w.webp?cid=ecf05e475dloff2zdjxto69agv6hm0lxml7ej5431pe8qrk7&ep=v1_gifs_search&rid=200w.webp&ct=g";

				

			//url de imagen url + decimales
			const urlImage = `${toggleurl}${numberDecimales}.png`;

			img.setAttribute("data-image", urlImage);//Atributos de la Api
			img.setAttribute("class", "pokeimage");//le damos una clase
			img.setAttribute("alt", item.name);//alternative text

			divItem.appendChild(img);
			imgObserver.observe(img);
			//console.log(img);
		});
	}

	//#endregion

	//#region Agregar generaciones

	var genNumber = 1;
	getPokemons(genNumber);
	var toggle = false; //activador entre cambio de gen

	//Icon nos lleva a la gen 1
	/* Forma 1- tradicional de escuchar el add Event
    const btnIcon=document.getElementById("icon")
    btnIcon.addEventListener("click",funtion(){codigo})

    
	//Forma 2- Resumida usando la clase del objeto html
	icon.addEventListener("click", function () {
		toggle = !toggle;
		getPokemons(genNumber, toggle);
		//console.log(toggle);
		//title.innerHTML = "Pokedex";
	});*/

	var generation = [
		"Gen-01",
		"Gen-02",
		"Gen-03",
		"Gen-04",
		"Gen-05",
		"Gen-06",
		"Gen-07",
	];

	//Genera la lista en el HTML
	let filter = document.getElementById("filters"); //get by Id
	let gen = "";
	for (let i = 0; i < generation.length; i++) {
		//Indexamos agregando HTML con  listado de array `${}` (alt +96)

		gen += `<input class="radio-gens" type="radio" id=${generation[i]} value=${i+1 } name="generation" checked>
            <label for=${generation[i]} class="label-gen"> ${generation[i]} </label>`;
	}

	filter.innerHTML = gen;
	//#endregion

	//#region Evento click para los filtros de Gen

	filter.addEventListener("click", function (e) {
		let targ = e.target.type;
		//console.log(targ);

		if (targ == "radio") {
			console.log(e.target.id);
			//console.log(toggle);
			getPokemons(e.target.value, toggle);

			title.innerHTML = "Pokemon " + e.target.id;
		}
	});
	//#endregion
});
