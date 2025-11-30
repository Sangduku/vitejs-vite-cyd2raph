// 제목 그리기
export function renderHeader(title) {
    document.getElementById('cam-title').innerText = title || "제목 없음";
}

// 이미지 목록 그리기
export function renderImages(images) {
    const container = document.getElementById('image-container');
    container.innerHTML = ''; // 초기화
    
    if (!images || images.length === 0) {
        container.innerHTML = "<p>이미지가 없습니다.</p>";
        return;
    }

    images.forEach(img => {
        const el = document.createElement('img');
        el.src = img.image_url;
        el.style.width = '100%'; // 스타일은 CSS로 빼는게 더 좋음
        container.appendChild(el);
    });
}

// 스크롤 감시자 설정
export function setupScrollObserver(btnId, targetText, onActivate) {
    const btn = document.getElementById(btnId);
    const endPoint = document.getElementById('scroll-end-point');

    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            btn.innerText = targetText;
            btn.classList.add('active');
            btn.style.pointerEvents = 'auto'; // 클릭 가능하게 변경
            btn.onclick = onActivate; // 클릭 시 실행할 함수 연결
        }
    }, { threshold: 0.1 });

    observer.observe(endPoint);
}