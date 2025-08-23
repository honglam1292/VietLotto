export interface ProfileType {
  player_id: string;
  username: string;
  full_name: string | null;
  nickname: string | null;
  mobile: string;
  email: string;
  birth: string | null;
  referrer: string | null;
  referrer_ids: string | null;
  referral_code: string;
  active: string;
  wallet_lock: string;
  points: string;
  profile_group_id: string | null;
  bank_group_id: string;
  upline: string;
  upline_ids: string;
  login_token: string;
  avatar: string;
  line: string;
  level: string;
  wallet_manual_transfer: string;
  address: string;
  city: string;
  country: string;
  first_name: string;
  last_name: string;
  whatsapp: string
}