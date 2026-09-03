/* =========================================
   SPACE PARTICLE SYSTEM
========================================= */

const canvas = document.getElementById("spaceCanvas");
const ctx = canvas.getContext("2d");

let particles = [];

let mouse = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
};


function resizeCanvas() {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    createParticles();
}


window.addEventListener("resize", resizeCanvas);


window.addEventListener("mousemove", function(e) {

    mouse.x = e.clientX;
    mouse.y = e.clientY;

});


function createParticles() {

    particles = [];

    for(let i = 0; i < 180; i++) {

        particles.push({

            x: Math.random() * canvas.width,

            y: Math.random() * canvas.height,

            size: Math.random() * 2 + 0.4,

            speedX: (Math.random() - 0.5) * 0.4,

            speedY: (Math.random() - 0.5) * 0.4,

            depth: Math.random()

        });

    }

}


function animateSpace() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    particles.forEach(p => {

        p.x += p.speedX;
        p.y += p.speedY;


        if(p.x < 0) p.x = canvas.width;
        if(p.x > canvas.width) p.x = 0;

        if(p.y < 0) p.y = canvas.height;
        if(p.y > canvas.height) p.y = 0;


        /* Mouse attraction */

        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;

        const distance = Math.sqrt(
            dx * dx + dy * dy
        );


        if(distance < 180) {

            p.x -= dx * 0.0015;
            p.y -= dy * 0.0015;

        }


        ctx.beginPath();

        ctx.arc(
            p.x,
            p.y,
            p.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            p.depth > 0.5
            ? "rgba(59,130,246,.7)"
            : "rgba(255,23,68,.65)";

        ctx.fill();

    });


    /* Connect nearby particles */

    for(let i = 0; i < particles.length; i++) {

        for(let j = i + 1; j < particles.length; j++) {

            const dx =
                particles[i].x -
                particles[j].x;

            const dy =
                particles[i].y -
                particles[j].y;

            const distance =
                Math.sqrt(dx * dx + dy * dy);


            if(distance < 100) {

                ctx.beginPath();

                ctx.moveTo(
                    particles[i].x,
                    particles[i].y
                );

                ctx.lineTo(
                    particles[j].x,
                    particles[j].y
                );

                ctx.strokeStyle =
                    "rgba(37,99,235,.08)";

                ctx.stroke();

            }

        }

    }


    requestAnimationFrame(animateSpace);
}


resizeCanvas();
animateSpace();



/* =========================================
   SMOOTH SECTION SCROLL
========================================= */

function scrollToSection(id) {

    document.getElementById(id).scrollIntoView({
        behavior: "smooth"
    });

}



/* =========================================
   SIMULATION
========================================= */

function runSimulation() {

    const button =
        document.querySelector(".nav-btn");

    button.innerText = "SIMULATING...";


    setTimeout(() => {

        document.getElementById("baseCpi")
            .innerText = "1.00";

        document.getElementById("stallCpi")
            .innerText = "1.25";

        document.getElementById("forwardCpi")
            .innerText = "1.10";

        document.getElementById("cacheCpi")
            .innerText = "1.30";

        document.getElementById("speedup")
            .innerText = "1.14×";


        document.getElementById("simulationOutput")
            .innerHTML = `

                <p>
                    <strong style="color:#ff1744">
                    SIMULATION COMPLETE
                    </strong>
                </p>

                <p>
                    RAW hazards detected:
                    <strong style="color:#60a5fa">
                    4
                    </strong>
                </p>

                <p>
                    Load-use hazards:
                    <strong style="color:#ff526f">
                    1
                    </strong>
                </p>

                <p>
                    Required load-use stall:
                    <strong style="color:#ff526f">
                    1 cycle
                    </strong>
                </p>

                <p>
                    Forwarding paths:
                    <strong style="color:#60a5fa">
                    EX/MEM → EX
                    and MEM/WB → EX
                    </strong>
                </p>

                <p>
                    Estimated speedup:
                    <strong style="color:#ff1744">
                    1.14×
                    </strong>
                </p>

            `;


        button.innerText = "RUN SIMULATION";


        /* Animation for metrics */

        document.querySelectorAll(".metric")
            .forEach((metric, index) => {

                metric.style.transform =
                    "translateY(-8px)";

                setTimeout(() => {

                    metric.style.transform =
                        "translateY(0)";

                }, 400 + index * 100);

            });


    }, 1200);

}



/* =========================================
   3D PROCESSOR MOUSE MOVEMENT
========================================= */

const processor =
    document.querySelector(".processor");


document.addEventListener("mousemove", function(e) {

    if(!processor) return;


    const x =
        (window.innerWidth / 2 - e.clientX)
        / 35;

    const y =
        (window.innerHeight / 2 - e.clientY)
        / 35;


    processor.style.transform = `
        rotateX(${15 + y}deg)
        rotateY(${-18 - x}deg)
    `;

});