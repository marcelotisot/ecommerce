import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "./app.module";
import { DatabaseModule } from "./modules/database/database.module";
import { CategoriesModule } from './modules/categories/categories.module';

describe('AppModule', () => {

  let databaseModule: DatabaseModule;
  let categoriesModule: CategoriesModule;

  beforeEach(async () => {
    
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports:[AppModule]
    }).compile();

    databaseModule    = moduleRef.get<DatabaseModule>(DatabaseModule);
    categoriesModule  = moduleRef.get<CategoriesModule>(CategoriesModule);

  });

  it('should be defined with proper elements', () => {
    expect(databaseModule).toBeDefined();
    expect(categoriesModule).toBeDefined();
  });

});