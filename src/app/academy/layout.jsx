export const metadata = {
  title: "Fancy Academy",
};

export default function AcademyLayout({ children }) {
  return (
    <div className="academy-root" data-theme="dark">
      {children}
    </div>
  );
}