import { createClient } from '@supabase/supabase-js'

// .env에서 키를 가져옵니다
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
export const supabase = createClient(supabaseUrl, supabaseKey)

// 캠페인 정보 가져오기
export async function fetchCampaignData(campaignId) {
    const { data, error } = await supabase
        .from('campaign')
        .select('*') // 필요한 컬럼만 적어도 됨
        .eq('campaign_id', campaignId)
        .single()
    return { data, error }
}

// 이벤트 정보 가져오기
export async function fetchEventData(eventId) {
    const { data, error } = await supabase
        .from('event')
        .select('*')
        .eq('event_id', eventId)
        .single()
    return { data, error }
}

// 이미지 가져오기
export async function fetchImages(campaignId) {
    const { data, error } = await supabase
        .from('campaign_image')
        .select('*')
        .eq('campaign_id', campaignId)
        .order('sort_order', { ascending: true })
    return { data, error }
}

// 참가자 정보 저장 (Insert)
export async function submitParticipant(payload) {
    const { error } = await supabase
        .from('participant')
        .insert(payload)
    return { error }
}