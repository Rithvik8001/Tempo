import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate();
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
            <Input />
            <Label className="text-sm font-medium">Password</Label>
            <Input />
            <Button className="w-full mt-2">Login</Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Login;
