import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const showProfile = container.resolve(ShowProfileService);
    const user = await showProfile.execute({ user_id });
    const { password, ...userResponse } = user;
    return response.json(userResponse);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const user_id = request.user.id;
      const { name, email, oldPassword, password } = request.body;

      const updateProfile = container.resolve(UpdateProfileService);
      const user = await updateProfile.execute({
        user_id,
        name,
        email,
        oldPassword,
        password,
      });

      const { id, created_at, updated_at } = user;

      return response.json({ id, name, email, created_at, updated_at });
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
