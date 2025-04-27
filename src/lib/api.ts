import { getCurrentUser } from './auth'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'

export async function apiFetch(endpoint: string, options?: RequestInit) {
  const user = await getCurrentUser()
  const headers = {
    'Content-Type': 'application/json',
    ...(user ? { Authorization: `Bearer ${user.id}` } : {}),
    ...options?.headers,
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Request failed')
  }

  return response.json()
}

export async function apiPost(endpoint: string, data: any) {
  return apiFetch(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export async function apiPut(endpoint: string, data: any) {
  return apiFetch(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
}

export async function apiDelete(endpoint: string) {
  return apiFetch(endpoint, {
    method: 'DELETE',
  })
}