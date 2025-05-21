import { cookies } from "next/headers";
import PasswordEntry from "~/components/password-entry";

const AdminPage = async () => {
  const requestCookies = await cookies();
  const isAuthenticated = requestCookies.get(process.env.PASSWORD_COOKIE_NAME!);

  if (!isAuthenticated) {
    return <PasswordEntry />;
  }

  return (
    <div className="grow p-10 flex flex-col justify-center items-center gap-16">
      This is the admin page
    </div>
  );
};

export default AdminPage;
