import React, { useState } from "react";
import styled from "styled-components";
import basic from "../../assets/basic.svg";
import pro from "../../assets/pro.svg";
import premium from "../../assets/premium.svg";

// Subscription data array
const data = [
  {
    id: 1,
    src: basic,
    title: "Quarterly",
    price: "10",
    description: "Basic subscription includes essential features for beginners.",
    subscriptionFunction: "create-checkout-basic-session"
  },
  {
    id: 2,
    src: pro,
    title: "Half-Yearly",
    price: "20",
    description: "Pro subscription offers very advanced features for professionals.",
    subscriptionFunction: "create-checkout-pro-session"
  },
  {
    id: 3,
    src: premium,
    title: "Annually",
    price: "35",
    description: "Premium subscription provides top-tier features for businesses.",
    subscriptionFunction: "create-checkout-premium-session"
  },
];

// Reusable function to create checkout session
const createCheckoutSession = async (sessionEndpoint) => {
  try {
    const response = await fetch(`http://localhost:3000/${sessionEndpoint}`, {
      method: "POST"
    });
    const { url } = await response.json();
    window.location = url;
  } catch (error) {
    console.error(error);
  }
};

// Subscription component
const Subscription = () => {
  const [planType, setPlanType] = useState("");

  const checkout = (sessionEndpoint) => {
    createCheckoutSession(sessionEndpoint); // Invoke the createCheckoutSession function
    setPlanType(""); // Reset planType (if needed)
  };

  return (
    <>
      <Header>Services</Header>
      <Container>
        <SubscriptionOptions>
          {data.map((item) => (
            <OptionContainer key={item.id} selected={planType === item.title.toLowerCase()}>
              <ImageContainer>
                <img src={item.src} alt={item.title} />
              </ImageContainer>
              <Title>{item.title}</Title>
              <Description>{item.description}</Description>
              <Price>${item.price}</Price>
              <Button onClick={() => checkout(item.subscriptionFunction)}>
                {planType === item.title.toLowerCase() ? "Subscribed" : "Subscribe Now"}
              </Button>
            </OptionContainer>
          ))}
        </SubscriptionOptions>
      </Container>
    </>
  );
};


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  background-color: #fff;
`;

const Header = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: #3d5fc4;
  font-family: "Poppins", sans-serif;
`;

const SubscriptionOptions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-around;
    width: 80%;
  }
`;

const OptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  padding: 1rem;
  border: 4px solid ${({ selected }) => selected ? "#2ecc71" : "#ddd"};
  border-radius: 0.5rem;
  width: 300px;

  img {
    width: 200px;
    height: 200px;
    background-color: #dedbdb;
    border-radius: 50%;
    padding: 10px;
  }
`;

const ImageContainer = styled.div`
  background-color: #fff;
  padding: 10px;
  margin: 2rem;
`;

const Title = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin: 2rem 0;
  font-family: "Poppins", sans-serif;
`;

const Description = styled.p`
  font-size: 1.5rem;
  margin: 1.5rem;
  font-family: "Poppins", sans-serif;
`;

const Price = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  font-family: "Poppins", sans-serif;
`;

const Button = styled.button`
  background-color: #1091e1;
  color: #fff;
  font-size: 1.5rem;
  font-weight: bold;
  padding: 1rem 2rem;
  font-family: "Poppins", sans-serif;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  margin: 2rem;
`;

export default Subscription;
