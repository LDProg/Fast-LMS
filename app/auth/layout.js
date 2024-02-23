export default async function AuthLayout({ children, login, register }) {
  return (
    <div className="h-screen flex items-center justify-center bg-background">
      <div className="w-1/2 h-screen flex justify-center items-center">
        {children}
      </div>
      <div className="w-1/2 h-screen flex justify-center items-center">
        {login}
      </div>
    </div>
  );
}
