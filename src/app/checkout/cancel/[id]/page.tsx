import { and, eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { orderTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import FeedbackDialog from "../../components/FeedbackDialog";
import schema from "../../schema";

interface CancelPageProps {
  params: Promise<{ id: string }>;
}

const CancelPage = async ({ params }: CancelPageProps) => {
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
      eq(orderTable.status, "canceled"),
    ),
  });
  if (!order) {
    redirect("/");
  }
  return (
    <div>
      <FeedbackDialog
        image="/error.svg"
        title="Algo deu errado!"
        description="Não foi possível concluir a operação. O pedido pode ter sido
            cancelado ou houve um erro inesperado. Tente novamente ou entre em
            contato com o suporte."
      />
    </div>
  );
};

export default CancelPage;
