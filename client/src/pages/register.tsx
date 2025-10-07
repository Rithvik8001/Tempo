import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import axios from "axios";
import { useMemo, useState } from "react";
import { toast } from "sonner";

type RegisterPayload = {
  userName: string;
  email: string;
  password: string;
};

type RegisterResponse = {
  message?: string;
};

const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const isDisabled = useMemo(
    () => isLoading || !userName || !email || !password,
    [email, isLoading, password, userName]
  );

  const handleRegister = async () => {
    if (!userName || !email || !password) {
      toast.error("Please fill all the fields");
      return;
    }
    try {
      setIsLoading(true);
      const payload: RegisterPayload = { userName, email, password };
      const response = await axios.post<RegisterResponse>(
        `${import.meta.env.VITE_BASE_URL}/auth/signup`,
        payload
      );
      toast.success(response.data?.message ?? "Account created");
      navigate("/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          (error.response?.data as RegisterResponse | undefined)?.message ??
          error.message ??
          "Something went wrong while signing up";
        toast.error(message);
        return;
      }
      toast.error("Unexpected error while signing up");
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
              Sign up to your account
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Label className="text-sm font-medium">Username</Label>
            <Input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <Label className="text-sm font-medium">Email</Label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            <Label className="text-sm font-medium">Password</Label>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              className="w-full mt-2"
              onClick={handleRegister}
              disabled={isDisabled}
            >
              Sign up
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Register;
