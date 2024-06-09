const LoginSignup = ({ children, image }) => {
  return (
    <div className="flex">
      <div className="relative hidden lg:block w-[60%] h-screen">
        <div className="absolute inset-0 bg-primary-1 opacity-60 lg:block mt-3 ml-3 w-[100%] rounded-md h-[97vh]"></div>
        <img
          src={image}
          className="h-[97vh] object-cover w-full rounded-md mt-3 lg:ml-3"
        />
      </div>
      {children}
    </div>
  );
};

export default LoginSignup;
