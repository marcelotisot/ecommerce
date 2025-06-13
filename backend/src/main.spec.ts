import { NestFactory } from "@nestjs/core";
import { bootstrap } from "./main";
import { AppModule } from "./app.module";
import { environment } from "./config";
import { TypeORMExceptionFilter } from "./common";

jest.mock('@nestjs/core', () => ({
  NestFactory: {
    create: jest.fn().mockResolvedValue({
      setGlobalPrefix: jest.fn(),
      useGlobalPipes: jest.fn(),
      useGlobalFilters: jest.fn(),
      listen: jest.fn(),
      enableCors: jest.fn(),
    }),
  }
}));

describe('Main.ts Bootstrap', () => {

  let mockApp: {
    useGlobalPipes: jest.Mock;
    setGlobalPrefix: jest.Mock;
    useGlobalFilters: jest.Mock;
    listen: jest.Mock;
    enableCors: jest.Mock;
  };

  beforeEach(() => {

    mockApp = {
      useGlobalPipes: jest.fn(),
      setGlobalPrefix: jest.fn(),
      useGlobalFilters: jest.fn(),
      listen: jest.fn(),
      enableCors: jest.fn(),
    };

    (NestFactory.create as jest.Mock).mockResolvedValue(mockApp);

  });

  it('should create application', async () => {

    await bootstrap();

    expect(NestFactory.create).toHaveBeenCalledWith(AppModule);

  });

  it('should set global prefix', async () => {

    await bootstrap();

    expect(mockApp.setGlobalPrefix).toHaveBeenCalledWith('api/v1');

  });

  it('should listen on correct port', async () => {

    await bootstrap();

    expect(mockApp.listen).toHaveBeenCalledWith(environment.port);

  });

  it('should use global pipes', async () => {

    await bootstrap();

    expect(mockApp.useGlobalPipes).toHaveBeenCalledWith(
      expect.objectContaining({
        errorHttpStatusCode: 400,
        validatorOptions: expect.objectContaining({
          whitelist: true,
          forbidNonWhitelisted: true,
        })
      })
    )

  });

  it('should use global filters', async () => {

    await bootstrap();

    expect(mockApp.useGlobalFilters).toHaveBeenCalledWith(
      new TypeORMExceptionFilter()
    );

  });

  it('should enabled cors', async () => {
    await bootstrap();

    expect(mockApp.enableCors).toHaveBeenCalled();
  });

});