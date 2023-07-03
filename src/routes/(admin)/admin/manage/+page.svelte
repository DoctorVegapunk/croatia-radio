<script lang="ts">
    import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
    import { getFirestore, getDoc, doc, setDoc, addDoc, collection, updateDoc } from 'firebase/firestore';

    // Import necessary components
    import Alert from "../../../../components/minor/alert.svelte";
    import Success from "../../../../components/minor/success.svelte";

    // Get the authentication and Firestore instances
    const auth = getAuth();
    const firestore = getFirestore();

    // Declare and export variables for email and password
    export let email: string;
    export let password: string;

    // Initialize success and error flags
    let success = false;
    let error = false;

    // Function to create a new user
    const createUser = () => {
        // Create the user with email and password
        createUserWithEmailAndPassword(auth, email, password)
            .then(userRef => {
                // Save user data to Firestore
                setDoc(doc(firestore, "Users", userRef.user.uid), {
                    uid: userRef.user.uid,
                    email,
                    password
                })
                .then(() => {
                    success = true;
                    error = false;
                })
                .catch(() => {
                    success = false;
                    error = true;
                });
            })
            .catch(() => {
                success = false;
                error = true;
            });
    }
</script>

<main class="w-5/6 mx-auto mt-16">
    <p class="mb-5">You can add users by making a new email and password for them.</p>
    <form>
        <!-- Input fields for email and password -->
        <input bind:value={email} placeholder="Email" class="w-full border border-gray-500 rounded-md py-3 px-2 my-4" />
        <input bind:value={password} placeholder="Password" class="w-full border border-gray-500 rounded-md py-3 px-2 my-4" />

        <!-- Button to create an account -->
        <button on:click|preventDefault={createUser} class="btn !bg-slate-600 text-white mt-4 float-right border-0">Create Account</button>
    </form>
    
    <br style="clear:both" />

    {#if error}
        <!-- Display an alert if there was an error creating the user -->
        <div class="block mt-16">
            <Alert msg="Failed to create user, password must be at least 8 characters long and the email has to be a new email (not used with another admin account)." />
        </div>
    {/if}

    {#if success}
        <!-- Display a success message if the user was created successfully -->
        <div class="block mt-16">
            <Success msg={"Successfully created user with Email: " + email + " and Password: " + password + "." }/>
        </div>
    {/if}
</main>
