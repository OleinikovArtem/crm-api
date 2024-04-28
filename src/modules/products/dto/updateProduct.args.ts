import { ArgsType, Field } from '@nestjs/graphql';
import { CreateProductArgs } from '@modules/products/dto/createProduct.args';

@ArgsType()
export class UpdateProductArgs extends CreateProductArgs {
  @Field(() => String, { nullable: false })
  id: string;

  @Field(() => Boolean, { nullable: true })
  isPublished: boolean;
}




