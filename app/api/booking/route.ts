import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  const {
    name,
    email,
    phoneNumber,
    requestedServices,
    totalPrice,
    additionalInfo,
    requestDate,
  } = await request.json();

  const user = process.env.USER_GMAIL;
  const pass = process.env.APP_PASS;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // use TLS
    auth: {
      user,
      pass,
    },
  });

  // Format services for email display
  const servicesHtml = requestedServices
    .map(
      (service: { name: string; price: number }) =>
        `<li>${service.name} - ${service.price.toFixed(2)} MAD</li>`,
    )
    .join("");

  const formattedDate = new Date(requestDate).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  // Email for business - Devis request notification
  try {
    const mail = await transporter.sendMail({
      from: user,
      to: "soufiane.nederra@gmail.com",
      replyTo: email,
      subject: `Nouvelle demande de devis de ${name}`,
      html: `
        <!DOCTYPE html>
        <html lang="fr">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Demande de Devis</title>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #f4f4f4; padding: 20px; text-align: center; }
              .content { padding: 20px; }
              .services-list { background-color: #f9f9f9; padding: 15px; border-left: 4px solid #007bff; }
              .total { font-size: 18px; font-weight: bold; color: #007bff; }
              ul { padding-left: 20px; }
              li { margin-bottom: 8px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>Nouvelle Demande de Devis Topographique</h2>
              </div>
              <div class="content">
                <p>Bonjour,</p>
                <p>Vous avez reçu une nouvelle demande de devis de la part de <strong>${name}</strong> :</p>
                
                <h3>Informations Client :</h3>
                <ul>
                  <li><strong>Nom :</strong> ${name}</li>
                  <li><strong>Email :</strong> ${email}</li>
                  <li><strong>Téléphone :</strong> ${phoneNumber || "Non fourni"}</li>
                  <li><strong>Date de demande :</strong> ${formattedDate}</li>
                </ul>

                <h3>Services Demandés :</h3>
                <div class="services-list">
                  <ul>
                    ${servicesHtml}
                  </ul>
                  <p class="total">Total : ${totalPrice.toFixed(2)} MAD</p>
                </div>

                ${
                  additionalInfo
                    ? `
                <h3>Informations Supplémentaires :</h3>
                <p><em>${additionalInfo}</em></p>
                `
                    : ""
                }

                <p>Veuillez contacter le client pour discuter des détails du projet.</p>
                <p>Merci !</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });
    console.log("Business notification email sent successfully");
  } catch (error) {
    console.error("Error sending business notification email:", error);
    return NextResponse.json(
      { message: "Erreur lors de l'envoi de l'email" },
      { status: 500 },
    );
  }

  // Email for client - Thank you message
  try {
    const mail2 = await transporter.sendMail({
      from: user,
      to: email,
      replyTo: user,
      subject: `Merci pour votre demande de devis, ${name}`,
      html: `
        <!DOCTYPE html>
        <html lang="fr">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Confirmation de Demande de Devis</title>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #007bff; color: white; padding: 20px; text-align: center; }
              .content { padding: 20px; }
              .services-list { background-color: #f9f9f9; padding: 15px; border-left: 4px solid #007bff; }
              .total { font-size: 18px; font-weight: bold; color: #007bff; }
              ul { padding-left: 20px; }
              li { margin-bottom: 8px; }
              .footer { background-color: #f4f4f4; padding: 15px; text-align: center; margin-top: 20px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>Confirmation de Votre Demande de Devis</h2>
              </div>
              <div class="content">
                <p>Cher/Chère ${name},</p>
                <p>Nous vous remercions pour votre demande de devis. Nous avons bien reçu votre demande et nous vous contacterons sous peu.</p>
                
                <h3>Résumé de votre demande :</h3>
                <ul>
                  <li><strong>Date de demande :</strong> ${formattedDate}</li>
                  <li><strong>Email :</strong> ${email}</li>
                  <li><strong>Téléphone :</strong> ${phoneNumber || "Non fourni"}</li>
                </ul>

                <h3>Services Demandés :</h3>
                <div class="services-list">
                  <ul>
                    ${servicesHtml}
                  </ul>
                  <p class="total">Total Estimé : ${totalPrice.toFixed(2)} MAD</p>
                </div>

                ${
                  additionalInfo
                    ? `
                <h3>Vos Informations Supplémentaires :</h3>
                <p><em>${additionalInfo}</em></p>
                `
                    : ""
                }

                <p><strong>Prochaines étapes :</strong></p>
                <ul>
                  <li>Notre équipe va étudier votre demande</li>
                  <li>Nous vous contacterons dans les 24-48h pour discuter des détails</li>
                  <li>Un devis détaillé vous sera envoyé après notre échange</li>
                </ul>

                <p>Nous vous remercions de votre confiance et nous réjouissons de travailler avec vous.</p>
              </div>
              <div class="footer">
                <p><strong>Équipe Topographie</strong></p>
                <p>Pour toute question urgente, n'hésitez pas à nous contacter.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });
    console.log("Client confirmation email sent successfully");
  } catch (error) {
    console.error("Error sending client confirmation email:", error);
    // Don't return error here as the main request was processed successfully
  }

  console.log("Devis request processed:", {
    name,
    email,
    phoneNumber,
    servicesCount: requestedServices.length,
    totalPrice,
    requestDate,
  });

  return NextResponse.json({
    status: 200,
    message: "Demande de devis reçue avec succès",
  });
}
