import { type APIContext } from "astro";
import { db } from "../../db";
import { feedbacks } from "../../db/schema";
import { FeedbackSchema } from "../../validations/feedback";

export const prerender = false;

export async function POST({ request, clientAddress }: APIContext) {
  try {
    const SECRET_KEY = import.meta.env.TURNSTILE_SECRET;

    if (!SECRET_KEY) {
      return Response.json(
        {
          error: { code: "server_error", message: "Internal Server Error" },
        },
        { status: 500 }
      );
    }

    const requestBody = await request.json();

    console.log("requestBody", requestBody);

    const parsedData = FeedbackSchema.safeParse(requestBody);

    if (!parsedData.success) {
      return Response.json(
        {
          error: {
            code: "validation_error",
            message: parsedData.error.format(),
          },
        },
        { status: 400 }
      );
    }

    const ip = clientAddress;

    let formData = new FormData();
    formData.append("secret", SECRET_KEY);
    formData.append("response", parsedData.data.cfTurnstileRes);
    formData.append("remoteip", ip!);

    const url = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
    const result = await fetch(url, {
      body: formData,
      method: "POST",
    });

    const outcome: any = await result.json();

    console.log("outcome", outcome);
    if (!outcome.success) {
      return Response.json(
        {
          error: {
            code: "captcha_error",
            message: "Error with captcha. Please refresh and try again",
          },
        },
        { status: 400 }
      );
    }

    await db.insert(feedbacks).values({
      message: parsedData.data.message,
      rating: parsedData.data.rating,
      slug: parsedData.data.slug,
    });

    return Response.json(
      {
        data: {
          message: `Feedback Submitted successfully`,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("err", error);
    return Response.json(
      {
        error: { code: "server_error", message: "Server Error" },
      },
      { status: 500 }
    );
  }
}
