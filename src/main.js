import { fetchCampaignData, fetchEventData, fetchImages, submitParticipant } from './src/api.js';
import { renderHeader, renderImages, setupScrollObserver } from './src/ui.js';

// URL 파라미터 읽기
const params = new URLSearchParams(window.location.search);
const CAMPAIGN_ID = params.get('campaign_id');
const EVENT_ID = params.get('event_id');

async function init() {
    if (!CAMPAIGN_ID || !EVENT_ID) {
        alert("잘못된 접근입니다.");
        return;
    }

    // 1. 데이터 가져오기 (API)
    const { data: camData } = await fetchCampaignData(CAMPAIGN_ID);
    const { data: eventData } = await fetchEventData(EVENT_ID);
    const { data: imgData } = await fetchImages(CAMPAIGN_ID);

    // 2. 화면 그리기 (UI)
    if (camData) renderHeader(camData.cam_name);
    if (imgData) renderImages(imgData);

    // 3. 스크롤 기능 연결
    const btnText = eventData ? eventData.event_name : "보상 받기";
    
    setupScrollObserver('main-btn', btnText, () => {
        // 버튼 클릭 시 실행될 동작 (모달 열기)
        document.getElementById('modal').style.display = 'flex';
    });

    // 4. 모달 확인 버튼 로직 등 추가...
    // (이 부분도 ui.js로 뺄 수 있지만, main.js에서 흐름을 보는 것도 좋습니다)
    document.getElementById('modal-confirm-btn').addEventListener('click', async () => {
        // ... 입력값 검증 로직 ...
        const phone = document.getElementById('input-phone').value;
        
        const payload = {
            campaign_id: CAMPAIGN_ID,
            event_id: EVENT_ID,
            phone_number: phone,
            is_agreed_privacy: true,
            is_agreed_location: true
        };

        const { error } = await submitParticipant(payload);
        if(!error) {
            alert("완료!");
            location.reload();
        } else {
            alert("에러: " + error.message);
        }
    });
}

// 시작!
init();