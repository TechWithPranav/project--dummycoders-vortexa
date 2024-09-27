"use client"
import React from "react";
import "./Cards.css";
import { cardsData } from "@/data/Data";

import Card from "../Card/Card";

const Cards = () => {
    
  return (
    <div className="Cards">
        {console.log(cardsData)}
      {cardsData.map((card, index) => {
        return (
          <div className="parentContainer" key={index}>
            <Card
              title={card.title}
              color={card.color}
              barValue={card.barValue}
              value={card.value}
              png={card.png}
              series={card.series}
              index = {index}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Cards;
