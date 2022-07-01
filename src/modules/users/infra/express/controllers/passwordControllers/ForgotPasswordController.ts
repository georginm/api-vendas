import { SendForgotPasswordEmailService } from '@modules/users/services/passwordService/SendForgotPasswordEmailService';
import { Request, Response } from 'express';

class ForgotPasswordController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendForgotPasswordEmail = new SendForgotPasswordEmailService();

    await sendForgotPasswordEmail.execute(email);

    return response.status(204).json();
  }
}

export { ForgotPasswordController };
