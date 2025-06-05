// ======================== DOM 요소 선택 ========================
const menuToggle = document.getElementById("menu-toggle");
const menuLinks = document.getElementById("menu-links");
const copyBtn = document.getElementById("copy-btn");
const solAddress = document.getElementById("sol-address");
const dialogueBtn = document.getElementById("dialogueBtn");
const dialogues = document.querySelectorAll(".dialogue-row");
const header = document.querySelector('.site-header');

// ======================== 메뉴 토글 (모바일) ========================
menuToggle.addEventListener("click", () => {
  const expanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!expanded));
  menuLinks.classList.toggle("expanded");
});

document.addEventListener("click", (event) => {
  if (
    window.innerWidth < 768 &&
    !menuLinks.contains(event.target) &&
    !menuToggle.contains(event.target)
  ) {
    menuLinks.classList.remove("expanded");
    menuToggle.setAttribute("aria-expanded", "false");
  }
});

// 초기 및 리사이즈 시 뷰 확인
function checkViewport() {
  if (window.innerWidth < 768) {
    menuToggle.style.display = "block";
    menuLinks.classList.add("collapsed");
    menuLinks.classList.remove("expanded");
  } else {
    menuToggle.style.display = "none";
    menuLinks.classList.remove("collapsed", "expanded");
  }
}

window.addEventListener("load", checkViewport);
window.addEventListener("resize", checkViewport);

// ======================== Scroll to Top ========================
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ======================== 섹션으로 스크롤 ========================
function scrollToSection(id) {
  const target = document.getElementById(id);
  if (!target) return;
  target.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ======================== 솔라나 주소 복사 ========================
if (copyBtn && solAddress) {
  copyBtn.addEventListener("click", () => {
    const address = solAddress.innerText.trim();
    navigator.clipboard.writeText(address)
      .then(() => showToast('주소가 복사되었습니다!'))
      .catch(() => showToast('복사 실패: 다시 시도해주세요'));
  });
}

// ======================== 간단한 Toast 알림 ========================
function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerText = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 50);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => document.body.removeChild(toast), 300);
  }, 2000);
}

// ======================== Tribe Dialogue 로직 ========================
let currentDialogue = 0;
dialogues.forEach((d) => (d.style.display = "none"));

function showNextDialogue() {
  if (currentDialogue < dialogues.length) {
    const dialogue = dialogues[currentDialogue];
    dialogue.style.display = "flex";
    setTimeout(() => dialogue.classList.add("show"), 50);
    dialogue.scrollIntoView({ behavior: "smooth", block: "center" });
    currentDialogue++;
  } else {
    location.reload();
  }
}

if (dialogueBtn) {
  dialogueBtn.addEventListener("click", showNextDialogue);
}

// ======================== 스크롤 시 헤더 배경 변경 ========================
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
});

// ======================== 카운트다운 타이머 ========================
function startCountdown(deadline) {
  const timerEl = document.getElementById('countdown');
  function updateTimer() {
    const now = new Date();
    const diff = deadline - now;
    if (diff <= 0) {
      timerEl.innerText = '이벤트가 종료되었습니다';
      clearInterval(interval);
      return;
    }
    const days    = Math.floor(diff / (1000*60*60*24));
    const hours   = Math.floor((diff / (1000*60*60)) % 24);
    const minutes = Math.floor((diff / (1000*60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    timerEl.innerText = `${days}일 ${hours}시간 ${minutes}분 ${seconds}초 남음`;
  }
  updateTimer();
  const interval = setInterval(updateTimer, 1000);
}

// 예시: 2025-06-30 23:59:59까지 카운트다운
startCountdown(new Date('2025-06-30T23:59:59'));
