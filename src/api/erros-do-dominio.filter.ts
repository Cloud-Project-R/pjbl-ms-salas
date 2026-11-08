import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { ErroDeValidacao, ErroNaoEncontrado } from '../domain/erros';

/**
 * Traduz os erros do negócio para respostas HTTP:
 *  - ErroDeValidacao  -> 400 Bad Request
 *  - ErroNaoEncontrado -> 404 Not Found
 */
@Catch(ErroDeValidacao, ErroNaoEncontrado)
export class ErrosDoDominioFilter implements ExceptionFilter {
  catch(erro: Error, host: ArgumentsHost) {
    const status = erro instanceof ErroNaoEncontrado ? 404 : 400;
    const resposta = host.switchToHttp().getResponse();
    resposta.status(status).json({ statusCode: status, message: erro.message });
  }
}
