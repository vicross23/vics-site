import { cookies } from "next/headers";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const data: { password: string } = await request.json();
  const password = data.password;

  const maxAge = 60 * 60; // 1 hour

  if (process.env.PAGE_PASSWORD !== password) {
    return new Response("Incorrect password", {
      status: 403,
    });
  }

  cookieStore.set(process.env.PASSWORD_COOKIE_NAME!, "true", {
    httpOnly: true,
    maxAge,
  });

  return new Response("Correct password", {
    status: 200,
  });
}
