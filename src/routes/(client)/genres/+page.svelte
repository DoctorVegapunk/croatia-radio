// This code displays a list of radio stations based on selected genres

<script lang="ts">
    // Importing the getStations function from the updateRadio module
    import getStations from "$lib/updateRadio";

    // Importing the RadioBox component from the specified path
    import RadioBox from '../../../components/major/radioBox.svelte';

    // Exporting the data variable
    export let data;

    // Accessing the genres data from the exported data
    const genres = data.genres;

    // Initializing variables
    let stations: any = [];
    let genredStations = [];
    let selectedGenre: any;

    // Function to handle genre change
    const changeGenre = (e: any) => {
        // Get the selected genre
        const genre = e.target.selectedOptions[0].innerHTML;

        // Retrieve stations data based on the selected genre
        getStations().then((stationsData) => {
            const stationsFiltered = stationsData.filter((station: any) => station.genres.includes(genre));
            stations = stationsFiltered;
            console.log("New Filter", stationsFiltered);
        });
    };

    // Function to navigate to the next modal
    const nextModal = (i: any) => {
        const modal = document.getElementById("station" + i);
        const nextModal = document.getElementById("station" + (i + 1));

        console.log(modal.classList);

        // Hide the current modal
        modal.style.display = "none";
        modal.removeAttribute("role");
        modal.removeAttribute("aria-modal");
        modal.classList.remove("show");

        // Display the next modal
        nextModal.style.display = "block";
        nextModal.setAttribute("role", "modal");
        nextModal.setAttribute("aria-hidden", "true");
        nextModal.classList.add("show");
    };

    // Function to navigate to the previous modal
    const prevModal = (i: any) => {
        const modal = document.getElementById("station" + i);
        const nextModal = document.getElementById("station" + (i - 1));

        console.log(modal.classList);

        // Hide the current modal
        modal.style.display = "none";
        modal.removeAttribute("role");
        modal.removeAttribute("aria-modal");
        modal.classList.remove("show");

        // Display the previous modal
        nextModal.style.display = "block";
        nextModal.setAttribute("role", "modal");
        nextModal.classList.add("show");
    };

    // Function to close the modal
    const closeModal = (i: any) => {
        const audio = <HTMLVideoElement>document.getElementById("audio" + i);
        console.log(audio.pause());

        const body = document.body;
        // body.style.overflow = "";
        // body.style.paddingRight= "0"
        body.setAttribute("style", "");
        body.classList.remove("modal-open");
        document.getElementsByClassName("modal-backdrop")[0].remove();

        const modal = document.getElementById("station" + i);
        modal.style.display = "none";
        modal.setAttribute("aria-hidden", "true");
        modal.removeAttribute("role");
        modal.removeAttribute("aria-modal");
        modal.classList.remove("show");
    };

    // Function to open the modal
    const openModal = (i: any) => {
        const body = document.body;
        body.style.overflow = "hidden";
        body.style.paddingRight = "0px";
        body.classList.add("modal-open");
        const backDrop = document.body.appendChild(document.createElement("div"));
        backDrop.classList.add("modal-backdrop");
        backDrop.classList.add("fade");
        backDrop.classList.add("show");

        const modal = document.getElementById("station" + i);
        modal.style.display = "block";
        modal.setAttribute("role", "dialog");
        modal.classList.add("show");
    };

    // Function to convert text to title case
    function toTitleCase(text: any) {
        return text.toLowerCase().replace(/(?:^|\s)\w/g, function (match: any) {
            return match.toUpperCase();
        });
    }
</script>
<div>
    <!-- Displaying the heading for genres -->
    <p class="text-2xl font-bold">Genres</p>
    <div class="my-10">
        <!-- Select element for choosing a genre -->
        <select class="form-select" aria-label="Default select example" bind:value={selectedGenre} style="width:fit-content" on:change={changeGenre}>
            <option selected>No Genre</option>
            <!-- Iterating over the genres and displaying them as options -->
            {#each genres as genre, i}
                <option value={i}>{genre}</option>
            {/each}
        </select>
        <!-- Checking if there are any radio stations to display -->
        {#if stations.length > 0}
            <!-- Grid layout for displaying the radio stations -->
            <div class="grid grid-cols-1 md:grid-cols-3 py-10">
                <!-- Iterating over each radio station -->
                {#each stations as station, i}
                    <div class="flex my-2 relative border shadow-md px-4 border-black rounded-lg py-6">
                        <!-- Displaying the radio station's favicon -->
                        <img alt={station.name} src={station.favicon} class="w-1/3 my-auto" />
                        <span class="ml-4">
                            <span class="flex">
                                <!-- Displaying the radio station's name and topic -->
                                <p class="text-lg font-bold">{toTitleCase(station.name)}</p>
                                <p class="ml-2 bg-slate-700 text-white robotoBlack text-xs tracking-wider my-auto p-1 rounded-md">{station.topic.toUpperCase()}</p>
                            </span>
                            <!-- Displaying the country of the radio station -->
                            <p class="my-1">Country: {station.country}</p>
                            <span class="flex">
                                <!-- Iterating over the genres of the radio station and displaying them -->
                                {#each station.genres as genre}
                                    <p class="text-white bg-slate-500 text-xs h-fit my-1 py-1 px-2 rounded-md mr-2">#{genre}</p>
                                {/each}
                            </span>
    
                            <span class="flex my-1">
                                <!-- Iterating over the languages of the radio station and displaying them -->
                                {#each station.languages as language}
                                    <p class="underline text-sm mr-2">{language}</p>
                                {/each}
                            </span>
                            <span class="absolute bottom-6 right-6">
                                <!-- Displaying a play button to open the radio station modal -->
                                <img src="/play.png" width="20" alt="Play Button" on:click={()=>{openModal(i)}} on:keydown={()=>{}} />
                            </span>
                            
                            <!-- Modal -->
                            <!-- Modal for displaying detailed information about the radio station -->
                            <div class="modal fade" id={"station"+i} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content shadow-xl !shadow-amber-200 !bg-amber-100">
                                        <div class="modal-header border-0">
                                            <!-- Displaying the radio station's name in the modal title -->
                                            <h1 class="modal-title fs-5 font-bold" id="exampleModalLabel">{station.name}</h1>
                                            <!-- Button to close the modal -->
                                            <button class="btn-close" on:click={()=>{closeModal(i)}} aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <!-- Displaying additional details of the radio station -->
                                            <!-- For example: radio station's favicon, audio player, etc. -->
                                            <!-- Commenting out the code to disable these elements -->
                                            <!-- <img alt="Radio Icon" class="mx-auto my-2" src={station.favicon} width="150" />
                                            <audio controls class="mx-auto my-2">
                                                <source src={station.url} />
                                                <source src={station.urlResolved}/>
                                                Your browser does not support the audio element.
                                            </audio> -->
                                            <RadioBox firstStation={station} secondStation={stations[i+1]} stationIndex={()=>{return i}} lastStationIndex={()=>(stations.length - 1)} next={()=>{nextModal(i)}} prev={()=>{prevModal(i)}}/>
                                        </div>
                                        <div class="modal-footer border-0">
                                            <!-- Button to close the modal -->
                                            <button class="btn !bg-amber-200 hover:!bg-amber-300" on:click={()=>{closeModal(i)}}>Close</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </span>
                    </div>
                {/each}
            </div>
        {:else}
            <!-- Displaying a message when there are no radio stations to display -->
            <p class="text-center text-black my-10 font-bold">No radio stations to display, please select a genre.</p>
        {/if}
    </div>
</div>