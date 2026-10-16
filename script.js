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
    const dobValue = input.value;

    if (!dobValue) return;

    const dob = new Date(dobValue + "T00:00:00");
    const today = new Date();

    if (dob > today) {
        alert("Future date is not allowed!");
        input.value = "";
        return;
    }

    let years = today.getFullYear() - dob.getFullYear();
    let months = today.getMonth() - dob.getMonth();
    let days = today.getDate() - dob.getDate();

    if (days < 0) {
        months--;
        days += new Date(
            today.getFullYear(),
            today.getMonth(),
            0
        ).getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    input.type = "text";
    input.value = `${years}Y ${months}M ${days}D`;
};
