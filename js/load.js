function loadfunc() {    
    var load=document.getElementById("load");
    load.remove();
    const formulaire = document.getElementById("formulaire");
    formulaire.style.display = "block";
  };
  function loading() {
    const words = [
      { text: ['CS','RAS','Wie','IAS','AESS','PES'], class: 'letterCS' },
      { text:['IEEE','ENSIT'], class: 'lettreIeee' }
    ];
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    function createWord(wordObj) {
      const texts = wordObj.text;
      for (const text of texts) {
        const element = document.createElement('div');
        element.className = wordObj.class;
        element.style.left = getRandomInt(0, window.innerWidth) + 'px';
        element.style.top = getRandomInt(0, window.innerHeight) + 'px';
        element.style.transform = `rotate(${getRandomInt(-180, 180)}deg)`;
        element.textContent = text;
        document.getElementById('load').appendChild(element);
      }
    }
    for(i=0;i<10;i++)
      for (const word of words) {
        createWord(word);
      }
    setTimeout(loadfunc, 7000)
  }