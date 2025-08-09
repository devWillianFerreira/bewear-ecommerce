import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import SigninForm from "./components/sign-in-Form";
import SignUpForm from "./components/sign-up-Form";

function Authenticantion() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
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
  );
}

export default Authenticantion;
