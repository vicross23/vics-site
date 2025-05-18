import { cookies } from "next/headers";
import PasswordEntry from "~/app/admin/components/password-entry";

const AdminPage = async () => {
  const requestCookies = await cookies();
  const isAuthenticated = requestCookies.get(process.env.PASSWORD_COOKIE_NAME!);

  if (!isAuthenticated) {
    return <PasswordEntry />;
  }

  return <div>This is the admin page</div>;
};

export default AdminPage;
