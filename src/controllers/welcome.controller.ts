import { Request, Response } from "express";

export const welcomeMessage = async (req: Request, res: Response) => {
  await res.status(200).send({
    success: true,
    messgae: "Welcome! your application is working.",
  });
};
