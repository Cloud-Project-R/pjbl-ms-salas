import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, MaxLength, Min } from 'class-validator';

/**
 * Dados que chegam no corpo (body) do POST e do PUT.
 * Os decorators fazem duas coisas:
 *  - @ApiProperty: aparece no Swagger
 *  - @IsString, @IsInt...: o NestJS recusa (400) dados no formato errado
 */
export class SalaDto {
  @ApiProperty({ example: 'Sala 101' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nome: string;

  @ApiProperty({ example: 30, description: 'Número inteiro maior que zero' })
  @IsInt()
  @Min(1)
  capacidade: number;

  @ApiProperty({ example: 'UNI-001' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  universidadeId: string;
}

/** Formato da sala nas respostas (só para documentar no Swagger). */
export class SalaRespostaDto {
  @ApiProperty({ example: '6730f1c2a1b2c3d4e5f60718' })
  id: string;

  @ApiProperty({ example: 'Sala 101' })
  nome: string;

  @ApiProperty({ example: 30 })
  capacidade: number;

  @ApiProperty({ example: 'UNI-001' })
  universidadeId: string;

  @ApiProperty({ example: true })
  ativa: boolean;
}
