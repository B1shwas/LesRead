import LoginSignup from "./LoginSignup";
import coverImage from "/images/signup.jpeg";
import { useFormik } from "formik";
import { Input } from "../components/ui/input";
import { cn } from "../lib/utils";
import { Button } from "../components/ui/button";
import * as Yup from "yup";
import { userRegistration } from "../utils/postApi";

const Register = () => {
  const validationSchema = Yup.object({
    fullName: Yup.string()
      .required("Full Name is required")
      .min(3, "Full Name must be at least 3 characters long"),
    userName: Yup.string()
      .required("Username/Email is required")
      .min(3, "Username/Email must be at least 3 characters long"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/\d/, "Password must contain at least one number"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .test(
        "passwordMatch",
        "Passwords must match",
        (value, context) => value === context.parent.password
      ),
  });

  const formik = useFormik({
    initialValues: {
      userName: "",
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    validateOnBlur: true,
    onSubmit: async (values) => {
      const { confirmPassword, ...rest } = values;
      await userRegistration(rest);

      formik.resetForm();
    },
  });

  return (
    <LoginSignup image={coverImage}>
      <div className="bg-white h-screen w-full flex flex-col justify-center items-center lg:w-[40%]">
        <h1 className="font-extrabold font-smooch tracking-wide text-[120px] leading-[85px]">
          WELCOME
        </h1>
        <p className="font-poppins">Sign up now to get started.</p>

        <div className="w-[60%] mt-[30px]">
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-3 mt-2"
          >
            <Input
              placeholder="Full Name"
              className={cn(
                "w-full bg-[#f2f2f2] text-black placeholder:text-black px-[3rem]"
              )}
              id="fullName"
              name="fullName"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.fullName && formik.errors.fullName}
            />
            {formik.touched.fullName && formik.errors.fullName && (
              <div className="text-red-500  w-full text-xs ml-2">
                {formik.errors.fullName}
              </div>
            )}
            <Input
              placeholder="Username"
              className={cn(
                "w-full bg-[#f2f2f2] text-black placeholder:text-black px-[3rem]"
              )}
              id="userName"
              name="userName"
              value={formik.values.userName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.userName && formik.errors.userName}
            />
            {!formik.errors.fullName &&
              formik.touched.userName &&
              formik.errors.userName && (
                <div className="text-red-500  w-full text-xs ml-2">
                  {formik.errors.fullName}
                </div>
              )}
            <Input
              placeholder="Email"
              className={cn(
                "w-full bg-[#f2f2f2] text-black placeholder:text-black px-[3rem]"
              )}
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && formik.errors.email}
            />
            {!formik.errors.userName &&
              !formik.errors.fullName &&
              formik.touched.email &&
              formik.errors.email && (
                <div className="text-red-500  w-full text-xs ml-2">
                  {formik.errors.email}
                </div>
              )}
            <Input
              placeholder="Password"
              className={cn(
                "w-full bg-[#f2f2f2] text-black placeholder:text-black px-[3rem]"
              )}
              id="password"
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && formik.errors.password}
            />
            {!formik.errors.fullName &&
              !formik.errors.userName &&
              !formik.errors.email &&
              formik.touched.password &&
              formik.errors.password && (
                <div className="text-red-500  w-full text-xs ml-2">
                  {formik.errors.password}
                </div>
              )}
            <Input
              placeholder="Confirm Password"
              className={cn(
                "w-full bg-[#f2f2f2] text-black placeholder:text-black px-[3rem]"
              )}
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
            />
            {!formik.errors.fullName &&
              !formik.errors.userName &&
              !formik.errors.email &&
              !formik.errors.password &&
              formik.errors.confirmPassword &&
              formik.touched.confirmPassword && (
                <div className="text-red-500  w-full text-xs ml-2">
                  {formik.errors.confirmPassword}
                </div>
              )}
            <Button variant="login" type="submit">
              Next
            </Button>
          </form>
        </div>
        <p className="mt-3">
          Already have an account?{" "}
          <a href="/login" className="text-secondary-1">
            Login
          </a>
        </p>
      </div>
    </LoginSignup>
  );
};

export default Register;
