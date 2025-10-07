import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import axios from "axios";
import { useMemo, useState } from "react";
import { toast } from "sonner";

type LoginPayload = {
  email: string;
  password: string;
};

type LoginResponse = {
  message?: string;
  data?: {
    userId: string;
    userName: string;
    email: string;
  };
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const isDisabled = useMemo(
    () => isLoading || !email || !password,
    [email, isLoading, password]
  );

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please fill all the fields");
      return;
    }
    try {
      setIsLoading(true);
      const payload: LoginPayload = { email, password };
      const response = await axios.post<LoginResponse>(
        `${import.meta.env.VITE_BASE_URL}/auth/login`,
        payload,
        { withCredentials: true }
      );
      toast.success(response.data?.message ?? "Welcome back!");
      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          (error.response?.data as LoginResponse | undefined)?.message ??
          error.message ??
          "Invalid credentials";
        toast.error(message);
        return;
      }
      toast.error("Unexpected error while logging in");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col h-screen p-4 max-w-xl mx-auto items-center justify-center">
        <div className="flex justify-start w-full mb-8 text-gray-500 ">
          <ArrowLeft
            className="cursor-pointer"
            size={20}
            onClick={() => navigate("/")}
          />
        </div>
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-center">
              Login to your account
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Label className="text-sm font-medium">Email</Label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            <Label className="text-sm font-medium">Password</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              className="w-full mt-2"
              onClick={handleLogin}
              disabled={isDisabled}
            >
              Login
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Login;
