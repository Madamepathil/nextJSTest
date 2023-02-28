import React from "react";
import { getProviders, signIn } from "next-auth/react";
import Image from "next/image";
import SignInComponent from "../../SignInComponent";

const SigninPage = async () => {
  const providers = await getProviders();

  return (
    <div>
      <div>
        <Image
          src={"https://links.papareact.com/161"}
          className="rounded-full mx-2 object-cover"
          width={700}
          height={700}
          alt="profile picture"
        />
      </div>
      <SignInComponent providers={providers} />
    </div>
  );
};

export default SigninPage;
