"use client";
import { useFormik } from "formik";
import * as yup from "yup";
import { AtSign, Lock, User, Calendar, Users } from "lucide-react";
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
import { signup } from "@/lib/Redux/AuthSlice";
import { useDispatch } from "react-redux";
import { signupData } from "../types/auth.types";
import reduxStore from "@/lib/Redux/ReduxStore";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function Page() {
  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 13);
  // console.log(minDate);

  const formattedMinDate = minDate.toISOString().split("T")[0];

  const schema = yup.object().shape({
    name: yup.string().required("Name is required"),

    email: yup
      .string()
      .email("Invalid Email Address")
      .required("Email is required"),

    password: yup
      .string()
      .required("Password is required")
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Password must contain at least 8 characters, including uppercase, lowercase letters, numbers, and special characters"
      ),

    rePassword: yup
      .string()
      .required("Password Confirmation is required")
      .oneOf([yup.ref("password"), undefined], "Passwords must match"),

    dateOfBirth: yup
      .date()
      .max(minDate, "You must be at least 13 years old")
      .required("Date of Birth is required"),

    gender: yup
      .string()
      .required("Gender is required")
      .oneOf(["male", "female"]),
  });

  const dispatch = useDispatch<typeof reduxStore.dispatch>();
  const router = useRouter();
  const { toast } = useToast();

  const initialValues: signupData = {
    email: "",
    password: "",
    rePassword: "",
    name: "",
    dateOfBirth: "",
    gender: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: schema,
    onSubmit: (values: signupData) => {
      const [year, month, day] = values.dateOfBirth.split("-");
      const formattedDate = `${month}-${day}-${year}`;
      const formattedValues = { ...values, dateOfBirth: formattedDate };

      dispatch(signup(formattedValues)).then((msg) => {
        const message: string = msg.payload.message;
        if (message === "success") {
          toast({
            variant: "success",
            title: "Success",
            description: "account created successfully! please login",
          });
          router.push("/login");
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Something went wrong! please try again",
          });
        }
      });
    },
  });

  return (
    <Card className="w-[350px] mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Register Now:</CardTitle>
      </CardHeader>
      <form onSubmit={formik.handleSubmit}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label className="font-bold" htmlFor="name">
                Name
              </Label>
              <div className="relative">
                <User className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  type="name"
                  name="name"
                  className="pl-8"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  required
                />
              </div>
              {formik.errors.name && formik.touched.name && (
                <span className="text-red-600 p-2 border border-red-600 my-2 rounded-md text-sm dark:bg-transparent bg-red-100">
                  {formik.errors.name}
                </span>
              )}

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
                  required
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
                  required
                />
              </div>
              {formik.errors.password && formik.touched.password && (
                <span className="text-red-600 p-2 border border-red-600 my-2 rounded-md text-sm dark:bg-transparent bg-red-100">
                  {formik.errors.password}
                </span>
              )}

              <Label className="font-bold" htmlFor="rePassword">
                Confirm Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="rePassword"
                  name="rePassword"
                  type="password"
                  className="pl-8"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.rePassword}
                  required
                />
              </div>
              {formik.errors.rePassword && formik.touched.rePassword && (
                <span className="text-red-600 p-2 border border-red-600 my-2 rounded-md text-sm dark:bg-transparent bg-red-100">
                  {formik.errors.rePassword}
                </span>
              )}

              <Label className="font-bold" htmlFor="dateOfBirth">
                Date of Birth{" "}
                <em className="font-normal">(at least 13 years old)</em>
              </Label>
              <div className="relative">
                <Calendar className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  value={formik.values.dateOfBirth}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  max={formattedMinDate}
                  required
                  className="pl-8"
                />
              </div>
              {formik.errors.dateOfBirth && formik.touched.dateOfBirth && (
                <span className="text-red-600 p-2 border border-red-600 my-2 rounded-md text-sm dark:bg-transparent bg-red-100">
                  {formik.errors.dateOfBirth}
                </span>
              )}

              <Label className="font-bold" htmlFor="gender">
                Gender
              </Label>

              <RadioGroup
                value={formik.values.gender}
                onValueChange={(value) => formik.setFieldValue("gender", value)}
                id="gender"
                name="gender"
                required
                className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female">Female</Label>
                </div>
              </RadioGroup>
              {formik.errors.gender && formik.touched.gender && (
                <span className="text-red-600 p-2 border border-red-600 my-2 rounded-md text-sm dark:bg-transparent bg-red-100">
                  {formik.errors.gender}
                </span>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" variant="outline">
            <Users className="mr-2 h-4 w-4" />
            Register
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
