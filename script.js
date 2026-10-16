// Counter Animation

function animateCounter(id, target) {

let count = 0;

const element = document.getElementById(id);

const speed = target / 100;

const interval = setInterval(() => {

count += speed;

if (count >= target) {

count = target;

clearInterval(interval);

}

element.innerText = Math.floor(count) + "+";

}, 20);

}

// Default Values

animateCounter("donorCount", 03);

animateCounter("donationCount", 00);

animateCounter("memberCount", 05);

function toggleMenu(){
    document.getElementById("navMenu").classList.toggle("show");
}

// Back Button Navigation
function goBack() {
    const currentHost = window.location.hostname;
    const previousPage = document.referrer;

    if (
        previousPage &&
        new URL(previousPage).hostname === currentHost &&
        window.history.length > 1
    ) {
        window.history.back();
    } else {
        window.location.href = "index.html";
    }
}

window.calculateAge = function () {
    const input = document.getElementById("donorAge");

    if (!input.value) return;

    const dob = new Date(input.value + "T00:00:00");
    const today = new Date();

    if (dob > today) {
        alert("Future date is not allowed!");
        input.value = "";
        return;
    }

    let age = today.getFullYear() - dob.getFullYear();

    const month = today.getMonth() - dob.getMonth();

    if (
        month < 0 ||
        (month === 0 && today.getDate() < dob.getDate())
    ) {
        age--;
    }

    input.type = "text";
    input.value = age + " years old";
};
