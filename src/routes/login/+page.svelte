<script lang="ts">
    // Importing necessary functions and components
    import { redirect } from "@sveltejs/kit";
    import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
    import { doc, getDoc, getFirestore } from "firebase/firestore";
    import Alert from "../../components/minor/alert.svelte";

    // Initializing Firebase authentication
    const auth = getAuth();

    // Logging the current user
    console.log(auth.currentUser);

    // Declaring variables for email and password
    let email: string;
    let password: string;

    // Flag for tracking login errors
    let error = false;

    // Function to handle login process
    const login = () => {
        signInWithEmailAndPassword(auth, email, password).then((user) => {
            // Checking if the user document exists in the Firestore database
            getDoc(doc(getFirestore(), "Users", user.user.uid)).then((docData) => {
                if (docData.exists()) {
                    // Redirecting to the admin page if the user exists
                    location.replace("/admin");
                } else {
                    // Signing out and setting error flag to true if the user document does not exist
                    signOut(getAuth());
                    error = true;
                }
            });
        })
        .catch(() => {
            // Setting error flag to true if there's an error during the login process
            error = true;
        });
    }
</script>

<main>
    <!-- Title for admin login -->
    <p class="title text-center my-10 underline">Admin Login</p>
    <div class="shadow-xl py-20 px-40 mx-20 mb-16" style="border:0.2px solid rgba(0,0,0,0.1) !important">
        <form>
            <div class="my-4">
                <p class="text-xl font-semibold">Email</p>
                <!-- Input field for email -->
                <input bind:value={email} type="email" placeholder="Email" class="py-4 text-lg border border-gray-200 w-full pl-3 my-2" />
            </div>

            <div class="my-4">
                <p class="text-xl font-semibold">Password</p>
                <!-- Input field for password -->
                <input bind:value={password} type="password" placeholder="Password" class="py-4 text-lg border border-gray-200 w-full pl-3 my-2" />
            </div>

            <!-- Button for initiating the login process -->
            <button on:click|preventDefault={login} class="flex btn btn-lg btn-success mx-auto mt-12">LOGIN</button>

            <!-- Displaying error message if there's an error during login -->
            {#if error}
            <div class="mt-10">
                <Alert msg="Invalid Details please check the details entered for typos." />
            </div>
            {/if}
        </form>
    </div>
</main>
