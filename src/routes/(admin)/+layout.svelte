<script>
    // Importing necessary functions and modules
    import { getAuth, onAuthStateChanged } from "firebase/auth";
    import { onMount } from "svelte";

    // Flag to track if the component is loaded
    let loaded = false;

    // Executing code on component mount
    onMount(() => {
        // Listening for changes in the authentication state
        onAuthStateChanged(getAuth(), user => {
            if (!user) {
                // Redirecting to the login page if the user is not authenticated
                location.replace("/login");
            } else {
                // Setting the loaded flag to true if the user is authenticated
                loaded = true;
            }
        });
    });
</script>

<main>
    <!-- Checking if the component is loaded -->
    {#if loaded}
    <div class="row " style="width:100vw;height:100vh">
        <div class="col-4 sidePanel h-full">
            <!-- Admin Panel title -->
            <p class="subtitle mt-3 ml-5" style="color:white;">Admin Panel</p>
            <div class="adminLink" style="display: block;">
                <!-- Links for different admin pages -->
                <a href="/admin/news">News</a>
                <a href="/admin/radio/add">Radio Stations</a>
                <a href="/admin/manage">Admin Management</a>
            </div>
        </div>
        <div class="col-8" style="width:75vw;height:100vh;overflow:auto">
            <!-- Placeholder for content -->
            <slot></slot>
        </div>
    </div>
    {/if}
</main>
