import { ArgumentsHost, Catch, HttpException, HttpStatus, Type } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { FastifyReply } from 'fastify';
import { isObject } from 'lodash';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
/**
 * @description 全局过滤器,用于响应自定义异常
 * @export
 * @class AppFilter
 * @extends {BaseExceptionFilter<T>}
 * @template T
 */
@Catch()
export class AppFilter<T = Error> extends BaseExceptionFilter<T> {
    protected resExceptions: Array<{ class: Type<Error>; status?: number } | Type<Error>> = [
        { class: EntityNotFoundError, status: HttpStatus.NOT_FOUND },
    ];

    // eslint-disable-next-line consistent-return
    catch(exception: T, host: ArgumentsHost) {
        const applicationRef =
            this.applicationRef || (this.httpAdapterHost && this.httpAdapterHost.httpAdapter)!;
        // 是否在自定义的异常处理类列表中
        const resException = this.resExceptions.find((item) =>
            'class' in item ? exception instanceof item.class : exception instanceof item,
        );

        // 如果不在自定义异常处理类列表也没有继承自HttpException
        if (!resException && !(exception instanceof HttpException)) {
            return this.handleUnknownError(exception, host, applicationRef);
        }
        let res: string | object = '';
        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        if (exception instanceof HttpException) {
            res = exception.getResponse();
            status = exception.getStatus();
        } else if (resException) {
            // 如果在自定义异常处理类列表中
            const e = exception as unknown as Error;
            res = e.message;
            if ('class' in resException && resException.status) {
                status = resException.status;
            }
        }
        const message = isObject(res)
            ? res
            : {
                  statusCode: status,
                  message: res,
              };

        //   todo
        // applicationRef!.reply(host.getArgByIndex(1), message, status);
        const ctx = host.switchToHttp();
        // 响应 请求对象
        const response = ctx.getResponse<FastifyReply>();
        response.status(status).send({
            code: status,
            data: null,
            message,
        });
    }
}
