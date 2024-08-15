import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Dept {
    @Field(() => Int)
    amount: number;

    @Field()
    currency: string;
}

@InputType()
export class DeptInput {
    @Field(() => Int)
    amount: number;

    @Field()
    currency: string;
}

@ObjectType()
export class PayerUsers {
    @Field()
    userId: string;

    @Field(() => [String])
    expireTokens?: string[];
}

@InputType()
export class PayerUsersInput {
    @Field()
    userId: string;

    @Field(() => [String])
    expireTokens?: string[];
}

@ObjectType()
export class ReturnedPayer {
    @Field()
    _id: string;

    @Field()
    fullName: string;

    @Field()
    email: string;

    @Field(() => Dept)
    dept: Dept;

    @Field(() => PayerUsers)
    users: PayerUsers;

    @Field()
    merchantId: string;
}

@InputType()
export class CreatePayer {
    @Field()
    fullName: string;

    @Field()
    email: string;

    @Field()
    merchantId: string;

    @Field(() => PayerUsersInput)
    users: PayerUsersInput;

    @Field(() => DeptInput)
    dept: DeptInput;
}

@ObjectType()
export class Payer {
    @Field()
    success: boolean;

    @Field(() => ReturnedPayer)
    data: ReturnedPayer
}

@ObjectType()
export class Payers {
    @Field()
    success: boolean;

    @Field(() => [ReturnedPayer])
    data: ReturnedPayer[]
}

@ObjectType()
export class TotalDept {
    @Field()
    _id: string;

    @Field(() => Int)
    totalDept: number;
}

@ObjectType()
export class TotalDeptReturn {
    @Field()
    success: boolean;

    @Field(() => [TotalDept])
    data: TotalDept[];
}

