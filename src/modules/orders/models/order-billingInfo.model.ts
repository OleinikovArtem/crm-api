import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { BillingInfo } from '@prisma/client';

@InputType()
@ObjectType()
export class OrderBillingInfoInput {
  @Field(() => String)
  bio: BillingInfo['bio'];

  @Field(() => String!)
  fullName: BillingInfo['fullName'];

  @Field(() => String)
  email: BillingInfo['email'];

  @Field(() => String)
  houseNumber: BillingInfo['houseNumber'];

  @Field(() => String)
  street: BillingInfo['street'];

  @Field(() => String)
  city: BillingInfo['city'];

  @Field(() => String, { nullable: true })
  postalCode: BillingInfo['postalCode'];

  @Field(() => String, { nullable: true })
  country: BillingInfo['country'];
}

@ObjectType()
export class OrderBillingInfo extends OrderBillingInfoInput {
  @Field(() => String)
  id: BillingInfo['id'];
}
