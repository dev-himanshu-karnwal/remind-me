"use client";

import { Task } from "@prisma/client";
import { Checkbox } from "./ui/checkbox";
import { cn } from "@/lib/utils";
import { useTransition } from "react";
import { toogleTaskStatus } from "@/actions/task";

function getExpirationColor(date: Date) {
  const days = Math.floor(date.getTime() - Date.now()) / 1000 / 60 / 60;

  if (days < 0) return "text-gray-500 dark:text-gray-400";
  if (days <= 3 * 24) return "text-red-500 dark:text-red-400";
  if (days <= 7 * 24) return "text-orange-500 dark:text-orange-400";
  return "text-green-500 dark:text-green-400";
}

function TaskCard({ task }: { task: Task }) {
  const [isLoading, startTransition] = useTransition();

  return (
    <div className="flex items-center gap-2">
      <Checkbox
        id={task.id.toString()}
        defaultChecked={task.done}
        disabled={isLoading}
        onCheckedChange={async () =>
          startTransition(toogleTaskStatus.bind(null, task.id, !task.done))
        }
      />
      <label
        htmlFor={task.id.toString()}
        className={cn(
          "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 decoration-1 dark:decoration-white",
          task.done && "line-through"
        )}
      >
        {task.content}
        {task.expiresAt && (
          <p
            className={cn(
              "text-xs text-neutral-500 dark:text-neutral-400",
              getExpirationColor(task.expiresAt)
            )}
          >
            {task.expiresAt?.toLocaleDateString("en-IN")}
          </p>
        )}
      </label>
    </div>
  );
}

export default TaskCard;
