<!-- FILE: script.js -->
// Small script for personalization and a simple confetti/balloon surprise
(function(){
  const nameInput = document.getElementById('nameInput');
  const personalizeBtn = document.getElementById('personalizeBtn');
  const greet = document.getElementById('greet');
  const surpriseBtn = document.getElementById('surpriseBtn');
  const confettiArea = document.getElementById('confettiArea');

  if(personalizeBtn && nameInput && greet){
    personalizeBtn.addEventListener('click', ()=>{
      const val = nameInput.value.trim();
      greet.textContent = val ? `Happy Birthday, ${val}!` : 'Happy Birthday!';
    });
  }

  // Simple balloon/confetti animation
  function launchBalloons(count=30){
    if(!confettiArea) return;
    for(let i=0;i<count;i++){
      const b = document.createElement('div');
      b.className = 'balloon';
      const left = Math.random()*100;
      const size = 18 + Math.random()*40;
      b.style.left = left + '%';
      b.style.width = size + 'px';
      b.style.height = size*1.3 + 'px';
      b.style.background = `hsl(${Math.random()*360} 90% 60%)`;
      b.style.bottom = '-80px';
      b.style.transition = `transform ${6+Math.random()*6}s linear, bottom ${6+Math.random()*6}s linear, opacity 1s ease`;
      confettiArea.appendChild(b);

      // trigger animation in next frame
      requestAnimationFrame(()=>{
        b.style.transform = `translateY(-120vh) rotate(${Math.random()*720-360}deg)`;
        b.style.bottom = '110%';
        b.style.opacity = '0';
      });

      // cleanup
      setTimeout(()=>{ b.remove(); }, 12000);
    }
  }

  if(surpriseBtn){
    surpriseBtn.addEventListener('click', ()=>{
      launchBalloons(40);
    });
  }

  // If the page URL contains ?name=Alice it will personalize automatically
  try{
    const params = new URLSearchParams(location.search);
    const name = params.get('name');
    if(name && greet){ greet.textContent = `Happy Birthday, ${name}!`; }
  }catch(e){}
})();
