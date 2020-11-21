interface ITechObject {
  title: string,
  experience: number,
}

interface ICreateUserDate {
  name?: string,
  email: string,
  password: string,
  techs: Array<string|ITechObject>,
}

export default function createUser({ name = '', email, password }: ICreateUserDate) {
  const user = {
    name,
    email,
    password,
  }
  return user;
}