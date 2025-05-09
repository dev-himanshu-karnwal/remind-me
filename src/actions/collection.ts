"use server";

import { prisma } from "@/lib/prisma";
import { createCollectionSchemaType } from "@/schema/createCollectionSchema";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function createCollection(form: createCollectionSchemaType) {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not found!");
  }

  const newCollection = await prisma.collection.create({
    data: {
      userId: user.id,
      color: form.color,
      name: form.name,
    },
  });

  revalidatePath("/");

  return newCollection;
}

export async function deleteCollection(collectionId: number) {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not found!");
  }

  await prisma.collection.delete({
    where: {
      id: collectionId,
      userId: user.id,
    },
  });

  revalidatePath("/");
}
