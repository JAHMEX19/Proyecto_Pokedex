document.addEventListener("DOMContentLoaded",
	function () {
		var generation = [
			"Gen-01",
			"Gen-02",
			"Gen-03",
			"Gen-04",
			"Gen-05",
			"Gen-06",
			"Gen-07",
		];
        var filter = document.getElementById("filters"); //get by Id
        var gen = ""; 
        for(let i=0; i < generation.length; i++){

            console.log(generation[i]);

            //Indexamos agregando mi clase HTML con  listado de array `` (alt +96)

            gen += `{<input class="radio-gens" type="radio" id="radio" name="generation" checked>
            <label for="for" class="label-gen"> Name </label>}`

        }

        filter.innerHTML=gen;
	});

