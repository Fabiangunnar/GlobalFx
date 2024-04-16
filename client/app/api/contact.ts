// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {mailOptions, transporter} from "@/config/nodemailer";
import type {NextApiRequest, NextApiResponse} from "next";

type Data = {
  message?: string;
  success?: boolean;
  new?: string;
};

const contactMessageFields = {
  name: "",
  email: "",
  message: "",
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const formData = req.body;
    if (!formData.addressto && !formData.message) {
      return res.status(400).json({message: "Bad Request"});
    }
    try {
      await transporter.sendMail({
        to: "support@globaltycoonfx.com",
        from: "support@globaltycoonfx.com",
        subject: "Client Contact Message",
        text: `${formData.message}`,
        html: `
        <div style='padding:1rem; background: rgb(14, 17, 19);
            background: linear-gradient(
                160deg,
                rgba(14, 17, 19, 1) 0%,
                rgba(32, 80, 79, 1) 74%,
                rgba(46, 83, 4, 1) 100%
            ); color: #fff'>
            <div style='display: flex; font-weight: 500; font-size: 1.4rem, gap:2rem, flex-wrap: wrap; width: 100% '>
                <h2>User Email:</h2>
                <h2>${formData.addressto}</h2>
            </div>
            <br /> <br />
            <div style='display: flex; flex-direction: column; justify-content:flex-start; font-size: 1.2rem; '>
                <p>Message</p> 
                <p>${formData.message}</p>
            </div>
        </div>`,
      });
      return res.status(201).json({success: true});
    } catch (error: any) {
      console.log(error, "eroororor");
      return res.status(400).json({message: error.message});
    }
  }
  console.log(req.body);
  return res.status(400).json({message: "Bad Request"});
}
