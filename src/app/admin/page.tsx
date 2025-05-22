import { permanentRedirect } from "next/navigation";

const AdminPage = async () => {
  return permanentRedirect("/admin/upload");
};

export default AdminPage;
