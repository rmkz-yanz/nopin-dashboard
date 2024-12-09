const vid = document.getElementById("myVideo");

async function mulai() {
  // Menampilkan pesan waktu sesuai dengan jam
  await Swal.fire({
    title: getGreeting(), // Menggunakan greeting berdasarkan waktu
    text: getTimeBasedText(), // Mengganti teks sesuai waktu
    confirmButtonText: 'OK'
  });
  
  setTimeout(showDiv, 500);
  vid.play();
  setTimeout(() => document.getElementById("content").style.opacity = 1, 5000);
}
mulai();

function getGreeting() {
  const hours = new Date().getHours();
  let greetingMessage = '';

  if (hours >= 6 && hours < 12) {
    greetingMessage = 'Selamat Pagi';
  } else if (hours >= 12 && hours < 18) {
    greetingMessage = 'Selamat Siang';
  } else if (hours >= 18 && hours < 21) {
    greetingMessage = 'Selamat Sore';
  } else {
    greetingMessage = 'Selamat Malam';
  }

  return greetingMessage;
}

function getTimeBasedText() {
  const hours = new Date().getHours();
  let timeBasedText = '';

  if (hours >= 6 && hours < 12) {
    timeBasedText = 'Hari ini adalah hari yang cerah, semoga energi positifmu mengalir sepanjang hari!';
  } else if (hours >= 12 && hours < 18) {
    timeBasedText = 'Jaga semangatmu, mari capai tujuan hari ini!';
  } else if (hours >= 18 && hours < 21) {
    timeBasedText = 'Waktunya bersantai dan menikmati malam yang tenang.';
  } else {
    timeBasedText = 'Semoga malammu penuh kedamaian dan mimpi indah.';
  }

  return timeBasedText;
}

function showDiv() {
  document.getElementById("bgv").style.background = 'rgba(0, 0, 0, 0.5)'; // Kegelapan video
}

function toggleMenu(action) {
  const menu = document.getElementById("menu");
  const open = document.getElementById("open");
  menu.style.display = (action === 'open') ? 'block' : 'none';
  open.style.display = (action === 'open') ? 'none' : 'block';
}

const radios = document.querySelectorAll('input[name="video"]');
const videoDisplay = document.getElementById('myVideo');

function saveVideoChoice(value, time) {
  localStorage.setItem('selectedVideo', value);
  localStorage.setItem('selectedTime', time);
}

function loadVideoChoice() {
  const savedVideo = localStorage.getItem('selectedVideo');
  const savedTime = localStorage.getItem('selectedTime') || 5000;

  if (savedVideo) {
    videoDisplay.querySelector('source').src = savedVideo;
    videoDisplay.load();
    document.querySelector(`input[value="${savedVideo}"]`).checked = true;
    setTimeout(() => document.getElementById("content").style.opacity = 1, savedTime);
  }
}

radios.forEach(radio => {
  radio.addEventListener('change', function() {
    const selectedVideo = this.value;
    const selectedTime = this.getAttribute('data-time') || 5000;

    videoDisplay.querySelector('source').src = selectedVideo;
    videoDisplay.load();
    videoDisplay.play();
    saveVideoChoice(selectedVideo, selectedTime);
    setTimeout(() => document.getElementById("content").style.opacity = 1, selectedTime);
  });
});

loadVideoChoice();