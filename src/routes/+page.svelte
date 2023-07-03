<script lang="ts">
    // Import RadioBox component and CSS file
    import RadioBox from '../components/major/radioBox.svelte';
    import './+page.css'
  
    // Import NewsComponent component
    import NewsComponent from '../components/major/newsComponent.svelte';
  
    // Define the 'data' variable
    export let data;
    
    // Extract 'stations' and 'news' from 'data'
    const stations = data.stations;
    const news = data.news;
    
    // Initialize variables
    let selectedRadio = stations[0];
    let radioHidden = true;
  
    // Function to switch to the next modal
    const nextModal = (i: any) => {
      // Get the current and next modals
      const modal = document.getElementById("station" + i);
      const nextModal = document.getElementById("station" + (i + 1));
  
      console.log(modal.classList);
      
      // Hide the current modal
      modal.style.display = "none";
      modal.removeAttribute("role");
      modal.removeAttribute("aria-modal");
      modal.classList.remove("show");
  
      // Show the next modal
      nextModal.style.display = "block";
      nextModal.setAttribute("role", "modal");
      nextModal.setAttribute("aria-hidden", "true");
      nextModal.classList.add("show");
    };
  
    // Function to switch to the previous modal
    const prevModal = (i: any) => {
      // Get the current and previous modals
      const modal = document.getElementById("station" + i);
      const prevModal = document.getElementById("station" + (i - 1));
  
      console.log(modal.classList);
  
      // Hide the current modal
      modal.style.display = "none";
      modal.removeAttribute("role");
      modal.removeAttribute("aria-modal");
      modal.classList.remove("show");
  
      // Show the previous modal
      prevModal.style.display = "block";
      prevModal.setAttribute("role", "modal");
      prevModal.classList.add("show");
    };
  
    // Function to close the modal
    const closeModal = (i: any) => {
      // Pause the audio
      const audio = <HTMLVideoElement>document.getElementById("audio" + i);
      console.log(audio.pause());
  
      const body = document.body;
      // body.style.overflow = ""
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
      return text.toLowerCase().replace(/(?:^|\s)\w/g, function(match: any) {
        return match.toUpperCase();
      });
    }
  </script>
  
  
<!-- Radio Station Display (Mobile View) -->
<div class="flex py-3 bg-gray-100 md:hidden" style="width:100vw;overflow: hidden;">
    <div class="">
        <!-- Radio Station Name -->
        <p class="ml-3 my-auto text-xl robotoBlack">Croatia Radio Station</p>
    </div>
    <div class="ml-auto mr-3">
        <!-- Menu Icon -->
        <img alt="Menu Icon" src="/menu.png" width="20" class="float-right my-auto" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample" />
    </div>      
    <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
        <div class="offcanvas-header">
            <!-- Offcanvas Header - Radio Station Name -->
            <p class="text-4xl robotoBlack mx-4 mt-4">Croatia Radio Station</p>
        </div>
        <div class="offcanvas-body">
            <div class="side-list text-xl [&>p]:my-4 mx-4">
                <!-- Offcanvas Navigation Links -->
                <p data-bs-dismiss="offcanvas" aria-label="Close"><a  href="/">Home</a></p>
                <p data-bs-dismiss="offcanvas" aria-label="Close" ><a  href="/genres">Genres</a></p>
                <p data-bs-dismiss="offcanvas" aria-label="Close" ><a  href="/search">Search</a></p>
                <p data-bs-dismiss="offcanvas" aria-label="Close" ><a  href="/news">News</a></p>
                <p data-bs-dismiss="offcanvas" aria-label="Close" ><a  href="/popular">Popular Radio Stations</a></p>
                <p class="float-right text-black text-sm underline mt-20" data-bs-dismiss="offcanvas" aria-label="Close">Close Menu</p>
            </div>
        </div>
    </div>
</div>

<!-- Radio Station Display (Desktop View) -->
<div class="hidden md:block md:pr-4 bg-gray-100 h-full">
    <div class="row h-full">
        <div class="hidden md:block">
            <div class="grid grid-cols-12 gap rounded-lg px-10 py-4">
                <!-- Radio Station Name -->
                <p class="col-span-2 font-semibold text-2xl robotoBlack m-auto">CROATIA RADIO</p>
                <div class="col-span-10 ml-auto text-lg roboto flex [&>p]:ml-6">
                    <!-- Navigation Links -->
                    <p><a href="/" class="!mt-0">Home</a></p>
                    <p><a href="/genres">Genres</a></p>
                    <p><a href="/search">Search</a></p>
                    <p><a href="/news">News</a></p>
                    <p><a href="/popular">Popular Radio Stations</a></p>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-12 gap-4">
            <div class="col-span-8 ml-16 mb-10">
                <div class="h-full p-4 rounded-lg grid grid-cols-2 gap-2">
                    <!-- Iterate through Radio Stations -->
                    {#each stations as station, i}
                        <div class="flex my-2 relative border shadow-md p-4 border-black rounded-lg">
                            <!-- Radio Station Icon -->
                            <img alt={station.name} src={station.favicon} class="w-1/3 my-auto"  />
                            <span class="ml-4">
                                <span class="flex">
                                    <!-- Radio Station Name -->
                                    <p class="text-lg font-bold">{toTitleCase(station.name)}</p>
                                    <!-- Radio Station Topic -->
                                    <p class="ml-2 bg-slate-700 text-white robotoBlack text-xs tracking-wider my-auto p-1 rounded-md">{station.topic.toUpperCase()}</p>
                                </span>
                                <!-- Radio Station Country -->
                                <p class="my-1">Country: {station.country}</p>
                                <span class="flex">
                                    <!-- Radio Station Genres -->
                                    {#each station.genres as genre}
                                        <p class="text-white bg-slate-500 text-xs h-fit my-1 py-1 px-2 rounded-md mr-2">#{genre}</p>
                                    {/each}
                                </span>
                                <span class="flex my-1">
                                    <!-- Radio Station Languages -->
                                    {#each station.languages as language}
                                        <p class="underline text-sm mr-2">{language}</p>
                                    {/each}
                                </span>
                                <span class="absolute bottom-6 right-6">
                                    <!-- Play Button -->
                                    <img src="/play.png" width="20" alt="Play Button" on:click={()=>{openModal(i)}} on:keydown={()=>{}} />
                                </span>
                                <!-- Modal -->
                                <div class="modal fade" id={"station"+i} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog">
                                        <div class="modal-content shadow-xl !shadow-amber-200 !bg-amber-100">
                                            <div class="modal-header border-0">
                                                <!-- Modal Title - Radio Station Name -->
                                                <h1 class="modal-title fs-5 font-bold" id="exampleModalLabel">{station.name}</h1>
                                                <button class="btn-close" on:click={()=>{closeModal(i)}} aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                <!-- Radio Station Information -->
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
                    {/each}
                </div>
            </div>
            <div class="mb-10 col-span-4 hidden md:block"> 
                <p class="text-xl robotoBlack">Headlines</p>
                <!-- News Component -->
                <NewsComponent news={news}/> 
            </div>
        </div> 
    </div>
</div>

<!-- Radio Station Display (Mobile View) -->
<div class="block md:hidden" >
    <div class="grid grid-cols-1 gap-4">
        <div class="h-full p-4 rounded-lg grid grid-cols-1 gap-2">
            <!-- Iterate through Radio Stations -->
            {#each stations as station, i}
                <div class="flex my-2 relative border shadow-md p-4 border-black rounded-lg">
                    <!-- Radio Station Icon -->
                    <img alt={station.name} src={station.favicon} class="w-1/3 my-auto"  />
                    <span class="ml-4">
                        <span class="flex">
                            <!-- Radio Station Name -->
                            <p class="text-lg font-bold">{toTitleCase(station.name)}</p>
                            <!-- Radio Station Topic -->
                            <p class="ml-2 bg-slate-700 text-white robotoBlack text-xs tracking-wider my-auto p-1 rounded-md">{station.topic.toUpperCase()}</p>
                        </span>
                        <!-- Radio Station Country -->
                        <p class="my-1">Country: {station.country}</p>
                        <span class="flex">
                            <!-- Radio Station Genres -->
                            {#each station.genres as genre}
                                <p class="text-white bg-slate-500 text-xs h-fit my-1 py-1 px-2 rounded-md mr-2">#{genre}</p>
                            {/each}
                        </span>
                        <span class="flex my-1">
                            <!-- Radio Station Languages -->
                            {#each station.languages as language}
                                <p class="underline text-sm mr-2">{language}</p>
                            {/each}
                        </span>
                        <span class="absolute bottom-6 right-6">
                            <!-- Play Button -->
                            <img src="/play.png" width="20" alt="Play Button" on:click={()=>{openModal(i)}} on:keydown={()=>{}} />
                        </span>
                        <!-- Modal -->
                        <div class="modal fade" id={"station"+i} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content shadow-xl !shadow-amber-200 !bg-amber-100">
                                    <div class="modal-header border-0">
                                        <!-- Modal Title - Radio Station Name -->
                                        <h1 class="modal-title fs-5 font-bold" id="exampleModalLabel">{station.name}</h1>
                                        <button class="btn-close" on:click={()=>{closeModal(i)}} aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <!-- Radio Station Information -->
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
            {/each}
        </div>
    </div>
</div>