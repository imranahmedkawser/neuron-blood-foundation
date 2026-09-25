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
