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

const dobInput = document.getElementById("donorDOB");
const ageInput = document.getElementById("donorAge");

dobInput.max = new Date().toLocaleDateString("en-CA");

window.openAgeCalendar = function () {
    if (typeof dobInput.showPicker === "function") {
        dobInput.showPicker();
    } else {
        dobInput.click();
    }
};

window.calculateAge = function () {
    if (!dobInput.value) return;

    const [year, month, day] = dobInput.value.split("-").map(Number);
    const dob = new Date(year, month - 1, day);
    const today = new Date();

    if (dob > today) {
        alert("Future date is not allowed!");
        dobInput.value = "";
        ageInput.value = "";
        return;
    }

    let years = today.getFullYear() - year;
    let months = today.getMonth() - (month - 1);
    let days = today.getDate() - day;

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

    ageInput.value = `${years}Y ${months}M ${days}D`;
};
