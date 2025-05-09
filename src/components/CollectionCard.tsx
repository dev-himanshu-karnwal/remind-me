"use client";

import { Collection, Task } from "@prisma/client";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  PlusIcon,
  TrashIcon,
} from "lucide-react";
import { useState, useTransition } from "react";

import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

import { cn } from "@/lib/utils";
import { type CollectionColor, CollectionColors } from "@/lib/constants";
import { AlertDialogDescription } from "@radix-ui/react-alert-dialog";
import { deleteCollection } from "@/actions/collection";
import { toast } from "sonner";
import CreateTaskDialog from "./CreateTaskDialog";
import TaskCard from "./TaskCard";

function CollectionCard({
  collection,
}: {
  collection: Collection & { tasks: Task[] };
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isLoading, startTransition] = useTransition();

  async function removeCollection() {
    try {
      await deleteCollection(collection.id);
      toast.success("Collection deleted successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again later.");
    }
  }

  const totalTasks = collection.tasks.length;
  const tasksDone = collection.tasks.filter((task) => task.done).length;
  const progress = totalTasks === 0 ? 0 : (tasksDone / totalTasks) * 100;

  return (
    <>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              "flex w-full justify-between p-6 rounded-b-none",
              CollectionColors[collection.color as CollectionColor]
            )}
          >
            <span className="text-white font-bold">{collection.name}</span>
            {isOpen ? (
              <ChevronUpIcon className="h-6 w-6" />
            ) : (
              <ChevronDownIcon className="h-6 w-6" />
            )}
          </Button>
        </CollapsibleTrigger>

        <CollapsibleContent className="flex rounded-b-md flex-col dark:bg-neutral-900 shadow-lg">
          {collection.tasks.length < 1 ? (
            <Button
              variant="ghost"
              className="flex items-center gap-1 justify-center p-8 py-12 rounded-none"
              onClick={() => setShowCreateModal(true)}
            >
              <p>There are no tasks yet: </p>
              <span
                className={cn(
                  "text-sm bg-clip-text text-transparent",
                  CollectionColors[collection.color as CollectionColor]
                )}
              >
                Create one
              </span>
            </Button>
          ) : (
            <>
              <Progress className="rounded-none" value={progress} />
              <div className="p-4 gap-3.5 flex flex-col">
                {collection.tasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            </>
          )}

          <Separator />
          <footer className="h-[40px] px-4 p-[2px] text-xs text-neutral-500 flex items-center justify-between">
            <p>Created at {collection.createdAt.toLocaleDateString("en-IN")}</p>
            {isLoading && <div>Deleting...</div>}
            {!isLoading && (
              <div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowCreateModal(true)}
                >
                  <PlusIcon className="h-1 w-1" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <TrashIcon className="h-1 w-1" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your collection and all its tasks from our servers.
                    </AlertDialogDescription>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={startTransition.bind(null, removeCollection)}
                      >
                        Proceed
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            )}
          </footer>
        </CollapsibleContent>
      </Collapsible>

      <CreateTaskDialog
        open={showCreateModal}
        onOpenChange={setShowCreateModal}
        collection={collection}
      />
    </>
  );
}

export default CollectionCard;
