import { initializeApp } from
    "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getDatabase,
    ref,
    push,
    set
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

import {
    getStorage,
    ref as storageRef,
    uploadBytes,
    getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";


/* FIREBASE CONFIG */

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};


/* INITIALIZE */

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);
const storage = getStorage(app);


/* FORM */

const form = document.getElementById("memberForm");
const submitBtn = document.getElementById("submitBtn");
const statusText = document.getElementById("status");


/* SUBMIT */

form.addEventListener("submit", async function (event) {

    event.preventDefault();

    const roles = [...document.querySelectorAll(
        'input[name="roles"]:checked'
    )].map(item => item.value);

    if (roles.length === 0) {
        alert("কমপক্ষে একটি সদস্যের ভূমিকা নির্বাচন করুন।");
        return;
    }

    const photoInput = form.querySelector('input[name="photo"]');
    const photo = photoInput.files[0];

    if (!photo) {
        alert("আপনার ছবি নির্বাচন করুন।");
        return;
    }

    if (photo.size > 5 * 1024 * 1024) {
        alert("ছবির সাইজ ৫ MB-এর বেশি হতে পারবে না।");
        return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "আবেদন জমা হচ্ছে...";
    statusText.textContent = "";

    try {

        const formData = new FormData(form);
        const data = {};

        for (const [key, value] of formData.entries()) {

            if (key === "photo") continue;

            if (key === "roles" ||
                key === "activities" ||
                key === "skills") {

                if (!data[key]) data[key] = [];
                data[key].push(value);

            } else {
                data[key] = value;
            }
        }

        /* UPLOAD PHOTO */

        const imagePath = "memberPhotos/" +
            Date.now() + "_" + photo.name;

        const imageRef = storageRef(storage, imagePath);

        await uploadBytes(imageRef, photo);

        const photoURL = await getDownloadURL(imageRef);


        /* SAVE MEMBER */

        const memberRef = push(ref(database, "memberApplications"));

        data.photoURL = photoURL;
        data.status = "Pending";
        data.submittedAt = new Date().toISOString();

        await set(memberRef, data);


        /* SUCCESS */

        statusText.textContent =
            "আপনার আবেদন সফলভাবে জমা হয়েছে। Admin যাচাই করবেন।";

        statusText.style.color = "#15803d";

        form.reset();

    } catch (error) {

        console.error(error);

        statusText.textContent =
            "আবেদন জমা হয়নি। Firebase Config ও Rules পরীক্ষা করুন।";

        statusText.style.color = "#d00000";

    } finally {

        submitBtn.disabled = false;
        submitBtn.innerHTML =
            '<i class="fa-solid fa-paper-plane"></i> আবেদন জমা দিন';

    }

});
