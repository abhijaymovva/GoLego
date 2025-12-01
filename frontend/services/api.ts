import { Build } from "@/types/bricks";

const API_BASE = 'http://localhost:8000/api/v1';

export async function saveBuild(build: Build): Promise<Build> {
  const res = await fetch(`${API_BASE}/builds/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(build),
  });
  if (!res.ok) throw new Error('Failed to save build');
  return res.json();
}

export async function getBuild(id: string): Promise<Build> {
  const res = await fetch(`${API_BASE}/builds/${id}`);
  if (!res.ok) throw new Error('Failed to fetch build');
  return res.json();
}

export async function getChallenge(id: string) {
  const res = await fetch(`${API_BASE}/challenges/${id}`);
  if (!res.ok) throw new Error('Failed to fetch challenge');
  return res.json();
}

