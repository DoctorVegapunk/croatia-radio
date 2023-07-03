<script lang="ts">
    // Importing RadioBox component
    import RadioBox from "../../../components/major/radioBox.svelte";

    // Exporting data variable
    export let data;

    // Accessing stations data from the imported data
    const stations = data.stations;

    // Function to navigate to the next modal
    const nextModal = (i: any) => {
        const modal = document.getElementById("station" + i);
        const nextModal = document.getElementById("station" + (i + 1));

        // Hiding current modal
        modal.style.display = "none";
        modal.removeAttribute("role");
        modal.removeAttribute("aria-modal");
        modal.classList.remove("show");

        // Displaying next modal
        nextModal.style.display = "block";
        nextModal.setAttribute("role", "modal");
        nextModal.setAttribute("aria-hidden", "true");
        nextModal.classList.add("show");
    }

    // Function to navigate to the previous modal
    const prevModal = (i: any) => {
        const modal = document.getElementById("station" + i);
        const prevModal = document.getElementById("station" + (i - 1));

        console.log(modal?.classList);
        
        // Hiding current modal
        modal.style.display = "none";
        modal.removeAttribute("role");
        modal.removeAttribute("aria-modal");
        modal.classList.remove("show");

        // Displaying previous modal
        prevModal.style.display = "block";
        prevModal.setAttribute("role", "modal");
        prevModal.classList.add("show");
    }

    // Function to close the modal
    const closeModal = (i: any) => {
        const audio = <HTMLVideoElement>document.getElementById("audio" + i);
        console.log(audio.pause());
        const body = document.body;
        // body.style.overflow = "";
        // body.style.paddingRight= "0";
        body.setAttribute("style", "");
        body.classList.remove("modal-open");
        document.getElementsByClassName("modal-backdrop")[0].remove();

        const modal = document.getElementById("station" + i);
        modal.style.display = "none";
        modal.setAttribute("aria-hidden", "true");
        modal.removeAttribute("role");
        modal.removeAttribute("aria-modal");
        modal.classList.remove("show");
    }

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
    }

    // Function to convert text to title case
    function toTitleCase(text: any) {
        return text.toLowerCase().replace(/(?:^|\s)\w/g, function (match: any) {
            return match.toUpperCase();
        });
    }
</script>

<div>
    <p class="text-2xl font-bold">Popular Radio Stations</p>
    <div class="grid grid-cols-1 md:grid-cols-2 mt-4 md:m-6 gap-10" >
        {#each stations as station, i}
            <div class="flex my-2 relative border shadow-md px-4 border-black rounded-lg py-6">
                <!-- Station image -->
                <img alt={station.name} src={station.favicon} class="w-1/3 my-auto"  />

                <span class="ml-4">
                    <!-- Station name and topic -->
                    <span class="flex">
                        <p class="text-lg font-bold">{toTitleCase(station.name)}</p>
                        <p class="ml-2 bg-slate-700 text-white robotoBlack text-xs tracking-wider my-auto p-1 rounded-md">{station.topic.toUpperCase()}</p>
                    </span>
                    <p class="my-1">Country: {station.country}</p>

                    <!-- Station genres -->
                    <span class="flex">
                        {#each station.genres as genre}
                            <p class="text-white bg-slate-500 text-xs h-fit my-1 py-1 px-2 rounded-md mr-2">#{genre}</p>
                        {/each}
                    </span>

                    <!-- Station languages -->
                    <span class="flex my-1">
                        {#each station.languages as language}
                            <p class="underline text-sm mr-2">{language}</p>
                        {/each}
                    </span>

                    <!-- Play button to open the modal -->
                    <span class="absolute bottom-6 right-6">
                        <img src="/play.png" width="20" alt="Play Button" on:click={()=>{openModal(i)}} on:keydown={()=>{}} />
                    </span>

                    <!-- Modal -->
                    <div class="modal fade" id={"station"+i} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                        <div class="modal-dialog">
                            <div class="modal-content shadow-xl !shadow-amber-200 !bg-amber-100">
                                <div class="modal-header border-0">
                                    <h1 class="modal-title fs-5 font-bold" id="exampleModalLabel">{station.name}</h1>
                                    <button class="btn-close" on:click={()=>{closeModal(i)}} aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <!-- RadioBox component -->
                                    <RadioBox firstStation={station} secondStation={stations[i+1]} stationIndex={()=>{return i}} lastStationIndex={()=>(stations.length - 1)} next={()=>{nextModal(i)}} prev={()=>{prevModal(i)}}/>
                                </div>
                                <div class="modal-footer border-0">
                                    <button class="btn !bg-amber-200 hover:!bg-amber-300" on:click={()=>{closeModal(i)}}>Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </span>
            </div>
        {:else}
            <p>No radio stations to display.</p>
        {/each}
    </div>
</div>
