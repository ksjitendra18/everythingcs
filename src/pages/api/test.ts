import type { APIContext } from "astro";

export async function GET({ locals }: APIContext) {
  try {
    const t1 = import.meta.env.TEST ?? "NA";
    const t2 = locals.runtime.env.TEST ?? "NA";
    return Response.json({
      t1,
      t2,
    });
  } catch (err) {
    console.error("error in test", err);
    return Response.json(
      {
        error: { code: "server_error", message: "Server Error" },
      },
      { status: 500 }
    );
  }
}
