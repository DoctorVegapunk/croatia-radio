<script lang="ts">
    // Importing SearchBox component
    import SearchBox from "../../../components/major/searchBox.svelte";

    // Exporting data variable
    export let data;

    // Initializing search variable
    let search: any = null;

    // Accessing stations data from the imported data
    const stations = data.stations;

    // Initializing searchedStations variable
    let searchedStations: any = [];

    // Function to initiate search
    const initiateSearch = (e: any) => {
        // Checking if the Enter key is pressed or the button is clicked
        if (e.key === "Enter" || e.type === "click") {
            console.log("runed");
            console.log(search);

            // Filtering stations based on search query
            searchedStations = stations.filter((station: any) => {
                console.log(station.name);
                return station.name.toLowerCase().includes(search.toLowerCase());
            });
        }
    }
</script>

<div>
    <!-- Input group for search functionality -->
    <div class="input-group mb-3">
        <!-- Input field with binding and event listeners -->
        <input list="datalistOptions" bind:value={search} on:keydown={initiateSearch} type="text" class="form-control" placeholder="Search Radio Station" aria-label="Recipient's username" aria-describedby="button-addon2">
        <!-- Search button with event listener -->
        <button class="btn btn-outline-secondary rounded" type="button" id="button-addon2" on:click={initiateSearch}>Search</button>
        <!-- Datalist options for autocomplete -->
        <datalist id="datalistOptions">
            {#each stations as station}    
                <option value={station.name}>
            {/each}
        </datalist>
    </div>
    <div>
        <!-- Checking if any stations are found -->
        {#if searchedStations[0] === undefined}
            <!-- Displaying SearchBox component when no stations are found -->
            <SearchBox {searchedStations} />
        {:else}
            <!-- Displaying SearchBox component within a grid layout when stations are found -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3 t-10">
                <SearchBox {searchedStations} />
            </div>
        {/if}
    </div>
</div>
