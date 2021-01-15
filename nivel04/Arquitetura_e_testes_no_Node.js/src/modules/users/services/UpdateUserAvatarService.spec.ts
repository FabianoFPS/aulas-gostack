import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

describe('UpdateUserAvatar', () => {
  it('should de able to update avatar', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      new FakeStorageProvider(),
    );
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'jhon@deo.com',
      password: 'abcdef',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg',
    });
    expect(user.avatar).toBe('avatar.jpg');
  });
  it('should not be able to update avatar from non existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      new FakeStorageProvider(),
    );

    await expect(
      updateUserAvatar.execute({
        user_id: 'nom-existing-user',
        avatarFilename: 'avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should delete old avatar when updating new one', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();
    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'jhon@deo.com',
      password: 'abcdef',
    });

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar2.jpg',
    });
    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
    expect(user.avatar).toBe('avatar2.jpg');
  });
});
