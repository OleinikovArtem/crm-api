import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Type } from '@nestjs/common';

export function GeneratePaginationOutput<T>(classRef: Type<T>) {
  @ObjectType({ isAbstract: true })
  abstract class GenericPaginationOutput {
    @Field(type => Int)
    totalCount: number;

    @Field(type => Int)
    totalPages: number;

    @Field(type => Int)
    currentPage: number;

    @Field(type => [classRef])
    items?: T[];
  }

  Object.defineProperty(GenericPaginationOutput, 'name', {
    value: `${classRef.name}sOutput`,
  });

  return GenericPaginationOutput;
}
