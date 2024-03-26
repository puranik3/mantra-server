import { UnauthorizedException } from '@nestjs/common';

const auth = (request, allowedRole) => {
  const { role } = request['user'];

  if (role !== allowedRole) {
    throw new UnauthorizedException();
  }
};

export { auth };
