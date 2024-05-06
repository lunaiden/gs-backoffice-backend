import { Injectable } from '@nestjs/common';
import { Client } from 'node-mailjet';

@Injectable()
export class MailerService {
  private mailjet = new Client({
    apiKey: process.env.MJ_APIKEY_PUBLIC,
    apiSecret: process.env.MJ_APIKEY_PRIVATE,
  });

  // user signup confirmation email
  async sendSignupConfirmation(email: string) {
    const message = {
      Messages: [
        {
          From: { Email: 'melanie.leeman@protonmail.com' },
          To: [{ Email: email }],
          Subject: 'Inscription',
          HTMLPart: '<h3>Confirmation inscription</h3>',
        },
      ],
    };

    try {
      const result = await this.mailjet
        .post('send', { version: 'v3.1' })
        .request(message);

      console.log('Email envoyé:', result.body);
    } catch (err) {
      throw new Error(err);
    }
  }

  // user email reset password
  async sendResetPasswordLink(email: string, token: string) {
    const message = {
      Messages: [
        {
          From: { Email: 'melanie.leeman@protonmail.com' },
          To: [{ Email: email }],
          Subject: 'Réinitialisation de mot de passe',
          HTMLPart: `<h3>Réinitialisation de mot de passe</h3>
        <h5>Pour réinitialiser votre mot de passe, cliquez sur ce lien :</h5>
        <a href="${process.env.FRONT_URL}/reset_password?${token}">Réinitialiser mon mot de passe</a>`,
        },
      ],
    };

    try {
      const result = await this.mailjet
        .post('send', { version: 'v3.1' })
        .request(message);

      console.log('Email reset envoyé:', result.body);
    } catch (err) {
      throw new Error(err);
    }
  }
}
