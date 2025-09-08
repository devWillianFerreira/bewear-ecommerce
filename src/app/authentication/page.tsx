import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import SigninForm from "./components/sign-in-Form";
import SignUpForm from "./components/sign-up-Form";

function Authenticantion() {
  return (
    <>
      <div className="flex h-screen w-full items-center justify-center px-5">
        <div className="flex w-full max-w-[600px] flex-col justify-center gap-6">
          <Tabs defaultValue="signin">
            <TabsList>
              <TabsTrigger value="signin">Login</TabsTrigger>
              <TabsTrigger value="SignUp">Criar Conta</TabsTrigger>
            </TabsList>
            <TabsContent value="signin" className="w-full">
              <SigninForm />
            </TabsContent>
            <TabsContent value="SignUp" className="w-full">
              <SignUpForm />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}

export default Authenticantion;
