import { ResetPasswordService } from '@modules/users/services/passwordService/ResetPasswordService';
import { Request, Response } from 'express';

class ResetPasswordController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { password, token } = request.body;

    const resetPassword = new ResetPasswordService();

    await resetPassword.execute({ password, token });

    return response.status(204).json();
  }
}

export { ResetPasswordController };
