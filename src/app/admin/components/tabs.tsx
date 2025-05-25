"use client";

import { usePathname } from "next/navigation";
import { FileCog, FileUpIcon } from "lucide-react";

import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import Link from "next/link";

const AdminTabs = () => {
  const pathname = usePathname();

  let defaultActiveTab;

  switch (pathname) {
    case "/admin/upload":
      defaultActiveTab = "upload";
      break;
    case "/admin/manage":
      defaultActiveTab = "manage";
      break;
  }
  return (
    <Tabs defaultValue={defaultActiveTab}>
      <TabsList className="h-auto rounded-none border-b bg-transparent px-5 gap-4 py-0">
        <Link href="/admin/upload" className="inline-flex gap-2 items-center">
          <TabsTrigger variant="underline" value="upload" className="text-lg">
            <FileUpIcon className="size-5" />
            Upload
          </TabsTrigger>
        </Link>
        <Link href="/admin/manage" className="inline-flex gap-2 items-center">
          <TabsTrigger variant="underline" value="manage" className="text-lg">
            <FileCog className="size-5" />
            Manage
          </TabsTrigger>
        </Link>
      </TabsList>
    </Tabs>
  );
};
export default AdminTabs;
