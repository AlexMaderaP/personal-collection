"use server";

import { NewsLetterInputs, NewsLetterSchema } from "@/types/schemas";

export default async function createNewAccount(dataForm: NewsLetterSchema) {
  try {
    const { data, success } = NewsLetterInputs.safeParse(dataForm);

    if (success) {
      const clientId = process.env.SALESFORCE_CLIENT_ID!;
      const clientSecret = process.env.SALESFORCE_CLIENT_SECRET!;
      const grant_type = process.env.GRANT_TYPE!;

      const params = new URLSearchParams({
        grant_type: grant_type,
        client_id: clientId,
        client_secret: clientSecret,
      });

      const authResponse = await fetch(
        `${process.env.DOMAIN_NAME}/services/oauth2/token?${params.toString()}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      if (!authResponse.ok) {
        throw new Error("No auth");
      }

      const { access_token } = await authResponse.json();

      const compositeBody = createBody(data);

      console.log(compositeBody);
      const compositeResponse = await fetch(
        `${process.env.DOMAIN_NAME}/services/data/v61.0/composite`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(compositeBody),
        }
      );

      if (!compositeResponse.ok) {
        const errorData = await compositeResponse.json();

        console.error("Salesforce Composite API request failed:", errorData);
        throw new Error("Failed to create Account and Contact in Salesforce.");
      }

      const compositeData = await compositeResponse.json();

      console.log("Salesforce Composite API response:", compositeData);

      return true;
    }
  } catch {
    return false;
  }
}

function createBody(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}) {
  const { firstName, lastName, email, phone } = data;

  return {
    compositeRequest: [
      {
        method: "POST",
        url: "/services/data/v61.0/sobjects/Account",
        referenceId: "newAccount",
        body: {
          Name: `${firstName} ${lastName}`,
          Phone: phone,
        },
      },
      {
        method: "POST",
        url: "/services/data/v61.0/sobjects/Contact",
        referenceId: "newContact",
        body: {
          FirstName: firstName,
          LastName: lastName,
          Email: email,
          AccountId: "@{newAccount.id}",
        },
      },
    ],
  };
}
