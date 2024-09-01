import type { APIContext } from "astro";
import { drizzle } from "drizzle-orm/d1";
import { queries } from "../../db/schema";
import { db } from "../../db";
import { ContactValidation } from "../../validations/contact";

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

    const parsedData = ContactValidation.safeParse(requestBody);

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

    if (parsedData.data.type === "blog" || parsedData.data.type === "dmca") {
      if (!parsedData.data.blogPostLink) {
        return Response.json(
          {
            error: {
              code: "blog_post_link_error",
              message: "Blog post link is required",
            },
          },
          { status: 400 }
        );
      }
      if (
        !parsedData.data.blogPostLink.startsWith(
          "https://everythingcs.dev/blog/"
        )
      ) {
        return Response.json(
          {
            error: {
              code: "blog_post_link_error",
              message: "Blog post link is invalid",
            },
          },
          { status: 400 }
        );
      }
      await db.insert(queries).values({
        name: parsedData.data.name,
        email: parsedData.data.email,
        type: parsedData.data.type,
        message: parsedData.data.message,
        blogPostLink: parsedData.data.blogPostLink,
      });
      return Response.json(
        {
          data: {
            message: `Contact Submitted successfully`,
          },
        },
        { status: 201 }
      );
    }
    await db.insert(queries).values({
      name: parsedData.data.name,
      email: parsedData.data.email,
      type: parsedData.data.type,
      message: parsedData.data.message,
    });

    return Response.json(
      { data: { message: `Contact Submitted successfully` } },
      {
        status: 201,
      }
    );
  } catch (err) {
    console.log("error while submitting contact form", err);
    return Response.json(
      {
        error: { code: "server_error", message: "Server Error" },
      },
      { status: 500 }
    );
  }
}
