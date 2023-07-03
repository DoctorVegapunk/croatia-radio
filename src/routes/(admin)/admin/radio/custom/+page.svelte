<script lang="ts">
    // Importing necessary modules and components
    import Alert from "../../../../../components/minor/alert.svelte";
    import { addDoc, collection, getFirestore, updateDoc, doc } from "firebase/firestore";
    import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

    // Variables for input elements and image display
    let input: any;
    let image: any;
    let showImage = false;

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

    // Variables for radio station details
    let name: any;
    let country: any;
    let countryCode: any;
    let genre: any;
    let streamURL: any;

    // Flag to display alert message
    let alert = false;

    // Function to add radio station
    const addRadioStation = () => {
        if (
            name === null ||
            name === undefined ||
            name === "" ||
            country === null ||
            country === undefined ||
            country === "" ||
            countryCode === null ||
            countryCode === undefined ||
            countryCode === "" ||
            genre === null ||
            genre === undefined ||
            genre === "" ||
            streamURL === null ||
            streamURL === undefined ||
            streamURL === "" ||
            !showImage
        ) {
            // Showing alert if any field is empty or image is not selected
            alert = true;
        } else {
            alert = false;
            const storage = getStorage();
            const imageRef = ref(storage, "radioIcons/" + input.files[0].name);

            uploadBytes(imageRef, input.files[0]).then((snapshot) => {
                console.log("Uploaded a blob or file!");
                getDownloadURL(imageRef).then((url) => {
                    // Adding radio station details to Firestore database
                    addDoc(collection(getFirestore(), "Radios"), {
                        favicon: url,
                        name,
                        country,
                        countryCode,
                        tags: [genre],
                        url: streamURL,
                    }).then((docData) => {
                        // Updating the document with the ID
                        updateDoc(doc(getFirestore(), "Radios", docData.id), {
                            id: docData.id,
                        }).then(() => {
                            // Resetting the input values
                            image = null;
                            name = null;
                            country = null;
                            countryCode = null;
                            genre = null;
                            streamURL = null;
                        });
                    });
                });
            });
        }
    }
</script>

<div class="mx-10 border border-gray-500 p-10 rounded-lg shadow-lg mb-10">
    <p class="text-xl font-semibold">Radio Station Image</p>
    <img class="mx-auto my-6" bind:this={image} width="150" src="" alt="No Icon selected" />
    <input class="form-control my-20 mb-6" type="file" id="formFile" bind:this={input} on:change={onChange}> 
    <div class="my-5">
        <p class="text-xl font-semibold">Radio Station Name</p>
        <input class="form-control form-control-lg" type="text" placeholder="Radio Station Name" aria-label="Name Input" bind:value={name}>
    </div>
    <div class="my-5">
        <p class="text-xl font-semibold">Radio Station Country</p>
        <input class="form-control form-control-lg" type="text" placeholder="Radio Station Country" aria-label="Country Input" bind:value={country}>
    </div>
    <div class="my-5">
        <p class="text-xl font-semibold">Radio Station Country Code</p>
        <input class="form-control form-control-lg" type="text" placeholder="Radio Station Country Code" aria-label="Country Code Input" bind:value={countryCode}>
    </div>
    <div class="my-5">
        <p class="text-xl font-semibold">Radio Station Genre</p>
        <input class="form-control form-control-lg" type="text" placeholder="Radio Station Genre" aria-label="Genre Input" bind:value={genre}>
    </div>
    <div class="my-5">
        <p class="text-xl font-semibold">Radio Station Stream URL</p>
        <input class="form-control form-control-lg" type="text" placeholder="Radio Station Stream URL" aria-label="Stream URL Input" bind:value={streamURL}>
    </div>
    <div class="flex">
        <button class="mx-auto btn btn-lg btn-success" on:click={addRadioStation}>Add Radio Station</button>
    </div>
    {#if alert}
        <Alert msg="Please fill out all the fields in order to publish the radio station." />
    {/if}
</div>
