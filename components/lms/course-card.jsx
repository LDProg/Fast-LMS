import { formatPrice } from "@/lib/format-price";
import { cn } from "@/lib/utils";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Image,
  Link,
} from "@nextui-org/react";
import { ImageIcon } from "lucide-react";
import { CourseProgress } from "./course-progress";

export const CourseCard = ({
  id,
  title,
  imageUrl,
  chaptersLength,
  price,
  progress,
  category,
}) => {
  return (
    <Card isFooterBlurred className="border-none dark:bg-accent">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">{category}</p>
        <small className="text-default-500">
          {chaptersLength === 1
            ? `${chaptersLength} chapitre`
            : `${chaptersLength} chapitres`}
        </small>
        <h4 className="font-bold text-large">{title}</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        {imageUrl ? (
          <Image
            removeWrapper
            className="z-0 w-full h-full object-cover"
            alt={title}
            src={imageUrl}
          />
        ) : (
          <div className="flex items-center justify-center h-60 bg-default-300 rounded-md">
            <ImageIcon className="h-10 w-10 text-muted-foreground/60" />
          </div>
        )}
      </CardBody>

      <CardFooter
        className={cn("justify-between w-full h-1/6", price === null && "pb-4")}
      >
        <div className="flex flex-col w-1/2">
          <div className="text-tiny text-white/60">
            {progress === null && (
              <div className="text-muted-foreground">
                {price !== null ? (
                  <>Prix</>
                ) : (
                  <Chip className="text-xs text-white" color="success">
                    Gratuit
                  </Chip>
                )}
              </div>
            )}
          </div>

          <div>
            {(price !== null || progress !== null) && (
              <>
                {progress !== null ? (
                  <CourseProgress value={progress} />
                ) : (
                  formatPrice(price)
                )}
              </>
            )}
          </div>
        </div>
        {
          <Button
            aria-label="Voir le cours"
            as={Link}
            radius="full"
            size="sm"
            className={cn(
              "bg-primary text-white",
              progress !== null &&
                (progress === 100 ? "bg-success" : "bg-warning")
            )}
            href={`/lms/courses/${id}`}
          >
            {progress === null && (
              <div>
                {price !== null ? <span>Acheter</span> : <span>Voir</span>}
              </div>
            )}
            {progress !== null && (
              <div>
                {progress === 100 ? (
                  <span>Terminé</span>
                ) : (
                  <span>En cours</span>
                )}
              </div>
            )}
          </Button>
        }
      </CardFooter>
    </Card>
  );
};
