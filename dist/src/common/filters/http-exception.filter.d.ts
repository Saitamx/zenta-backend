import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
export declare class HttpGlobalExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost): void;
}
