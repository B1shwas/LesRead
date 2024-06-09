import { useFormik } from "formik";
import { Input } from "../components/ui/input";
import { cn } from "../lib/utils";
import { Button } from "../components/ui/button";
import * as Yup from "yup";
import LoginSignup from "./LoginSignup";
import coverImage from "/images/loginImage.jpeg";
import useAuthStore from "../zustand-store/authStore";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { login, refreshToken } = useAuthStore();

  const emailValidation = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const usernameValidation = Yup.object({
    username: Yup.string()
      .matches(/^[a-zA-Z0-9_]+$/, "Invalid username")
      .required("Username is required"),
  });

  const passwordValidation = Yup.object({
    password: Yup.string().min(8, "Too Short").required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      userOrEmail: "",
      password: "",
    },
    validationSchema: Yup.object({
      userOrEmail: Yup.string().test(
        "is-email-or-username",
        "Please enter a valid email or username",
        (value) => {
          const isEmail = emailValidation.isValidSync({ email: value });
          const isUserName = usernameValidation.isValidSync({
            username: value,
          });
          return isEmail || isUserName;
        }
      ),
      password: passwordValidation.fields.password,
    }),
    onSubmit: async (values) => {
      const isEmail = emailValidation.isValidSync({
        email: values.userOrEmail,
      });

      const payload = isEmail
        ? { email: values.userOrEmail, password: values.password }
        : { userName: values.userOrEmail, password: values.password };
      try {
        await login(payload);

        if (refreshToken) navigate("/");
      } catch (error) {
        console.log(error);
      }
      formik.resetForm();
    },
  });

  return (
    <LoginSignup image={coverImage}>
      <div className="bg-white h-screen w-full flex flex-col justify-center items-center lg:w-[40%]">
        <h1 className="font-extrabold font-smooch tracking-wide text-[120px] leading-[85px]">
          WELCOME
        </h1>
        <p className="font-poppins">We are glad to see you back with us</p>

        <div className="w-[60%] mt-[30px]">
          <div>
            {/* <div className="text-red-500 bg-red-300 rounded-sm w-full text-center p-2">
              {formik.errors.password}
            </div> */}
          </div>
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-3 mt-2"
          >
            <Input
              placeholder="Username / Email"
              className={cn(
                "w-full bg-[#f2f2f2] text-black placeholder:text-black px-[3rem]"
              )}
              id="userOrEmail"
              name="userOrEmail"
              value={formik.values.userOrEmail}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.userOrEmail && formik.errors.userOrEmail}
            />
            {formik.touched.userOrEmail && formik.errors.userOrEmail && (
              <div className="text-red-500  w-full text-xs ml-2">
                {formik.errors.userOrEmail}
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
            {!formik.errors.userOrEmail &&
              formik.touched.password &&
              formik.errors.password && (
                <div className="text-red-500  w-full text-xs ml-2">
                  {formik.errors.password}
                </div>
              )}
            <Button variant="login" type="submit">
              Next
            </Button>
          </form>
        </div>
        <p className="mt-3">
          New Here?{" "}
          <a href="/register" className="text-secondary-1">
            Sign Up
          </a>
        </p>
      </div>
    </LoginSignup>
  );
};

export default Login;
