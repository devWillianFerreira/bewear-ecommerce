import { and, eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { toast } from "sonner";

import { db } from "@/db";
import { orderTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import FeedbackDialog from "../../components/FeedbackDialog";
import schema from "../../schema";

interface SuccessPageProps {
  params: Promise<{ id: string }>;
}

const SuccessPage = async ({ params }: SuccessPageProps) => {
  const { id } = await params;

  const uuidValid = schema.safeParse({
    id: (await params).id,
  });

  if (uuidValid.error) {
    redirect("/");
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/");
  }
  const order = await db.query.orderTable.findFirst({
    where: and(
      eq(orderTable.userId, session.user.id),
      eq(orderTable.id, id),
      eq(orderTable.status, "paid"),
    ),
  });
  if (!order) {
    redirect("/");
  }
  return (
    <div>
      <FeedbackDialog
        image="/illustration.svg"
        title="Pedido Efetuado!"
        description="Seu pedido foi efetuado com sucesso. Você pode acompanhar o status na
          seção de “Meus Pedidos."
      />
    </div>
  );
};

export default SuccessPage;
