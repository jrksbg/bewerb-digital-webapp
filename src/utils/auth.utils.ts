'use client'

import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

export function getSessionData() {
  'use client'

  const jwt = Cookies.get('session-token')
  const userdataString = sessionStorage.getItem('session-userdata')

  if (!jwt || !userdataString || Math.floor(new Date().getTime() / 1000) >= (jwtDecode(jwt)?.exp || 0)) {
    Cookies.remove('session-token')
    sessionStorage.removeItem('session-userdata')
    return null
  }

  return JSON.parse(userdataString)
}
