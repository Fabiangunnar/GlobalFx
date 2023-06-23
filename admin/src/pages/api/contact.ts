// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {mailOptions, transporter} from "@/config/nodemailer";
import type {NextApiRequest, NextApiResponse} from "next";

type Data = {
  message?: string;
  success?: boolean;
  new?: string;
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
        ...mailOptions,
        to: `${formData.addressto}`,
        subject: `${formData.subject}`,
        text: `${formData.message}`,
        html: `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link
              href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@200;300;400;500&family=Poppins:wght@100;300;400;500;600&display=swap"
              rel="stylesheet"
            />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Global Tycoon Fx</title>
            <style>
              body {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                font-family: "Poppins", sans-serif;
                background: #0e1113;
                color: #ffffff;
                display: flex;
                flex-direction: column;
                min-height: 100%;
                overflow-x: hidden;
                text-align: center;
                width: 100%;
              }
              .section_one {
                background: #0e1113;
                color: #ffffff
              }
              .neon_gradient_blur_bg {
                position: relative;
              }
        
              .neon_gradient_blur_bg::after {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgb(14, 17, 19);
                background: linear-gradient(
                  160deg,
                  rgba(14, 17, 19, 1) 0%,
                  rgba(32, 80, 79, 1) 74%,
                  rgba(46, 83, 4, 1) 100%
                );
                filter: blur(30px);
                border: 1px solid red;
                z-index: -10;
              }
              @media screen and (max-width: 540px) {
                h1 {
                  font-size: 1.2rem !important;
                }
                .top_head {
                  min-height: 4rem !important;
                }
                p {
                  font-size: 0.8rem;
                }
              }
              @media (min-width: 540px) and (max-width: 768px) {
                h1 {
                  font-size: 1.2rem !important;
                }
                .top_head {
                  min-height: 4rem !important;
                }
                p {
                  font-size: 1rem;
                }
              }
              a {
                text-decoration:none;

              }
              @media screen and (min-width: 768px) {
                h1 {
                  font-size: 1.4rem !important;
                }
                p {
                  font-size: 1.2rem;
                }
              }
              h1 {
                font-size: 1.2rem !important;
              }
           
              p {
                font-size: 1rem;
              }
              header {
                height: 6rem;
                background: rgb(14, 17, 19);
                background: linear-gradient(
                  132deg,
                  rgba(14, 17, 19, 1) 0%,
                  rgba(45, 92, 78, 1) 45%,
                  rgba(32, 80, 79, 1) 55%,
                  rgba(14, 17, 19, 1) 75%
                );
        
                border-bottom: 1px solid #759c49;
                display: flex;
                align-items: center;
                justify-content: flex-start;
              }
              .top_head {
                width: 100%;
                min-height: 4rem !important;
                position: relative;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                background-color: #0e1113;
                padding: 2rem;
              }
        
              .top_head::after {
                position: absolute;
                content: "";
                background-size: cover;
                background-repeat: no-repeat;
                opacity: 0.4;
                top: 0;
                left: 0;
                width: 100%;
                min-height: 85vw;
                background: url("https://globaltycoonfx.com/_next/static/media/home.d8606dc2.png");
                z-index: -10;
              }
              .footer_line_through {
                width: 100%;
                height: 2px;
                background: linear-gradient(90deg, #40efeb, #9ed163);
              }
        
              .main {
                position: relative;
                overflow: hidden;
              }
              .footer {
                background: #0e1113;
                padding: 2rem;
                height: 100%;
              }
              .footer_div {
                display: grid;
                grid-template-columns: 1fr 3fr;
                gap: 1rem;
                font-size: 1.2rem;
              }
              .footer_div p {
                color: #c6c5c5;
              }
              nav {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                padding: 2rem;
                color: #ffd700;
                font-size: 1.2rem;
              }
              nav .neon_gradient_blur_bg {
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                width: 100%;
                gap: 2rem;
                font-size: 1.2rem;
                color: #ffd700;
              }
              nav .neon_gradient_blur_bg small {
                font-weight: 700;
                font-size: 1.2rem;
                color: #ffd700;
              }
              h1 {
                color: #c6c5c5;
              }
              .section_one {
                min-height: 18rem;
                display: flex;
                justify-content: center;
                padding: 2rem;
                text-align: justify;
              }
            </style>
          </head>
          <body style="background: #0e1113">
            <header>
              <nav class="nav_bar">
                <a
                  href="https://globaltycoonfx.com/"
                  style="
                  text-decoration: none;
                  position: relative;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  width: 100%;
                  text-align: center;
                  padding: 24px 38px;
                  color: #ffd700
                "
                >
                  <div class="neon_gradient_blur_bg" style="display: flex;  align-items: center;
                  width: 100%;
                  text-align: center;
                ">
                    <img
                      width="60"
                      height="60"
                      src="https://globaltycoonfx.com/_ipx/w_48,q_75/%2Flogo2-transparent.png?url=%2Flogo2-transparent.png&w=48&q=75"
                      alt="GLOBAL TYCOON FX logo"
                    />
                    <small style='color: #ffd700; font-size: 1.2rem '>GLOBAL TYCOON FX</small>
                  </div>
                </a>
              </nav>
            </header>
            <main class="main">
              <section class="top_head">
                <h1>GET LIFETIME INCOME ON INVESTMENT</h1>
              </section>
              <div class="footer_line_through"></div>
              <section class="section_one">
                <p>${formData.message}</p>
              </section>
            </main>
            <div class="footer_line_through"></div>
            <footer class="footer">
              <div class="footer_div">
                <p>Official address:</p>
                <a
                  target="_blank"
                  href="https://www.google.com/maps/search/United+Kingdom+Level+9,+One+Canada+Square,+Canary+Wharf,+E14+5AA,+London,+United+Kingdom/@51.5049697,-0.0221382,17z/data=!3m1!4b1?entry=ttu"
                >
                  <p>
                    United Kingdom Level 9, One Canada Square, Canary Wharf, E14 5AA,
                    London, United Kingdom
                  </p>
                </a>
              </div>
            </footer>
          </body>
        </html>
        
        `,
      });
      return res.status(201).json({success: true});
    } catch (error: any) {
      console.log(error, "eroororor");
      return res.status(400).json({message: error.message});
    }
  }
  return res.status(400).json({message: "Bad Request"});
}
