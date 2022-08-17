const textBox = document.querySelector('textb');

function logKey(event) {
    console.log(`You pressed "${event.key}".`);
  }

  textBox.addEventListener('keydown', logKey);