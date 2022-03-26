import { Dispatch } from "@reduxjs/toolkit";
import { Button } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Action } from "../../store";

export default function Home() {
  const counter = useSelector<number, number>((s) => s);
  const dispatch: Dispatch<Action> = useDispatch();

  return (
    <>
      <Button
        onClick={() => {
          dispatch({
            type: "increment",
          });
        }}
      >
        Increment
      </Button>
      <Button
        onClick={() => {
          dispatch({
            type: "decrement",
          });
        }}
      >
        Decrement
      </Button>
      Count: {counter}
    </>
  );
}
