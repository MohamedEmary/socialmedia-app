"use client";
import { useFormik } from "formik";
import * as yup from "yup";
import { AtSign, Lock, LogIn, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/lib/Redux/AuthSlice";
import { useDispatch } from "react-redux";
import { loginData } from "../types/auth.types";
import reduxStore from "@/lib/Redux/ReduxStore";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

export default function Page() {
  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid Email Address")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const dispatch = useDispatch<typeof reduxStore.dispatch>();
  const router = useRouter();

  const initialValues: loginData = {
    email: "",
    password: "",
  };

  const handleDemoLogin = async () => {
    await formik.setValues(
      {
        email: "za3bolaa@gmail.com",
        password: "Za3bola@1234",
      },
      false // Do not validate fields
    );
    formik.submitForm();
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: schema,
    onSubmit: (values: loginData) => {
      dispatch(login(values)).then((msg) => {
        const message: string = msg.payload.message;
        if (message === "success") {
          router.push("/");
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description: "incorrect email or password",
          });
        }
      });
    },
  });

  return (
    <Card className="w-[350px] mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Login Now:</CardTitle>
      </CardHeader>
      <form onSubmit={formik.handleSubmit}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label className="font-bold" htmlFor="email">
                Email
              </Label>
              <div className="relative">
                <AtSign className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  className="pl-8"
                  // required
                />
              </div>
              {formik.errors.email && formik.touched.email && (
                <span className="text-red-600 p-2 border border-red-600 my-2 rounded-md text-sm dark:bg-transparent bg-red-100">
                  {formik.errors.email}
                </span>
              )}
              <Label className="font-bold" htmlFor="password">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  name="password"
                  className="pl-8"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  // required
                />
              </div>
              {formik.errors.password && formik.touched.password && (
                <span className="text-red-600 p-2 border border-red-600 my-2 rounded-md text-sm dark:bg-transparent bg-red-100">
                  {formik.errors.password}
                </span>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="space-x-2">
          <Button type="submit" className="w-full" variant="outline">
            <LogIn className="mr-2 h-4 w-4" />
            Login
          </Button>
          <Button
            type="button"
            onClick={handleDemoLogin}
            className="w-full"
            variant="outline">
            <User className="mr-2 h-4 w-4" />
            Demo Login
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
