// == js/main.js ==

// 1) DOM 요소 선택
console.log("▶ main.js가 정상적으로 로드되었습니다.");

const menuToggle   = document.getElementById("menu-toggle");
const menuLinks    = document.getElementById("menu-links");
const copyBtn      = document.getElementById("copy-btn");
const solAddress   = document.getElementById("sol-address");
const dialogueBtn  = document.getElementById("dialogueBtn");
const dialogues    = document.querySelectorAll(".dialogue-row");
const header       = document.querySelector('.site-header');
const heroSection  = document.getElementById('hero');
const parallaxImg  = document.getElementById('parallax-img');
const heroText     = document.getElementById('hero-text');
const btnScrollAbout = document.getElementById("btn-scroll-about");

// 2) 메뉴 토글 (모바일)
menuToggle.addEventListener("click", () => {
  const expanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!expanded));
  menuLinks.classList.toggle("expanded");
});

document.addEventListener("click", (event) => {
  // 모바일 화면(<768px)에서 메뉴 바깥 클릭 시 메뉴 닫기
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

// 3) 스크롤 맨 위로 이동
window.scrollToTop = function() {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// 4) 지정된 섹션(id)으로 부드럽게 스크롤
window.scrollToSection = function(id) {
  console.log("▶ scrollToSection 호출됨, id =", id);
  const target = document.getElementById(id);
  if (!target) {
    console.warn("⚠ 해당 id(" + id + ") 섹션을 찾을 수 없습니다:", id);
    return;
  }
  target.scrollIntoView({ behavior: "smooth", block: "start" });
};

// 5) “더 알아보기” 버튼에 이벤트 연결 (인라인 onclick 대신)
if (btnScrollAbout) {
  btnScrollAbout.addEventListener("click", () => {
    console.log("▶ btn-scroll-about 클릭됨");
    scrollToSection("about");
  });
}

// 6) Solana 주소 복사
if (copyBtn && solAddress) {
  copyBtn.addEventListener("click", () => {
    const address = solAddress.innerText.trim();
    navigator.clipboard.writeText(address)
      .then(() => showToast('주소가 복사되었습니다!'))
      .catch(() => showToast('복사 실패: 다시 시도해주세요'));
  });
}

// 7) Toast 알림 표시 함수
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

// 8) Tribe 대사(다이얼로그) 로직
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

// 9) 스크롤 시 헤더 배경 변경
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
});

// 10) 패럴럭스 효과 & 텍스트 흐림 여부 결정
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const heroHeight = heroSection.offsetHeight;

  // (1) 패럴럭스: 이미지가 스크롤의 절반 속도로 움직이도록 설정
  //     top = scrollY * 0.5 (원본 위치에서 -을 하면 위로 밀림)
  parallaxImg.style.transform = `translate(-50%, ${scrollY * 0.5}px)`;

  // (2) 텍스트 흐림/선명 효과
  //     스크롤이 heroHeight의 절반 이하인 동안 흐릿하게, 
  //     절반 이상 넘어가면 또렷하게 보여줌
  if (scrollY < heroHeight / 2) {
    // 이미지 위에 텍스트가 걸쳐 있을 때 → 흐리게
    heroText.style.filter = 'blur(3px)';
    heroText.style.opacity = '0.6';
  } else {
    // 텍스트가 이미지 영역 벗어났을 때 → 선명하게
    heroText.style.filter = 'none';
    heroText.style.opacity = '1';
  }
});

// 11) 카운트다운 타이머
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
    const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours   = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    timerEl.innerText = `${days}일 ${hours}시간 ${minutes}분 ${seconds}초 남음`;
  }
  updateTimer();
  const interval = setInterval(updateTimer, 1000);
}

// 예시: 2025-06-30 23:59:59까지 카운트다운
startCountdown(new Date('2025-06-30T23:59:59'));
