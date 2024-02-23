export default async function AuthLayout({ children, login, register }) {
  return (
    <div className="h-screen flex flex-col lg:flex-row items-center justify-center bg-background overflow-hidden">
      <div className="lg:w-1/2 lg:h-screen flex justify-center items-center">
        {children}
      </div>
      <div className="lg:w-1/2 lg:h-screen flex justify-center lg:bg-default-50 items-center px-6">
        {login}
      </div>
    </div>
  );
}
