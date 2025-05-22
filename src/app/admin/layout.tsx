import { cookies } from "next/headers";
import AdminTabs from "~/app/admin/components/tabs";

import PasswordEntry from "~/components/password-entry";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const requestCookies = await cookies();

  const isAuthenticated = requestCookies.get(process.env.PASSWORD_COOKIE_NAME!);

  if (!isAuthenticated) {
    return <PasswordEntry />;
  }

  return (
    <div className="grow p-10 flex flex-col justify-start items-center gap-16">
      <AdminTabs />
      {children}
    </div>
  );
}
