import bcrypt from "bcryptjs";
import type { IUserRepository } from "../repositories/user.repository.js";
import { JwtService } from "../services/jwt.service.js";

interface LoginDTO {
  email: string;
  password: string;
}

export class LoginUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(data: LoginDTO): Promise<{ token: string }> {
    const user = await this.userRepository.findByEmail(data.email);
    if (!user) throw new Error("Credenciales inválidas");

    const isValid = await bcrypt.compare(data.password, user.password);
    if (!isValid) throw new Error("Credenciales inválidas");

    const token = this.jwtService.sign({
      id: user.id,
      email: user.email,
      role: (user as any).role ?? "USER",
    });

    return { token };
  }
}
