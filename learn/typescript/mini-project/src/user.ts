export type User = { id: number; name: string; email?: string };

export function formatUser(u: User): string {
  return u.email ? `${u.name} <${u.email}>` : u.name;
}

// 以下行在 tsc --noEmit 下应报错，用于演示 strict：
// const bad: User = { id: "x", name: 1 };

export function pickId(u: User): number {
  return u.id;
}
