import { NextResponse } from "next/server";

export async function GET() {
  try {
    const clientId = process.env.SALESFORCE_CLIENT_ID!;
    const clientSecret = process.env.SALESFORCE_CLIENT_SECRET!;
    const grant_type = process.env.GRANT_TYPE!;

    const params = new URLSearchParams({
      grant_type: grant_type,
      client_id: clientId,
      client_secret: clientSecret,
    });

    const response = await fetch(
      `${process.env.DOMAIN_NAME}/services/oauth2/token?${params.toString()}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );

    if (!response.ok) {
      const errorData = await response.json();

      return NextResponse.json(
        { error: errorData.error_description },
        { status: response.status },
      );
    }

    const data = await response.json();

    return NextResponse.json({ access_token: data.access_token });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to authenticate with Salesforce" },
      { status: 500 },
    );
  }
}
