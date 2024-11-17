type RootLayoutProps = {
  panel: React.ReactElement;
  workArea: React.ReactElement;
};

export const RootLayout = (props: RootLayoutProps) => {
  return (
    <div className="flex flex-col h-[100vh] bg-slate-app text-slate-normal p-1">
      {/* <nav className="min-h-8"></nav> */}
      <main className="grid grid-cols-12 grow">
        <div className="col-span-3 md:col-span-4">{props.panel}</div>
        <div className="col-span-9 md:col-span-8 m-4">{props.workArea}</div>
      </main>
    </div>
  );
};
