// import { Injectable, CanActivate, ExecutionContext, UseGuards } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { AuthGuard } from './auth.guard';
// import { AuthService } from './auth.service';
// import { ROLES_KEY } from './role.decorator';
// import { Role } from './role.enum';

// @Injectable()
// export class RoleGuard implements CanActivate {
//   constructor(private reflector: Reflector) {}

//   canActivate(context: ExecutionContext): boolean {
//     const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
//       context.getHandler(),
//       context.getClass(),
//     ]);
//     if (!requiredRoles) {
//       return true;
//     }
//     const controller = context.getClass();

//     const user = controller['user'];
//     return requiredRoles.some((role) => user.roles?.includes(role));
//   }
// }