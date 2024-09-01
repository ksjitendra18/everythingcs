import type { APIContext } from "astro";
import { EventSchema } from "../../validations/event";
import { db } from "../../db";
import { events } from "../../db/schema";

export const prerender = false;

async function hashData(data: string): Promise<string> {
  const encoder = new TextEncoder();
  // today date remove time
  const key =
    import.meta.env.SHA_EVENT_SECRET +
    `${new Date().getUTCDate()}-${
      new Date().getUTCMonth() + 1
    }-${new Date().getUTCFullYear()}`;
  const dataBuffer = encoder.encode(data + key);
  const hashBuffer = await crypto.subtle.digest("SHA-256", dataBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function POST({ request, clientAddress }: APIContext) {
  try {
    const requestBody = await request.json();

    const parsedData = EventSchema.safeParse(requestBody);

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

    const userAgent = request.headers.get("user-agent");
    const ip =
      request.headers.get("cf-connecting-ip") ??
      clientAddress ??
      request.headers.get("x-forwarded-for");

    const requestData = {
      ip,
      userAgent,
      // @ts-ignore
      city: request.cf.city ?? "",
      // @ts-ignore
      continent: request.cf.continent,
      // @ts-ignore
      country: request.cf.country,
      // @ts-ignore
      latitude: request.cf.latitude,
      // @ts-ignore
      longitude: request.cf.longitude,
      // @ts-ignore
      timezone: request.cf.timezone,
      // @ts-ignore
      region: request.cf.region,
      // @ts-ignore
      asOrg: request.cf.asOrganization,
    };

    const dataToBeHashed = JSON.stringify({
      requestData,
    });

    const hashedData = await hashData(dataToBeHashed);

    await db.insert(events).values({
      type: parsedData.data.type,
      slug: parsedData.data.slug,
      referrer: parsedData.data.referrer,
      country: parsedData.data.country,
      city: parsedData.data.city,
      os: parsedData.data.os,
      device: parsedData.data.device,
      browser: parsedData.data.browser,
      hash: hashedData,
    });
    return Response.json(
      {
        data: {
          message: `Event Submitted successfully`,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("error", error);
    return Response.json(
      {
        error: { code: "server_error", message: "Server Error" },
      },
      { status: 500 }
    );
  }
}
