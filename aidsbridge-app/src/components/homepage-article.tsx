import React from "react";

const HomePageArticle: React.FC = () => {
  return (
    <div
      style={{
        maxWidth: "80%",
        margin: "0 auto",
        padding: "20px",
        textAlign: "left",
      }}
    >
      {/*ARTICLE Content */}
      <h2>We can end AIDS – if everyone’s rights are protected.</h2>
      <p>
        As we continue our efforts to combat HIV/AIDS, it's imperative to
        recognize that this battle extends beyond medical interventions; it is
        also a fight to uphold the human rights of every individual. Ensuring
        the protection of everyone’s rights is not just a matter of legality or
        ethics; it's a crucial public health strategy. By safeguarding the
        rights to privacy, health, and non-discrimination, we can break down the
        barriers of stigma and discrimination that prevent many from seeking
        diagnosis and treatment.
      </p>

      <p>
        Right to Health: Universal access to healthcare services, including
        prevention, treatment, and support, is fundamental. For those living
        with HIV, uninterrupted access to antiretroviral therapy is vital for
        maintaining their health and preventing the transmission of the virus.
        Yet, without the guarantee of rights, healthcare remains an unreachable
        luxury for many.
      </p>
      <p>
        Right to Privacy: The privacy of individuals with HIV must be strictly
        protected to combat stigma. Fear of having one’s status disclosed
        without consent can deter individuals from being tested and accessing
        necessary care.
      </p>
      <p>
        Right to Non-Discrimination: Stigma and discrimination still haunt many
        living with HIV, impacting their employment, relationships, and social
        interactions. Legal protections against discrimination based on one’s
        health status are critical to fostering an inclusive society.
      </p>
    </div>
  );
};
export default HomePageArticle;
