const API_URL = 'http://127.0.0.1:3003'

export async function getConfig() {
  return await fetch(`${API_URL}/`).then(res => res.json());
}

export async function getTree() {
  return await fetch(`${API_URL}/tree`).then(res => res.json());
}

export async function getPage(pageId) {
  return await fetch(`${API_URL}/source/${pageId}`).then(res => res.text());
}
