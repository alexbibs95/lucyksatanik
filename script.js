const container = document.querySelector('.particles');

function createParticle(){
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.left = Math.random()*100+'%';
    particle.style.animationDuration = 2 + Math.random()*3 + 's';
    particle.style.fontSize = 12 + Math.random()*18 + 'px';
    particle.textContent = Math.random() > 0.5 ? '🔥' : '💖';
    container.appendChild(particle);

    setTimeout(()=>{particle.remove()},5000);
}

setInterval(createParticle, 200);
