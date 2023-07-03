<script lang="ts">
    // Importing necessary modules and components
    import Alert from '../../../../components/minor/alert.svelte';
    import 'bytemd/dist/index.css';
    import { addDoc, collection, doc, getFirestore, updateDoc } from "firebase/firestore";
    import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
    import Tiptap from '../../../../components/minor/Tiptap.svelte';

    // Extracting data from props
    export let data;

    // Flag to track error state
    let error = false;

    // Extracting categories from data
    const { categories } = data;

    // Variables to store input values
    let title: any = "";
    let input: any;
    let image: any;
    let showImage = false;
    let category: any = null;
    let description: any;

    // Function to update category select value
    function updateCategorySelect(e: any) {
        if (e.target.selectedOptions[0].text === "No category") {
            category = null;
        } else {
            category = e.target.selectedOptions[0].text;
        }
    }

    // Function to handle file input change
    function onChange() {
        const file = input.files[0];

        if (file) {
            showImage = true;

            const reader = new FileReader();
            reader.addEventListener("load", function () {
                image.setAttribute("src", reader.result);
            });
            reader.readAsDataURL(file);
            return;
        }

        showImage = false;
    }

    // Function to add news
    const addNews = () => {
        description = document.getElementsByClassName("editor")[0].children[0].innerHTML;

        if (
            title === null ||
            title === undefined ||
            title === "" ||
            description === null ||
            description === undefined ||
            description === "" ||
            category === null ||
            category === undefined ||
            category === ""
        ) {
            error = true;
        } else {
            error = false;
            if (!showImage) {
                addDoc(collection(getFirestore(), "News"), {
                    title,
                    description,
                    category,
                })
                    .then((docData) => {
                        updateDoc(doc(getFirestore(), "News", docData.id), {
                            id: docData.id,
                        })
                            .then(() => {
                                alert("Successfully uploaded news post.");
                                location.reload();
                            })
                            .catch((error) => console.log(error));
                    })
                    .catch((error) => console.log(error));
            } else {
                const imageRef = ref(getStorage(), "newsIcons/" + input.files[0].name);
                uploadBytes(imageRef, input.files[0]).then((snapshot) => {
                    console.log("Uploaded a blob or file!");
                    getDownloadURL(imageRef).then((url) => {
                        addDoc(collection(getFirestore(), "News"), {
                            image: url,
                            title,
                            description,
                            category,
                        })
                            .then((docData) => {
                                updateDoc(doc(getFirestore(), "News", docData.id), {
                                    id: docData.id,
                                })
                                    .then(() => {
                                        alert("Successfully uploaded news post.");
                                        location.reload();
                                    })
                                    .catch((error) => console.log(error));
                            })
                            .catch((error) => console.log(error));
                    });
                });
            }
        }
    }
</script>
<main>
    <div class="w-5/6 mx-auto my-20">
        {#if showImage}
            <!-- Display the selected image if available -->
            <img bind:this={image} src="" alt="Preview" width="250"/>
        {:else}
            <!-- Display a message if no image is selected -->
            <p class="my-10">No Image selected, the news post will not have an image.</p>
        {/if}
        
        <!-- File input for selecting an image -->
        <input bind:this={input} on:change={onChange} type="file"/>
        
        <!-- Input field for the news title -->
        <input placeholder="News Title" bind:value={title} class="w-full border border-gray-500 rounded-md py-3 px-2 my-4" />
        
        <!-- Tiptap editor component -->
        <Tiptap content="" />
        
        <div class="flex">
            <!-- Input field for entering a new news category -->
            <input placeholder="New News Category" bind:value={category} class="w-1/2 border border-gray-500 rounded-md py-3 px-2 my-4 mr-3"/>
            
            <!-- Dropdown select for choosing a category -->
            <select class="form-select w-1/2 py-3 my-auto ml-3" aria-label="Default select example" style="height:fit-content" on:change={updateCategorySelect}>
                <!-- Default option for no category -->
                <option selected>No Category</option>
                
                <!-- Iterate over categories and generate options -->
                {#each categories as category, i}
                    <option value={i+1}>{category}</option>
                {/each}
            </select>
        </div>
        
        {#if error}
            <!-- Display an alert if there are errors in the form -->
            <Alert msg="Please fill out all the fields for the news post to be valid."/>
        {/if}
        
        <!-- Button for creating a news post -->
        <button class="btn !bg-slate-600 text-white mt-4 float-right border-0" on:click|preventDefault={addNews}>Create News Post</button>
    </div>
</main>
