<script lang="ts">
    import { deleteDoc, doc, getFirestore } from "firebase/firestore";

    // Retrieve data from the parent component
    export let data;

    // Access the 'news' data from the parent component
    let news = data.news;

    // Function to delete a news post
    const deleteNews = (id: any, title: any) => {
        // Delete the news post from Firestore
        deleteDoc(doc(getFirestore(), "News", id)).then(() => {
            // Display a success message
            alert("Deleted News post " + title);

            // Remove the deleted news post from the 'news' array
            news = news.filter((singleNews: any) => singleNews.id !== id);
        });
    };
</script>

<main>
    {#each news as singleNews}
        <div class="bg-gray-100 p-4 my-2 rounded-lg border border-gray-200">
            {#if singleNews.image}
                <!-- Display the news image if available -->
                <img src={singleNews.image} alt="News" width="250" />
            {/if}
            <p class="font-bold text-xl">{singleNews.title}</p>
            <p>{@html singleNews.description}</p>
            <img src="/icons/delete.png" alt="Delete Icon" width="30" class="ml-auto" style="cursor:pointer;" on:click={()=>{deleteNews(singleNews.id,singleNews.title)}} />
            {#if singleNews.category}
                <div>
                    <p class="text-xl font-semibold">Category</p>
                    <p class="my-2">{singleNews.category}</p>
                </div>
            {/if}
        </div>
    {:else}
        <!-- Display a message if no news posts are available -->
        <p>No News Posted.</p>
    {/each}
</main>
