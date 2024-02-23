"use client";

import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Link,
} from "@nextui-org/react";

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  clickRegister,
  setClickRegister,
}) => {
  return (
    <Card className="w-[460px] shadow-none px-6">
      <CardHeader className="w-full flex flex-col gap-y-4 items-center justify-center">
        <h1 className="text-4xl font-semibold">🔐</h1>
        <p className="text-muted-foreground text-2xl">{headerLabel}</p>
      </CardHeader>
      <CardBody>{children}</CardBody>
      <CardFooter className="flex justify-center w-full">
        <Link
          className="font-normal pb-3 cursor-pointer"
          size="sm"
          // href={backButtonHref}
          underline="hover"
          onClick={() => setClickRegister(!clickRegister)}
        >
          {backButtonLabel}
        </Link>
      </CardFooter>
    </Card>
  );
};
