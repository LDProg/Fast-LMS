"use server";

import { currentUser, currentUserId } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import HTMLReactParser from "html-react-parser";

export const checkoutCourseAction = async (formData) => {
  try {
    const user = await currentUser();
    const userId = await currentUserId();

    if (!userId)
      return { error: { unauthorized: "Vous n'êtes pas autorisé." } };
    if (!user?.email)
      return { error: { unauthorized: "Vous n'êtes pas autorisé." } };

    const { courseId } = formData;

    const course = await prisma.course.findUnique({
      where: { id: courseId, isPublished: true },
    });

    const purchase = await prisma.purchase.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    });

    if (purchase) return { error: "Vous avez déjà acheté ce cours." };

    if (!course) return { error: "Le cours n'existe pas." };

    if (course.price === null) {
      const purchase = await prisma.purchase.create({
        data: {
          courseId,
          userId,
        },
      });

      return { success: { isFree: purchase } };
    }

    const line_items = [
      {
        quantity: 1,
        price_data: {
          currency: "EUR",
          product_data: {
            name: course.title,
            description: HTMLReactParser(course.description),
          },
          unit_amount: Math.round(course.price * 100),
        },
      },
    ];

    let stripeCustomer = await prisma.stripeCustomer.findUnique({
      where: { userId },
      select: { stripeCustomerId: true },
    });

    if (!stripeCustomer) {
      const customer = await stripe.customers.create({ email: user.email });

      stripeCustomer = await prisma.stripeCustomer.create({
        data: {
          userId,
          stripeCustomerId: customer.id,
        },
      });
    }

    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomer.stripeCustomerId,
      line_items,
      mode: "payment",
      // payment_method_types: ["card", "apple_pay", "google_pay"],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/lms/courses/${course.id}?success=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/lms/courses/${course.id}?cancel=1`,
      metadata: {
        courseId: course.id,
        userId,
      },
    });

    console.log(`Course has been purchase. 🌱`);
    return { success: { url: session.url } };
  } catch (error) {
    console.log("[COURSES_ID_CHECKOUT]", error);
    return { error: "Erreur interne veuillez rééassayer." };
  } finally {
    await prisma.$disconnect();
  }
};
