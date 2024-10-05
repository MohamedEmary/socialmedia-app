import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function PostSkeleton({ commentCount = 1 }: { commentCount?: number }) {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="flex flex-row items-center gap-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[160px]" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[90%]" />
        <Skeleton className="h-64 w-full rounded-lg" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-4 w-[100px]" />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <div className="flex w-full items-center gap-2">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 w-10" />
        </div>
        {Array.from({ length: commentCount }).map((_, index) => (
          <div className="w-full space-y-4" key={index}>
            <div className="flex items-start gap-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-[140px]" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          </div>
        ))}
      </CardFooter>
    </Card>
  );
}

export function PostSkeletonList({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-8">
      {Array.from({ length: count }).map((_, index) => (
        <PostSkeleton key={index} />
      ))}
    </div>
  );
}
