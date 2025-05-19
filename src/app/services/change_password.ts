import { Prisma } from "@prisma/client";

function generateRandomPassword(length: number = 16): string {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}

async function recoveryPassword(user: Funcionarios) {
  user.Password = generateRandomPassword();
  user.Change_password = "Y";
  console.log("El user modificado es: ", user);
  const urlSave = `/api/funcionarios/[id]`;
  const result = await fetch(urlSave, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  if (!result.ok) {
    throw new Error("Error al guardar el usuario con la nueva contraseña en la base de datos");
  }
  const urlSendEmail = `/api/send_email`;
  const htmlContent = `
<!DOCTYPE html>
<html lang=\"es\">
<head>
  <meta charset=\"UTF-8\" />
  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"/>
  <title>Recuperación de contraseña</title>
</head>
<body style=\"font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;\">
  <table align=\"center\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" style=\"background-color: #f4f4f4; padding: 20px;\">
    <tr>
      <td align=\"center\">
        <table width=\"600\" cellpadding=\"0\" cellspacing=\"0\" style=\"background-color: #ffffff; border-radius: 8px; overflow: hidden;\">
          <tr>
            <td style=\"padding: 20px; text-align: center; background-color: #2783B1; color: white;\">
              <h2 style=\"margin: 0;\">Contraseña temporal</h2>
            </td>
          </tr>
          <tr>
            <td style=\"padding: 30px;\">
              <p style=\"font-size: 16px; color: #333333;\">
                Hola, hemos recibido una solicitud para restablecer tu contraseña.
              </p>
              <p style=\"font-size: 16px; color: #333333;\">
                Tu nueva contraseña provisional es:
              </p>
              <p style=\"font-size: 20px; font-weight: bold; color: #2783B1; background-color: #f0f8ff; padding: 10px; text-align: center; border-radius: 4px;\">
                ${user.Password}
              </p>
              <p style=\"font-size: 16px; color: #333333;\">
                Por seguridad, te recomendamos iniciar sesión lo antes posible y cambiar esta contraseña por una que solo tú conozcas.
              </p>
              <hr style=\"margin: 30px 0;\" />
              <p style=\"font-size: 14px; color: #777777;\">
                Si tú no solicitaste el restablecimiento de tu contraseña, por favor comunícate con el equipo de soporte de <strong>Liceo San Pedro</strong> o administrativos de manera inmediata.
              </p>
              <p style=\"font-size: 14px; color: #777777; text-align: center; margin-top: 40px;\">
                &copy; 2025 Liceo San Pedro. Todos los derechos reservados.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

  const body = {
    to: user.Email,
    subject: "Recuperación de contraseña",
    html: htmlContent,
  };
  const resultEmail = await fetch(urlSendEmail, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!resultEmail.ok) {
    throw new Error("Error al enviar el correo de recuperación de contraseña");
  }
}

export default recoveryPassword;