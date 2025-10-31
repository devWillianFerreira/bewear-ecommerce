"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { toast } from "sonner";
import z from "zod";

import { useCreateShippingAddress } from "@/app/hooks/mutations/use-create-shipping-address";
import { useUpdateCartShippingAddress } from "@/app/hooks/mutations/use-update-cart-shipping-address";
import { useUserAddresses } from "@/app/hooks/queries/use-shipping-address";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { shippingAddressTable } from "@/db/schema";

import { estados } from "../../data/states";
import { formatAddress } from "../../helpers/address";

const schema = z.object({
  email: z.email("E-mail inválido"),
  fullName: z.string().min(1, "Nome completo é obrigatório"),
  cpf: z.string().min(14, "CPF inválido"),
  phone: z.string().min(15, "Celular inválido"),
  zipCode: z.string().min(9, "CEP inválido"),
  address: z.string().min(1, "Endereço é obrigatório"),
  number: z.string().min(1, "Número é obrigatório"),
  complement: z.string().optional(),
  neighborhood: z.string().min(1, "Bairro é obrigatório"),
  city: z.string().min(1, "Cidade é obrigatória"),
  state: z.string().min(1, "Estado é obrigatório"),
});
type formsValue = z.infer<typeof schema>;

interface AddressProps {
  shippingAdresses: (typeof shippingAddressTable.$inferSelect)[];
  defaultshippingAdressId: string | null;
}

const Address = ({
  defaultshippingAdressId,
  shippingAdresses,
}: AddressProps) => {
  const form = useForm<formsValue>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      fullName: "",
      cpf: "",
      phone: "",
      zipCode: "",
      address: "",
      number: "",
      complement: "",
      neighborhood: "",
      city: "",
      state: "",
    },
  });
  const router = useRouter();
  const [selectedAddress, setSelectedAddress] = useState<string | null>(
    defaultshippingAdressId || null,
  );

  const createShippingAddressMutation = useCreateShippingAddress();
  const updateCartShippingAddressMutation = useUpdateCartShippingAddress();
  const { data: address, isLoading } = useUserAddresses({
    initialData: shippingAdresses,
  });
  const onSubmit = async (values: formsValue) => {
    try {
      const newAddress =
        await createShippingAddressMutation.mutateAsync(values);
      toast.success("Endereço criado com sucesso!");
      form.reset();
      setSelectedAddress(newAddress.id);
      await updateCartShippingAddressMutation.mutateAsync({
        shippingAddressId: newAddress.id,
      });
      toast.success("Endereço vinculado ao carrinho!");
    } catch (error) {
      toast.error("Erro ao criar endereço. Tente novamente.");
      console.log(error);
    }
  };

  const handleGoToPayment = async () => {
    if (!selectedAddress || selectedAddress === "add_new") return;
    try {
      await updateCartShippingAddressMutation.mutateAsync({
        shippingAddressId: selectedAddress,
      });
      toast.success("Endereço selecionado para entrega!");
      router.push("/cart/confirmation");
    } catch (error) {
      toast.error("Erro ao selecionar endereço. Tente novamente.");
      console.log(error);
    }
  };
  return (
    <div className="space-y-6">
      {isLoading ? (
        <div className="py-4 text-center">
          <p>Carregando endereços...</p>
        </div>
      ) : (
        <RadioGroup value={selectedAddress} onValueChange={setSelectedAddress}>
          {address?.length == 0 && (
            <div className="w-full py-4 text-center">
              <h1 className="text-muted-foreground">
                Você ainda não possui endereços cadastrados.
              </h1>
            </div>
          )}

          {address?.map((address) => (
            <Card key={address.id}>
              <CardContent>
                <div className="flex w-full items-center space-x-2">
                  <RadioGroupItem value={address.id} id={address.id} />
                  <Label htmlFor={address.id} className="cursor-pointer">
                    {formatAddress(address)}
                  </Label>
                </div>
              </CardContent>
            </Card>
          ))}
          <Card>
            <CardContent>
              <div className="flex w-full items-center space-x-2">
                <RadioGroupItem value="add_new" id="option-one" />
                <Label htmlFor="add_new">Adicionar Novo</Label>
              </div>
            </CardContent>
          </Card>
        </RadioGroup>
      )}

      {selectedAddress && selectedAddress !== "add_new" && (
        <Button
          onClick={handleGoToPayment}
          className="w-full cursor-pointer"
          disabled={updateCartShippingAddressMutation.isPending}
        >
          {updateCartShippingAddressMutation.isPending
            ? "Procesando..."
            : "Ir Para Pagamento"}
        </Button>
      )}
      {selectedAddress == "add_new" && (
        <div className="space-y-6">
          <Separator />
          <p className="text-sm font-semibold">Adicionar Novo</p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-5">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="EMAIL" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="NOME COMPLETO" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex w-full gap-4">
                  <FormField
                    control={form.control}
                    name="cpf"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <PatternFormat
                            format="###.###.###-##"
                            placeholder="000.000.000-00"
                            customInput={Input}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <PatternFormat
                            format="(##) #####-####"
                            placeholder="(00) 00000-0000"
                            customInput={Input}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="zipCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <PatternFormat
                          format="#####-###"
                          placeholder="00000-000"
                          customInput={Input}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="ENDEREÇO" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-4">
                  <FormField
                    control={form.control}
                    name="number"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input placeholder="NÚMERO" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="complement"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input placeholder="COMPLEMENTO" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex gap-4">
                  <FormField
                    control={form.control}
                    name="neighborhood"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input placeholder="BAIRRO" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input placeholder="CIDADE" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          {/* <Input placeholder="ESTADO" {...field} /> */}
                          <Select
                            defaultValue={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Selecione um estado " />
                            </SelectTrigger>
                            <SelectContent>
                              {estados.map((estado) => (
                                <SelectItem
                                  key={estado.sigla}
                                  value={estado.nome}
                                >
                                  {estado.nome}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button
                  className="w-full cursor-pointer rounded-full"
                  type="submit"
                >
                  Continuar com o pagamento
                </Button>
              </div>
            </form>
          </Form>
        </div>
      )}
    </div>
  );
};

export default Address;
