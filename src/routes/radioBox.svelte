<script>
    // Path to the vinyl image
    const vinyl = '/vinyl.png'

    // Importing the CSS styles for the radio box component
    import './radioBox.css'

    // Variables for controlling audio playback
    let paused = true // Indicates if the audio is paused or playing
    let muted = false // Indicates if the audio is muted or unmuted
    let volume = 50 // The volume level, initially set to 50%
    $: volumeAudio =  volume / 100 // Calculates the audio volume as a decimal value

    // Exported variables for managing stations
    export let firstStation = {
        url:"",
        urlResolved:"",
        favicon:''
    };
    export let secondStation={
        name:"",
        country:"",
        favicon:""
    };
    export let next;
    export let prev;
    export let stationIndex;
    export let lastStationIndex;
</script>
<div>
    <!-- Audio element for playing the first station -->
    <audio bind:paused={paused} bind:volume={volumeAudio} bind:muted={muted} id={"audio" + stationIndex()}>
        <source src={firstStation.url} />
        <source src={firstStation.urlResolved} />
    </audio>
php
Copy code
<!-- Displaying the vinyl image and the first station's favicon -->
<div class="w-fit p-14 mx-auto" class:playing={!paused} style="background-image: url({vinyl});background-size:cover;">
    <img alt="Radio Station Icon" class="rounded-full" src={firstStation.favicon} width="50" />
</div>

<!-- Controls for navigating through stations -->
<div class="grid grid-cols-3 my-4">
    {#if stationIndex() === 0}
        <!-- Display a disabled back button if it's the first station -->
        <img alt="Back Button" class="mx-auto opacity-40" src="/back.png" width="25" />
    {:else}
        <!-- Display an active back button that triggers the 'prev' function -->
        <img alt="Back Button" class="mx-auto cursor-pointer" src="/back.png" width="25" on:keydown={()=>{}} on:click={()=>{prev();paused=true}} />
    {/if}
    
    {#if paused}
        <!-- Display a play button when the audio is paused -->
        <img alt="Play Button" class="mx-auto cursor-pointer" src="/play.png" width="25" on:keydown={()=>{}} on:click={()=>{paused = false}} />
    {:else}
        <!-- Display a pause button when the audio is playing -->
        <img alt="Play Button" class="mx-auto cursor-pointer" src="/pause.png" width="25" on:keydown={()=>{}} on:click={()=>{paused = true}} />
    {/if}

    {#if stationIndex() === lastStationIndex()}
        <!-- Display a disabled forward button if it's the last station -->
        <img alt="Forward Button" class="mx-auto opacity-40" src="/next.png" width="25"/>
    {:else}
        <!-- Display an active forward button that triggers the 'next' function -->
        <img alt="Forward Button" class="mx-auto cursor-pointer" src="/next.png" width="25" on:keydown={()=>{}} on:click={()=>{next();paused=true}} />
    {/if}
</div>

<!-- Volume control and mute functionality -->
<div class="flex">
    <!-- Range input for adjusting the volume -->
    <input id="default-range" bind:value={volume} type="range" class="h-2 w-11/12 my-auto mx-2  rounded-lg  cursor-pointer dark:bg-gray-700">

    <!-- Display mute or volume icon based on the 'muted' variable -->
    <div>
        {#if muted}
            <!-- Display the unmute icon when muted -->
            <img width="30" alt="Mute" src="/mute.png" on:click={()=>muted = false} on:keydown={()=>{}}/>
        {:else}
            <!-- Display the volume icon when not muted -->
            <img width="30" alt="Volume" src="/volume.png" on:click={()=>muted = true} on:keydown={()=>{}}/>
        {/if}
    </div>
</div>

<!-- Display the second station information if available -->
{#if secondStation !== undefined}
    {#if secondStation.name !== "" }
        <div class="mt-10">
            <p class="font-bold text-xl">Next Station</p>
            <div class="flex border border-gray-400 my-2 rounded-md">
                <!-- Display the second station's favicon and details -->
                <img alt="Radio Icon" src={secondStation.favicon} width="150" />
                <div class="w-full my-auto">
                    <span>
                        <p class="text-xl font-bold">{secondStation.name}</p>
                        <p>{secondStation.country}</p>
                    </span>
                </div>
            </div>
        </div>
    {:else}
        <!-- Display a message when it's the last station -->
        <p class="my-10 font-bold text-xl">This is the last station.</p>
    {/if}
{/if}
</div>