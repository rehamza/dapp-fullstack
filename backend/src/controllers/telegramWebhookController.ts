import { Request, Response } from "express";
import axios from "axios";
import { TelegramMethods } from "../types/telegram";
import DataService from "../services/dataService";

export const setTelegramWebhook = async (req: Request, res: Response) => {
  const { url } = req.body;

  try {
    console.log("-------------set", url);
    const hookUrl = `${url}/api/webhook/receiveTelegramData`;
    const telegramUrl = `${process.env.TELEGRAM_API}${process.env.TELEGRAM_TOKEM}/${TelegramMethods.SetWebhook}`;
    const fullTelegramUrl = `${telegramUrl}?url=${hookUrl}`;
    const hook = await axios.post(fullTelegramUrl, null);
    res.status(201).json({
      message: "webhook created successfully",
      success: true,
      data: { hook },
    });
  } catch (error) {
    console.error("error--:", error);
    res
      .status(500)
      .json({ message: "Error creating webhook", success: false, error });
  }
};
export const receiveTelegramData = async (req: Request, res: Response) => {
  try {
    const message = req.body.message;
    const newData = {
      telegramId: req.body.update_id,
      message: message.text,
      data: message,
    };
    await DataService.createData(newData);
    if (message && message.text) {
      const chatId = message.chat.id;
      const responseMessage =
        "Hello! This is a response from the bot. receive on server";
      await sendMessage(chatId, responseMessage);
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating user", success: false, error });
  }
};

export const sendMessageEndpoint = async (req: Request, res: Response) => {
  const { chatId, text } = req.body;
  try {
    await sendMessage(chatId, text);
    res.status(201).json({
      message: "message sent successfully",
      success: true,
      data: {},
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating user", success: false, error });
  }
};

const sendMessage = async (chatId: string, text: string) => {
  try {
    return await axios.post(
      `${process.env.TELEGRAM_API}${process.env.TELEGRAM_TOKEM}/${TelegramMethods.SendMessage}`,
      {
        chat_id: chatId,
        text: text,
      }
    );
  } catch (error) {
    console.error("Error sending message:", error);
  }
};
