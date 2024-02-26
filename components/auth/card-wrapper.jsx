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
    <Card className="w-[460px] shadow-none px-6 mx-6">
      <CardHeader className="w-full flex items-center justify-center">
        <p className="text-muted-foreground text-2xl py-6">{headerLabel}</p>
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
