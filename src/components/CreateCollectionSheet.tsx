import { type Dispatch, type SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

import {
  createCollectionSchema,
  type createCollectionSchemaType,
} from "@/schema/createCollectionSchema";
import { type CollectionColor, CollectionColors } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { createCollection } from "@/actions/collection";

function CreateCollectionSheet({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}) {
  const form = useForm<createCollectionSchemaType>({
    defaultValues: {},
    resolver: zodResolver(createCollectionSchema),
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (data: createCollectionSchemaType) => {
    try {
      await createCollection(data);
      toast.success("Collection created successfully!");
      openChangeWrapper(false);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again later.");
    }
  };

  const openChangeWrapper = (open: boolean) => {
    form.reset();
    onOpenChange(open);
  };

  return (
    <Sheet open={open} onOpenChange={openChangeWrapper}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add new Collection</SheetTitle>
          <SheetDescription>
            Collections are a new way to group your tasks.
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            className="px-4 space-y-4 flex flex-col"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Personal"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Collection Name</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <FormControl className="w-full">
                    <Select disabled={isLoading} onValueChange={field.onChange}>
                      <SelectTrigger
                        className={cn(
                          "w-full h-8 text-white",
                          CollectionColors[field.value as CollectionColor]
                        )}
                      >
                        <SelectValue placeholder="Color" />
                      </SelectTrigger>
                      <SelectContent className="w-full">
                        {Object.keys(CollectionColors).map((color) => (
                          <SelectItem
                            key={color}
                            value={color}
                            className={cn(
                              `w-full h-8 rounded-md my-1 text-white  focus:text-white focus:font-bold focus:ring-2 ring-neutral-600 focus:ring-inset dark:focus:ring-white focus:px-8`,
                              CollectionColors[color as CollectionColor]
                            )}
                          >
                            {color}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    Select a Color for your Collection
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col gap-3 mt-4">
              <Separator />
              <Button
                className={cn(
                  form.watch("color") &&
                    CollectionColors[form.getValues("color") as CollectionColor]
                )}
                type="submit"
                variant="outline"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    Creating... <Loader2 className="animate-spin" />
                  </>
                ) : (
                  "Confirm"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}

export default CreateCollectionSheet;
