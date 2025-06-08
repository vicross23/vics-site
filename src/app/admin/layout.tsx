import { Metadata } from "next";
import { cookies } from "next/headers";
import { Suspense } from "react";
import AdminTabs from "~/app/admin/components/tabs";

import PasswordEntry from "~/components/password-entry";

export const metadata: Metadata = {
  title: "Admin",
};

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const requestCookies = await cookies();

  const isAuthenticated = requestCookies.get(process.env.PASSWORD_COOKIE_NAME!);

  if (!isAuthenticated) {
    return (
      <div className="grow flex flex-col">
        <PasswordEntry />
      </div>
    );
  }

  return (
    <div className="grow flex flex-col">
      <div className="min-h-full min-w-full grow p-10 flex flex-col justify-start items-center gap-8">
        <AdminTabs />
        <Suspense fallback={<div>Loading images...</div>}>{children}</Suspense>
      </div>
    </div>
  );
}
