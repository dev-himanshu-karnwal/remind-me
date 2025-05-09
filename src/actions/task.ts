"use server";

import { prisma } from "@/lib/prisma";
import { createTaskSchemaType } from "@/schema/createTaskSchema";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function createTask(form: createTaskSchemaType) {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not found!");
  }

  const newTask = await prisma.task.create({
    data: {
      userId: user.id,
      content: form.content,
      expiresAt: form.expiresAt,
      done: false,
      collectionId: form.collectionId,
    },
  });

  revalidatePath("/");

  return newTask;
}

export async function toogleTaskStatus(taskId: number, done: boolean) {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not found!");
  }

  await prisma.task.update({
    where: {
      id: taskId,
      userId: user.id,
    },
    data: { done },
  });

  revalidatePath("/");
}
