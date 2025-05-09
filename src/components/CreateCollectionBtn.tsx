"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import CreateCollectionSheet from "./CreateCollectionSheet";

function CreateCollectionBtn() {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full rounded-md bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[1px]">
      <Button
        variant="outline"
        className="w-full bg-white dark:bg-neutral-950 dark:text-white hover:text-black dark:hover:text-white"
        onClick={() => setOpen(true)}
      >
        <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent dark:text-white dark:hover:text-white">
          Create Collection
        </span>
      </Button>

      <CreateCollectionSheet open={open} onOpenChange={setOpen} />
    </div>
  );
}

export default CreateCollectionBtn;
