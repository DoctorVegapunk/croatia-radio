<script lang="ts">
    import { addDoc, collection, doc, getFirestore, updateDoc } from "firebase/firestore";
    import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
    import Tiptap from "../../../../../components/minor/Tiptap.svelte";

    // Retrieve data from the parent component
    export let data;

    // Access the 'news' data from the parent component
    const news = data.news;

    // Create a copy of the 'news' array for editing purposes
    let editableNews = data.news;

    // Access the 'editable' data from the parent component
    let editable = data.editable;

    // Access the 'categories' data from the parent component
    const { categories } = data;

    // Display the 'data' object in the console
    console.log(data);

    // Display the 'editable' object in the console
    console.log(editable);

    // Initialize variables for input and image elements
    let input: any;
    let image: any;

    // Flag to control the visibility of the image
    let showImage = false;

    // Variable to store the selected category
    let category: any = null;

    // Function to update the selected category in the dropdown
    function updateCategorySelect(e: any) {
        if (e.target.selectedOptions[0].text === "No category") {
            category = null;
        } else {
            category = e.target.selectedOptions[0].text;
        }
    }

    // Function to handle the file input change event
    function onChange() {
        const file = input.files[0];

        if (file) {
            // Show the image preview if a file is selected
            showImage = true;

            const reader = new FileReader();
            reader.addEventListener("load", function () {
                image.setAttribute("src", reader.result);
            });
            reader.readAsDataURL(file);
            return;
        }
        // Hide the image preview if no file is selected
        showImage = false;
        console.log(showImage);
    }

    // Function to change and update a news post
    const changeNews = (id: any, image: any, title: any) => {
        console.log(category);

        // Get the description element of the news post
        const description = document.getElementById(id)?.children[1].children[0].innerHTML?.toString();
        console.log(description);
        console.log(image);

        if (showImage) {
            console.log("dfdf");

            // Create a reference to the image file in Firebase Storage
            const imageRef = ref(getStorage(), "newsIcons/" + input.files[0].name);

            // Upload the image file to Firebase Storage
            uploadBytes(imageRef, input.files[0]).then((snapshot) => {
                console.log("Uploaded a blob or file!");

                // Get the download URL of the uploaded image
                getDownloadURL(imageRef).then((url) => {
                    // Update the news post document in Firestore with the new data
                    updateDoc(doc(getFirestore(), "News", id), {
                        image: url,
                        title,
                        description,
                        category
                    }).then(() => {
                        // Display a success message and reload the page
                        alert("Document Updated");
                        location.reload();
                    });
                });
            });
        } else {
            // Update the news post document in Firestore with the new data (without changing the image)
            updateDoc(doc(getFirestore(), "News", id), {
                title,
                description,
                category
            }).then(() => {
                // Display a success message and reload the page
                alert("Document Updated");
                location.reload();
            });
        }
    }
</script>

<main>
    {#each news as singleNews, i}
        <div class="bg-gray-100 px-4 py-24 my-2 rounded-lg border border-gray-200">

            {#if editable[i]}
                {#if showImage}
                    <!-- Show the selected image preview -->
                    <img bind:this={image} src="" alt="Preview" width="250" />
                {:else}
                    {#if singleNews.image}
                        <!-- Show the existing image of the news post -->
                        <img src={editableNews[i].image} alt="News" width="250" />
                    {:else}
                        <p>No image to show.</p>
                    {/if}
                {/if}

                <!-- File input for selecting a new image -->
                <input bind:this={input} on:change={onChange} type="file" />

                <!-- Input field for editing the title -->
                <input placeholder="Edit Title" bind:value={editableNews[i].title} class="w-full border border-gray-500 rounded-md py-3 px-2 my-4" />

                <!-- Tiptap component for editing the description -->
                <div id={editableNews[i].id}>
                    <Tiptap content={editableNews[i].description} />
                </div>

                <div class="flex">
                    <!-- Input field for editing the news category -->
                    <input placeholder="New News Category" bind:value={category} class="w-1/2 border border-gray-500 rounded-md py-3 px-2 my-4 mr-3" />

                    <!-- Dropdown menu for selecting the category -->
                    <select class="form-select w-1/2 py-3 my-auto ml-3" aria-label="Default select example" style="height:fit-content" on:change={updateCategorySelect}>
                        <option selected>No Category</option>
                        {#each categories as category}
                            <option value={i+1}>{category}</option>
                        {/each}
                    </select>
                </div>

                <!-- Button to publish the edited news post -->
                <button class="btn !bg-green-600 text-white mt-4 mx-2 float-right border-0" on:click|preventDefault={()=>{changeNews(editableNews[i].id,editableNews[i].image,editableNews[i].title)}}>Publish Edited News Post</button>

                <!-- Button to close the edit mode -->
                <button class="btn !bg-red-600 text-white mt-4 mx-2 float-right border-0" on:click={()=>{editable[i]=false}}>Close Edit</button>
            {:else}
                {#if singleNews.image}
                    <!-- Show the image of the news post -->
                    <img src={editableNews[i].image} alt="News" width="250" />
                {/if}

                <!-- Display the title and description of the news post -->
                <p class="font-bold text-xl">{singleNews.title}</p>
                <p>{@html singleNews.description}</p>

                {#if singleNews.category}
                    <!-- Display the category of the news post -->
                    <div class="mt-10">
                        <p class="text-xl font-semibold">Category</p>
                        <p class="my-2">{singleNews.category}</p>
                    </div>
                {/if}

                <!-- Button to enter edit mode -->
                <button class="btn !bg-slate-600 text-white mt-4 float-right border-0" on:click={()=>{editable[i]=true}}>Edit</button>
            {/if}
        </div>
    {:else}
        <p>No news to edit.</p>
    {/each}
</main>
