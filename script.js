document.addEventListener("DOMContentLoaded",
	function () {
		const generation = [
			"Gen-01",
			"Gen-02",
			"Gen-03",
			"Gen-04",
			"Gen-05",
			"Gen-06",
			"Gen-07",
		];
        let filter = document.getElementById("filters"); //get by Id
        let gen = ""; 
        for(let i=0; i < generation.length; i++){

            //Indexamos agregando HTML con  listado de array `${}` (alt +96)

            gen += `<input class="radio-gens" type="radio" id=${generation[i]} value=${i+1} name="generation" checked>
            <label for=${generation[i]} class="label-gen"> ${generation[i]} </label>`

        }

        filter.innerHTML=gen;
	});

