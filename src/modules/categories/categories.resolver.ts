import { Query, Resolver } from '@nestjs/graphql';
import { CategoriesService } from './categories.service';
import { Category } from './categories.model';

@Resolver()
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {
  }

  @Query(() => [Category], { name: 'categories' })
  async getCategories() {
    return this.categoriesService.getCategories();
  }
}
