import { Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Collection } from "@prisma/client";
import { cn } from "@/lib/utils";
import { CollectionColor, CollectionColors } from "@/lib/constants";
import { useForm } from "react-hook-form";
import {
  createTaskSchema,
  createTaskSchemaType,
} from "@/schema/createTaskSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Textarea } from "./ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { Button } from "./ui/button";
import { CalendarIcon, LoaderIcon } from "lucide-react";
import { createTask } from "@/actions/task";
import { toast } from "sonner";

function CreateTaskDialog({
  open,
  onOpenChange,
  collection,
}: {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  collection: Collection;
}) {
  const form = useForm<createTaskSchemaType>({
    defaultValues: {
      collectionId: collection.id,
    },
    resolver: zodResolver(createTaskSchema),
  });

  async function onSubmit(data: createTaskSchemaType) {
    try {
      await createTask(data);
      onOpenChange(false);
      form.reset();
      toast.success("Task created successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again later.");
    }
  }

  const isLoading = form.formState.isSubmitting;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] p-4 pt-6">
        <DialogHeader>
          <DialogTitle className="flex gap-2">
            Add task to Collection:{" "}
            <span
              className={cn(
                "p-[1px]  bg-clip-text text-transparent",
                CollectionColors[collection.color as CollectionColor]
              )}
            >
              {collection.name}
            </span>
          </DialogTitle>
          <DialogDescription>
            Add a task to this collection. You can add as many tasks as you want
            to a collection.
          </DialogDescription>
        </DialogHeader>
        <div className="gap-4 py-4">
          <Form {...form}>
            <form
              className="space-y-4 flex flex-col"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Task Name</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={5}
                        className="resize-none"
                        disabled={isLoading}
                        placeholder="Task content here"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="expiresAt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expires At</FormLabel>
                    <FormDescription>
                      When should this task expire?
                    </FormDescription>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild disabled={isLoading}>
                          <Button
                            disabled={isLoading}
                            variant="outline"
                            className={cn(
                              "justify-start text-left font-normal w-full",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? (
                              new Date(field.value).toLocaleDateString("en-IN")
                            ) : (
                              <span>No Expiration</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                disabled={isLoading}
                className={cn(
                  "w-full dark:text-white text-white",
                  CollectionColors[collection.color as CollectionColor]
                )}
              >
                {isLoading ? (
                  <>
                    Creating... <LoaderIcon className="animate-spin" />
                  </>
                ) : (
                  "Confirm"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CreateTaskDialog;
