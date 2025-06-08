export const dynamic = "force-dynamic";

const ContentLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div className="grow flex flex-col">{children}</div>;
};

export default ContentLayout;
