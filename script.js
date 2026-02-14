// ===================== CANVAS SETUP =====================
var canvas = document.getElementById("starfield");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var context = canvas.getContext("2d");
var stars = 500;
var colorrange = [0, 60, 240];
var starArray = [];

// ===================== UTIL =====================
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ===================== STARS =====================
for (var i = 0; i < stars; i++) {
    starArray.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.2,
        hue: colorrange[getRandom(0, colorrange.length - 1)],
        sat: getRandom(50, 100),
        opacity: Math.random()
    });
}

function drawStars() {
    starArray.forEach(star => {
        context.beginPath();
        context.arc(star.x, star.y, star.radius, 0, 360);
        context.fillStyle = `hsla(${star.hue}, ${star.sat}%, 88%, ${star.opacity})`;
        context.fill();
    });
}

function updateStars() {
    starArray.forEach(star => {
        if (Math.random() > 0.99) star.opacity = Math.random();
    });
}

// ===================== PLAY INTRO + MUSIC =====================
const playOverlay = document.getElementById("playOverlay");
const playBtn = document.getElementById("playBtn");
const music = document.getElementById("bgMusic");

playBtn.addEventListener("click", () => {
    music.volume = 0;
    music.play().catch(() => {});

    let v = 0;
    const fade = setInterval(() => {
        v += 0.05;
        music.volume = Math.min(v, 1);
        if (v >= 1) clearInterval(fade);
    }, 100);

    playOverlay.classList.add("fade-out");
    setTimeout(() => playOverlay.remove(), 900);
});

// ===================== TEXT SYSTEM =====================
var frameNumber = 0;
const button = document.getElementById("valentinesButton");

function drawTextWithLineBreaks(lines, x, y, fontSize, lineHeight) {
    lines.forEach((line, i) => {
        context.fillText(line, x, y + i * (fontSize + lineHeight));
    });
}

// Smooth fade helper
function smoothOpacity(frame, start, duration) {
    const fade = duration * 0.25;
    if (frame < start || frame > start + duration) return 0;
    if (frame < start + fade) return (frame - start) / fade;
    if (frame > start + duration - fade) return (start + duration - frame) / fade;
    return 1;
}

// ===================== TEXT DRAW =====================
function drawText() {
    const fontSize = Math.min(30, window.innerWidth / 24);
    const lineHeight = 8;

    context.font = fontSize + "px Comic Sans MS";
    context.textAlign = "center";

    context.shadowColor = "rgba(245, 18, 139, 0.87)";
    context.shadowBlur = 8;

    const texts = [
        { text: "everyday I cannot believe how lucky I am", y: 0, start: 0, duration: 300 },
        {
            text: window.innerWidth < 600
                ? ["amongst trillions and trillions of stars,", "over billions of years"]
                : "amongst trillions and trillions of stars, over billions of years",
            y: 0, start: 350, duration: 350
        },
        { text: "to be alive", y: 0, start: 750, duration: 250 },
        { text: "and to make douaa", y: 50, start: 850, duration: 250 },
        { text: "for Allah to spend this life with you", y: 90, start: 950, duration: 300 },
        { text: "is so incredibly, unfathomably unlikely", y: 0, start: 1300, duration: 400 },
        { text: "That I'd ever meet someone like you", y: 50, start: 1750, duration: 350 },
        {
            text: window.innerWidth < 600
                ? ["and yet here I am to get the impossible", "chance to get to know you"]
                : "and yet here I am to get the impossible chance to get to know you",
            y: 0, start: 2150, duration: 400
        },
        { text: "I wish the best for you Zayneb", y: 0, start: 2600, duration: 500 },
        { text: "I really appreciate being you in my life", y: 40, start: 2800, duration: 500 },
        {
            text: window.innerWidth < 600
                ? ["and I can't wait to spend all the time in", "the world to share that with you!"]
                : "and I can't wait to spend all the time in the world to share that with you!",
            y: 80, start: 3000, duration: 600
        },
        { text: "Happy Birthday <3", y: 130, start: 3300, duration: 800 }
    ];

    texts.forEach(item => {
        const o = smoothOpacity(frameNumber, item.start, item.duration);
        if (o <= 0) return;

        context.fillStyle = `rgba(255, 46, 210, ${o})`;

        if (Array.isArray(item.text)) {
            drawTextWithLineBreaks(
                item.text,
                canvas.width / 2,
                canvas.height / 2 + item.y,
                fontSize,
                lineHeight
            );
        } else {
            context.fillText(
                item.text,
                canvas.width / 2,
                canvas.height / 2 + item.y
            );
        }
    });

    if (frameNumber > 3400) button.style.display = "block";

    context.shadowBlur = 0;
}

// ===================== ALBUM CONTROL =====================
const albumTrack = document.querySelector(".album-track");

function controlAlbum() {
    // Reveal album during emotional part
    if (frameNumber > 2600) {
        albumTrack.classList.add("show");
    }
}

// ===================== DRAW LOOP =====================
function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    drawStars();
    updateStars();
    drawText();
    controlAlbum();

    frameNumber++;
    requestAnimationFrame(draw);
}

// ===================== RESPONSIVE =====================
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Start animation
requestAnimationFrame(draw);
