import CollectionCard from "@/components/CollectionCard";
import CreateCollectionBtn from "@/components/CreateCollectionBtn";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <div className="flex w-full">
        <h1 className="text-4xl font-bold mb-12">
          <Suspense fallback={<WelcomeMsgFallback />}>
            <WelcomeMsg />
          </Suspense>
        </h1>
      </div>

      <Suspense fallback={<Skeleton className="w-full h-[300px]" />}>
        <CollectionList />
      </Suspense>
    </>
  );
}

async function WelcomeMsg() {
  const user = await currentUser();

  if (!user) return <div>ERROR</div>;

  return (
    <>
      Welcome, <br /> {user.firstName} {user.lastName}
    </>
  );
}

function WelcomeMsgFallback() {
  return (
    <>
      <Skeleton className="w-[150px] h-[36px]" />
      <Skeleton className="w-[150px] h-[36px]" />
    </>
  );
}

async function CollectionList() {
  const user = await currentUser();

  const collections = await prisma.collection.findMany({
    where: {
      userId: user?.id,
    },
    include: {
      tasks: true,
    },
  });

  if (collections.length === 0)
    return (
      <div className="flex flex-col gap-5">
        <Alert>
          <AlertTitle>There are no collections yet!</AlertTitle>
          <AlertDescription>
            Create a collection to get started.
          </AlertDescription>
        </Alert>

        <CreateCollectionBtn />
      </div>
    );

  return (
    <div>
      <CreateCollectionBtn />
      <div className="flex flex-col gap-4 mt-3">
        {collections.map((collection) => (
          <CollectionCard key={collection.id} collection={collection} />
        ))}
      </div>
    </div>
  );
}
