<script lang="ts">
    export let searchedStations:any;
    import RadioBox from "./radioBox.svelte";
   
    const nextModal = (i:any) =>{
        const modal = document.getElementById("station" + i)
        const nextModal = document.getElementById("station" + (i+1))

        console.log(modal.classList);
        modal.style.display = "none"
        modal.removeAttribute("role")
        modal.removeAttribute("aria-modal")
        modal.classList.remove("show")

        nextModal.style.display = "block"
        nextModal.setAttribute("role","modal")
        nextModal.setAttribute("aria-hidden","true")
        nextModal.classList.add("show")

        

    }
    const prevModal = (i:any) =>{
        const modal = document.getElementById("station" + i)
        const nextModal = document.getElementById("station" + (i-1))

        console.log(modal.classList);
        modal.style.display = "none"
        modal.removeAttribute("role")
        modal.removeAttribute("aria-modal")
        modal.classList.remove("show")

        nextModal.style.display = "block"
        nextModal.setAttribute("role","modal")
        nextModal.classList.add("show")

        

    }
    const closeModal = (i) =>{
        const audio = <HTMLVideoElement> document.getElementById("audio" + i)
        console.log(audio.pause())
        const body = document.body
        // body.style.overflow = ""
        // body.style.paddingRight= "0"
        body.setAttribute("style","")
        body.classList.remove("modal-open")
        document.getElementsByClassName("modal-backdrop")[0].remove()

        
        const modal = document.getElementById("station" + i)
        modal.style.display = "none"
        modal.setAttribute("aria-hidden","true")
        modal.removeAttribute("role")
        modal.removeAttribute("aria-modal")
        modal.classList.remove("show")

    }
    const openModal = (i) =>{
        const body = document.body
        body.style.overflow = "hidden"
        body.style.paddingRight= "0px"
        body.classList.add("modal-open")
        const backDrop = document.body.appendChild(document.createElement("div"))
        backDrop.classList.add("modal-backdrop")
        backDrop.classList.add("fade")
        backDrop.classList.add("show")
        
        const modal = document.getElementById("station" + i)
        modal.style.display = "block"
        modal.setAttribute("role","dialog")
        modal.classList.add("show")
    }
    function toTitleCase(text:any) {
        return text.toLowerCase().replace(/(?:^|\s)\w/g, function(match:any) {
            return match.toUpperCase();
        });
    }
    
</script>
{#each searchedStations as station,i}
                    
<div class="flex my-2 relative border shadow-md px-4 border-black rounded-lg py-6">
    <img alt={station.name} src={station.favicon} class="w-1/3 my-auto"  />
    <span class="ml-4">
        <span class="flex"><p class="text-lg font-bold">{toTitleCase(station.name)}</p> <p class="ml-2 bg-slate-700 text-white robotoBlack text-xs tracking-wider my-auto p-1 rounded-md">{station.topic.toUpperCase()}</p></span>
        <p class="my-1">Country: {station.country}</p>

        <span class="flex">
            {#each station.genres as genre}
                <p class="text-white bg-slate-500 text-xs h-fit my-1 py-1 px-2 rounded-md mr-2">#{genre}</p>
            {/each}
        </span>

        <span class="flex my-1">
            {#each station.languages as language}
                <p class="underline text-sm mr-2">{language}</p>
            {/each}
        </span>
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
                        <!-- <img alt="Radio Icon" class="mx-auto my-2" src={station.favicon} width="150" />
                        <audio controls class="mx-auto my-2">
                            <source src={station.url} />
                            <source src={station.urlResolved}/>
                            Your browser does not support the audio element.
                        </audio> -->
                        <RadioBox firstStation={station} secondStation={searchedStations[i+1]} stationIndex={()=>{return i}} lastStationIndex={()=>(searchedStations.length - 1)} next={()=>{nextModal(i)}} prev={()=>{prevModal(i)}}/>
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
    <p class="text-center font-semibold my-48">No station has been searched.</p>
{/each}